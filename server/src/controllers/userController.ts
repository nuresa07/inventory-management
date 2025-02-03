import { Request, Response } from "express";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";
import prisma from "../prisma";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    prismaErrorHandler(error, res, "Error retrieving users");
  }
};
