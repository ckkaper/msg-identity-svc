import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import IAuthenticationEventEntity from "../repositories/Entities/authenticationEventEntity";
import UsersService from "./usersService";

const usersService = new UsersService();

class TokenService {
        public createToken(authenticationEvent: IAuthenticationEventEntity) {
                const userInfo = usersService.getUserByUserName(
                        authenticationEvent.username
                );

                return {
                        iss: "http://localhost:3001",
                        sub: userInfo.sub,
                        aud: {
                                clientId: authenticationEvent.clientId,
                        },
                        exp: 1700532663,
                        iat: new Date().getTime(),
                };
        }
}

export default TokenService;
