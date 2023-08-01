import * as dotenv from "dotenv";
import { resolve } from 'path';

dotenv.config();

export const config = {
        env: process.env.ENVIRONMENT,
        dev: {
                port: process.env.PORT,
                application_name: process.env.APPLICATION_NAME,
                users_mock_data: resolve(__dirname, '../../src/repositories/users_mock_data.json'),
                clients_mock_data: resolve(__dirname, '../../src/repositories/clients_mock_data.json')
        },
};
