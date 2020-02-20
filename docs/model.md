# Модели и репозитории

```
Для работы с моделями и репозиториями необходимо зарегистрировать модуль
базы данных в entry point приложения (main.ts)
```

Модели могут быть абсолютно абстрактными и помещаются в репозитории. Абстрактный уровень моделей позволяет использовать
разные ORM будь то Sequelize/TypeOrm.

Репозитории созданы для обслуживания и описывания сложной бизнес логики для работы с моделями данных, или их mapping-а.

Пример репозитория в модели:

```ts
// post.repository.ts
import { Repository } from "../../../core/base.repository";
import sequelize = require("sequelize");

class Post extends sequelize.Model {}
export class PostRepository extends Repository<Post> {}
```

## Миграция и синхронизация схемы

Схемы для миграции и синхронизацию можно запускать через скрипт

`npm run db:sync`

Для описания схем исопльзуется файл **db/db.migration.service**.

Схемы для описания сущностей хранятся в каталоге **db/schema**

Ниже приведён пример для sequelize orm:

```ts
// db/schema/user.schema.ts
import { DataTypes } from "sequelize";

export const UserSchema = {
  login: DataTypes.STRING,
  password: DataTypes.STRING
};

// db.service.ts Создание User для sequelize
export class DbService extends BaseService {

  ...

  public initModels(c: Container) {
    console.info("[SERVER] Initial Models...");
    User.init(UserSchema, { sequelize: this.connection });
    c.getRepository(UserRepository).model = User;
    console.info("[SERVER] Models loaded");
  }

// user.repository.ts в модуле user
import { Repository } from "core/base.repository";
import sequelize = require("sequelize");

export class User extends sequelize.Model {}
export class UserRepository extends Repository<typeof User> {}
```

Обратите внимание, что в конструкторе

Для изящности все схемы всех таблиц можно выделить в отдельный каталог **db/schema\***. Используйте построение всего как вам будет удобней.

## Подключения к бд

Ниже приведён пример сервиса, который хранит объект подключения к базе данных и загрузка данных из конфигурационного файла

```ts
export class DbService extends BaseService {
  private readonly connection;
  get dbConnection() {
    return this.connection;
  }
  constructor(
    c: Container,
    private readonly configService: ConfigService = c.getService(ConfigService)
  ) {
    super(c);
    this.connection = new Sequelize(
      configService.config.get("db.dbname"),
      configService.config.get("db.name"),
      configService.config.get("db.password"),
      {
        dialect: "mysql"
      }
    );
  }
}
```

Это подключение можно получить в любой точке приложения через контейнер

```ts
export class TestService extends BaseService {
  constructor(
    c: Container,
    private readonly connection = c.getService(DbService).dbConnection
  ) {
    super(c);
  }
  async foo() {
    this.connection.query("select * from users").execute();
  }
}
```
