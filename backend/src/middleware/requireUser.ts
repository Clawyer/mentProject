import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  logger.info(res.locals)
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }
  return next();
};

export default requireUser;
