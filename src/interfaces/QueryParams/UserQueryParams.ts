import QueryParams from "./QueryParams";

export default interface UserQueryParams extends QueryParams {
  role?: string;
  school?: number;
}
