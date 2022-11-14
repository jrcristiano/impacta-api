import FilterApi from "./FilterApi";
import { FindOperator } from "typeorm";

export default interface SchoolFilterApi extends FilterApi {
  where?: {
    name?: undefined | FindOperator<string>;
    status?: undefined | string;
    segments?: {
      name?: undefined | FindOperator<string>;
    }
  };
}
