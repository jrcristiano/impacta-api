import { FindOperator } from "typeorm";

export default interface IApiQueryParams {
  loadEagerRelations?: boolean;
  where?: {
    name?: undefined | FindOperator<string>;
    status?: undefined | string;
    segments?: {
      name?: undefined | FindOperator<string>;
    }
  };
  order?: object;
  take?: number;
  offset?: number;
  select?: string[];
}