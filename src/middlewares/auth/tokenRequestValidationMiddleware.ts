import { logger } from "../../config/logger";
import { Response, Request, NextFunction } from "express";
import ClientsService from "../../services/clientsService";


const clientsService = new ClientsService();

const validateAuthorizationRequest = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        logger.info("VALIDATE TOKEN REQUEST MIDDLEWARE");

        // RP authorization logic

        // token generation.

};