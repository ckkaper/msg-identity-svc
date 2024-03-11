import { logger } from "../../config/logger";
import { Response, Request, NextFunction } from "express";
import ClientsService from "../../services/clientsService";
import AuthenticationEventService from "../../services/authenticationEventService";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import TokenService from "../../services/tokenService";

const clientsService = new ClientsService();
const authenticationEventService = new AuthenticationEventService();
const tokenService = new TokenService();

const tokenRequestValidationMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("tokenRequestValidationMiddleware:  entry");

        // Client authentication
        const clientId = req.body?.clientId;
        const clientSecret = req.body?.clientSecret;
        const authorizationCode = req.query?.code;

        if (authorizationCode == null) {
                logger.info(
                        "tokenRequestValidationMiddleware: authorization code was not provided"
                );
                next();
                return;
        }

        if (clientId == null || clientSecret == null) {
                logger.info(
                        "tokenRequestValidationMiddleware: clientId or clientSecret were not provided"
                );
                next();
                return;
        }

        const clientExists = await clientsService.clientExists(clientId);
        if (!clientExists) {
                logger.info(
                        "tokenRequestValidationMiddleware: client does not exist"
                );
                next();
                return;
        }

        const registeredClient = await clientsService.getClientById(clientId);
        if (
                !(
                        registeredClient.api_key == clientId &&
                        registeredClient.secret == clientSecret
                )
        ) {
                logger.info(
                        "tokenRequesValidationMiddleware: fail to authenticate client"
                );
                next();
                return;
        }

        logger.info(
                `tokenRequestValidationMiddleware: AUTHORIZATION CODE ${authorizationCode}`
        );

        const authenticationEvent =
                await authenticationEventService.getAuthenticationEventByAuthorizationCode(
                        authorizationCode.toString()
                );

        if (authenticationEvent == null) {
                logger.info(
                        "tokenRequestValidationMiddleware: authenticationEvent was not found by authorization_code"
                );
                next();
                return;
        }

        const tokenData = tokenService.createToken(authenticationEvent);

        const token = jwt.sign(
                tokenData,
                config.dev.secrets.jwt_token_secret as jwt.Secret
        );

        logger.info(`tokenRequestValidationMiddleware: TOKEN ${token}`);
        res.send(token);
};

export default tokenRequestValidationMiddleware;
