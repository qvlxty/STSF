# qCcontainer

![](https://img.shields.io/badge/express-4.17-green)
![](https://img.shields.io/badge/ejs-3.0-yellow)
![](https://img.shields.io/badge/typescript-3.7.5-blue)

Микрофреймворк для разработки приложений, включающий в себя контейнер инъекции зависимостей, построенный на базе JS объектов (Ассоциативных массивах).
Сделано ради интереса. Лесопедов кривых много.

## Внутрянка

- Сам DI контейнер, или что-то похожее на него.
- Автоматическое создание зависимостей, если их нет, и их разрешение
- Сервис конфигов из коробки
- Сервис работы с БД (Возможность подключать разные источники данных)
- Плавающая архитектура, возможность подключить различные ORM (TypeOrm/Sequelize)
- Возможность автогенерации документации API 
- Гибкая настройка Middleware на наборы роутов

## Запуск

`npm i`

`cp config.example.json config.json`

Настроить config.json

`npm run start`

## Дока

### Основны

- [Экземпляр приложения](docs/app.md)
- [Контроллер и Middleware](docs/controller.md)
- [Сервисы](docs/service.md)
- [Модели и репозитории](docs/model.md)

### Digging deeper

- [Инъекция зависимостей](docs/injection.md)
- [Автоматическая генерация API документации](docs/doc.generate.md)
- [Лог](docs/log.md)
- [PassportJS](docs/passport.md)
- [Seeding данных](docs/seed.md)

### Гайды

- [Создания Записной книжки](about:blank)

## Current ver.

v 0.1.1

- В ядро установлен сервис Passport
- Seed и дока по нему

## Backlog

- Добавление слоя валидации