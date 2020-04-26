import { BaseService } from "frameworkCore/base.service";
import { Container } from "frameworkCore/container.class";
import { Connection } from "typeorm";

export class DbSeedService extends BaseService {
  constructor(
    c: Container
  ) {
    super(c);
  }

}
