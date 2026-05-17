const { createClient } = require("redis");

const LIMITS = {
    "/api/roadmap":            { max: 3,  windowSec: 60 },
    "/api/generate-buzzwords": { max: 10, windowSec: 60 },
    "/api/mock-interview":     { max: 5,  windowSec: 60 },
    "/api/generate-quiz":      { max: 8,  windowSec: 60 },
};
let clientPromise = null;

function buildRedisClient() {
    const redisUrl = process.env.REDIS_URL;
    const isUpstash = redisUrl && redisUrl.includes("upstash.io");
    const needsTls  = (redisUrl && redisUrl.startsWith("rediss://")) || isUpstash;
    const url       = needsTls && redisUrl.startsWith("redis://")
        ? redisUrl.replace(/^redis:\/\//, "rediss://")
        : redisUrl;

    const client = createClient({
        url,
        socket: needsTls ? { tls: true } : undefined,
    });

    client.on("error", (err) => {
        console.error("[RateLimit] Redis client error:", err.message);
    });

    client.on("reconnecting", () => {
        console.warn("[RateLimit] Redis client reconnecting…");
    });

    return client;
}

async function getRedisClient() {
    if (!clientPromise) {
        const client = buildRedisClient();
        clientPromise = client.connect().then(() => client).catch((err) => {
            clientPromise = null;
            throw err;
        });
    }

    const client = await clientPromise;
    if (!client.isOpen) {
        clientPromise = null;
        return getRedisClient();
    }

    return client;
}
async function rateLimiter(req, res, next) {
    const cleanPath = (req.originalUrl || "").split("?")[0];
    const routeLimit = LIMITS[req.path] || LIMITS[cleanPath];

    if (!routeLimit) return next();

    const identifier = req.user?.id || req.ip || "anonymous";
    const pathKey    = (req.path || cleanPath).replace(/\//g, ":");
    const key        = `ratelimit:${pathKey}:${identifier}`;

    try {
        const client = await getRedisClient();
        const count  = await client.incr(key);

        if (count === 1) {
            await client.expire(key, routeLimit.windowSec);
        }

        const ttl = await client.ttl(key);

        res.setHeader("X-RateLimit-Limit",     routeLimit.max);
        res.setHeader("X-RateLimit-Remaining", Math.max(0, routeLimit.max - count));
        res.setHeader("X-RateLimit-Reset",     ttl);

        if (count > routeLimit.max) {
            return res.status(429).json({
                error: "Too many requests. Please wait before generating again.",
                retryAfter: ttl,
            });
        }

        next();
    } catch (err) {
        console.error("[RateLimit] Redis error, failing open:", err.message);
        next();
    }
}

module.exports = rateLimiter;