import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import { logger } from "../config/logger";

import {
        SessionEntityType,
        SessionsRepository,
} from "../repositories/sessionsRepository";
import ISessionEntity from "../repositories/Entities/sessionEntity";

class SessionsService {
        private repository: SessionsRepository<SessionEntityType>;

        private repositoryStrategy: IRepositoryStrategy<ISessionEntity>;

        constructor(strategy?: IRepositoryStrategy<ISessionEntity>) {
                this.repositoryStrategy = strategy
                        ? strategy
                        : new FileStrategy(config.dev.sessions_mock_data);
                this.repository = new SessionsRepository(
                        this.repositoryStrategy
                );
        }

        public getSessionById(id: string): ISessionEntity {
                logger.info(`getting session: ${id}`);
                return this.repository.geetSessionById(id);
        }
}

export default SessionsService;
