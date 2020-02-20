import { DbMysqlService } from "implements/db/db.mysql.service";
import { Container } from "core/container.class";

// Скрипт синхронизации схемы базы данных
async function boot() {
  const AppContainer = new Container({ dbService: DbMysqlService });
  await AppContainer.getDbService.syncSchema();
}
boot().then(() => {
  console.info("Db Schema Complete");
});
