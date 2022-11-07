import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import env from "../../env";
import JwtDecoded from "../interfaces/IJwtDecoded";

class CheckJwtMiddleware {
  handler(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'No token provided.',
      })
    }

    jwt.verify(token, env.API_SECRET_TOKEN, function (err: VerifyErrors, decoded: JwtDecoded) {
      if (err) {
        return res.status(500).json({
          message: 'Failed to authenticate token.'
        });
      }

      req.user = decoded.user;
      next();
    });
  }
}

export default new CheckJwtMiddleware().handler;
