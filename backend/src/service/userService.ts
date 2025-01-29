import { CreateUserRequest, LoginUserRequest, toUserResponse, UserResponse } from "../model/userModel";
import { Validation } from './../validation/validation';
import { UserValidation } from "./../validation/userValidation";
import { prismaClient } from "./../config/database";
import { ResponseError } from "./../error/responseError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    let registerRequest = Validation.validate(UserValidation.REGISTER, request);

    const emailExists = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (emailExists > 0) {
      throw new ResponseError(400, "Email already exists!");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest
    }); 

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);
  
    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });
  
    if (!user) {
      throw new ResponseError(401, "Email or password is wrong!");
    }
  
    const isPasswordCorrect = await bcrypt.compare(loginRequest.password, user.password);
  
    if (!isPasswordCorrect) {
      throw new ResponseError(401, "Email or password is wrong!");
    }
  
    // Generate Access Token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  
    // Generate Refresh Token
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );
  
    // Set Refresh Token Expiry
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);
  
    // Simpan token ke dalam database
    await prismaClient.user.update({
      where: {
        email: loginRequest.email,
      },
      data: {
        token: accessToken,
        refresh_token: refreshToken,
        refresh_token_expiry: refreshTokenExpiry,
      },
    });
  
    // Kembalikan response dengan token dan refreshToken
    const response = toUserResponse(user, accessToken, refreshToken);  // Menyertakan token dan refreshToken di sini
  
    return response;
  }  

  static async refreshToken(refreshToken: string): Promise<UserResponse> {
    if (!refreshToken) {
      throw new ResponseError(400, "Refresh token is required!");
    }

    try {
      // Verifikasi refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: number; email: string };

      // Cari pengguna berdasarkan refresh token
      const user = await prismaClient.user.findFirst({
        where: {
          id: decoded.id,
          refresh_token: refreshToken,
          refresh_token_expiry: {
            gte: new Date(),
          },
        },
      });

      if (!user) {
        throw new ResponseError(401, "Invalid or expired refresh token!");
      }

      // Generate Access Token baru
      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      // Simpan access token baru
      await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          token: newAccessToken,
        },
      });

      const response = toUserResponse(user);
      response.token = newAccessToken;

      return response;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new ResponseError(401, "Invalid or expired refresh token!");
    }
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
        refresh_token: null,
        refresh_token_expiry: null,
      },
    });

    return toUserResponse(result);
  }
}