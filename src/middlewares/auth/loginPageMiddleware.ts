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
        logger.info("LOGIN PAGE MIDDLEWARE");
        const { username, password } = req.body;
        const clientId = req.query.client_id?.toString();
        const redirect_uri = req.query.redirect_uri?.toString();

        if (clientId == null || redirect_uri == null) {
                return res.send(
                        "Bad Request: RedirectUri or clientId not provided"
                );
        }

        logger.info("attempting to authenticate user");
        const authenticationResult =
                await authenticationService.authenticateUser(
                        username,
                        password
                );

        if (authenticationResult == null) {
                logger.error("Unable to get authentication result");
                res.sendFile(path.resolve("./src/public/index.html"));
        }

        if (authenticationResult) {
                logger.info("successfully authenticated user");

                const authorizationCode =
                        await authorizationCodeService.createAuthorizationCode();

                await authorizationCodeService.addAuthorizationCode(
                        clientId,
                        authorizationCode
                );
                await authenticationEventService.createAuthenticationEvent(
                        username,
                        authorizationCode
                );

                logger.info("redirecting to RP auth callback");
                return res.json(authorizationCode);
                // return res.redirect(
                //         `http://localhost:${config.dev.relying_party_port}/auth/callback/?code=${authorizationCode}&redirect_uri=${redirect_uri}`
                // );
        }

        res.sendFile(path.resolve("./src/public/index.html"));
};

export default loginPageMiddleware;
