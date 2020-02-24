import { BaseService } from "frameworkCore/base.service";
import { Container } from "frameworkCore/container.class";
import { UserRepository } from "application/modules/user/user.repository";

export class DbSeedService extends BaseService {
  constructor(
    c: Container,
    // Загрузка необходимых для сидинга репозиториев
    private readonly userRepository: UserRepository = c.getRepository(
      UserRepository
    )
  ) {
    super(c);
  }

  createUser() {
      return this.userRepository.model.create({
          login:"admin",
          password:"123456"
      })
  }
}
