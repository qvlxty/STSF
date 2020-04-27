# Seeding данных

Если в вашим приложении необходимы начальные данные (аккаунт суперадмина, доступные языки для мультиязычных кейсов, список категорий, etc..), то здесь описано краткое руководство как использовать сервис db.seed.service.ts и писать seeds

Чтобы сделать собстсвенный seed данных, необходимо сделать всего лишь пару простых шагов:

1. Загрузить репозиторий интересующей вас сущности в **db.seed.service.ts**

```ts
// db.seed.service.ts 
export class DbSeedService extends BaseService {
   constructor(
    c: Container, 
    // Получение подключения
    private readonly connection: Connection = c.getConnection,
    // Получение пользовательского репозитория через подключение
    private readonly userRepo: Repository<User> = connection.getRepository(User)
  ) {
    super(c);
  }
```

2. Просто создать функцию в классе DbSeedService, например **createUser**.

```ts
// db.seed.service.ts 
createUser() {
    // Возвращает Promise, который ресолвится вне
      return this.userRepository.model.create({
          login:"admin",
          password:"123456"
      })
  }
```

Для контроля и сведения выполнения функций к синхронным можно использовать async/await, они ресолвятся на внешнем слое. (см. файл **run.seed.ts**)

3. Теперь для запуска Seed, необходимо использовать следующую комманду:

`npm run db:seed %название функции%`

В случае примера команда будет следующая:

`npm run db:seed createUser`


