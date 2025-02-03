import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

import prisma from "../prisma";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString()
    // if you use pagination, you must using this code: {
    // const page = parseInt(req.query.page as string) || 1
    // const limit = parseInt(req.query.limit as string) || 10
    // }

    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search
        }
      },
      // pagination:{
      // skip
      // take: limit
      // }
    })

    // const totalCount = await prisma.products.count({
    //   where: {
    //     name: {
    //       contains: search
    //     }
    //   }
    // })

    res.json(products);
  } catch (error) {
    prismaErrorHandler(error, res, "Error Retrieving products");
  }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, rating, stockQuantity } = req.body;
    const product = await prisma.products.create({
      data: {
        name, price, rating, stockQuantity
      }
    })
    res.status(201).json(product);
  } catch (error) {
    prismaErrorHandler(error, res, "Error creating product");
  }
}