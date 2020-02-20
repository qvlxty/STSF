import { Container } from "./container.class";

export abstract class Repository<Model> {
  public model: Model = null;
  constructor(private readonly mainContainer: Container) {}
}
