import express from "express";
import cors from "cors";
import { publicRouter } from "../route/publicApi";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { apiRouter } from "../route/api";

export const web = express();

// Middleware CORS
web.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-ACCESS-TOKEN", "Authorization"],
}));

web.use(express.json());
web.use("/api", publicRouter);
web.use("/api", apiRouter);

// Middleware error handling
web.use(errorMiddleware);
