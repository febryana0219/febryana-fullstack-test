import { Item } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type ItemResponse = {
  id: number;
  name: string;
  qty: number;
  price: Decimal;
  unit: string;
  category_id: number;
  category_name?: string | null;
  created_by?: number | null;
  created_by_name?: string | null; 
  created_at: Date;
  updated_by?: number | null;
  updated_by_name?: string | null; 
  updated_at: Date;
}

export type CreateItemRequest = {
  name: string;
  qty: number;
  price: number;
  unit: string;
  category_id: number;
  created_by?: number;
}

export type UpdateItemRequest = {
  id: number;
  name: string;
  qty: number;
  price: number;
  unit: string;
  category_id: number;
  updated_by?: number;
}

export function toItemResponse(item: Item & { category?: { name: string } | null; createdBy?: { name: string } | null; updatedBy?: { name: string } | null }): ItemResponse {
  return {
    id: item.id,
    name: item.name,
    qty: item.qty,
    price: item.price,
    unit: item.unit,
    category_id: item.category_id,
    category_name: item.category?.name || "",
    created_by: item.created_by,
    created_by_name: item.createdBy?.name || "",
    created_at: item.created_at,
    updated_by: item.updated_by,
    updated_by_name: item.updatedBy?.name || "",
    updated_at: item.updated_at
  }
}