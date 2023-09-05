import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";
import ClientsService from "../services/clientsService";

const clientsService = new ClientsService();

const validateAuthorizationRequest = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        const response_type = req.query.response_type?.toString();
        const clientId = req.query.client_id?.toString();
        const scopes = req.query.scope?.toString();
        const redirect_uri = req.query.redirect_uri?.toString();

        const validResponseType = validateResponseType(response_type);
        const validClientId = validateClientId(clientId);
        const validScopes = validateScopes(scopes);
        const validRedirectUri = validateRedirectUri(redirect_uri);

        if (validClientId && validResponseType && validScopes) {
                next();
        } else {
                logger.error("failed to validate");
                res.send("not ok");
        }
};

function validateResponseType(response_type?: string): boolean {
        logger.info("validating response_type");
        if (response_type === "code") {
                return true;
        }
        logger.error('Not supported response type');
        return false;
}


function validateRedirectUri(redirectUri?: string): boolean {
    // TODO: validate against client's redirect URIs
    logger.info(`validating redirectUri: ${redirectUri}`);
    return true;
}

function validateClientId(clientId?: string): boolean {
        logger.info(`validating clientId exist: ${clientId}`);

        return true;

        // TODO: Add proper validation for the clientId
        // if (clientId == null) {
        //         logger.error('ClientId not provided');
        //         return false;
        // }

        // var clientIdExists = clientsService.clientExists(clientId);

        // if (!clientIdExists) {
        //     logger.error('ClientId does not exist');
        //     return false;
        // }

        // return true;
}

function validateScopes(scopes?: string) {
        logger.info(`validating scopes`);

        if (scopes == null) {
                logger.error('Failed to validate scopes');
                return false;
        }

        return scopes.includes("openid");
}
export default validateAuthorizationRequest;
