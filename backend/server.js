require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const { extractBuzzwords, generateQuiz, generateMockInterview } = require('./aiService');

const app = express();

// Advanced CORS Configuration
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // Specific for Live Server
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Route 1: Buzzword Generator
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

// Route 2: MCQ Quiz Generator
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

// Route 3: Mock My Interview Module
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

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});