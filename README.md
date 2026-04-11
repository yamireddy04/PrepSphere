# 🚀 PrepSphere — AI-Powered Interview Intelligence Platform

![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20Vanilla%20JS%20%7C%20MongoDB-1b2e2b?style=flat-square)
![LLM](https://img.shields.io/badge/LLM-Llama%203%20via%20Groq-d9c5b2?style=flat-square)
![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47a248?style=flat-square)
![Auth](https://img.shields.io/badge/Auth-JWT-f5a623?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-7ecb84?style=flat-square)

A full-stack AI-powered end-to-end placement preparation platform that supports the complete interview readiness lifecycle — from foundational skill building, resume and cover letter preparation, structured interview practice, mock simulation, and job application strategy, all the way through to post-interview follow-up.

Built with **Node.js / Express** for the backend and **Vanilla JavaScript** for the frontend.

🌐 **Live Application:** https://prepsphere000146.vercel.app/

---

## 1️⃣ Problem Statement

Interview and placement preparation is fragmented. Resources are scattered across dozens of platforms — roadmaps on one site, resume advice on another, aptitude practice somewhere else, mock interviews on a separate tool, job portals across ten different tabs. There is no unified workflow, no structured guidance, and no clear sense of what to do first, second, or last.

This confusion is especially acute for students and early-career candidates who do not know where to begin, what rounds to prepare for, or how to transition from preparation to active job applications.

PrepSphere was built to solve exactly this. It consolidates every stage of the placement journey into a single platform — structured as three sequential phases — so that a candidate can go from zero preparation to submitting polished applications without leaving the application.

---

## 2️⃣ Why It Matters

| Use Case | Value |
|---|---|
| **Students** | End-to-end placement guidance from day one — no prior knowledge of the process required |
| **Job Seekers** | Unified platform replacing ten separate tools across resume, prep, mock, and application |
| **Career Switchers** | Role-specific roadmaps and JD-aligned question banks for new domains |
| **Early Professionals** | Structured post-application strategy including cold outreach and follow-up templates |

---

## 3️⃣ Platform Overview — Three Phases

PrepSphere structures placement preparation as three sequential phases. Each phase contains dedicated modules with both static guidance and AI-powered tools.

---

### 📘 Phase 1 — Foundation Building

This phase covers everything a candidate needs before they begin active preparation. It has three modules.

---

#### 🗺️ Module 1 — Roadmap

Helps candidates understand what they need to learn and in what order before applying.

- **What is a Roadmap** — explanation of why structured learning paths matter for placement success
- **Why It Is Important** — how a roadmap prevents scattered, unfocused preparation
- **Technical Roadmaps** — curated learning paths for Software Engineering, Data Science, Machine Learning, DevOps, and related roles
- **Non-Technical Roadmaps** — preparation paths for HR, Management, Operations, and other non-engineering domains
- **Pathfinder** — an AI-powered tool where users describe their target role and receive a fully personalised roadmap specifying what to learn, in what sequence, what projects to build, and where to learn from, generated in real time via the Groq LLM API

---

#### 📄 Module 2 — Resume Building

Guides candidates through building an ATS-optimised resume from scratch.

- **What is a Resume** — purpose, structure, and how it is used in the hiring process
- **Why It Is Required** — the role of a resume at each stage of the application funnel
- **What Recruiters Look For** — specific signals, formatting conventions, and content priorities that hiring managers evaluate
- **ATS Explained** — what Applicant Tracking Systems are, why they matter, and how resumes are filtered before reaching a human reviewer
- **Buzzword Generator** — an AI tool where users paste a Job Description and receive a set of high-impact, ATS-optimised keywords and phrases to incorporate into their resume, generated in real time
- **Resume Builder** — an in-platform resume template with inline editing, where users fill in their details directly with contextual guidance on what to write in each section and how to phrase it, followed by a one-click download of the completed resume

---

#### ✉️ Module 3 — Cover Letter

Mirrors the structure of the Resume module for cover letter preparation.

- What a cover letter is and when it is required in the application process
- What recruiters look for in a strong cover letter
- Tone, structure, and length guidance with examples
- AI-powered cover letter generator that produces a tailored draft based on the user's role, background, and the target Job Description
- In-platform editor with download support

---

### 📗 Phase 2 — Preparation

This phase covers the full interview preparation cycle across every round type that candidates typically encounter.

---

#### 🏢 Module 4 — PrepMaster

Provides company-specific intelligence to help candidates understand what each organisation prioritises in its hiring process.

- Company profiles with insights into whether the hiring process is aptitude-heavy, DSA-heavy, or both
- Round structure breakdowns for major companies
- Focus area guidance so candidates allocate preparation time to what actually matters for their target employer

---

#### 🎯 Module 5 — MockIt

A comprehensive multi-round preparation hub covering every stage of a typical placement process.

**Group Discussion (GD)**
- What a GD round is and how it is evaluated by assessors
- Skills assessed — communication, leadership, listening, structured thinking, and consensus-building
- Sample GD topics across domains
- Tips and strategies to perform well under pressure

**Aptitude**
- What aptitude rounds test and why companies use them as filters
- Types covered — quantitative reasoning, logical reasoning, verbal ability, and data interpretation
- Topic-by-topic resource table with curated YouTube tutorial links and practice question links
- Topics include Number Series, Percentages, Profit and Loss, Averages, Ratio and Proportion, Mixture and Alligation, Time and Work, Time Speed and Distance, Permutations and Combinations, Ages Directions and Clocks, and Syllogism

**Just a Minute (JAM)**
- What JAM rounds assess and how candidates are scored
- Speaking structure, topic breadth, and fluency strategies
- Practice topic lists and delivery tips

**HR Interview**
- Common HR question types with guidance on how to approach each
- STAR method explanation with worked examples for behavioral questions
- Salary negotiation and offer discussion strategies

**MCQs**
- Subject-by-subject MCQ preparation table with curated YouTube links and practice links
- Subjects covered include C, C++, Java, Python, DBMS, OS, Computer Networks, SQL, Front End (HTML, CSS, JS), and Back End
- **AI MCQ Generator** — users provide any topic or paste their notes and the system generates a set of multiple-choice questions delivered in a gamified, timed quiz format; answers are scored at the end with a performance summary

**Technical Interview**
- What technical interview rounds assess and how evaluators approach candidates
- Common topics — Data Structures and Algorithms, System Design, Databases, Operating Systems, and Software Design Patterns
- Recommended platforms including HackerRank, LeetCode, GeeksforGeeks, CodeChef, Codeforces, AtCoder, Codecademy, freeCodeCamp, Exercism, TopCoder, and CSES Problem Set
- Curated resources including the LeetCode Blind 75 PDF

**Mock My Interview (MMI)**
- Users paste a full Job Description into the interface
- The system analyses the JD and extracts a set of Core Mastery Topics required for that role
- Generates a Predicted Question Bank with strategic model answers for each question
- Questions are presented one at a time with expandable answers for self-assessment and reflection

---

### 📙 Phase 3 — HireHub

HireHub is the job application phase. It guides candidates through the full application lifecycle — how to find opportunities, how to apply effectively, how to follow up, and how to handle rejection — all consolidated in a single hub.

---

#### 🔍 How Job Portals Help

Explains the role and advantages of job portals in the application process:

- Centralised access to thousands of listings across sectors and locations
- One-click resume submission to save time at scale
- Personalised job recommendations and real-time alerts for matching roles
- Built-in application tracking to monitor status across submissions
- Company insights including salary reports and employee reviews
- Profile scoring and optimisation tools for better visibility to recruiters

**Curated Job Portal Directory**

| Category | Platforms |
|---|---|
| **Global** | LinkedIn, Indeed, Glassdoor, Monster, CareerBuilder, SimplyHired |
| **Indian** | Naukri.com, Shine.com, TimesJobs, Freshersworld, PlacementIndia, WisdomJobs |
| **Startup & Tech** | Wellfound, HackerRank, CutShort, Instahyre, GeekTrust |
| **Internships** | Internshala, LetsIntern, Twenty19, HelloIntern |
| **Remote & Freelance** | Remote OK, We Work Remotely, Toptal, Upwork, Fiverr |

---

#### 📬 Proactive Outreach Strategies

For situations where applying through portals does not produce a response. Covers three outreach methods with full guidance and ready-to-use templates:

**Cold Emailing**
- What cold emailing is and when to deploy it in the job search
- How to identify and locate the right recipient — HR, hiring manager, or team lead
- Structure and tone guidance — subject line, opening, value proposition, call to action
- Ready-to-use cold email templates for different scenarios and role types

**LinkedIn Direct Messaging**
- How to identify and connect with the right people at target companies
- Message length, tone, and content guidance for a first-contact message
- Template messages for connection requests, informational conversations, and role enquiries

**Follow-Up Communication**
- When and how to send a follow-up after submitting an application
- Post-interview follow-up timing and phrasing to reinforce interest professionally
- After-rejection outreach — how to respond to a rejection in a way that keeps the door open for future opportunities
- Ready-to-use templates for each scenario

---

## 4️⃣ Methodology

The system follows a structured pipeline:

1. User inputs a raw Job Description, academic notes, or a custom preparation outline
2. NLP-based contextual tokenisation extracts domain-specific entities such as ETL workflows, Transformer architectures, JVM components, and RAG pipelines
3. Extracted entities define the semantic scope for roadmap and question generation
4. Structured prompts are sent to the LLM via the Groq inference API
5. The backend enforces strict JSON schema validation on all LLM responses
6. Schema-constrained outputs are rendered as roadmaps, MCQ sets, question banks, and mock sessions
7. Session state tracks user accuracy and topic mastery progression

```
User Input (JD / Notes / Topic)
        │
        ▼
  [NLP Entity Extraction]
  - Domain-specific tokenisation
  - Semantic scope definition
        │
        ▼
  [LLM Prompt Orchestration]
  - Llama 3 via Groq Cloud API
  - Structured prompt templates per module
        │
        ▼
  [Schema-Constrained JSON Validation]
  - MCQ formatting and scoring
  - Roadmap structuring
  - Question bank generation with strategic answers
        │
        ▼
  [Frontend Rendering]
  - Interactive mock simulation
  - Gamified MCQ quiz with real-time scoring
  - Session-tracked progress
```

---

## 5️⃣ System Architecture

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
- Modular phase structure allowing independent extension of each preparation stage

---

## 6️⃣ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JavaScript, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| LLM Inference | Llama 3 via Groq API |
| Database | MongoDB Atlas |
| Authentication | JWT |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 7️⃣ Dataset and Validation

**Role-Specific Job Descriptions**

The system was validated using a curated corpus of structured technical Job Descriptions across the following domains:

| Domain | Approximate Length |
|---|---|
| Machine Learning | 800–1500+ words |
| AI / LLM Roles | 800–1500+ words |
| Prompt Engineering | 800–1500+ words |
| Data Analytics | 800–1500+ words |
| Full-Stack / Software Development | 800–1500+ words |

**Technical Knowledge Clusters**

The roadmap and MCQ engine were evaluated against structured concept blocks including Java architecture (JVM internals, OOP principles), the Python ecosystem (Pandas, NumPy, applied workflows), LLM systems (Transformer architectures, RAG pipelines), and data engineering concepts (ETL and ELT workflows), ensuring topic alignment, semantic consistency, and structured coverage across all generated outputs.

---

## 8️⃣ Results

**JD Compression**
Transforms 1000+ word Job Descriptions into 5–8 Core Mastery Topics, a Predicted Question Bank with strategic model answers, and a stage-mapped preparation roadmap.

**Pattern Alignment**
Demonstrates consistent thematic mapping across ML, LLM systems, data engineering, and full-stack development domains.

**Performance**
- Near-zero latency via Groq inference engine
- Non-blocking AI orchestration across all modules
- Gamified MCQ quiz with real-time scoring and feedback
- Deterministic frontend rendering via JSON schema enforcement

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

Serve the `Frontend/` folder using a local server such as VS Code Live Server.

Entry point: `Frontend/login.html`

Update the API base URL in `Frontend/js/config.js`:

```
http://localhost:10000
```

---

## 🔟 Limitations

- **API Rate Constraints** — System throughput depends on the underlying Groq LLM provider rate limits
- **Probabilistic Variability** — Minor output variations may occur due to the non-deterministic nature of generative models
- **Cold Start Delay** — Backend hosted on Render's free tier may experience initial latency due to server wake-up time after inactivity
- **Domain Coverage** — Validation was primarily conducted on technical roles; non-technical JD formats have not been fully evaluated
- **No Resume Parsing** — The buzzword generator accepts raw JD text; direct PDF resume upload and parsing is not yet supported
- **Static Resource Links** — Aptitude and MCQ resource links are curated manually and require periodic updates to remain current
- **No Session Persistence** — Preparation progress and quiz scores are not currently persisted across browser sessions

---

## 1️⃣1️⃣ Future Work

- [ ] **Resume PDF parsing** — allow users to upload their existing resume as a PDF and receive instant gap analysis against a target Job Description, identifying missing keywords and structural weaknesses

- [ ] **Adaptive MCQ difficulty** — dynamically adjust question difficulty within the AI MCQ generator based on the user's running accuracy score during the quiz session, increasing challenge as performance improves

- [ ] **Personalised company prep plans** — extend PrepMaster with AI-generated, company-specific preparation timelines based on the user's current skill level, target role, and application deadline

- [ ] **Interview experience database** — crowd-source and verify real interview experiences from users across companies and roles, creating a searchable repository of actual questions asked in recent hiring cycles to complement the AI-generated question bank

- [ ] **Application tracker** — a built-in Kanban-style board where users log the roles they have applied to, track application status, set follow-up reminders, and store the outreach messages sent per company

- [ ] **Vector memory for session continuity** — integrate a vector database to maintain semantic memory of what a user has already studied across sessions, enabling the platform to avoid repetition and surface genuinely new preparation material

- [ ] **Cross-session analytics dashboard** — visualise preparation progress over time, track MCQ accuracy trends per subject, identify persistent weak areas, and surface recommended next steps based on cumulative session history

- [ ] **End-to-end voice mock interview** — integrate a voice-based mock interview module with real-time speech-to-text, LLM-evaluated responses, and a post-session performance report directly within PrepSphere, removing the need for a separate interview simulation tool

- [ ] **Domain-specific fine-tuned model** — fine-tune a smaller open-source model on a role-specific interview corpus to improve response determinism, reduce hallucination in question generation, and produce more consistent roadmap outputs

- [ ] **Microservices migration** — decompose the monolithic Express backend into independently deployable services per phase, enabling horizontal scaling of high-traffic modules such as MMI and the AI MCQ generator

---

## 1️⃣2️⃣ Conclusion

PrepSphere addresses a clear and widespread problem: placement preparation is scattered, unstructured, and overwhelming for most candidates. By consolidating every stage of the journey — from learning roadmaps and resume building through structured interview practice, mock simulation, and job application strategy — into a single, phased platform, PrepSphere removes the need to juggle multiple disconnected tools. The emphasis on schema-constrained AI generation, gamified practice, and actionable outreach templates reflects a design philosophy centred on practical outcomes rather than information volume. The platform is built to be extended and represents a strong foundation for a fully personalised, adaptive career readiness system.

---

*Built by [Yamini Reddy](https://github.com/yamireddy04)*
