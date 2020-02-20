import { AppExpress, App } from "./core/app.facade";
import { Container } from "./core/container.class";
import { ConfigService } from "./implements/config/config.service";
import { DbService } from "./implements/db/db.service";
import { UserController } from "./implements/modules/user/user.controller";

const bootApp = function() {
  const expressApp = new AppExpress();
  const AppContainer = new Container();
  AppContainer.registerService(DbService);
  AppContainer.loadControllers([UserController]);
  AppContainer.loadRoutes(expressApp);
  const port = AppContainer.getService(ConfigService).config.get("port");

  expressApp.server.listen(port || 3000, () => {
    console.info("[SERVER] started!");
  });
};
bootApp();
