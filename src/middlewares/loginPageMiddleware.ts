import { logger } from "../config/logger";
import path from "path";
import { Response, Request, NextFunction } from "express";
import { generateAuthorizationCode } from "../utils/cryptoUtils";
import AuthorizatioNCodeService from "../services/authorizationCodeService";
import { cli } from "winston/lib/winston/config";

const authorizationCodeService = new AuthorizatioNCodeService();


const loginPageMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        const { username, password } = req.body;

        if (username == "user" && password == "password") {
                console.log("login successful");
                
                const authorizationCode = await generateAuthorizationCode(); 
                const clientId = req.query.clientId?.toString();
                console.log('check query params');
                console.log(req.query);
                if (clientId == null) {
                    console.log('clientId not provided');
                    return;
                }

                console.log(authorizationCode);
                authorizationCodeService.addAuthorizationCode(authorizationCode, clientId)
                return res.redirect(`http://localhost:3000/?code=${authorizationCode}`);

                // TODO: construct authorization cocde
                // construct data access layer for the authorization code
                // generate and store the code
                // use the code to redirect to the RP
                // implement authorization code validation in the token endpoint
                // TODO: redirect back to RP with authorization code
                return;
        }

        res.sendFile(path.resolve("./src/public/index.html"));
};

export default loginPageMiddleware;
