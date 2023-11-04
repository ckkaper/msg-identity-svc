import SessionsService from "../../services/sessionsService";
import { logger } from "../../config/logger";
import { Response, Request, NextFunction } from "express";
import { config } from "../../config/config";

var sessionsService = new SessionsService();

const checkIfUserIsLoggedInMiddleware = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("CHECK USER IS LOGGED IN MIDDLEWARE");
        var sessionId = req.cookies.sessionId;
        const response_type = req.query.response_type?.toString();
        const clientId = req.query.client_id?.toString();
        const scopes = req.query.scope?.toString();
        const redirect_uri = req.query.redirect_uri?.toString();

        if (clientId == null) {
                res.send("Bad Request: clientId not provided");
        }

        // var requestedSession = sessionsService.getSessionById(sessionId);

        // if (requestedSession != null) {
        //     logger.info('user authenticated');
        //     res.send("user authenticated");
        //     return;
        // }

        res.redirect(
                `http://localhost:${config.dev.port}/login?client_id=${clientId}&redirect_uri=${redirect_uri}`
        );
};

export default checkIfUserIsLoggedInMiddleware;
