import { BaseService } from "../../../frameworkCore/base.service";
import { Container } from "../../../frameworkCore/container.class";
import { UserRepository } from "./user.repository";

export class UserService extends BaseService {
  constructor(
    c: Container,
    private readonly userRepository: UserRepository = c.getRepository(
      UserRepository
    )
  ) {
    super(c);
  }

  createUser = () => {
    return this.userRepository.model.create({
      login: "login",
      password: "123456"
    });
  };
  getUsers = () => {
    return this.userRepository.model.findAll();
  };
}
