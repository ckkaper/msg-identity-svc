import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";
import ClientsService from "../services/clientsService";

const clientsService = new ClientsService();

const validateAuthorizationRequest = (req: Request, res: Response, next: NextFunction) => {

    const response_type = req.query.response_type?.toString();
    const clientId = req.query.client_id?.toString();
    const scopes = req.query.scope?.toString();
    const redirect_uri = req.query.redirect_uri?.toString();

    const validResponseType = validateResponseType(response_type);
    const validClientId = validateClientId(clientId);
    const validScopes = validateScopes(scopes);

    if (validClientId && validResponseType && validScopes) {
        next();
    }
    else  {
        logger.info("failed to validate");
        res.send("not ok")
    }
};


function validateResponseType(response_type?: string): boolean {

    logger.info("validating response_type");
    if (response_type === 'code') {
        return true; 
    }
    return false;
}

function validateClientId(clientId?: string): boolean {
    
    logger.info(`validating clientId exist: ${clientId}`);
    
    if (clientId == null) {
        return false;
    }

    return clientsService.clientExists(clientId);
}

function validateScopes(scopes?: string) {
    
    logger.info(`validating scopes`);
    
    if (scopes == null) {
        return false;
    }

    return scopes.includes("openid");
}
export default validateAuthorizationRequest;
