import { CustomValidator } from "express-validator";
import SchoolService from "../../services/SchoolService";

const isUsedCnpj: CustomValidator = async (value) => {
  return SchoolService.findSchoolByCnpj(value).then(school => {
    if (school) {
      throw new Error('O cnpj informado já está em uso.');
    }
  });
};

export default isUsedCnpj;
