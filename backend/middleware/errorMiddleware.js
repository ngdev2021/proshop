const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
    }
;

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "" : err.stack,
        }
    );
    };

    // check for mongoose bad object id error

    if(err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(stausCode).json({
        success: false,
        error: error.message || 'Server Error'
    });
    next();




export {notFound, errorHandler};