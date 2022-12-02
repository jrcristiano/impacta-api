import { Request } from "express";
import { FindManyOptions, Like } from "typeorm";
import User from "../entities/User";
import FilterApi from "../helpers/FilterApi";
import UserFilterApi from "../interfaces/ApiParams/UserFilterApi";
import UserQueryParams from "../interfaces/QueryParams/UserQueryParams";
import AbstractService from "./AbstractService";
import bcrypt from 'bcrypt';
import UserBody from "../interfaces/RequestBody/UserBody";
import SchoolService from "./SchoolService";
import env from "../../env";

class UserService extends AbstractService<User> {
  constructor() {
    super(User);
  }
  
  async findUserByEmail(email: string): Promise<User> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  async getAll(req?: Request) {
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

    if (query.school && query.school != 'TODOS') {
      filters.where.school.id = query.school;
    }
    
    if (query.relations == 'true') {
      filters.relations.push('school');
    }

    return await this.repository.find(filters as FindManyOptions<User>);
  }

  async save(req: Request): Promise<User> {
    const body = req.body as UserBody;

    const user = new User;
    
    user.name = body.name;
    user.lastname = body.lastname;
    user.email = body.email;

    if (body.password) {
      user.password = bcrypt.hashSync(body.password, env.PASSWORD_SALT);
    }

    if (req.params.id) {
      user.id = parseInt(req.params.id);
    }
  
    user.role = body.role;
    user.school = await SchoolService.getRepository().findOneBy({ id: body.school }); 
    
    return await this.repository.save(user);
  }

  async findUserById(req: Request): Promise<User> {
    return await this.repository.findOne({
      select: [
        'id',
        'name',
        'lastname',
        'email',
        'role',
        'created_at',
        'updated_at'
      ],
      relations: ['school'],
      where: { id: parseInt(req.params.id) },
      loadEagerRelations: false
    })
  }
}

export default new UserService;