export default interface UserBody {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
  school: string;
  created_at: Date;
  updated_at: Date;
}
