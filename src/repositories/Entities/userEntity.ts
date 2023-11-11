import IEntity from "./entity";

/**
 * Describes the User Entity to be authenticated. Represents an Active Directory Database that is currently stored in service.
 */
interface IUserEntity extends IEntity {
        /** Unique user identifier same with inherited @param id */
        sub: string;

        /** User Username */
        username: string;

        /** User Password */
        password: string;

        /** User First Name */
        first_name: string;

        /** User Lat Name */
        last_name: string;
}

export default IUserEntity;
