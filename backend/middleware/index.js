const authMiddleware = require("./authMiddleware");
const errorMiddleware = require("./errorMiddleware");
const cacheMiddleware = require("./cacheMiddleware");

module.exports = {
  authMiddleware,
  errorMiddleware,
  cacheMiddleware,
};