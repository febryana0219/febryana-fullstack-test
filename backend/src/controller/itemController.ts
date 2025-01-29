import { Request, Response, NextFunction } from "express";
import { CreateItemRequest, UpdateItemRequest } from "../model/itemModel";
import { ItemService } from "../service/itemService";
import { UserRequest } from "../type/userRequest";
import { logger } from "../config/logging";

export class ItemController {
  // Create a item
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateItemRequest = req.body as CreateItemRequest;
      const response = await ItemService.create(req.user!, request); // Pass req.user
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
      const response = await ItemService.getAll(req.user!); // Pass req.user
      logger.debug("response : " + JSON.stringify(response));

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  // Get item by ID
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const itemId = Number(req.params.id);
      if (isNaN(itemId)) {
        return res.status(400).json({ error: "Invalid item ID" });
      }

      const response = await ItemService.get(req.user!, itemId); // Pass req.user and itemId
      logger.debug("response : " + JSON.stringify(response));

      if (!response) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  // Update a item
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateItemRequest = req.body as UpdateItemRequest;
      request.id = Number(req.params.id);

      if (isNaN(request.id)) {
        return res.status(400).json({ error: "Invalid item ID" });
      }

      const response = await ItemService.update(req.user!, request); // Pass req.user
      logger.debug("response : " + JSON.stringify(response));

      if (!response) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  // Remove a item
  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid item ID" });
      }

      const response = await ItemService.remove(req.user!, id); // Pass req.user and id
      logger.debug("response : " + JSON.stringify(response));

      if (!response) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json({
        data: "Item removed successfully"
      });
    } catch (e) {
      next(e);
    }
  }
}
