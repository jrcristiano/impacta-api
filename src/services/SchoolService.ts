import { Request } from "express";
import { FindManyOptions, In } from "typeorm";
import School from "../entities/School";
import Filter from "../helpers/Filter";
import ISchool from "../interfaces/ISchool";
import ISchoolQueryParams from "../interfaces/ISchoolQueryParams";
import AbstractService from "./AbstractService";
import SegmentService from "./SegmentService";

class SchoolService extends AbstractService<School> {
  constructor() {
    super(School);
  }

  findAll(req: Request): Promise<School[]> {
    const query = req.query as ISchoolQueryParams;
    const filters = new Filter().setFilters(query)
      .getFilters();

    if (query.status && query.status != 'TODOS') {
      filters.where.status = query.status;
    }

    if (query.segmentos) {
      filters.where.segments.name = In(query.segmentos);
    }
    
    return this.getAll(filters as FindManyOptions<School>);
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