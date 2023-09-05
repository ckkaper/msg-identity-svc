import SessionsService from "../services/sessionsService";
import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";

var sessionsService = new SessionsService();

const checkIfUserIsLoggedIn = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("checking if user is logged in");
        var sessionId = req.cookies.sessionId;
        

        var requestedSession = sessionsService.getSessionById(sessionId);

        if (requestedSession != null) {
            logger.info('user authenticated');
            res.send("user authenticated");
            return;
        }
        
        res.redirect("http://localhost:3001/login");
};

export default checkIfUserIsLoggedIn;
