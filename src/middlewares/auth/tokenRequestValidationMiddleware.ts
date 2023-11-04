import { logger } from "../../config/logger";
import { Response, Request, NextFunction } from "express";
import ClientsService from "../../services/clientsService";
import AuthorizatioNCodeService from "../../services/authorizationCodeService";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

const clientsService = new ClientsService();
const authCodeService = new AuthorizatioNCodeService();

const tokenRequestValidationMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("VALIDATE TOKEN REQUEST MIDDLEWARE    aaaaaaaaaaaaaa");

        // Client authentication
        const clientId = req.body?.clientId;
        const clientSecret = req.body?.clientSecret;
        const authorizationCode = req.query?.code;

        if (authorizationCode == null) {
                logger.info("authorization code does not exist");
                next();
                return;
        }

        if (clientId == null || clientSecret == null) {
                logger.info("clientId or clientSecret were not provided");
                next();
                return;
        }

        const clientExists = await clientsService.clientExists(clientId);
        if (!clientExists) {
                logger.info("client does not exist");
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
                logger.info("fail to authenticate client");
                next();
                return;
        }

        logger.info(`AUTHORIZATION CODE ${authorizationCode}`);
        const registeredAuthorizationCode =
                await authCodeService.getAuthorizationCodeByCode(
                        authorizationCode.toString()
                );

        if (registeredAuthorizationCode == null) {
                logger.info("authorization code not found");
                next();
                return;
        }

        const token = jwt.sign(
                { foo: "bar" },
                config.dev.secrets.jwt_token_secret as jwt.Secret
        );

        res.send(token);
};

export default tokenRequestValidationMiddleware;
