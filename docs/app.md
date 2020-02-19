# Экземпляр приложения

Есть возможность создать приложение с использованием express. Если необходимо дописать функционал, то есть абстрактный класс **App** в app.facade.ts. От него можно наследоваться и реализовать функционал другой библиотеки, например, koa.

Приложение создается с помощью класса-фасада **App**.
Затем необходимо произвести загрузку всех доступных контроллеров в DI контейнер.
После чего, необходимо передать сервер контейнеру, чтобы он мог настроить все доступные роуты.

Пример создания приложения описан ниже

```ts
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
```
