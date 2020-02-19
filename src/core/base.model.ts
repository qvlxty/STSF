import { Container } from "./container.class";

export abstract class Model<Data> {
  private curData: Data;
  constructor(private readonly mainContainer: Container) {
    this.curData = null;
  }

  public loadData(data: Data) {
    this.curData = data;
  }

  // Методы Indev
  public save() {
    console.info('Saving curData:')
    console.info(this.curData)
  }
}
