import { BaseService } from "../../base.service";
import { Container } from "../../container.class";

export abstract class DbService extends BaseService {
  /* 
    Подключение которое используют все модели.
    Обращение к данному подключению ненадежно, вместо этого
    используется геттер dbConnection
  */
  public connection = null;
  // Автоматическое создание подключения
  public dbConnection() : any {
    if (this.connection === null) {
      console.info('[SERVER] Создание подключения...')
      this.setupConnection();
    }
    return this.connection;
  }
  constructor(c: Container) {
    super(c);
  }

  // Функция для настройки подключения
  abstract setupConnection = () => {};
  abstract syncSchema = () => {};
}
