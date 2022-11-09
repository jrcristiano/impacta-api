import { In, Like } from "typeorm";
import IApiQueryParams from "../interfaces/IApiParams";
import IQueryParams from "../interfaces/IQueryParams";

class Filter {
  private filters: IQueryParams;

  setFilters(query: IQueryParams) {
    const filters = {
      loadEagerRelations: false,
      order: {
        id: 'DESC'
      },
      take: 8,
      offset: 0,
      select: [] as string[],
      where: {
          name: undefined,
          status: undefined,
          segments: {
            name: undefined,
        }
      }
    } as IApiQueryParams;

    if (query.columns) {
      filters.select.push('id', ...query.columns);
    }

    if (query.search) {
      filters.where.name = Like(`%${query.search}%`) ;
    }

    if (query.relations == 'true') {
      filters.loadEagerRelations = true;
    }

    if (query.take) {
      filters.take = query.take;
    }

    if (query.offset) {
      filters.offset = query.offset;
    }

    if (query.columns) {
      filters.select.push('id', ...query.columns);
    }

    if (query.search) {
      filters.where.name = Like(`%${query.search}%`) ;
    }

    this.filters = filters;
    return this;
  }

  getFilters(): IApiQueryParams {
    return this.filters;
  }
}

export default Filter;
