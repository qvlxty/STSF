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
      console.info("\x1b[37m%s\x1b[0m",'[SERVER] Создание подключения...',"\x1b[0m")
      this.setupConnection();
    }
    return this.connection;
  }
  constructor(c: Container) {
    super(c);
  }

  // Функция для настройки подключения
  public abstract setupConnection();
  public abstract syncSchema ();
}
