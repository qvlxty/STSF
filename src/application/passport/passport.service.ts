import { BaseService } from "frameworkCore/base.service";
import { Container } from "frameworkCore/container.class";
import { Strategy } from "passport-local";
import { UserService } from "application/modules/user/user.service";
import passport = require("passport");

export class PassportService extends BaseService {
  constructor(
    e: Container,
    private readonly userService: UserService = e.getService(UserService)
  ) {
    super(e);
    passport.use(this.getStrategy());
    passport.serializeUser(this.serializer);
    passport.deserializeUser(this.deserializer);
  }

  serializer = (user, done) => {
    done(null, user);
  };

  deserializer = async (user, done) => {
    done(null, user);
  };

  getStrategy = (): Strategy => {
    return new Strategy(
      {
        usernameField: "login",
        passwordField: "password"
      },
      async (username, password, done) => {
        const user: any = await this.userService.getUserByLogin(username, [
          "id",
          "login",
          "password"
        ]);
        if (user === null) {
          done("Login invalid");
          return;
        }
        // Измените на проверку хешей
        if (user.password === password) {
          // Не будем хранить пароль в метаданных req.user
          delete user.password
          done(null, user);
        }
        else done("Invalid Password", null);
      }
    );
  };

  // MiddleWare Для Авторизации (Если пользователь не авторизован - выбрасываем)
  async AuthGuard(req, res, next) {
    if (req.user !== null && req.user !== undefined) {
      next();
    } else {
      res.redirect("/");
    }
  }
}
