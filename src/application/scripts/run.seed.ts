import { Container } from "frameworkCore/container.class";
import { DbSeedService } from "application/db/db.seed.service";

// Скрипт синхронизации схемы базы данных
async function boot() {
  const AppContainer = new Container();
  await AppContainer.init({});
  try {
    await AppContainer.getService(DbSeedService)[process.argv[2]]();
  } catch (err) {
    throw err;
  }
}
boot().then(() => {
  console.info("Seed выполнен успешно");
  process.exit(0);
}).catch(err =>{
  if (process.argv.length < 2) {
    console.error('[ERROR] Вы не указали функцию seed данных')
  } else {
    console.error(`[ERROR] Функция ${process.argv[2]} не найдена/или произошла другая ошибка:`)
    console.error(err);
  }
});
