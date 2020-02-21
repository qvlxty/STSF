## Генерация документации

Для генерации документации просто подключите модуль ApiController.

```ts
import { AppExpress } from "./frameworkCore/app.facade";
import { Container } from "./frameworkCore/container.class";
import { ConfigService } from "./frameworkCore/services/config/config.service";
import { UserController } from "./application/modules/user/user.controller";
import { DbMysqlService } from "./application/db/db.mysql.service";
import { ApiController } from "frameworkCore/services/apiGenerate/api.controller";

const bootApp = function() {
  const expressApp = new AppExpress();
  const AppContainer = new Container({
      // Подключение API контроллера
    controllers: [UserController,ApiController],
    dbService: DbMysqlService
  });
  AppContainer.loadRoutes(expressApp);
  expressApp.server.listen(3000);
};
bootApp();
```

Документация будет ждать вас по пути **%server%/doc**

## Меры предосторожности

Для корректной работы генерации документации необходимо оставить стандартный путь **views** и **view engine**