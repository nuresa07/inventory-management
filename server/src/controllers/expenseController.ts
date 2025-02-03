import { Request, Response } from "express";
import prisma from "../prisma";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

export const getExpensesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc"
      }
    })
    const expenseByCategorySummary = expenseByCategoryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }))
    res.json(expenseByCategorySummary)
  } catch (error) {
    prismaErrorHandler(error, res, "Error retrieving expense by category");
  }
}