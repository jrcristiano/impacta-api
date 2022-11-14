import School from "../Entities/School";

export default interface UserInterface {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  school_id: School;
  role: string;
  created_at: Date;
  updated_at: Date;
};
