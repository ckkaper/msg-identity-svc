import { logger } from "../config/logger";
import { Request, Response } from "express";
import UsersService from "./usersService";

const usersService = new UsersService();

class AuthenticationService {
        public async authenticateUser(
                username: string,
                password: string
        ): Promise<boolean> {
                console.log("=====CREDS PROVIDED =========");
                console.log(username);
                console.log(password);
                console.log("=====END CREDS PROVIDED======");
                const user = usersService.getUserByUserName(username);

                logger.info(user);
                if (user == null) {
                        logger.error("unable to retrieve user");
                        return false;
                }

                if (user.username == username && user.password == password) {
                        return true;
                }

                logger.info(`Failed to authenticate: ${username}`);
                return false;
        }
}

export default AuthenticationService;
