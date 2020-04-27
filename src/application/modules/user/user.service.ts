import { BaseService } from "../../../frameworkCore/base.service";
import { Container } from "../../../frameworkCore/container.class";
import { User } from "./user.entity";

export class UserService extends BaseService {
  constructor(
    c: Container,
    private readonly connection = c.getConnection,
    private readonly userRepository = c.getRepository(User)
  ) {
    super(c);
  }

  authUser = (login, password): Promise<number> => {
    return this.connection.getRepository(User).count({
      where: {
        login,
        password
      }
    });
  };

  getUserById = (id: number): Promise<User | null> =>
    this.userRepository.findOne({
      where: { id },
      select: ["id", "login"]
    });

  getUserByLogin = (
    login: string,
  ): Promise<User | null> =>
    this.userRepository.findOne({
      select: ["id", "login"],
      where: { login },
    });

  createUser = () => {
    return this.userRepository.create({
      login: "admin",
      password: "123456"
    });
  };
  getUsers = () => {
    return this.userRepository.findAll();
  };
}
