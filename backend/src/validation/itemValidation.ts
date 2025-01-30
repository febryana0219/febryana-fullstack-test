import { z, ZodType } from "zod";

export class ItemValidation {
  static readonly CREATE : ZodType = z.object({
    name: z.string().min(1).max(100).nonempty("Name is required"),
    qty: z.number().positive(),
    price: z.string().regex(/^\d+(\.\d+)?$/, "Price must be a valid decimal"),
    unit: z.string().min(1).max(100).nonempty("Unit is required"),
    category_id: z.number().positive(),
    created_by: z.number().optional(),
  });

  static readonly UPDATE : ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100).nonempty("Name is required"),
    qty: z.number().positive(),
    price: z.string().regex(/^\d+(\.\d+)?$/, "Price must be a valid decimal"),
    unit: z.string().min(1).max(100).nonempty("Unit is required"),
    category_id: z.number().positive(),
    updated_by: z.number().optional(),
  });
}