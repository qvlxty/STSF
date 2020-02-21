import { Controller, IRoute, HttpMethod } from "frameworkCore/base.controller";
import { Container } from "frameworkCore/container.class";

export class ApiController extends Controller {
  // Функтор передан для того, чтобы рендерились всегда последние смонтированные роуты
  constructor(c: Container, private readonly allRoutes = c.getAllRoutes) {
    super(c);
    console.info("\x1b[94m%s\x1b[0m",`[SERVER] Документация сгенерирована! `);
  }
  controllerApiPrefix = "/doc";
  routes = (): IRoute[] => [
    {
      description: "Генерируемая страница документации",
      method: HttpMethod.GET,
      path: "/",
      action: (req, res) => {
        res.render("api/doc", { data: this.allRoutes() });
      },
      outData: {
        "msg":"Текущая страница :-)"
      }
    }
  ];
  middlewares = () => [];
}
