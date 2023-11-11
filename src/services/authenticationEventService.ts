import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import IAuthenticationEventEntity from "../repositories/Entities/authenticationEventEntity";
import { AuthenticationEventRepository } from "../repositories/authenticationEventRepository";

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
                username: string,
                authorizationCode: string
        ) {
                this.repository.add({
                        authorization_code: authorizationCode,
                        sub: username,
                        created_at: "now",
                        result: true,
                        id: username,
                });
        }

        public getAuthenticationEventByAuthorizationCode(
                authorizationCode: string
        ) {
                this.repository.getAuthenticationEventByAuthorizationCode(
                        authorizationCode
                );
        }
}

export default AuthenticationEventService;
