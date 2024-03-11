import { logger } from "../../config/logger";
import path from "path";
import { Response, Request, NextFunction } from "express";
import AuthorizatioNCodeService from "../../services/authorizationCodeService";
import { config } from "../../config/config";
import AuthenticationService from "../../services/authenticationService";
import AuthenticationEventService from "../../services/authenticationEventService";

const authorizationCodeService = new AuthorizatioNCodeService();
const authenticationService = new AuthenticationService();
const authenticationEventService = new AuthenticationEventService();

const loginPageMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("LoginPageMiddleware: entry");
        const { username, password } = req.body;
        const clientId = req.query.client_id?.toString();
        const redirect_uri = req.query.redirect_uri?.toString();

        if (clientId == null || redirect_uri == null) {
                logger.error(
                        "LoginPageMiddleware: Redirectri or clientId not provided"
                );
                return res.send(
                        "Bad Request: RedirectUri or clientId not provided"
                );
        }

        logger.info("loginPageMiddleware: attempting to authenticate user");
        const authenticationResult =
                await authenticationService.authenticateUser(
                        clientId,
                        username,
                        password
                );

        if (authenticationResult == null) {
                logger.error(
                        "LoginPageMiddleware: Unable to get authentication result"
                );
                res.sendFile(path.resolve("./src/public/index.html"));
        }

        if (authenticationResult) {
                logger.info(
                        "LoginPageMiddleware: successfully authenticated user"
                );

                logger.info(
                        "LoginPageMiddleware: redirecting to RP auth callback"
                );
                return res.json(authenticationResult.authorization_code);
        }

        logger.info("LoginPagMiddleware: render index.html");
        res.sendFile(path.resolve("./src/public/index.html"));
};

export default loginPageMiddleware;
