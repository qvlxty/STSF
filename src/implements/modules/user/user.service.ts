import { BaseService } from "../../../core/base.service";
import { Container } from "../../../core/container.class";
import { UserRepository } from "./user.repository";

export class UserService extends BaseService {
  constructor(
    c: Container,
    private readonly userRepository: UserRepository = c.getRepository(
      UserRepository
    )
  ) {
    super(c);
    console.log('constructor yes');
    console.log(this.userRepository);
  }

  async getUsers(req,res) {
    console.log('xyi');
    console.log(this.userRepository);
    const data = await this.userRepository.model.get();
    res.json(data);
  }
}
