import { AppExpress } from "./core/app.facade";
import { Container } from "./core/container.class";
import { PostController } from "./implements/post/post.controller";
import { ConfigService } from "./implements/config/config.service";

const bootApp = function() {
  const expressApp = new AppExpress();
  const AppContainer = new Container();
  // Регистрация всех контроллеров, живущих в приложении
  AppContainer.loadControllers([PostController]);
  AppContainer.loadRoutes(expressApp);
  const port = AppContainer.getService(ConfigService).config.get("port");

  expressApp.server.listen(port || 3000, () => {
    console.info("[SERVER] started!");
  });
};
bootApp();
