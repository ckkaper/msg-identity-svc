import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import IAuthenticationEventEntity from "../repositories/Entities/authenticationEventEntity";
import { AuthenticationEventRepository } from "../repositories/authenticationEventRepository";
import { logger } from "../config/logger";

class AuthenticationEventService {
        private repository: AuthenticationEventRepository<IAuthenticationEventEntity>;

        private repositoryStrategy: IRepositoryStrategy<IAuthenticationEventEntity>;

        constructor(
                strategy?: IRepositoryStrategy<IAuthenticationEventEntity>
        ) {
                this.repositoryStrategy = strategy
                        ? strategy
                        : new FileStrategy(
                                  config.dev.authentication_event_data
                          );
                this.repository = new AuthenticationEventRepository(
                        this.repositoryStrategy
                );
        }

        public createAuthenticationEvent(
                sub: string,
                username: string,
                clientId: string,
                authorizationCode: string
        ) {
                logger.info(
                        `creating authenticationEvent for user ${username}`
                );
                this.repository.add({
                        authorization_code: authorizationCode,
                        sub: username,
                        username,
                        clientId,
                        created_at: new Date().getTime().toString(),
                        result: true,
                        id: sub,
                });
        }

        public getAuthenticationEventByAuthorizationCode(
                authorizationCode: string
        ): IAuthenticationEventEntity | null {
                const authenticationEvent =
                        this.repository.getAuthenticationEventByAuthorizationCode(
                                authorizationCode
                        );

                if (authenticationEvent == null) {
                        logger.error("No authorization code was found");
                        return null;
                }

                return authenticationEvent;
        }
}

export default AuthenticationEventService;
