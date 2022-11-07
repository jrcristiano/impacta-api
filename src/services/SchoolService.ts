import { Request } from "express";
import { FindManyOptions, FindOptionsWhere, In, Like, QueryBuilder } from "typeorm";
import School from "../entities/School";
import ISchool from "../interfaces/ISchool";
import AbstractService from "./AbstractService";
import SegmentService from "./SegmentService";

class SchoolService extends AbstractService<School> {
  constructor() {
    super(School);
  }

  findAll(req: Request): Promise<School[]> {
    const filters = {
      relations: ['segments'],
      where: {
        name: undefined,
        status: undefined,
        segments: {
          name: undefined,
        }
      },
      order: {
        id: 'DESC'
      },
      take: 8
    };

    if (req.query.buscar) {
      filters.where.name = Like(`%${req.query.buscar}%`) ;
    }

    if (req.query.status && req.query.status != 'TODOS') {
      filters.where.status = req.query.status;
    }

    if (req.query.segmentos) {
      filters.where.segments.name = In(req.query.segmentos as String[]);
    }
    
    return this.repository.find(filters);
  }

  async findSchoolByCnpj(cnpj: string) {
    return await this.repository.findOne({
      where: {cnpj}
    });
  }

  async save(school: School, req: Request): Promise<School> {
    const body = req.body as ISchool;
    
    school.name = body.name;
    school.city = body.city;
    school.phone = body.phone;
    school.cnpj = body.cnpj; 
    school.status = body.status;
    school.description = body.description;

    const segments = await SegmentService.findSegmentsByName(body.segments);
    school.segments = segments;
    
    return await this.persist(school);
  }
}

export default new SchoolService;