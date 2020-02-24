import { BaseService } from "../../../frameworkCore/base.service";
import { Container } from "../../../frameworkCore/container.class";
import { UserRepository, User } from "./user.repository";

export class UserService extends BaseService {
  constructor(
    c: Container,
    private readonly userRepository: UserRepository = c.getRepository(
      UserRepository
    )
  ) {
    super(c);
  }

  authUser = (login, password): Promise<number> => {
    return this.userRepository.model.count({
      where: {
        login,
        password
      }
    });
  };

  getUserById = (id: number): Promise<User | null> =>
    this.userRepository.model.findOne({
      where: { id },
      attributes: ["id", "login"]
    });

  getUserByLogin = (
    login: string,
    attributes: string[] = ["id", "login"]
  ): Promise<User | null> =>
    this.userRepository.model.findOne({
      where: { login },
      attributes
    });

  createUser = () => {
    return this.userRepository.model.create({
      login: "admin",
      password: "123456"
    });
  };
  getUsers = () => {
    return this.userRepository.model.findAll();
  };
}
