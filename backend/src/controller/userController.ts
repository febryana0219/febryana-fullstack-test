import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/userModel";
import { UserService } from "../service/userService";
import { UserRequest } from "../type/userRequest";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }
  
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }
  
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error("User not found");
      }

      const response = await UserService.get(req.user);

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }
  
  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error("User not found");
      }

      await UserService.logout(req.user);

      res.status(200).json({
        message: "Logout successful"
      });
    } catch (e) {
      next(e);
    }
  }
}
