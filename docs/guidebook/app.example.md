# Пример создания простой гостевой книги

1. Склонируйте данный репозиторий
2. Установите сервер базы данных sql (рекомендуется mysql, так как он будет описан в данном гайде) 
3. Переименуйте config.example.json в config.json 
4. Укажите конфигурации в config.json 
4. Запустите сервер в режим разработки:

``
npm run start:dev
``

Разрабатывать на данном микрофреймворке можно как угодно, но мы будем опираться на работу с модулями и зависимостями. 

Все модули конечного приложения должны храниться в каталоге **application/modules**.

## 1. Создание схемы данных

Опишем данные, которые будем хранить в гостевой книге. Для этого создадим каталог guestBook в **application/modules**.

Затем создадим в нём файл **guestBook.entity.ts**

<details>
    <summary>Пояснение </summary>

Под капотом фреймворка используется ORM модуль TypeORM. Поэтому, согласно [официальной документации](https://typeorm.io/#/entities), опишем сущность (**entity**, на языке TypeORM) и синхронизируем сущность с нашей базой данных.
<hr>
</details>

Сущность будет выглядеть следующим образом:

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class guestBook {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    author: number;

    @Column({
        type: 'text',
        nullable: false
    })
    text: string;
}
```

После создания сущности выполните команду **npm run db:sync** для синхронизации схем с базой данных.

После выполнения команды, в вашей базе данных должна появиться таблица guest_book , которая будет хранить записи пользователей.

## 2. Создание простого контроллера

Для того, чтобы пользователь взаимодействовал с нашим приложением, сделаем простой контроллер, состоящий из двух методов:

- Метод, который имеет форму для отправки данных
- Метод, который получает данные и сохраняет в бд
- Метод, который отображает данные 

Данный контроллер **сохраните** в одной папке вместе с guestBook.entity.ts

```ts
// guestBook.controller.ts
@ControllerApiPrefix('/guestBook') 
export class GuestBookController extends Controller {

    @Get('/add')
    sendForm(req,res) {
        res.render('guestBook/form');
    }

    @Post('/addData')
    storeData(req,res) {
        // indev
    }

    @Get('/allRecords') 
    allRecords(req,res) {
        // res.render('guestBook/list')
    }
}
```

Не забудьте подключить его в файле **main.ts**, чтобы контроллер существовал в контейнере приложения.

```ts
// main.ts
...
  const AppContainer = new Container()
  await AppContainer.init({
    //Модуль подключен Здесь
    controllers: [GuestBookController,ApiController],
    app: expressApp
  });
...
```

Если вы подключили контроллер ApiControler для генерации документации, то в списке методов увидите появившиеся 3 новых метода.

Переходим к верстке простой формы.

<details>
    <summary>Пояснение про Views </summary>

Все **views** которые отрисовываются сервером хранятся по пути **application/views**.

Для [рендера](https://expressjs.com/ru/guide/using-template-engines.html) странички используется метод render объекта res:

```ts
    @Get('/add')
    sendForm(req,res) {
        res.render('guestBook/form');
    }
```

В данную функцию передаем путь нашей странички. 
<hr>
</details>

Создадим каталог **guestBook** в **application/views**, затем сохраним в нём файл **form.ejs** 

По-умолчанию, используется шаблонизатор [ejs](https://ejs.co/), поэтому примеры будут описываться с применением данного синтаксиса.

```html
<html>
    <head>
        <title>Form</title>
    </head>
    <body>
        <form action="/guestBook/addData" method="POST">
            <p><input type="text" name="author"></p>
            <p><textarea name="text"></textarea></p>
            <button type="submit">Отправить</button>
        </form>
    </body>
</html>
```

Страница готова, вы сможете перейти на неё и посмотреть по адресу **/guestBook/add**

## 3. Подключаем TypeORM и используем Контейнер!

<details>
    <summary>Пояснение - Что происходит? </summary>
    Контейнер приложения обрабатывает и хранит в себе подключение к бд, которое было описано в config.json. Чтобы работать с данными, необходимо получить к ним доступ.

Делается это с помощью инъекции зависимости.

<hr>
</details>

Модифицируем контроллер следующим образом:

```ts
@ControllerApiPrefix('/guestBook') 
export class GuestBookController extends Controller {

    constructor(
        c:Container,
        private readonly guestBookRepo: Repository<guestBook> = c.getRepository(guestBook)
    ) { super(c); }

    @Get('/add')
    sendForm(req,res) {
        res.render('guestBook/form');
    }

    @Post('/addData')
    storeData(req,res) {
        // indev
    }

    @Get('/allRecords') 
    allRecords(req,res) {
        // res.render('guestBook/list')
    }
}
```
<details>
    <summary>Пояснение - Что происходит? </summary>

С помощью конструктора, класс контроллера может перехватывать доступ к контейнеру приложения по ссылке. 

Таким образом, мы получаем [репозиторий](https://typeorm.io/#/working-with-repository) 
Данный репозиторий поможет выполнять [CRUD](https://ru.wikipedia.org/wiki/CRUD) операции над данными.
<hr>
</details>

Модифицируем метод сохранения данных следующим образом:

```ts
    @Post('/addData')
    async storeData(req,res) {
        console.log(req.body);
        await this.guestBookRepo.save(req.body);
        return "Сохранено";
    }
```

Теперь попробуйте сохранить данные, используя форму. Если в таблице появилась запись,а сервер вернул фразу "Сохранено", значит всё работает.

## 3. Отрендерим список записей гостевой книги

- Создадим файл list.ejs во **view/guestBook**
- Модифицируем метод allRecords следующим образом:

```ts
    @Get('/allRecords')
    async allRecords(req, res) {
        const guestBookItems = await this.guestBookRepo.find();
        res.render('guestBook/list', {
            guestBookItems
        })
    }
```

- Модифицируем list.ejs, создав сверстав там вывод переданных данных, через метод render

```html
<html>
    <head>
    <title>List</title>
</head>
    <body>
        <div style="margin:auto; max-width:800px;">
            <% for (let i = 0; i < guestBookItems.length; i++) { %>
            <div>
                <p>Автор: <%= guestBookItems[i].author %></p>
                <p>Текст: <%= guestBookItems[i].text %></p>
            </div>
            <% } %>
        </div>
    </body>
</html>
```

Готово. Можно протестировать вывод данных гостевой книги по адресу **guestBook/allRecords**

## 4. Получившийся модуль:

Листинг получившегося кода:

```ts
// guestBook.controller.ts
import { ControllerApiPrefix, Get, Post } from "frameworkCore/decorators/controller.decorator";
import { Controller } from "frameworkCore/base.controller";
import { Container } from "frameworkCore/container.class";
import { Repository } from "typeorm";
import { guestBook } from "./guestBook.entity";

@ControllerApiPrefix('/guestBook')
export class GuestBookController extends Controller {

    constructor(
        c: Container,
        private readonly guestBookRepo: Repository<guestBook> = c.getRepository(guestBook)
    ) { super(c); }

    @Get('/add')
    sendForm(req, res) {
        res.render('guestBook/form');
    }

    @Post('/addData')
    async storeData(req, res) {
        console.log(req.body);
        await this.guestBookRepo.save(req.body);
        return "Сохранено";
    }

    @Get('/allRecords')
    async allRecords(req, res) {
        const guestBookItems = await this.guestBookRepo.find();
        res.render('guestBook/list', {
            guestBookItems
        })
    }
}
```

```ts
// guestBook.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class guestBook {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    author: number;

    @Column({
        type: 'text',
        nullable: false
    })
    text: string;
}
```

```html
// views/list.ejs
<html>
    <head>
    <title>List</title>
</head>
    <body>
        <div style="margin:auto; max-width:800px;">
            <% for (let i = 0; i < guestBookItems.length; i++) { %>
            <div>
                <p>Автор: <%= guestBookItems[i].author %></p>
                <p>Текст: <%= guestBookItems[i].text %></p>
            </div>
            <% } %>
        </div>
    </body>
</html>
```

```html
// views/form.ejs
<html>
    <head>
        <title>Form</title>
    </head>
    <body>
        <form action="/guestBook/addData" method="POST">
            <p><input type="text" name="author"></p>
            <p><textarea name="text"></textarea></p>
            <button type="submit">отправить</button>
        </form>
    </body>
</html>
```

## 5. Рефакторинг с использованием сервисов

Чтобы исключить возможность появления Fat Stupid Ugly Controller, все большие операции вымощаются в Сервисы, которые могут обслуживать несколько 
контроллеров. 

Используя документацию, измените контроллер таким образом, чтобы он вызывал методы guestBookService.

Создайте guestBookService класс, наследуя BaseService, вынесите в него логику работы с данными, и подключите его в GuestBookController используя
[инъекцию зависимости](../docs/injection.md)



