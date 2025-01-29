import { Category } from "@prisma/client";

export type CategoryResponse = {
  id: number;
  name: string;
  created_by?: number | null;
  created_by_name?: string | null; 
  created_at: Date;
  updated_by?: number | null;
  updated_by_name?: string | null;
  updated_at: Date;
}

export type CreateCategoryRequest = {
  name: string;
  created_by?: number;
}

export type UpdateCategoryRequest = {
  id: number;
  name: string;
  updated_by?: number;
}

export function toCategoryResponse(category: Category & { createdBy?: { name: string } | null; updatedBy?: { name: string } | null }): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    created_by: category.created_by,
    created_by_name: category.createdBy?.name || "",
    created_at: category.created_at,
    updated_by: category.updated_by,
    updated_by_name: category.updatedBy?.name || "",
    updated_at: category.updated_at
  }
}