const { Queue } = require("bullmq");
const { createRedisConnection } = require("./redisConnection");
const connection = createRedisConnection();
const queues = {
  roadmap: new Queue("prepsphere:ai:roadmap", {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 10000 }, 
      removeOnComplete: false, 
      removeOnFail: false,
    },
  }),

  buzzwords: new Queue("prepsphere:ai:buzzwords", {
    connection,
    defaultJobOptions: {
      attempts: 4,
      backoff: { type: "exponential", delay: 3000 }, 
      removeOnComplete: false,
      removeOnFail: false,
    },
  }),

  interview: new Queue("prepsphere:ai:interview", {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 8000 },
      removeOnComplete: false,
      removeOnFail: false,
    },
  }),

  quiz: new Queue("prepsphere:ai:quiz", {
    connection,
    defaultJobOptions: {
      attempts: 5, 
      backoff: { type: "exponential", delay: 4000 },
      removeOnComplete: false,
      removeOnFail: false,
    },
  }),
};

module.exports = queues;