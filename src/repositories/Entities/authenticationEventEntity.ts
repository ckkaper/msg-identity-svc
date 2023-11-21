import IEntity from "./entity";

/**
 * Will be used to track the authentication result
 * the authorization code and the sessionId for an authenticated user.
 */
interface IAuthenticationEventEntity extends IEntity {
        /** Unique sub identifier */
        sub: string;

        /** Authorization code for this specific event */
        authorization_code: string;

        /** Creation UTC Timestamp */
        created_at: string;

        /** authentication event result, Do we need it?   */
        result: boolean;

        /** username of user */
        username: string

        /** The clientId of the Relying Party. */
        clientId: string
}

export default IAuthenticationEventEntity;
