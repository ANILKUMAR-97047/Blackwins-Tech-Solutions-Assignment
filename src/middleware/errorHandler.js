const { errorResponse } = require('../utils/response.util');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return errorResponse(res, 400, 'Validation Error', err.message);
    }

    if (err.name === 'CastError') {
        return errorResponse(res, 400, 'Invalid ID format');
    }

    return errorResponse(res, 500, 'Internal Server Error');
};

module.exports = errorHandler;