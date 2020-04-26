import { AppExpress, App } from "./frameworkCore/app.facade";
import { Container } from "./frameworkCore/container.class";
import { ConfigService } from "./frameworkCore/services/config/config.service";
import { UserController } from "./application/modules/user/user.controller";
import { ApiController } from "frameworkCore/services/apiGenerate/api.controller";
import { PassportService } from "application/passport/passport.service";
import passport = require("passport");
import bodyParser = require("body-parser");
import expressSession = require("express-session");

const bootApp = async function () {
  const expressApp = new AppExpress();

  // Для работы PassportJS
  expressApp.setupApp({
    modules: [
      expressSession({ secret: "cats", resave: false, saveUninitialized: true }),
      passport.initialize(),
      passport.session(),
      bodyParser.urlencoded({ extended: true }),
    ]
  });
  const AppContainer = new Container()
  await AppContainer.init([UserController, ApiController]);
  AppContainer.loadRoutes(expressApp);
  AppContainer.registerService(PassportService);

  const port = AppContainer.getService(ConfigService).config.get("port");
  expressApp.server.listen(port || 3000, () => {
    console.info(
      "\x1b[36m%s\x1b[0m",
      `[SERVER] Сервер запущен [ http://127.0.0.1:${port} ]`
    );
  });
};
bootApp();
