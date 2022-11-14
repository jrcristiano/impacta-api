export default interface SchoolBody {
  id: number;
  name: string;
  city: string;
  phone: string;
  cnpj: string;
  status: string;
  segments: string[];
  description?: string;
  created_at: Date;
  updated_at: Date;
};
