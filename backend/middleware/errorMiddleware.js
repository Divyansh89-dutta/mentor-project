const errorMiddleware = (err, req, res, next) => {
    console.error("🔥 Error:", err);  // Add this to log the full error in the console
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  module.exports = errorMiddleware;
  