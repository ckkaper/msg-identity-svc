import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";

const checkIfUserIsLoggedIn = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("checking if user is logged in");

        if (req.cookies.sessionId != null) {
                // TODO: validate sessionId provide against active sessions
                // sessionId management will be done by storing a sessionId to the server and a cookie in the browser.
                res.send("user authenticated");
                return;
        } else {
                res.redirect("http://localhost:3001/login");
        }
};

export default checkIfUserIsLoggedIn;
