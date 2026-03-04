# 🚀 PrepSphere: AI-Powered Interview Intelligence Platform

---

## 🧾 Abstract

PrepSphere is an AI-powered end-to-end interview preparation platform that supports the complete interview lifecycle — from roadmap selection and structured learning to job application support, mock simulation, and post-interview reflection. Unlike traditional tools that isolate resume guidance, question banks, or interview practice, PrepSphere integrates these components into a unified, structured workflow.

Using Large Language Models (LLMs), NLP-driven entity extraction, and schema-constrained generation pipelines, the platform converts unstructured inputs into actionable mastery clusters, targeted mock assessments, and guided preparation modules.

The system emphasizes deterministic output structuring over raw generative responses, ensuring frontend-renderable and evaluation-safe AI outputs within an adaptive preparation environment.

---

## 1. 🧩 Problem Statement

Interview preparation can be unclear and unstructured. While candidates may have studied relevant topics, it is often difficult to determine:

* How a Job Description maps to specific interview stages
* Which topics are most important for a given role
* How to structure preparation efficiently

This misalignment can lead to scattered effort and inefficient preparation strategies.

PrepSphere addresses this by extracting role-specific signals from Job Descriptions and converting them into organized roadmaps, structured question sets, and simulated mock workflows.

---

## 2. 📊 Dataset & Validation

The system was validated using a curated corpus consisting of structured technical Job Descriptions and concept blocks.

### Role-Specific Job Descriptions

The dataset included JDs across domains such as:

* Machine Learning
* AI-focused roles
* Prompt Engineering
* Data Analytics
* Full-Stack / Software Development

Each JD ranged from 800–1500+ words and included technical stacks, system expectations, and domain responsibilities.

### Technical Knowledge Clusters

The roadmap and MCQ engine were evaluated against structured concept blocks including:

* Java architecture (JVM internals, OOP principles)
* Python ecosystem (Pandas, NumPy, applied workflows)
* LLM systems (Transformer architectures, RAG pipelines)
* Data engineering concepts (ETL / ELT workflows)

This ensured topic alignment, semantic consistency, and structured coverage across generated outputs.

---

## 3. 🧠 Technical Stack & System Architecture

PrepSphere follows a **decoupled architecture**, separating the intelligence layer from the client interface to support modularity and scalable deployment.

---

### 🏗 Architecture Overview

Client (Vercel) → Express API (Render) → Llama 3 via Groq API → MongoDB Atlas

The frontend communicates with a decoupled backend that orchestrates structured LLM prompts and enforces schema-constrained JSON responses before rendering interactive preparation modules.

---

### Core Intelligence & Backend

#### LLM Orchestration

* Llama 3 via Groq Cloud API
* Low-latency inference pipeline
* Structured prompt templates for roadmap and MCQ generation

#### Backend Environment

* Node.js
* Express.js

#### Database & Authentication

* MongoDB Atlas
* JWT-based authentication
* Session persistence and user progress tracking

#### Hosting

* Render (auto-deployed via GitHub integration)

---

### Frontend System

#### Framework

* Vanilla JavaScript
* HTML5
* CSS3

#### Routing

* Custom `vercel.json` rewrite configuration for clean URL navigation

#### UI & Experience

* Studio-themed dark interface
* Responsive component architecture
* Focus-oriented layout optimized for structured preparation sessions

#### Hosting

* Vercel (Edge Network Distribution)

---

## 4. ⚙️ Methodology

#### Data Ingestion

Accepts raw text from:

* Job Descriptions
* Academic notes
* Custom preparation outlines

---

#### Contextual Tokenization

NLP-based parsing extracts domain-specific entities such as:

* ETL workflows
* Transformer architectures
* JVM components
* RAG pipelines

These extracted entities define the semantic scope for roadmap and question generation.

---

#### Schema-Constrained Generation

The backend enforces strict JSON schema validation to ensure:

* Structured MCQ formatting
* Consistent roadmap outputs
* Deterministic frontend rendering
* Controlled and evaluation-safe responses

---

#### State Persistence

Session management tracks:

* User accuracy
* Topic mastery progression
* Preparation continuity

---

## 5. 📈 Results

### JD Compression

Transforms 1000+ word Job Descriptions into:

* 5–8 Core Mastery Topics
* Structured Predicted Question Banks

---

### Pattern Alignment

Demonstrates consistent thematic mapping across diverse technical domains.

---

### Performance Optimization

* Near-zero latency via Groq inference engine
* Non-blocking AI orchestration
* Smooth interactive mock simulation flow

---

## 6. Limitations

#### API Rate Constraints

Performance depends on the throughput limits of the underlying LLM provider.

#### Probabilistic Variability

Minor variations may occur due to the non-deterministic nature of generative models.

#### Cold Start Delay

Backend hosted on Render’s free tier may experience initial latency due to server wake-up time.

---

## 7. 🌐 Live Deployment

**Live Application**
https://prepsphere000146.vercel.app/

**Backend API**
[https://prepsphere-o7wh.onrender.com](https://prepsphere-o7wh.onrender.com)

---

## 8. 🛠 How to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/your-username/PrepSphere.git
cd PrepSphere
```

---

### 2. Backend Setup

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

---

### 3. Frontend Setup

Since the project is decoupled:

* Serve the `Frontend` folder using a local server (e.g., VS Code Live Server)
* Entry point:

```
Frontend/login.html
```

For local testing, update:

```
Frontend/js/config.js
```

Set API base URL to:

```
http://localhost:10000
```

---

## 9. 🔮 Future Work

* Integration of vector databases for persistent semantic memory
* Adaptive difficulty scaling based on user performance
* Topic mastery analytics dashboard
* Migration toward a microservices architecture for scalable assessment modules
* Domain-specific fine-tuned model for improved response determinism

---

## 10. 📌 Summary

PrepSphere demonstrates how structured LLM orchestration, schema-constrained generation, and modular web architecture can be combined to build an intelligent, centralized interview preparation system. The project emphasizes controlled AI integration, deterministic rendering pipelines, and scalable deployment design.
