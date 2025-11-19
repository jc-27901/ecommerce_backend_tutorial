import { Request, Response, NextFunction } from "express";


export function handleMulter(multerFn: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    multerFn(req, res, (err: any) => {
      if (err) {
        console.log("🔥 MULTER ERROR:", JSON.stringify(err, null, 2));
        return res.status(400).json({ error: err.message || "Upload error" });
      }
      next();
    });
  };
}

