const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    queue: {
      type: String,
      required: true,
      enum: [
        "prepsphere-ai-roadmap",
        "prepsphere-ai-buzzwords",
        "prepsphere-ai-interview",
        "prepsphere-ai-quiz",
      ],
    },
    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
      index: true,
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model("Job", jobSchema);