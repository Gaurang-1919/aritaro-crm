const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.error || [],
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });
};

export { notFound, errorHandler };
