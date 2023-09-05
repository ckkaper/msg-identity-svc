import IEntity from "./entity";

interface ISessionEntity extends IEntity {
        sessionId: string;

        sub: string;

        createdAt: string
}

export default ISessionEntity;
