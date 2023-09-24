import IEntity from "./Entities/entity";
import IRepositoryStrategy from "./interfaces/IRepositoryStrategy";
import Repository from "./repository";
import IAuthenticationEventEntity from "./Entities/authenticationEventEntity";

export type AuthenticationEventEntityType = IAuthenticationEventEntity & IEntity;

export class AuthenticationEventRepository<
        AuthenticationEventEntityType
> extends Repository<AuthenticationEventEntityType> {
        constructor(strategy: IRepositoryStrategy<AuthenticationEventEntityType>) {
                super(strategy);
        }

        public getAuthenticationEventByAuthorizationCode(code: string): AuthenticationEventEntityType {
                return this.strategy.getByKey(code, 'authorization_code');
        }
}
