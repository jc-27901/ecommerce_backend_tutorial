import { Request, Response, NextFunction } from "express";

export function errorLogger(err: any, req: Request, res: Response, next: NextFunction) {
  console.log("🔥 GLOBAL ERROR LOGGER:", JSON.stringify(err, null, 2));
  next(err);
}
