import { Request, Response, NextFunction } from "express";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../model/categoryModel";
import { CategoryService } from "../service/categoryService";
import { UserRequest } from "../type/userRequest";
import { logger } from "../config/logging";

export class CategoryController {
  // Create a category
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const response = await CategoryService.create(req.user!, request); // Pass req.user
      logger.debug("response : " + JSON.stringify(response));

      res.status(201).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  // Get all categories
  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getAll(req.user!); // Pass req.user
      logger.debug("response : " + JSON.stringify(response));

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  // Get category by ID
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const categoryId = Number(req.params.id);
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      const response = await CategoryService.get(req.user!, categoryId); // Pass req.user and categoryId
      logger.debug("response : " + JSON.stringify(response));

      if (!response) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  // Update a category
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
      request.id = Number(req.params.id);

      if (isNaN(request.id)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      const response = await CategoryService.update(req.user!, request); // Pass req.user
      logger.debug("response : " + JSON.stringify(response));

      if (!response) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  // Remove a category
  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      const response = await CategoryService.remove(req.user!, id); // Pass req.user and id
      logger.debug("response : " + JSON.stringify(response));

      if (!response) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({
        data: "Category removed successfully"
      });
    } catch (e) {
      next(e);
    }
  }
}
