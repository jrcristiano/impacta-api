import QueryParams from "./QueryParams";

export default interface SchoolQueryParams extends QueryParams {
  segmentos ?: string[];
  status?: string;
}