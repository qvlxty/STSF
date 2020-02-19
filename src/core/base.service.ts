import { Container } from "./container.class";

export abstract class BaseService {
  constructor(private readonly mainContainer: Container) {}
}
