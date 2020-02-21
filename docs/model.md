# Модели и репозитории

```
Для работы с моделями и репозиториями необходимо зарегистрировать модуль
базы данных в entry point приложения (main.ts)
```

Модели могут быть абсолютно абстрактными и помещаются в репозитории. Абстрактный уровень моделей позволяет использовать
разные ORM будь то Sequelize/TypeOrm.

Репозитории созданы для обслуживания и описывания сложной бизнес логики для работы с моделями данных, или их mapping-а.

В данном фреймворке по-умолчанию установлена sequelize ORM.

Пример репозитория в модели:

```ts
// user.repository.ts
import { DataTypes, Model } from "sequelize";
import { DbMysqlService } from "implements/db/db.mysql.service";
import { Repository } from "core/base.repository";

export class User extends Model {}
export class UserRepository extends Repository<typeof User> {
  loadSchema(dbService: DbMysqlService) {
    User.init(
      {
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.INTEGER
      },
      { sequelize: dbService.dbConnection() }
    );
    return User;
  }
}
```

## Миграция и синхронизация схемы 

Для синхронизации схем данных, необходимо загрузить все репозитории в файле **run.db.sync.ts**

```
// Скрипт синхронизации схемы базы данных
async function boot() {
  const AppContainer = new Container({ dbService: DbMysqlService });
  // Загрузка сущностей для синхронизации схемы
  AppContainer.loadRepositories([UserRepository]);
  await AppContainer.getDbService.syncSchema();
}
boot().then(() => {
  console.info("Db Schema Complete");
  process.exit(0);
});
```

Затем запустить команду 

`npm run db:sync`

Схемы подключатся из метода **LoadSchema();** каждого репозитория.

## Подключения к бд

Сервис для подключения в БД можно реализовать самостоятельно для разного источника данных. Контейнер может хранить только один сервис подключения к базе данных. Ниже приведён пример подключения к **Mysql**.

```ts
export class DbMysqlService extends DbService {
  constructor(
    c: Container,
    private readonly configService: ConfigService = c.getService(ConfigService)
  ) {
    super(c);
  }

  public setupConnection() {
    this.connection = new Sequelize(
      this.configService.config.get("db.dbname"),
      this.configService.config.get("db.name"),
      this.configService.config.get("db.password"),
      {
        dialect: "mysql"
      }
    );
  }

```

Это подключение можно получить в любой точке приложения через контейнер.

```ts
export class TestService extends BaseService {
  constructor(
    c: Container,
    private readonly connection = c.getDbService().dbConnection
  ) {
    super(c);
  }
  async foo() {
    this.connection.query("select * from users").execute();
  }
}
```

В будущем планируется возможность создания множества подключений к базе данных.