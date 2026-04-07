require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const { extractBuzzwords, generateQuiz, generateMockInterview, generateRoadmap } = require('./aiService');
const app = express();
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (origin.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) {
            return callback(null, true);
        }
        if (origin.match(/\.vercel\.app$/)) {
            return callback(null, true);
        }
        if (origin.match(/\.github\.io$/)) {
            return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.post('/api/generate-buzzwords', async (req, res) => {
    try {
        const { jobDescription } = req.body;
        if (!jobDescription) return res.status(400).json({ error: "No description provided" });
        const buzzwords = await extractBuzzwords(jobDescription);
        res.json({ buzzwords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "No content provided" });
        const questions = await generateQuiz(content);
        if (!questions) throw new Error("AI failed to generate quiz");
        res.json({ questions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/mock-interview', async (req, res) => {
    try {
        const { jobDescription } = req.body;
        if (!jobDescription) return res.status(400).json({ error: "No Job Description provided" });

        const interviewData = await generateMockInterview(jobDescription);
        if (!interviewData) throw new Error("AI failed to generate interview prep");

        res.json(interviewData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/roadmap', async (req, res) => {
    try {
        const { role } = req.body;
        if (!role) return res.status(400).json({ error: "No job role provided" });
        
        const roadmapData = await generateRoadmap(role);
        if (!roadmapData) throw new Error("AI failed to generate roadmap");
        
        res.json(roadmapData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is live and running on port ${PORT}`);
});