import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

export const config = {
        env: process.env.ENVIRONMENT,
        dev: {
                port: process.env.PORT,
                application_name: process.env.APPLICATION_NAME,
<<<<<<< HEAD
                users_mock_data: resolve(__dirname, '../../src/repositories/users_mock_data.json'),
                clients_mock_data: resolve(__dirname, '../../src/repositories/clients_mock_data.json')
=======
                mock_data_path: resolve(
                        __dirname,
                        "../../src/repositories/mock_data.json"
                ),
>>>>>>> 69021a9103105360c877c3d9f2c2990c60d0452c
        },
};
