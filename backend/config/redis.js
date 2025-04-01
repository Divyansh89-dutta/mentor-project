// const redis = require("redis");

// const redisClient = redis.createClient({
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//   },
//   password: process.env.REDIS_PASSWORD || undefined,
// });

// redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

// const connectRedis = async () => {
//   try {
//     await redisClient.connect();
//     console.log("✅ Redis connected...");
//   } catch (error) {
//     console.error("❌ Redis connection failed:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = { redisClient, connectRedis };
const Redis = require("ioredis");

let redisInstance = null; 

function getRedisInstance() {
  if (!redisInstance) {
    redisInstance = new Redis({
      host: "redis-16399.c14.us-east-1-2.ec2.redns.redis-cloud.com",
      port: 16399, 
      password: "WR3LLKyDcKeajmLQTn7Oz8u0XCOGt5PB",
    });

    redisInstance.on("connect", () => {
      console.log("Redis Connected");
    });

    redisInstance.on("error", (err) => {
      console.error("Redis Error:", err);
    });
  }
  return redisInstance;
}

module.exports = getRedisInstance;
