import IQueryParams from "./IQueryParams";

export default interface ISchoolQueryParams extends IQueryParams {
  segmentos ?: string[];
  status?: string;
}