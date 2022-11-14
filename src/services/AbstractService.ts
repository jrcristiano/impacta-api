
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

    async getAll(filters?: object): Promise<Entity[]> {
        return await this.repository.find(filters);
    }

    async persist(data: Entity): Promise<Entity> {
        return await this.repository.save<Entity>(data);
    }

    async findById(id: string): Promise<Entity> {
        return await this.repository.findOneBy({ id } as FindOptionsWhere<any>);
    }

    async delete(id: string) {
        return await this.repository.softDelete(id);
    }

    async forceDelete(id: string): Promise<DeleteResult> {
        return await this.repository.delete({ id } as FindOptionsWhere<any>);
    }
}

export default AbstractService;
