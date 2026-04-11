# 🚀 PrepSphere — AI-Powered Interview Intelligence Platform

![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20Vanilla%20JS%20%7C%20MongoDB-1b2e2b?style=flat-square)
![LLM](https://img.shields.io/badge/LLM-Llama%203%20via%20Groq-d9c5b2?style=flat-square)
![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47a248?style=flat-square)
![Auth](https://img.shields.io/badge/Auth-JWT-f5a623?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-7ecb84?style=flat-square)

An end-to-end AI-powered placement preparation platform that takes candidates from zero to job-ready — covering skill building, resume preparation, structured interview practice, mock simulation, and job application strategy in one place.

Built with **Node.js / Express** on the backend and **Vanilla JavaScript** on the frontend.

🌐 **Live Application:** https://prepsphere000146.vercel.app/

---

## 1️⃣ Problem Statement

Placement preparation is fragmented. Roadmaps live on one site, resume advice on another, aptitude practice somewhere else, and job portals across ten tabs. There is no unified workflow and no clear sense of what to do first.

PrepSphere consolidates the entire placement journey into a single platform structured as three sequential phases, so candidates can go from no preparation to submitting polished applications without switching tools.

---

## 2️⃣ Why It Matters

| Use Case | Value |
|---|---|
| **Students** | End-to-end placement guidance with no prior knowledge of the process required |
| **Job Seekers** | Single platform replacing a dozen disconnected tools |
| **Career Switchers** | Role-specific roadmaps and JD-aligned question banks for new domains |
| **Early Professionals** | Structured post-application strategy including outreach templates |

---

## 3️⃣ Platform — Three Phases

### 📘 Phase 1 — Foundation Building

Everything a candidate needs before active preparation begins.

| Module | What It Does |
|---|---|
| **Roadmap** | Curated technical and non-technical learning paths by role. Includes **Pathfinder** — an AI tool that generates a personalised roadmap (what to learn, what to build, where to learn) from a target role description |
| **Resume Builder** | Explains ATS, what recruiters look for, and includes a **Buzzword Generator** (paste a JD → get ATS keywords) and an in-platform resume editor with download |
| **Cover Letter** | Guidance on structure and tone, plus an AI generator that drafts a tailored cover letter from the user's background and target JD |

---

### 📗 Phase 2 — Preparation

Full-coverage practice across every round type in a typical placement process.

| Module | What It Does |
|---|---|
| **PrepMaster** | Company-specific insights — whether a company is aptitude-heavy, DSA-heavy, or both, with round-by-round breakdowns |
| **MockIt** | Covers every round: Group Discussion, Aptitude (topic table with resources), JAM, HR Interview, MCQs (subject table + **AI MCQ Generator** with gamified quiz and scoring), and Technical Interview (platforms, resources) |
| **Mock My Interview (MMI)** | Paste a Job Description → AI extracts core mastery topics and generates a predicted question bank with strategic model answers |

---

### 📙 Phase 3 — HireHub

Guides candidates through the job application lifecycle from start to finish.

| Module | What It Does |
|---|---|
| **Job Portals** | Curated, categorised directory of global, Indian, startup, internship, and remote job platforms with guidance on how to use them effectively |
| **Proactive Outreach** | Cold email, LinkedIn DM, and follow-up strategies with ready-to-use templates — including how to respond professionally after rejection |

---

## 4️⃣ System Architecture

```
Client (Vercel) → Express API (Render) → Llama 3 via Groq API → MongoDB Atlas
```

**Pipeline**
1. User inputs a Job Description, notes, or topic
2. NLP-based entity extraction defines the semantic scope
3. Structured prompts sent to Llama 3 via Groq API
4. JSON schema validation enforced on all LLM responses
5. Schema-constrained outputs rendered as roadmaps, MCQ quizzes, or question banks

**Key Design Principles**
- Schema-constrained generation for deterministic, frontend-renderable outputs
- Non-blocking AI orchestration for near-zero perceived latency
- Modular phase structure for independent extension of each stage

---

## 5️⃣ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JavaScript, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| LLM Inference | Llama 3 via Groq Cloud API |
| Database | MongoDB Atlas |
| Authentication | JWT |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 6️⃣ How to Run

**Backend**

```bash
cd backend
npm install
```

Create `.env`:

```
MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_key
JWT_SECRET=your_secret
```

```bash
node server.js
```

Runs on `http://localhost:10000`

**Frontend**

Serve the `Frontend/` folder with VS Code Live Server or any static server.
Entry point: `Frontend/login.html`
Update API base URL in `Frontend/js/config.js` to `http://localhost:10000`

---

## 7️⃣ Limitations

- API throughput depends on Groq rate limits
- Non-deterministic outputs may vary slightly across identical inputs
- Render free tier cold start may cause initial latency
- Preparation progress is not persisted across browser sessions
- Resume upload and PDF parsing not yet supported

---

## 8️⃣ Future Work

- [ ] Resume PDF parsing with gap analysis against a target JD
- [ ] Adaptive MCQ difficulty based on real-time quiz performance
- [ ] Application tracker — Kanban board for logging and following up on submissions
- [ ] Vector memory for cross-session continuity and non-repetitive recommendations
- [ ] Cross-session analytics dashboard with subject-level accuracy trends
- [ ] Voice-based mock interview module with LLM evaluation and post-session report
- [ ] Interview experience database crowd-sourced from real hiring cycles
- [ ] Domain-specific fine-tuned model for improved response determinism

---

## 9️⃣ Conclusion

PrepSphere addresses a clear gap: placement preparation is scattered and overwhelming for most candidates. By consolidating roadmaps, resume tools, interview practice, mock simulation, and job application strategy into one structured platform, it removes the need to juggle disconnected tools. The focus on schema-constrained AI generation, gamified practice, and actionable templates reflects a design philosophy centred on practical outcomes.

---

<div align="center">

*Built by [Yamini G](https://github.com/yamireddy04)*

<div align="center">

**© 2024 Yamini G. All rights reserved.**

This project is for educational and portfolio purposes. You are welcome to reference or draw inspiration from this work, but please do not copy, reproduce, or redistribute the code, content, or design without explicit credit to the original author.

If you use any part of this project, add a visible credit: **"Inspired by / Based on work by Yamini G — github.com/yamireddy04"**

</div>
