class ApiError extends Error {

    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }

    static badRequestError(message) {
        return new ApiError(message, 400);
    }

    static internalError(message) {
        return new ApiError(message, 500);
    }

}

module.exports = ApiError;