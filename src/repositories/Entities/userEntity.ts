import IEntity from "./entity";

interface IUserEntity extends IEntity {
        sub: string;

        username: string;

        password: string;

        first_name: string;

        last_name: string;
}

export default IUserEntity;
