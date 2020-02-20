import { Container } from "../../core/container.class";
import { DbService } from "../db/db.service";

// Скрипт синхронизации схемы базы данных
async function boot() {
  const AppContainer = new Container();
  const migrateService: DbService = AppContainer.getService(DbService);
  await migrateService.syncSchema();
}
boot().then(()=>{
    console.info('Db Schema Complete')
});
