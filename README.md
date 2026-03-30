# 🚀 PrepSphere — AI-Powered Interview Intelligence Platform

![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20Vanilla%20JS%20%7C%20MongoDB-1b2e2b?style=flat-square)
![LLM](https://img.shields.io/badge/LLM-Llama%203%20via%20Groq-d9c5b2?style=flat-square)
![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47a248?style=flat-square)
![Auth](https://img.shields.io/badge/Auth-JWT-f5a623?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-7ecb84?style=flat-square)

A full-stack AI-powered interview preparation platform that supports the complete interview lifecycle — from roadmap selection and structured learning to job application support, mock simulation, and post-interview reflection.

Built with **Node.js / Express** for the backend and **Vanilla JavaScript** for the frontend.

**Live Application:** https://prepsphere000146.vercel.app/ 

**Backend API:** https://prepsphere-o7wh.onrender.com

---

## 1️⃣ Problem Statement

Interview preparation is often unstructured and inefficient. While candidates may have studied relevant topics, it is difficult to determine:

- How a Job Description maps to specific interview stages
- Which topics are most important for a given role
- How to structure preparation in a time-efficient manner

This misalignment leads to scattered effort and poor preparation coverage. PrepSphere addresses this by extracting role-specific signals from Job Descriptions and converting them into organized roadmaps, structured question sets, and simulated mock workflows.

---

## 2️⃣ Why It Matters

Structured interview preparation directly impacts hiring outcomes. Traditional tools isolate resume guidance, question banks, or mock practice — but offer no unified workflow. PrepSphere bridges this gap by:

- Compressing lengthy Job Descriptions into targeted mastery topics
- Generating role-aligned question banks automatically
- Enabling mock simulation with session-tracked performance
- Supporting candidates across ML, AI, Full-Stack, Data Analytics, and Prompt Engineering roles

For candidates applying to competitive roles, the difference between scattered study and structured preparation is measurable.

---

## 3️⃣ Dataset

The system was validated using a curated corpus of structured technical Job Descriptions and concept blocks.

**Role-Specific Job Descriptions**

The dataset included JDs across the following domains:

| Domain | Approximate Length |
|---|---|
| Machine Learning | 800–1500+ words |
| AI / LLM Roles | 800–1500+ words |
| Prompt Engineering | 800–1500+ words |
| Data Analytics | 800–1500+ words |
| Full-Stack / Software Development | 800–1500+ words |

**Technical Knowledge Clusters**

The roadmap and MCQ engine were evaluated against structured concept blocks including:

- Java architecture (JVM internals, OOP principles)
- Python ecosystem (Pandas, NumPy, applied workflows)
- LLM systems (Transformer architectures, RAG pipelines)
- Data engineering concepts (ETL / ELT workflows)

This ensured topic alignment, semantic consistency, and structured coverage across all generated outputs.

---

## 4️⃣ Methodology

The system follows a structured pipeline:

1. User inputs a raw Job Description, academic notes, or custom preparation outline.
2. NLP-based contextual tokenization extracts domain-specific entities (e.g., ETL workflows, Transformer architectures, JVM components, RAG pipelines).
3. Extracted entities define the semantic scope for roadmap and question generation.
4. Structured prompts are sent to the LLM via the Groq inference API.
5. The backend enforces strict JSON schema validation on all LLM responses.
6. Schema-constrained outputs are rendered as roadmaps, MCQ sets, and mock sessions.
7. Session state tracks user accuracy and topic mastery progression.

```
User Input (JD / Notes)
        │
        ▼
  [NLP Entity Extraction]
  - Domain-specific tokenization
  - Semantic scope definition
        │
        ▼
  [LLM Prompt Orchestration]
  - Llama 3 via Groq Cloud API
  - Structured prompt templates
        │
        ▼
  [Schema-Constrained JSON Validation]
  - MCQ formatting
  - Roadmap structuring
        │
        ▼
  [Frontend Rendering]
  - Interactive mock simulation
  - Session-tracked progress
```

---

## 5️⃣ Model Architecture

**System Architecture**

```
Client (Vercel) → Express API (Render) → Llama 3 via Groq API → MongoDB Atlas
```

| Component | Technology |
|---|---|
| LLM | Llama 3 via Groq Cloud API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT-based |
| Frontend | Vanilla JavaScript, HTML5, CSS3 |
| Frontend Hosting | Vercel (Edge Network) |
| Backend Hosting | Render (auto-deployed via GitHub) |

**Key Design Principles**

- Decoupled architecture separating the intelligence layer from the client interface
- Schema-constrained generation enforcing deterministic, frontend-renderable outputs
- Non-blocking AI orchestration for near-zero perceived latency
- Low-latency inference via Groq's acceleration pipeline

---

## 6️⃣ Results

**JD Compression**

Transforms 1000+ word Job Descriptions into:
- 5–8 Core Mastery Topics
- Structured Predicted Question Banks
- Stage-mapped preparation roadmaps

**Pattern Alignment**

Demonstrates consistent thematic mapping across diverse technical domains including ML, LLM systems, data engineering, and full-stack development.

**Performance**

- Near-zero latency via Groq inference engine
- Non-blocking AI orchestration
- Smooth interactive mock simulation flow
- Deterministic frontend rendering via JSON schema enforcement

---

## 7️⃣ Limitations

- **API Rate Constraints:** System throughput depends on the underlying Groq LLM provider limits.
- **Probabilistic Variability:** Minor output variations may occur due to the non-deterministic nature of generative models.
- **Cold Start Delay:** Backend hosted on Render's free tier may experience initial latency due to server wake-up time.
- **Domain Coverage:** Validation was conducted on technical roles; non-technical JD formats have not been evaluated.

---

## 8️⃣ Future Work

- Integration of vector databases for persistent semantic memory across sessions
- Adaptive difficulty scaling based on real-time user performance
- Topic mastery analytics dashboard with longitudinal tracking
- Migration toward a microservices architecture for scalable assessment modules
- Domain-specific fine-tuned model for improved response determinism
- Resume parsing integration for end-to-end application workflow support

---

## 9️⃣ How to Run

**1. Clone Repository**

```bash
git clone https://github.com/your-username/PrepSphere.git
cd PrepSphere
```

**2. Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_key
JWT_SECRET=your_secret
```

Start the backend:

```bash
node server.js
```

Backend runs on: `http://localhost:10000`

**3. Frontend Setup**

Serve the `Frontend/` folder using a local server (e.g., VS Code Live Server).

Entry point: `Frontend/login.html`

Update the API base URL in `Frontend/js/config.js`:

```
http://localhost:10000
```

---

## 🔟 Conclusion

PrepSphere demonstrates how structured LLM orchestration, schema-constrained generation pipelines, and modular web architecture can be combined to build an intelligent, centralized interview preparation system. By converting unstructured Job Descriptions into actionable mastery roadmaps and targeted mock assessments, the platform addresses a clear gap in existing preparation tools. The emphasis on deterministic output structuring and evaluation-safe AI responses reflects a production-conscious design philosophy, with a clear path toward adaptive, personalized preparation at scale.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JavaScript, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| LLM Inference | Llama 3 via Groq API |
| Database | MongoDB Atlas |
| Authentication | JWT |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
