import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    stack?: string;
  };
}
// handle not found error
const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    const error: CustomError = new Error("requested resource not found");
    error.statusCode = 404;
    next(error);
};


// Error handler middleware
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || 'Internal Server Error';

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  };

  res.status(statusCode).json(errorResponse);
};


export {  notFoundHandler, errorHandler };