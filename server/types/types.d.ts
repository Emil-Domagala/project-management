import type { Request, Response, NextFunction } from 'express';

// declare module 'express-serve-static-core' {
//   interface Request {
//     userId?: string;
//   }
// }

declare global {
  type ControllerFunctionType = (req: Request, res: Response, next?: NextFunction) => Promise<any>;


}

export {};
