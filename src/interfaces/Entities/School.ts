import Segment from "../../entities/School";

export default interface School {
  id: number;
  name: string;
  city: string;
  phone: string;
  cnpj: string;
  status: string;
  segments: Segment[];
  description?: string;
  created_at: Date;
  updated_at: Date;
};
