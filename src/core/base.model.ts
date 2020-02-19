import { Container } from "./container.class";

export abstract class Model {
  constructor(private readonly mainContainer: Container) {}
}
