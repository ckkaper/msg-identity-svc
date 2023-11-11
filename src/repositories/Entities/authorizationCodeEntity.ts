import IEntity from "./entity";

/** Not used at the moment */
interface IAuthorizationCodeEntity extends IEntity {
        /**
         * The client issued the code.
         */
        client_id: string;

        /**
         * The authorization code.
         */
        authorization_code: string;

        /**
         * the epoch timestamp it was created to track expiration.
         */
        created_at: string;
}

export default IAuthorizationCodeEntity;
