import path from "path";
import { Response, Request, NextFunction } from "express";
import { config } from "../config/config";
import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { AuthenticationEventRepository } from "../repositories/authenticationEventRepository";

const strategy = new FileStrategy(config.dev.authentication_event_data);

const authenticationEventRepository = new AuthenticationEventRepository(
        strategy
);

const testMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        console.log("TEST MIDDLEWARE");

        const model =
                await authenticationEventRepository.getAuthenticationEventByAuthorizationCode(
                        "authorization_code_value"
                );
        console.log("test middleware");
        res.send(model);
};

export default testMiddleware;
