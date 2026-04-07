const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function extractBuzzwords(jobDescription) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an ATS expert. Extract 15 essential buzzwords/skills from the job description. Return ONLY a comma-separated list."
                },
                {
                    role: "user",
                    content: jobDescription
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 1024,
        });

        const text = chatCompletion.choices[0]?.message?.content || "";
        return text.split(',').map(word => word.trim()).filter(w => w !== "");
        
    } catch (error) {
        console.error("Groq Buzzword Error:", error.message);
        return ["AI is busy. Try again in 30s."];
    }
}

async function generateQuiz(content) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Create a 10-question multiple-choice quiz based on the provided text. 
                    Return ONLY a JSON object with this exact structure: 
                    { "questions": [ { "question": "...", "options": ["", "", "", ""], "answer": 0 } ] }
                    The 'answer' should be the index (0-3) of the correct option.`
                },
                {
                    role: "user",
                    content: content
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            temperature: 0.7
        });

        const data = JSON.parse(chatCompletion.choices[0].message.content);
        return data.questions;
    } catch (error) {
        console.error("Groq Quiz Error:", error.message);
        return null;
    }
}

async function generateMockInterview(jobDescription) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a Senior Technical Recruiter. Based on the Job Description provided:
                    1. Identify 5-7 core topics the candidate MUST prepare.
                    2. Generate 10 challenging interview questions.
                    3. Provide a concise, expert answer for each question.
                    Return ONLY a JSON object with this exact structure: 
                    { 
                      "topics": ["topic1", "topic2"], 
                      "interviews": [ {"question": "...", "answer": "..."} ] 
                    }`
                },
                {
                    role: "user",
                    content: jobDescription
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            temperature: 0.6
        });

        const data = JSON.parse(chatCompletion.choices[0].message.content);
        return data;
    } catch (error) {
        console.error("Mock Interview AI Error:", error.message);
        return null;
    }
}

async function generateRoadmap(jobRole) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a Career Architect specializing in both technology roles and non technology roles. 
                    Create a hyper-detailed, structured, ordered learning roadmap for the specified job role.
                    The roadmap must expand on every tool/language/concept. 
                    Structure the response as a valid JSON object ONLY, with this exact shape:

                    {
                      "role": "Role Name",
                      "roadmapSteps": [
                        {
                          "title": "Module Title (e.g., Python for ML Data Science)",
                          "subtitle": "Brief (5-10 word) description of purpose",
                          "topics": ["Array manipulation with NumPy", "Pandas DataFrames", "Scikit-Learn modeling"],
                          "resources": [
                            {"type": "Free/Paid", "name": "Exact Resource Name", "context": "E.g., YouTube series by Sentdex - Watch all videos"}
                          ],
                          "practice": ["Build a small tool to...", "Clean a messy dataset and..."]
                        }
                      ],
                      "projectIdeas": [
                        {
                          "title": "Example Project Name",
                          "description": "What is the project and what problem does it solve?",
                          "stack": ["Python", "Groq API", "Streamlit"]
                        }
                      ]
                    }`
                },
                {
                    role: "user",
                    content: jobRole
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.6,
            response_format: { type: "json_object" }
        });

        return JSON.parse(chatCompletion.choices[0].message.content);
        
    } catch (error) {
        console.error("Groq Roadmap Error:", error.message);
        return { error: "AI is busy. Please try again." };
    }
}

module.exports = { extractBuzzwords, generateQuiz, generateMockInterview, generateRoadmap };

