import IEntity from "./entity";

/** List of clientId  */
interface IClientEntity extends IEntity {
        /** Decriptive name of the client */
        name: string;

        /** Api key of the client or clientId */
        api_key: string;

        /** Secret used to authenticate the client */
        secret: string;

        /** Creation timestamp to mark the client Expiration */
        created_at: string;

        /** List of allowed redirect URIs */
        redirect_uris: string[];
}

export default IClientEntity;
