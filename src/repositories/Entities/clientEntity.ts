import IEntity from "./entity";

interface IClientEntity extends IEntity {
        name: string;

        api_key: string;

        secret: string;

        created_at: string;

        redirect_uris: string[];
}

export default IClientEntity;
