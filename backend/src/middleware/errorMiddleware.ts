import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/responseError";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  // Log error untuk debugging
  console.error("Error middleware caught an error:", error);
  
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: "Validation Error",
      details: error.errors.map(err => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }
  
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message || "An error occurred",
    });
    return;
  }
  
  res.status(500).json({
    errors: error.message || "Internal Server Error",
  });
};