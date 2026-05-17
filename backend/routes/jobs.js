const router  = require("express").Router();
const jwt     = require("jsonwebtoken");
const Job     = require("../models/Job");
function softAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            req.user = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
        } catch (_) {
        }
    }
    next();
}

router.get("/:jobId", softAuth, async (req, res) => {
    try {
        const job = await Job.findOne(
            { jobId: req.params.jobId },
            { jobId: 1, status: 1, result: 1, error: 1, attempts: 1, createdAt: 1, userId: 1, _id: 0 }
        );

        if (!job) return res.status(404).json({ error: "Job not found" });
        if (req.user && job.userId && job.userId !== String(req.user.id)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;