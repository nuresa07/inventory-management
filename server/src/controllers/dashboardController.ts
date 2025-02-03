import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma";

export const getDashboardMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    // Tujuan: Untuk menampilkan produk yang paling banyak tersedia di gudang.
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc"
      }
    })

    // Tujuan: Untuk memberikan ringkasan data penjualan terbaru.
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    })

    // Tujuan: Untuk memberikan ringkasan data pembelian terbaru.
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    })

    // Tujuan: Untuk memberikan ringkasan data pengeluaran terbaru.
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    })

    // Tujuan: Untuk memberikan data mentah pengeluaran berdasarkan kategori. Mengambil data pengeluaran terbaru berdasarkan kategori
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    })

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString()
    }))
    // amount = jumlah

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary
    })

  } catch (error) {
    res.status(500).json({ error: "error retrieving dashboard metrics" });
  }
}