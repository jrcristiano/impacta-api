import FilterApi from "./FilterApi";
import { FindOperator } from "typeorm";

export default interface UserFilterApi extends FilterApi {
  where?: {
    name?: undefined | FindOperator<string>;
    role?: undefined | string;
    school: {
      id: undefined | number
    },
  };
}
