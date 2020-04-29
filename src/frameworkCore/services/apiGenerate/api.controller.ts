import { Controller, HttpMethod } from "frameworkCore/base.controller";
import { Container } from "frameworkCore/container.class";
import { ControllerApiPrefix, GET, ApiMethodDescription } from "frameworkCore/decorators/controller.decorator";

@ControllerApiPrefix('/doc')
export class ApiController extends Controller {
  // Функтор передан для того, чтобы рендерились всегда последние смонтированные роуты
  constructor(c: Container, private readonly allRoutes = c.getAllRoutes) {
    super(c);
    console.info("\x1b[94m%s\x1b[0m", `[SERVER] Документация сгенерирована! `);
  }

  // @ApiMethod(HttpMethod.GET, '/', 'Страница документации')
  @GET('/')
  @ApiMethodDescription({
    description:' Страница документации'
  })
  public renderDoc(req, res) {
    res.render("api/doc", { data: this.allRoutes() });
  }

  middlewares = () => [];
}
