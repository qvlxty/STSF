import { BaseService } from "../../base.service";
import * as convict from "convict";
import { ConfigSchema } from "./config.schema";

/*
  Пример сервиса, который обслуживает конфиг
*/
export class ConfigService extends BaseService {
  private configData: convict.Config<any>;
  constructor(e) {
    super(e);
    this.generateConfig();
  }
  get config() {
    return this.configData;
  }
  private generateConfig = () => {
    console.info("\x1b[32m%s\x1b[0m",'[SERVER] Загрузка конфигураций...')
    this.configData = convict(ConfigSchema);
    this.configData.loadFile("config.json");
    this.configData.validate({ allowed: "strict" });
  };
}
