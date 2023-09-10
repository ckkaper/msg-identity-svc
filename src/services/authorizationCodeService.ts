import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import { logger } from "../config/logger";
import {
        ClientEntityType,
        ClientsRepository,
} from "../repositories/clientsRepository";
import IClientEntity from "repositories/Entities/clientEntity";
import { AuthorizationCodeRepository } from "../repositories/authorizationCodeRepository";
import IAuthorizationCodeEntity from "repositories/Entities/authorizationCodeEntity";

class AuthorizatioNCodeService {
        private repository: AuthorizationCodeRepository<IAuthorizationCodeEntity>;

        private repositoryStrategy: IRepositoryStrategy<IAuthorizationCodeEntity>;

        constructor(strategy?: IRepositoryStrategy<IAuthorizationCodeEntity>) {
                this.repositoryStrategy = strategy
                        ? strategy
                        : new FileStrategy(config.dev.authorization_code_data);
                this.repository = new AuthorizationCodeRepository(
                        this.repositoryStrategy
                );
        }

        public getAuthorizationCodeByCode(code: string): IAuthorizationCodeEntity {
            return this.repository.getAuthorizationCodeByCode(code);
        }
        
        public addAuthorizationCode(code: string, clientId: string): boolean {
            return this.repository.addAuthorizationCode({
                client_id: clientId,
                authorization_code: code,
                created_at: "now",
                id: code
            });
        }
}

export default AuthorizatioNCodeService;
