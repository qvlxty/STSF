import { BaseService } from "frameworkCore/base.service";
import { Container } from "frameworkCore/container.class";
import { User } from "application/modules/user/user.entity";
import { Connection, Repository } from "typeorm";

export class DbSeedService extends BaseService {
  constructor(
    c: Container, 
    private readonly connection: Connection = c.getConnection,
    private readonly userRepo: Repository<User> = connection.getRepository(User)
  ) {
    super(c);
  }

  createAdmin() {
    return this.userRepo.save({
      login:"hello",
      password:"world"
    })
  }
}
