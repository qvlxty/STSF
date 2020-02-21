import { AppExpress } from "./core/app.facade";
import { Container } from "./core/container.class";
import { ConfigService } from "./core/services/config/config.service";
import { UserController } from "./implements/modules/user/user.controller";
import { DbMysqlService } from "./implements/db/db.mysql.service";

const bootApp = function() {
  const expressApp = new AppExpress();
  expressApp.setupApp({
    viewEngine: "ejs",
    modules: [],
    staticFolders: [{ path: "views/css", folder: "views/css" }],
    viewCatalog: "views"
  });
  const AppContainer = new Container({
    controllers: [UserController],
    dbService: DbMysqlService
  });
  AppContainer.loadRoutes(expressApp);

  const port = AppContainer.getService(ConfigService).config.get("port");
  expressApp.server.listen(port || 3000, () => {
    console.info(
      "\x1b[36m%s\x1b[0m",
      `[SERVER] Сервер запущен [ http://127.0.0.1:${port} ]`
    );
  });
};
bootApp();
