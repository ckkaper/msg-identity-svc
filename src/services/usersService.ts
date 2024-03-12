import IUserEntity from "../repositories/Entities/userEntity";
import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import {
        UsersRepository,
        UserEntityType,
} from "../repositories/usersRepository";
import { logger } from "../config/logger";

class UsersService {
        private repository: UsersRepository<UserEntityType>;

        private repositoryStrategy: IRepositoryStrategy<IUserEntity>;

        constructor(strategy?: IRepositoryStrategy<IUserEntity>) {
                this.repositoryStrategy = strategy
                        ? strategy
                        : new FileStrategy(config.users_mock_data);
                this.repository = new UsersRepository(this.repositoryStrategy);
        }

        public getUserByUserName(username: string): IUserEntity {
                logger.info(`getting user: ${username}`);
                return this.repository.getUserByUserName(username);
        }

        public getAllUsers(): Array<IUserEntity> {
                logger.info(`getting all users`);
                return this.repository.getUserList();
        }
}

export default UsersService;
