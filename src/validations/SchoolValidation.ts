import { body, CustomValidator } from "express-validator";
import isUsedCnpj from "./custom/Cnpj";

const schoolName = body('name')
  .notEmpty()
  .withMessage('O campo nome é obrigatório.')
  .isString()
  .withMessage('O campo nome deve ser uma string.')
  .isLength({
      min: 2,
      max: 255,
    })
  .withMessage('O campo nome deve ter entre 2 e 255 caracteres.')
  .trim();

const city = body('city').notEmpty()
    .withMessage('O campo cidade é obrigatório.')
    .isString()
    .withMessage('O campo cidade deve ser uma string.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('O campo cidade precisa ter de 3 a 255 caracteres.')
    .trim();
    
const phone = body('phone').notEmpty()
    .withMessage('O campo telefone é obrigatório.')
    .isString()
    .withMessage('O campo telefone deve ser uma string.')
    .isLength({
      min: 8,
      max: 255,
    })
    .withMessage('O campo telefone precisa ter de 8 a 255 caracteres.')
    .trim();
    
const cnpj = body('cnpj').notEmpty()
    .withMessage('O campo cnpj é obrigatório.')
    .isString()
    .withMessage('O campo cnpj deve ser uma string.')
    .isLength({
      min: 14,
      max: 14,
    })
    .withMessage('O campo cnpj precisa ter de 14 caracteres.')
  .trim();
    
const status = body('status').notEmpty()
    .withMessage('O campo status é obrigatório.')
    .isString()
    .withMessage('O campo status deve ser uma string.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('O campo telefone precisa ter de 3 a 255 caracteres.')
  .trim();
    
const segments = body('segments').notEmpty()
  .withMessage('O campo segmentos é obrigatório.')
  .isArray()
  .withMessage('O campo segmentos deve ser um array.');
  
const description = body('description')
    .isString()
    .trim();
    
const isCnpjAccepted = body('cnpj').custom(isUsedCnpj);

export default [
  schoolName,
  city,
  phone,
  cnpj,
  isCnpjAccepted,
  status,
  segments,
  description
];
