import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE : ZodType = z.object({
    name: z.string().min(3).max(100).nonempty("Name is required"),
    created_by: z.number().optional(),
  });

  static readonly UPDATE : ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(3).max(100).nonempty("Name is required"),
    updated_by: z.number().optional(),
  });
}