import { load } from 'ts-dotenv';

const env = load({
  PORT: Number,
  PASSWORD_SALT: Number,
  TOKEN_EXPIRES_IN: Number,
  API_SECRET_TOKEN: String,

  TYPEORM_CONNECTION: String,
  TYPEORM_USERNAME: String,
  TYPEORM_PASSWORD: String,
  TYPEORM_DATABASE: String,
  TYPEORM_PORT: Number,
});

export default env;
