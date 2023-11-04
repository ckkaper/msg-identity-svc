interface IRepositoryStrategy<T> {
        add(entity: T): boolean;

        list(): Array<T>;

        get(id: string): T;

        getByKey(id: string, key: string): T;

        update(entity: T): T;

        remove(id: string): boolean;
}

export default IRepositoryStrategy;
