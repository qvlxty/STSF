import { BaseService } from "../../core/base.service";

// Тестовое состояние сервиса
interface PostServiceState {
  switch: boolean;
}

export class PostService extends BaseService {
  constructor(e) {
    super(e);
  }
  private state: PostServiceState = {
    switch: true
  };
  turnSwitch(flag: boolean) {
    this.state.switch = flag;
  }

  showSwitchState() {
    console.log(this.state.switch ? "Включен" : "Выключен");
  }
}
