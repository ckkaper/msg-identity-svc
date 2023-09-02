import { logger } from "../config/logger";
import path from "path";
import { Response, Request, NextFunction } from "express";

const loginPageMiddleware = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        const { username, password } = req.body;
        console.log(username);
        console.log(password);

        if (username == "user" && password == "password") {
                console.log("login successful");
                next();

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
