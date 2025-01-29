import express from "express";
import { UserController } from "../controller/userController";

export const publicRouter = express.Router();
publicRouter.post("/users/register", UserController.register);
publicRouter.post("/users/login", UserController.login);
