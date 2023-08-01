import IEntity from "./Entities/entity";
import IClientEntity from "./Entities/clientEntity";
import IRepositoryStrategy from "./interfaces/IRepositoryStrategy";
import Repository from "./repository";

export type ClientEntityType = IClientEntity & IEntity;

export class ClientsRepository<ClientEntityType> extends Repository<ClientEntityType> {
        constructor(strategy: IRepositoryStrategy<ClientEntityType>) {
                super(strategy);
        }

        public getClientById(clientId: string): ClientEntityType {
                return this.strategy.get(clientId);
        }

        public getClientsList() {
                return this.strategy.list();
        }
}
