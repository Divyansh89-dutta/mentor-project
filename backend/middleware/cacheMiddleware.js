const { redisClient } = require("../config");

const cacheMiddleware = async (req, res, next) => {
  const cacheKey = JSON.stringify(req.body);

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit!");
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log("Cache miss...");
    
    const originalSend = res.send.bind(res);

    res.send = (body) => {
      redisClient.setEx(cacheKey, 3600, JSON.stringify(body)); 
      originalSend(body);
    };

    next();
  } catch (error) {
    console.error("Redis cache error:", error.message);
    next();
  }
};

module.exports = cacheMiddleware;
