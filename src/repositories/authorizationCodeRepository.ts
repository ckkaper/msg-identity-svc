import IEntity from "./Entities/entity";
import IClientEntity from "./Entities/clientEntity";
import IAuthorizationCodeEntity from "./Entities/authorizationCodeEntity";
import IRepositoryStrategy from "./interfaces/IRepositoryStrategy";
import Repository from "./repository";

export type AuthorizationCodeEntityType = IAuthorizationCodeEntity & IEntity;

export class ClientsRepository<
        AuthorizationCodeEntityType
> extends Repository<AuthorizationCodeEntityType> {
        constructor(
                strategy: IRepositoryStrategy<AuthorizationCodeEntityType>
        ) {
                super(strategy);
        }

        public getClientById(clientId: string): AuthorizationCodeEntityType {
                return this.strategy.get(clientId);
        }

        public getClientsList() {
                return this.strategy.list();
        }
}
