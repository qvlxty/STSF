import { DbMysqlService } from "implements/db/db.mysql.service";
import { Container } from "core/container.class";
import { UserRepository } from "implements/modules/user/user.repository";

// Скрипт синхронизации схемы базы данных
async function boot() {
  const AppContainer = new Container({ dbService: DbMysqlService });
  // Загрузка сущностей для синхронизации схемы
  AppContainer.loadRepositories([UserRepository]);
  await AppContainer.getDbService.syncSchema();
}
boot().then(() => {
  console.info("Db Schema Complete");
  process.exit(0);
});
