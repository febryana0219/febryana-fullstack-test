import { ItemResponse, CreateItemRequest, UpdateItemRequest, toItemResponse } from "../model/itemModel";
import { Validation } from './../validation/validation';
import { ItemValidation } from "../validation/itemValidation";
import { prismaClient } from "../config/database";
import { Item, User } from "@prisma/client";
import { ResponseError } from "../error/responseError";

export class ItemService {
  static async create(user: User, request: CreateItemRequest) : Promise<ItemResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    let createRequest = Validation.validate(ItemValidation.CREATE, request);
  
    const item = await prismaClient.item.create({
      data: {
        name: createRequest.name,
        qty: createRequest.qty,
        price: createRequest.price,
        unit: createRequest.unit,
        category_id: createRequest.category_id,
        created_by: user.id  
      },
      include: {
        category: true,
        createdBy: { select: { name: true } },
        updatedBy: { select: { name: true } }
      }
    });
  
    return toItemResponse(item);
  }
  
  static async getAll(user: User): Promise<ItemResponse[]> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    try {
      const items = await prismaClient.item.findMany({
        include: {
          category: true,
          createdBy: { select: { name: true } },
          updatedBy: { select: { name: true } }
        }
      });
  
      return items.map(toItemResponse); 
    } catch (error) {
      throw new ResponseError(404, "Item not found!");
    }
  }
  
  static async checkItemExists(id: number) : Promise<Item> {
    const item = await prismaClient.item.findFirst({
      where: {
        id: id
      }
    });
    
    if (!item) {
      throw new ResponseError(404, "Item not found!");  
    }
    
    return item;
  }
  
  static async get(user: User, id: number) : Promise<ItemResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    const item = await this.checkItemExists(id);
  
    return toItemResponse(item);
  }
  
  static async update(user: User, request: UpdateItemRequest) : Promise<ItemResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    let updateRequest = Validation.validate(ItemValidation.UPDATE, request);
    await this.checkItemExists(request.id);
      
    const updatedItem = await prismaClient.item.update({
      where: {
        id: updateRequest.id  
      },
      data: {
        name: updateRequest.name,
        qty: updateRequest.qty,
        price: updateRequest.price,
        unit: updateRequest.unit,
        category_id: updateRequest.category_id,
        updated_by: user.id,
        updated_at: new Date()  
      },
      include: {
        category: true,
        createdBy: { select: { name: true } },
        updatedBy: { select: { name: true } }
      }
    });
  
    return toItemResponse(updatedItem);
  }
  
  static async remove(user: User, id: number) : Promise<ItemResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    await this.checkItemExists(id);
  
    const item = await prismaClient.item.delete({
      where: {
        id: id  
      }
    });
  
    return toItemResponse(item);
  }
}