
import User from "../entities/User";
import AbstractService from "./AbstractService";

class UserService extends AbstractService<User> {
  constructor() {
    super(User);
  }
  
  async findUserByEmail(email: string) {
    return await this.repository.findOne({
      where: { email },
    });
  }
}

export default new UserService;