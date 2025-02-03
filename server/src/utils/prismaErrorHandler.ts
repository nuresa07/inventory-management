import { Response } from "express";
import { Prisma } from "@prisma/client";

export const prismaErrorHandler = (error: any, res: Response, mess: string): void => {
  const errorMapping: Record<string, { status: number; message: string }> = {
    P2002: { status: 400, message: "Duplicate entry error" },
    P2025: { status: 404, message: "Record not found" },
  };

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const knownError = errorMapping[error.code];
    if (knownError) {
      res.status(knownError.status).json({
        message: knownError.message,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    } else {
      res.status(500).json({
        message: "Database error",
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  } else {
    res.status(500).json({
      message: `Unexpected error\n ${mess}`,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
