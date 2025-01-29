import { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest, toCategoryResponse } from "../model/categoryModel";
import { Validation } from './../validation/validation';
import { CategoryValidation } from "../validation/categoryValidation";
import { prismaClient } from "../config/database";
import { Category, User } from "@prisma/client";
import { ResponseError } from "../error/responseError";

export class CategoryService {
  static async create(user: User, request: CreateCategoryRequest) : Promise<CategoryResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    let createRequest = Validation.validate(CategoryValidation.CREATE, request);
  
    const category = await prismaClient.category.create({
      data: {
        name: createRequest.name,  
        created_by: user.id  
      },
      include: {
        createdBy: { select: { name: true } },
        updatedBy: { select: { name: true } }
      }
    });
  
    return toCategoryResponse(category);
  }
  
  static async getAll(user: User): Promise<CategoryResponse[]> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    try {
      const categories = await prismaClient.category.findMany({
        include: {
          createdBy: { select: { name: true } },
          updatedBy: { select: { name: true } }
        }
      });
  
      return categories.map(toCategoryResponse); 
    } catch (error) {
      throw new ResponseError(404, "Category not found!");
    }
  }
  
  static async checkCategoryExists(id: number) : Promise<Category> {  
    const category = await prismaClient.category.findFirst({  
      where: {  
        id: id  
      }
    });
    
    if (!category) {  
      throw new ResponseError(404, "Category not found!");
    }
    
    return category;
  }
  
  static async get(user: User, id: number) : Promise<CategoryResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    const category = await this.checkCategoryExists(id);
  
    return toCategoryResponse(category);
  }
  
  static async update(user: User, request: UpdateCategoryRequest) : Promise<CategoryResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    let updateRequest = Validation.validate(CategoryValidation.UPDATE, request);
    await this.checkCategoryExists(request.id);
      
    const updatedCategory = await prismaClient.category.update({
      where: {
        id: updateRequest.id  
      },  
      data: {
        name: updateRequest.name,  
        updated_by: user.id,  
        updated_at: new Date()  
      },
      include: {
        createdBy: { select: { name: true } },
        updatedBy: { select: { name: true } }
      }
    });
  
    return toCategoryResponse(updatedCategory);
  }
  
  static async remove(user: User, id: number) : Promise<CategoryResponse> {
    if (!user) {
      throw new ResponseError(401, "Unauthorized: Invalid token");
    }
  
    await this.checkCategoryExists(id);
  
    const category = await prismaClient.category.delete({
      where: {
        id: id
      }
    });
  
    return toCategoryResponse(category);
  }
}