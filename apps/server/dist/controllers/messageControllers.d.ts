import { Request, Response, NextFunction } from "express";
export declare const getMessages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const sendMessage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRecentMessages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=messageControllers.d.ts.map