import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import dashboardRoutes from './routes/dasboardRoutes'
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import expenseRoutes from "./routes/expenseRouters"
import prisma from './prisma'

// configurations
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.use("/dashboard", dashboardRoutes)
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes)

// SERVER 
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port: ${port}`);
});

// Handle termination signal (SIGINT, SIGTERM)
const shutdown = async (signal: string) => {
  console.log(`${signal} received. Closing Prisma connection...`);
  try {
    await prisma.$disconnect();
    server.close(() => {
      console.log("Server terminated gracefully.");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Handle uncaught exceptions and rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});
