import { DbMysqlService } from "application/db/db.mysql.service";
import { Container } from "frameworkCore/container.class";
import { UserRepository } from "application/modules/user/user.repository";
import { PostRepository } from "application/modules/post/post.repository";

// Скрипт синхронизации схемы базы данных
async function boot() {
  const AppContainer = new Container({ dbService: DbMysqlService });
  // Загрузка сущностей для синхронизации схемы
  AppContainer.loadRepositories([UserRepository,PostRepository]);
  await AppContainer.getDbService.syncSchema();
}
boot().then(() => {
  console.info("Db Schema Complete");
  process.exit(0);
});
