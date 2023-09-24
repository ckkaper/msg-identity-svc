import IEntity from "./Entities/entity";
import IUserEntity from "./Entities/userEntity";
import IRepositoryStrategy from "./interfaces/IRepositoryStrategy";
import Repository from "./repository";

export type UserEntityType = IUserEntity & IEntity;

export class UsersRepository<
        UserEntityType
> extends Repository<UserEntityType> {
        constructor(strategy: IRepositoryStrategy<UserEntityType>) {
                super(strategy);
        }

        public getUserList() {
                return this.strategy.list();
        }

        public getUserByUserName(username: string): UserEntityType {
                return this.strategy.getByKey(username, 'username');
        }
}
