import * as dotenv from "dotenv";
import { resolve } from "path";

const env = process.env.ENVIRONMENT; 

if (env === 'local') {
    dotenv.config({path: '.env'});
} else if (env === 'container') {
    dotenv.config({path: '.env.container'});
} else {
    dotenv.config({path: '.env'});
}

export const config = {
    secrets: {
            jwt_token_secret: process.env.JWT_TOKEN_SECRET,
    },
    port: process.env.PORT,
    relying_party_port: process.env.RP_PORT,
    application_name: process.env.APPLICATION_NAME,
    users_mock_data: resolve(
            __dirname,
            "../../src/repositories/localStorage/users_mock_data.json"
    ),
    clients_mock_data: resolve(
            __dirname,
            "../../src/repositories/localStorage/clients.json"
    ),
    sessions_mock_data: resolve(
            __dirname,
            "../../src/repositories/localStorage/sessions.json"
    ),
    authorization_code_data: resolve(
            __dirname,
            "../../src/repositories/localStorage/authorization_code_data.json"
    ),
    authentication_event_data: resolve(
            __dirname,
            "../../src/repositories/localStorage/authentication_event_data.json"
    )
};
