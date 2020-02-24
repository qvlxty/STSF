import { DbMysqlService } from "application/db/db.mysql.service";
import { Container } from "frameworkCore/container.class";
import { UserRepository } from "application/modules/user/user.repository";
import { PostRepository } from "application/modules/post/post.repository";
import { DbSeedService } from "application/db/db.seed.service";

// Скрипт синхронизации схемы базы данных
async function boot() {
  const AppContainer = new Container({ dbService: DbMysqlService });
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
    console.error(`[ERROR] Функция ${process.argv[2]} не найдена!`)
  }
});
