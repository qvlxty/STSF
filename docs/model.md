# Сущности и репозитории


Entity (сущности) и их репозитории это классы, которые описывают на объектном языке ваши данные.

Репозитории созданы для обслуживания и описывания сложной бизнес логики для работы с моделями данных, или их mapping-а.

В качестве ORM в данном фремйворке используется TypeORM.

Пример описывания сущности:

```ts
// user.repository.ts
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'string'
    })
    login: string;

    @Column({
        type: 'string'
    })
    passord: string;

}
```

Больше про Entity вы можете прочитать на сайте документации [typeorm -> entities](https://typeorm.io/#/entities)

## Миграция и синхронизация схемы 

Для синхронизации схем данных, необходимо загрузить все репозитории в файле **run.db.sync.ts**
 
```ts
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

Это всё.

Схемы подключатся из метода **LoadSchema();** каждого репозитория.

Поддержка миграция в процессе...

## Подключения к бд

Под капотом используется TypeORM. 
Все операции с бд выполняются через одно подключение, которое настраивается через config.json.
Пример схемы вы можете найти в config.example.json.

## Работа с подключением

Это подключение можно получить в любой точке приложения через контейнер.

```ts
export class TestService extends BaseService {
  constructor(
    c: Container,
    private readonly connection = c.getConnection
  ) {
    super(c);
  }
  async foo() {
    this.connection.query("select * from users").execute();
  }
}
```

В будущем планируется возможность создания множества подключений к базе данных.