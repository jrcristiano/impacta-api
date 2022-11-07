import { Request, Response } from "express";
import { validationResult } from "express-validator";
import School from "../entities/School";
import SchoolService from "../services/SchoolService";

class SchoolController {
  async index(req: Request, res: Response) {
    try {
      return res.status(200).json(await SchoolService.findAll(req));
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty() === false) {
        const errorMessages = errors.array().map(error => error.msg)
        
        return res.status(400).json({
          message: errorMessages
        });
      }

      const school = req.body as School;
      await SchoolService.save(school, req);

      return res.status(201).json({
        message: 'Escola cadastrada com sucesso.'
      });
      
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }
  
  async show(req: Request, res: Response) {
    try {
      const school = await SchoolService.findById(req.params.id);
      if (!school) {
        return res.status(404).json({
          message: 'Escola não encontrada.'
        });
      }

      return res.status(200).json(school);
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty() === false) {
        const errorMessages = errors.array().map(error => error.msg)
        
        return res.status(400).json({
          message: errorMessages
        });
      }

      let school = await SchoolService.findById(req.params.id);
      if (!school) {
        return res.status(200).json({
          message: 'Escola não encontrada.',
        })
      }

      await SchoolService.save(school, req);
      return res.status(200).json({
        message: 'Escola editada com sucesso.',
      });
    } catch ({ message }) {
      return res.status(500).json({ message })
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      await SchoolService.forceDelete(req.params.id);
      return res.status(200).json({
        message: `Escola ${req.params.id} removida com sucesso.`
      });
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }
}

export default new SchoolController;