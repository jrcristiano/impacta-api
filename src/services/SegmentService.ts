import { In } from "typeorm";
import Segment from "../entities/Segment";
import AbstractService from "./AbstractService";

class SegmentService extends AbstractService<Segment> {
  constructor() {
    super(Segment);
  }

  async findSegmentsByName(names: Segment[]) {
    return this.repository.find({ where: { name: In(names) } });
  }
}

export default new SegmentService;