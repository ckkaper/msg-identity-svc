import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";

const checkIfUserIsLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    
    logger.info("checking if user is logged in");

    if (req.cookies.sessionId != null) {
        res.send("user authenticated");
        return;
    } else {
        res.send("user not authenticated");
    }
};

export default checkIfUserIsLoggedIn;
