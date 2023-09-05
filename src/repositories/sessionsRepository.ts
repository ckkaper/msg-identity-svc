import IEntity from "./Entities/entity";
import ISessionEntity from "./Entities/sessionEntity";
import IRepositoryStrategy from "./interfaces/IRepositoryStrategy";
import Repository from "./repository";

export type SessionEntityType = ISessionEntity & IEntity;

export class SessionsRepository<
        SessionEntityType
> extends Repository<SessionEntityType> {
        constructor(strategy: IRepositoryStrategy<SessionEntityType>) {
                super(strategy);
        }

        public geetSessionById(id: string): SessionEntityType {
                return this.strategy.get(id);
        }
}
