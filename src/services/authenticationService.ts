import { logger } from "../config/logger";
import { Request, Response } from "express";
import UsersService from "./usersService";
import { AuthenticationEventEntityType } from "../repositories/authenticationEventRepository";
import AuthorizatioNCodeService from "./authorizationCodeService";
import AuthenticationEventService from "./authenticationEventService";

const usersService = new UsersService();
const authorizationCodeService = new AuthorizatioNCodeService();
const authenticationEventService = new AuthenticationEventService();

class AuthenticationService {
        public async authenticateUser(
                clientId: string,
                username: string,
                password: string
        ): Promise<AuthenticationEventEntityType | null> {
                const user = usersService.getUserByUserName(username);

                logger.info(user);
                if (user == null) {
                        logger.error("unable to retrieve user");
                        return null;
                }


                if (user.username == username && user.password == password) {

                    const authorizationCode = await authorizationCodeService.createAuthorizationCode();
                    await authorizationCodeService.addAuthorizationCode(clientId, authorizationCode);
                    const authenticationTimestamp = new Date().getTime().toString();
                    authenticationEventService.createAuthenticationEvent(user.sub, username, clientId, authorizationCode)

                        return {
                            id: user.sub + authenticationTimestamp,
                            sub: user.sub,
                            username: user.username,
                            clientId,
                            authorization_code: authorizationCode,
                            created_at: authenticationTimestamp,
                            result: true 
                        };
                }

                logger.info(`Failed to authenticate: ${username}`);
                return null;
        }
}

export default AuthenticationService;
