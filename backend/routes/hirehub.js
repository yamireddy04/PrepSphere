const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const axios = require("axios");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let jobCache = { data: [], fetchedAt: null };
const CACHE_TTL = 5 * 60 * 1000;

async function fetchLiveJobs(queries) {
  if (!process.env.JSEARCH_API_KEY) return [];

  const results = [];
  for (const q of queries) {
    try {
      const res = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: {
          query: q + " fresher entry level India",
          page: "1",
          num_pages: "1",
          date_posted: "week",
          country: "in",
          employment_types: "FULLTIME,INTERN",
        },
        headers: {
          "X-RapidAPI-Key": process.env.JSEARCH_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        timeout: 8000,
      });

      const jobs = (res.data?.data || []).filter((j) => {
        const title = (j.job_title || "").toLowerCase();
        const senior = ["senior", "lead", "principal", "staff ", "director", "manager", "vp ", "head of", "5+ years", "7+ years"];
        return !senior.some((w) => title.includes(w));
      });

      results.push(...jobs);
    } catch (e) {
      console.error(`[HireHub JSearch] Query "${q}" failed:`, e.message);
    }
  }

  const seen = new Set();
  return results.filter((j) => {
    if (seen.has(j.job_id)) return false;
    seen.add(j.job_id);
    return true;
  });
}

function mapJob(j) {
  const hue = ((j.employer_name || "X").charCodeAt(0) * 13 + 40) % 360;
  return {
    id: j.job_id || Math.random().toString(36).slice(2),
    title: j.job_title || "Software Engineer",
    company: j.employer_name || "Company",
    companyInitial: (j.employer_name || "?").slice(0, 2).toUpperCase(),
    logoColor: `hsl(${hue},55%,48%)`,
    companyLogo: j.employer_logo || null,
    location: j.job_city ? `${j.job_city}, India` : "India",
    locationType: j.job_is_remote ? "Remote" : "On-site",
    type: (j.job_employment_type || "").toLowerCase().includes("intern") ? "Internship" : "Full-time",
    domain: "Tech",
    companyType: detectCompanyType(j.employer_name || ""),
    experience: "0–1 years",
    salary: formatSalary(j.job_min_salary, j.job_max_salary, j.job_salary_currency),
    postedAt: j.job_posted_at_datetime_utc || new Date().toISOString(),
    postedTime: timeAgo(j.job_posted_at_datetime_utc),
    description: (j.job_description || "").slice(0, 300).trim() + "…",
    skills: extractSkills(j.job_title + " " + (j.job_description || "")),
    applyUrl: j.job_apply_link || j.job_google_link || "#",
    source: "Live",
    fitScore: null, 
    matchReason: null,
    demand: (j.job_apply_quality_score || 0) > 0.7,
  };
}

function detectCompanyType(name) {
  const mncs = ["google","microsoft","amazon","meta","apple","adobe","oracle","ibm","cisco","nvidia","tcs","infosys","wipro","accenture","capgemini","cognizant","deloitte","kpmg","pwc","ey ","ernst","flipkart","samsung","intel","qualcomm"];
  const n = name.toLowerCase();
  if (mncs.some((m) => n.includes(m))) return "MNC";
  return "Startup";
}

function formatSalary(min, max, currency) {
  if (!min && !max) return null;
  const sym = currency === "INR" ? "₹" : (currency || "") + " ";
  if (min && max) return `${sym}${(min / 100000).toFixed(1)}–${(max / 100000).toFixed(1)} LPA`;
  if (min) return `${sym}${(min / 100000).toFixed(1)}+ LPA`;
  return null;
}

function timeAgo(iso) {
  if (!iso) return "Recently";
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

function extractSkills(text) {
  const known = ["Python","JavaScript","TypeScript","React","Node","Java","Go","C++","C#","SQL","MySQL","PostgreSQL","MongoDB","Redis","AWS","Azure","GCP","Docker","Kubernetes","ML","AI","TensorFlow","PyTorch","DSA","Figma","Design","Git","REST","Spring","Django","FastAPI","Ruby","Kotlin","Flutter","Android","iOS","Swift","DevOps","Linux","Excel","Communication","Marketing","Research","Tableau","Power BI","Spark","Hadoop","Scala","PHP","Vue","Angular"];
  const t = (text || "").toLowerCase();
  return known.filter((s) => t.includes(s.toLowerCase())).slice(0, 7);
}

async function analyzeResumeWithJobs(resumeText, rawJobs) {
  const jobSummaries = rawJobs.slice(0, 30).map((j, i) =>
    `${i}. ${j.title} at ${j.company} (${j.location}) | Skills: ${j.skills.join(", ")} | Type: ${j.type}`
  ).join("\n");

  const systemPrompt = `You are an elite AI talent analyst for India's fresher job market.
Given a resume and a list of real job listings, you must:
1. Extract candidate profile
2. Score every job 0-100 based on actual skill match
3. Write a 2-sentence match reason for each job
4. Provide career insights

RESPOND ONLY WITH VALID JSON — no markdown, no backticks, no commentary.

{
  "candidate": {
    "name": "string",
    "topRoles": ["string"],
    "skills": ["string"],
    "education": "string",
    "strengthSummary": "2-3 sentences",
    "profileScore": 0-100
  },
  "scoredJobs": [
    { "index": 0, "fitScore": 0-100, "matchReason": "2 sentences" }
  ],
  "insights": {
    "strengths": ["string"],
    "skillGaps": ["string"],
    "actionPlan": ["string"],
    "recommendedRoles": ["string"]
  }
}`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 4096,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `RESUME:\n${resumeText.slice(0, 6000)}\n\nJOB LISTINGS:\n${jobSummaries}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content || "";
  const clean = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const match = clean.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("AI returned invalid JSON");
  return JSON.parse(match[0]);
}

async function generateJobsFromGroq(resumeText) {
  const systemPrompt = `You are an elite AI talent analyst for India's fresher job market.
Analyze the resume and generate 20+ realistic fresher job opportunities from real India companies.

RULES:
- Use ONLY real company career page URLs
- Only India-based fresher/entry-level roles (0-1 yr exp)
- Spread across: MNCs (TCS, Infosys, Wipro, Capgemini, Google, Microsoft, Amazon, Accenture), startups (Razorpay, Zepto, CRED, Groww, PhonePe, Swiggy, Zomato, Freshworks, Zoho, Flipkart, BrowserStack, Postman)
- All applyUrl must be real official career pages

RESPOND ONLY WITH VALID JSON:
{
  "candidate": {
    "name": "string",
    "topRoles": ["string"],
    "skills": ["string"],
    "education": "string",
    "strengthSummary": "2-3 sentences",
    "profileScore": 0-100
  },
  "jobs": [
    {
      "id": "unique",
      "title": "string",
      "company": "string",
      "companyInitial": "2 chars",
      "logoColor": "#hexcolor",
      "location": "City, India",
      "type": "Internship|Full-time",
      "experience": "0 years|0-1 years",
      "salary": "string or null",
      "skills": ["string"],
      "postedTime": "e.g. 2 days ago",
      "fitScore": 0-100,
      "matchReason": "2 sentences",
      "applyUrl": "real official URL",
      "demand": false
    }
  ],
  "insights": {
    "strengths": ["string"],
    "skillGaps": ["string"],
    "actionPlan": ["string"],
    "recommendedRoles": ["string"]
  }
}`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 6000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Analyze this resume:\n\n${resumeText.slice(0, 6000)}` },
    ],
  });

  const raw = completion.choices[0]?.message?.content || "";
  const clean = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const match = clean.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("AI returned invalid JSON");
  return JSON.parse(match[0]);
}

router.post("/analyze", async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText || resumeText.trim().length < 50) {
    return res.status(400).json({ error: "Resume text is too short or missing." });
  }

  try {
    const hasJSearch = !!process.env.JSEARCH_API_KEY;

    if (hasJSearch) {
      console.log("[HireHub] Fetching live jobs from JSearch…");

      const queries = ["software engineer", "data analyst", "frontend developer", "backend developer", "business analyst", "product analyst", "UI UX designer", "data scientist intern", "software developer trainee"];

      const rawJobs = await fetchLiveJobs(queries);
      console.log(`[HireHub] Fetched ${rawJobs.length} live jobs`);

      const mappedJobs = rawJobs.map(mapJob);

      const aiResult = await analyzeResumeWithJobs(resumeText, mappedJobs);

      const scoredJobs = aiResult.scoredJobs || [];
      const finalJobs = mappedJobs
        .map((job, i) => {
          const scored = scoredJobs.find((s) => s.index === i);
          return {
            ...job,
            fitScore: scored?.fitScore ?? 50,
            matchReason: scored?.matchReason ?? null,
          };
        })
        .sort((a, b) => b.fitScore - a.fitScore);

      return res.json({
        candidate: aiResult.candidate,
        jobs: finalJobs,
        insights: aiResult.insights,
        source: "live",
        total: finalJobs.length,
      });

    } else {
      console.log("[HireHub] No JSearch key, using Groq-generated jobs…");
      const result = await generateJobsFromGroq(resumeText);
      return res.json({ ...result, source: "ai", total: (result.jobs || []).length });
    }

  } catch (err) {
    console.error("[HireHub] Error:", err.message);
    return res.status(500).json({ error: err.message || "Analysis failed." });
  }
});

module.exports = router;