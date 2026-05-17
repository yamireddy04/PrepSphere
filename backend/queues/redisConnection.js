function createRedisConnection() {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
        throw new Error(
            "REDIS_URL environment variable is not set. " +
            "Add it to your .env file. " +
            "For Upstash use:  rediss://default:<password>@<host>:<port>"
        );
    }
    const isUpstash = redisUrl.includes("upstash.io");
    const needsTls   = redisUrl.startsWith("rediss://") || isUpstash;
    const normalisedUrl = needsTls && redisUrl.startsWith("redis://")
        ? redisUrl.replace(/^redis:\/\//, "rediss://")
        : redisUrl;

    return {
        url: normalisedUrl,
        tls: needsTls ? {} : undefined,
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
        reconnectOnError(err) {
            return err.message.startsWith("READONLY");
        },
    };
}
module.exports = { createRedisConnection };