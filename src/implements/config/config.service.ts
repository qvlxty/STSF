import { BaseService } from "../../core/base.service";
import * as convict from "convict";
import { ConfigSchema } from "./config.schema";

/*
  Пример сервиса, который обслуживает конфиг
*/
export class ConfigService extends BaseService {
  private configData;
  constructor(e) {
    super(e);
    this.generateConfig();
  }
  get config() {
    return this.configData;
  }
  private generateConfig = () => {
    // Define a schema
    this.configData = convict(ConfigSchema);
    this.configData.loadFile("config.json");
    this.configData.validate({ allowed: "strict" });
  };
}
