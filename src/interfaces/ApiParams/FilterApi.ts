export default interface IApiQueryParams {
  loadEagerRelations?: boolean;
  relations: string[],
  order?: object;
  take?: number;
  offset?: number;
  select?: string[];
  where?: object;
  sort?: string[];
}