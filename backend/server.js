require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const queues = require("./queues/index");
const Job = require("./models/Job");
const rateLimiter = require("./middleware/rateLimiter");
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const app = express();

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (origin.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) return callback(null, true);
        if (origin.match(/\.vercel\.app$/)) return callback(null, true);
        if (origin.match(/\.github\.io$/)) return callback(null, true);
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues: [
        new BullMQAdapter(queues.roadmap),
        new BullMQAdapter(queues.buzzwords),
        new BullMQAdapter(queues.interview),
        new BullMQAdapter(queues.quiz),
    ],
    serverAdapter,
});

app.use("/admin/queues", (req, res, next) => {
    const auth = req.headers.authorization;
    const adminPassword = process.env.ADMIN_PASSWORD || "prepsphere-admin";
    const expected = "Basic " + Buffer.from("admin:" + adminPassword).toString("base64");
    if (!auth || auth !== expected) {
        res.setHeader("WWW-Authenticate", "Basic");
        return res.status(401).send("Unauthorized");
    }
    next();
}, serverAdapter.getRouter());

app.use("/api/auth", authRoutes);
app.use(rateLimiter);
app.use("/api/jobs", jobRoutes);

async function enqueueJob(queue, queueName, jobData) {
    const jobId = crypto.randomUUID();
    await Job.create({ jobId, queue: queueName, status: "queued" });
    await queue.add(queueName, { jobId, ...jobData });
    return jobId;
}

app.post("/api/roadmap", async (req, res) => {
    try {
        const { role } = req.body;
        if (!role) return res.status(400).json({ error: "No job role provided" });
        const jobId = await enqueueJob(queues.roadmap, "prepsphere-ai-roadmap", { role });
        res.status(202).json({ jobId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/generate-buzzwords", async (req, res) => {
    try {
        const { jobDescription } = req.body;
        if (!jobDescription) return res.status(400).json({ error: "No description provided" });
        const jobId = await enqueueJob(queues.buzzwords, "prepsphere-ai-buzzwords", { jobDescription });
        res.status(202).json({ jobId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/mock-interview", async (req, res) => {
    try {
        const { jobDescription } = req.body;
        if (!jobDescription) return res.status(400).json({ error: "No Job Description provided" });
        const jobId = await enqueueJob(queues.interview, "prepsphere-ai-interview", { jobDescription });
        res.status(202).json({ jobId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/generate-quiz", async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "No content provided" });
        const jobId = await enqueueJob(queues.quiz, "prepsphere-ai-quiz", { content });
        res.status(202).json({ jobId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use((err, req, res, next) => {
    console.error("[Server] Unhandled error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Bull Board: http://localhost:${PORT}/admin/queues`);
});