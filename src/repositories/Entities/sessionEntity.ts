import IEntity from "./entity";

// Not Used for Now
interface ISessionEntity extends IEntity {
        session_id: string;

        authorization_code: string;

        sub: string;

        created_at: string;
}

export default ISessionEntity;
