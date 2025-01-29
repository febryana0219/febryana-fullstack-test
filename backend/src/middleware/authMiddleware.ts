import { Request, Response, NextFunction, RequestHandler } from "express";  // Import RequestHandler here
import jwt from "jsonwebtoken";
import { prismaClient } from "../config/database";
import { UserRequest } from "../type/userRequest";

export const authMiddleware: RequestHandler = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req.get('X-ACCESS-TOKEN');
  const refreshToken = req.get('X-REFRESH-TOKEN');

  try {
    // Verifikasi Access Token
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as { id: number, email: string };

      const user = await prismaClient.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (user && user.token === accessToken) {
        req.user = user;
        return next();
      }
    }

    // Jika Access Token tidak valid, periksa Refresh Token
    if (refreshToken) {
      const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: number, email: string };

      const user = await prismaClient.user.findFirst({
        where: {
          id: decodedRefreshToken.id,
          refresh_token: refreshToken,
          refresh_token_expiry: {
            gte: new Date(), // Refresh Token belum kadaluarsa
          },
        },
      });

      if (user) {
        const newAccessToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );
        
        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            token: newAccessToken,
          },
        });

        req.user = user;
        res.setHeader("X-NEW-ACCESS-TOKEN", newAccessToken);
        return next();
      }
    }
    
    res.status(401).json({
      errors: "Unauthorized",
    });
  } catch (error) {
    res.status(401).json({
      errors: "Unauthorized",
    });
  }
};
