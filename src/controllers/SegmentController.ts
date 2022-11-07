import { Request, Response } from "express";
import SegmentService from "../services/SegmentService";

class SegmentController {
  async index(req: Request, res: Response) {
    try {
      return res.status(200).json(await SegmentService.getAll(req));
    } catch ({ message }) {
      return res.status(500).json({ message });
    }
  }
}

export default new SegmentController;