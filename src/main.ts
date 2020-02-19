import { Container } from "./core/container.class";
import { PostService } from "./implements/post.service";

// Создание контейнера
const container1 = new Container();
// Регистрируем тестовый сервис
container1.registerService(PostService);
// Достаем
const postService: PostService = container1.getService(PostService);
// Меняем состояние
postService.turnSwitch(true);
postService.showSwitchState();
postService.turnSwitch(false);
const postService2: PostService = container1.getService(PostService);
postService2.showSwitchState();
postService2.turnSwitch(true);
postService.showSwitchState();
// Как видно в примере выше - postService и postService2 ссылаются на один и тот же сервис
// Значит он засинглтонен на уровне контейнера

// container1.logServicesModels();
