export default interface IQueryParams {
  search?: string;
  columns?: string[];
  offset?: number;
  take?: number;
  relations?: string;
  eager?: string;
  order?: string;
  sort?: string[];
}
