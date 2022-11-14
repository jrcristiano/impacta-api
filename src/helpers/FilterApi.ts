import IFilterApi from "../interfaces/ApiParams/FilterApi";
import IQueryParams from "../interfaces/QueryParams/QueryParams";
class FilterApi {
  private filters: IFilterApi;

  setFilters(query: IQueryParams) {
    const filters = {
      loadEagerRelations: false,
      relations: [],
      order: {
        id: 'DESC'
      },
      sort: [],
      take: 8,
      offset: 0,
      select: [] as string[],
    } as IFilterApi;

    if (query.columns) {
      filters.select.push('id', ...query.columns);
    }

    if (query.eager == 'true') {
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

    if (query.order && query.sort) {
      filters.order = {};
      for (const sort of query.sort) {
        filters.order[sort] = query.order;
      }
    }

    this.filters = filters;
    return this;
  }

  getFilters(): IFilterApi {
    return this.filters;
  }
}

export default FilterApi;
