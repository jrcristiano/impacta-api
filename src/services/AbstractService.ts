
import { AppDataSource } from "../data-source";
import {
    DeleteResult,
    EntityTarget,
    FindOptionsWhere,
    Repository,
} from "typeorm";

abstract class AbstractService<Entity> {
    protected readonly repository: Repository<Entity>;

    constructor(entity: EntityTarget<Entity>) {
        this.repository = AppDataSource.getRepository(entity);
    }

    getRepository() {
        return this.repository;
    }
}

export default AbstractService;
