import { logger } from "../../config/logger";
import { Response, Request, NextFunction } from "express";
import ClientsService from "../../services/clientsService";


const clientsService = new ClientsService();

const validateAuthorizationRequest = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("VALIDATE AUTHORIZATION REQUEST MIDDLEWARE")
        const response_type = req.query.response_type?.toString();
        const clientId = req.query.client_id?.toString();
        const scopes = req.query.scope?.toString();
        const redirect_uri = req.query.redirect_uri?.toString();

        const validResponseType = validateResponseType(response_type);
        const validClientId = validateClientId(clientId);
        const validScopes = validateScopes(scopes);
        const validRedirectUri = validateRedirectUri(clientId, redirect_uri);

        if (validClientId && validResponseType && validScopes && validRedirectUri) {
                next();
        } else {
                logger.error("failed to validate authorization request");
                res.send("BadRequest: Invalid authorization request");
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


function validateRedirectUri(clientId?: string, redirectUri?: string): boolean {
    // TODO: validate against client's redirect URIs
    logger.info(`validating redirectUri: ${redirectUri}`);
    if (clientId == null || redirectUri == null) {
        logger.error('clientId or requestUri was not provided'); 
        return false;
    }

    var requestedClient = clientsService.getClientById(clientId);

    if (requestedClient.redirect_uris.includes(redirectUri)) {
        logger.info('validated redirect_uri')
        return true;
    }
    logger.info('Failed to validate redirect_uri')
    return false;
}

function validateClientId(clientId?: string): boolean {
        logger.info(`validating clientId exist: ${clientId}`);

        if (clientId == null) {
                logger.error('ClientId not provided');
                return false;
        }

        var clientIdExists = clientsService.clientExists(clientId);

        if (!clientIdExists) {
            logger.error('ClientId does not exist');
            return false;
        }

        logger.info('clientId validated');

        return true;
}

function validateScopes(scopes?: string) {
        logger.info(`validating scopes`);

        if (scopes == null) {
                logger.error('Failed to validate scopes');
                return false;
        }

        // TODO: Define supported scopes and set them in a config setting.
        return scopes.includes("openid");
}
export default validateAuthorizationRequest;
