import { body } from "express-validator";

const fName = body('name')
    .notEmpty()
    .withMessage('O campo nome é obrigatório.')
    .isString()
    .withMessage('O campo nome deve ser uma string.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('O campo nome deve ter entre 3 e 255 caracteres.')
    .trim();

const lastname = body('lastname').notEmpty()
    .withMessage('O campo sobrenome é obrigatório.')
    .isString()
    .withMessage('O campo sobrenome deve ser uma string.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('O campo sobrenome deve ter entre 3 e 255 caracteres.')
    .trim();

const email = body('email').notEmpty()
    .withMessage('O campo email é obrigatório.')
    .isEmail()
    .withMessage('O campo email precisa ser um endereço de email válido.')
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage('O campo email precisa ter de 3 a 255 caracteres.')
    .trim();

const password = body('password').notEmpty()
    .withMessage('O campo senha é obrigatório.')
    .isString()
    .withMessage('O campo senha precisa ser uma string.')
    .isLength({
      min: 8,
      max: 255,
    })
    .withMessage('O campo senha precisa ter de 8 a 255 caracteres.')
  .trim();
    
const login = [
  email,
  password,
];

const store = [
  fName,
  lastname,
  email,
  password,
];

const update = [
  fName,
  lastname,
  email,
];

export default {login, store, update};