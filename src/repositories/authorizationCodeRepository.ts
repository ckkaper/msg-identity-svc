import IEntity from "./Entities/entity";
import IAuthorizationCodeEntity from "./Entities/authorizationCodeEntity";
import IRepositoryStrategy from "./interfaces/IRepositoryStrategy";
import Repository from "./repository";
import { logger } from "../config/logger";

export type AuthorizationCodeEntityType = IAuthorizationCodeEntity & IEntity;

export class AuthorizationCodeRepository<
        AuthorizationCodeEntityType
> extends Repository<AuthorizationCodeEntityType> {
        constructor(
                strategy: IRepositoryStrategy<AuthorizationCodeEntityType>
        ) {
                super(strategy);
        }

        public getAuthorizationCodeByCode(
                code: string
        ): AuthorizationCodeEntityType {
                return this.strategy.get(code);
        }

        public addAuthorizationCode(
                authCodeEntry: AuthorizationCodeEntityType
        ): boolean {
                logger.info(
                        `DATA: storing authorizationCode: AuthorizationCode: ${JSON.stringify(
                                authCodeEntry
                        )}`
                );
                return this.strategy.add(authCodeEntry);
        }
}
