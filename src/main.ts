import { AppExpress, App } from "./frameworkCore/app.facade";
import { Container } from "./frameworkCore/container.class";
import { ConfigService } from "./frameworkCore/services/config/config.service";

const bootApp = async function () {
  const expressApp = new AppExpress();
  const AppContainer = new Container()
  await AppContainer.init({
    app: expressApp
  });

  const port = AppContainer.getService(ConfigService).config.get("port");
  expressApp.server.listen(port || 3000, () => {
    console.info(
      "\x1b[36m%s\x1b[0m",
      `[SERVER] Сервер запущен [ http://127.0.0.1:${port} ]`
    );
  });
};
bootApp();
