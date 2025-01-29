import { User } from "@prisma/client";

export type UserResponse = {
  id: number;
  email: string;
  name: string;
  token?: string;
  refresh_token?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type CreateUserRequest = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export function toUserResponse(user: User, token?: string, refresh_token?: string): UserResponse {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    token, 
    refresh_token,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
}
