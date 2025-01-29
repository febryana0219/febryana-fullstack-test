import express, { RequestHandler } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { UserController } from "../controller/userController";
import { CategoryController } from "../controller/categoryController";
import { ItemController } from "../controller/itemController";

// Declare the apiRouter as an express.Router instance
export const apiRouter = express.Router();

// Apply the authMiddleware to protect all routes below
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/users/me", UserController.get as RequestHandler);
apiRouter.delete("/users/me", UserController.logout as RequestHandler);

// Category API
apiRouter.post("/categories/create", CategoryController.create as RequestHandler);
apiRouter.get("/categories", CategoryController.getAll as RequestHandler);
apiRouter.get("/categories/:id(\\d+)", CategoryController.get as RequestHandler);
apiRouter.put("/categories/:id(\\d+)", CategoryController.update as RequestHandler);
apiRouter.delete("/categories/:id(\\d+)", CategoryController.remove as RequestHandler);

// Item API
apiRouter.post("/items/create", ItemController.create as RequestHandler);
apiRouter.get("/items", ItemController.getAll as RequestHandler);
apiRouter.get("/items/:id(\\d+)", ItemController.get as RequestHandler);
apiRouter.put("/items/:id(\\d+)", ItemController.update as RequestHandler);
apiRouter.delete("/items/:id(\\d+)", ItemController.remove as RequestHandler);