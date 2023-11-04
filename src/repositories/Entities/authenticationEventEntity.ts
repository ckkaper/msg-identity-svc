import IEntity from "./entity";

/**
 * Will be used to track the authentication result
 * the authorization code and the sessionId for an authenticated user.
 */
interface IAuthenticationEventEntity extends IEntity {
        sub: string;

        session_id: string;

        authorization_code: string;

        created_at: string;

        result: boolean;
}

export default IAuthenticationEventEntity;
