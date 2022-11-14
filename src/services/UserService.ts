import { Request } from "express";
import { Like } from "typeorm";
import User from "../entities/User";
import FilterApi from "../helpers/FilterApi";
import UserFilterApi from "../interfaces/ApiParams/UserFilterApi";
import UserQueryParams from "../interfaces/QueryParams/UserQueryParams";
import AbstractService from "./AbstractService";
class UserService extends AbstractService<User> {
  constructor() {
    super(User);
  }
  
  async findUserByEmail(email: string): Promise<User> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  async findAll(req: Request) {
    const query = req.query as UserQueryParams;

    let filterApi = new FilterApi()
      .setFilters(query)
      .getFilters() as UserFilterApi;
    
    filterApi.select = [
      'id',
      'name',
      'lastname',
      'email',
      'role',
      'created_at',
      'updated_at'
    ];
    
    const filters = {
      ...filterApi,
      where: {
        name: undefined,
        school: {
          id: undefined
        },
        role: undefined,
      }
    };

    if (query.search) {
      filters.where.name = Like(`%${query.search}%`)
    }
    
    if (query.role && query.role != 'TODOS') {
      filters.where.role = query.role;
    }

    if (query.school) {
      filters.where.school.id = query.school;
    }
    
    if (query.relations == 'true') {
      filters.relations.push('school');
    }

    return await this.getAll(filters);
  }

  async save(req: Request) {
    const body = req.body as User;
    // body.password = bcrypt.hashSync(body.password, env.PASSWORD_SALT);
  }
}

export default new UserService;