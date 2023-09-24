import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import { logger } from "../config/logger";
import { AuthorizationCodeRepository } from "../repositories/authorizationCodeRepository";
import IAuthorizationCodeEntity from "../repositories/Entities/authorizationCodeEntity";
import { generateAuthorizationCode } from "../utils/cryptoUtils";

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

        public async getAuthorizationCodeByCode(code: string): Promise<IAuthorizationCodeEntity> {
            logger.info('retrieving authorization code');
            return this.repository.getAuthorizationCodeByCode(code);
        }
        
        public async createAuthorizationCode(): Promise<string> {
            logger.info('generating authorization code');
            return await generateAuthorizationCode(); 
        }
        
        public async addAuthorizationCode(clientId: string, code: string): Promise<boolean> {
            logger.info('storing authorization code');
            return await this.repository.addAuthorizationCode({
                client_id: clientId,
                authorization_code: code,
                created_at: "now",
                id: code
            });
        }
}

export default AuthorizatioNCodeService;
