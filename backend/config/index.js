const connectDB = require("./db");
const { redisClient, connectRedis } = require("./redis");

module.exports = { connectDB, redisClient, connectRedis };
