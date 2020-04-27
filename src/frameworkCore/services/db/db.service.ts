import { BaseService } from "../../base.service";
import { Container } from "../../container.class";
import { ConfigService } from "../config/config.service";

/*
  Данный класс работает с TypeORM и завязан на ней
*/
export abstract class  DbService extends BaseService {
  /* 
    Подключение которое используют все модели.
    Обращение к данному подключению ненадежно, вместо этого
    используется геттер dbConnection
  */
  public connection: any = null;
  // Функция для настройки подключения 
  public abstract async setupConnection();

}
