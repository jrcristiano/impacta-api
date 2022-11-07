import School from "../entities/School";

export default interface UserInterface {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  school_id: School;
  created_at: Date;
  updated_at: Date;
};
