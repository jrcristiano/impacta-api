import { Request } from "express";
import { FindManyOptions, In, Like } from "typeorm";
import School from "../entities/School";
import FilterApi from "../helpers/FilterApi";
import SchoolFilterApi from "../interfaces/ApiParams/SchoolFilterApi";
import SchoolQueryParams from "../interfaces/QueryParams/SchoolQueryParams";
import SchoolBody from "../interfaces/RequestBody/SchoolBody";
import AbstractService from "./AbstractService";
import SegmentService from "./SegmentService";

class SchoolService extends AbstractService<School> {
  constructor() {
    super(School);
  }

  async getAll(req?: Request): Promise<School[]> {
    const query = req.query as SchoolQueryParams;
    let filterApi = new FilterApi()
      .setFilters(query)
      .getFilters() as SchoolFilterApi;
    
    const filters = {
      ...filterApi,
      where: {
        name: undefined,
        status: undefined,
        segments: {
          name: undefined
        }
      }
    }

    if (query.search) {
      filters.where.name = Like(`%${query.search}%`)
    }

    if (query.status && query.status != 'TODOS') {
      filters.where.status = query.status;
    }

    if (query.segmentos) {
      filters.where.segments.name = In(query.segmentos);
    }
    
    return await this.repository.find(filters as FindManyOptions<School>);
  }

  async findSchoolByCnpj(cnpj: string) {
    return await this.repository.findOne({
      where: {cnpj}
    });
  }

  async save(req: Request): Promise<School> {
    const body = req.body as SchoolBody;
    
    let school = new School;
    if (req.params.id) {
      school.id = parseInt(req.params.id);
    }

    school.name = body.name;
    school.city = body.city;
    school.phone = body.phone;
    school.cnpj = body.cnpj; 
    school.status = body.status;
    school.description = body.description;

    const segments = await SegmentService.findSegmentsByName(body.segments);
    school.segments = segments;
    
    return await this.repository.save(school);
  }
}

export default new SchoolService;