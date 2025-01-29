import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.string().email().nonempty("Email is required"),
    name: z.string().min(3).max(100).nonempty("Name is required"),
    password: z.string().min(3).max(100).nonempty("Password is required"),
  });
  
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().nonempty("Email is required"),
    password: z.string().min(3).max(100).nonempty("Password is required"),
  });
}
