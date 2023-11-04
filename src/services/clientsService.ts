import { FileStrategy } from "../repositories/strategies/fileStrategy";
import { config } from "../config/config";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import { logger } from "../config/logger";
import {
        ClientEntityType,
        ClientsRepository,
} from "../repositories/clientsRepository";
import IClientEntity from "repositories/Entities/clientEntity";

class ClientsService {
        private repository: ClientsRepository<ClientEntityType>;

        private repositoryStrategy: IRepositoryStrategy<IClientEntity>;

        constructor(strategy?: IRepositoryStrategy<IClientEntity>) {
                this.repositoryStrategy = strategy
                        ? strategy
                        : new FileStrategy(config.dev.clients_mock_data);
                this.repository = new ClientsRepository(
                        this.repositoryStrategy
                );
        }

        public async getClientById(id: string): Promise<IClientEntity> {
                logger.info(`getting client: ${id}`);
                return this.repository.getClientById(id);
        }

        public async getAllClients(): Promise<Array<IClientEntity>> {
                logger.info(`getting all clients`);
                return await this.repository.getClientsList();
        }

        public async clientExists(clientId: string): Promise<boolean> {
                var requestedClient = await this.repository.getClientById(
                        clientId
                );

                if (requestedClient != null) {
                        return true;
                }

                return false;
        }
}

export default ClientsService;
