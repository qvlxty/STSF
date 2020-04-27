import { Container } from "frameworkCore/container.class";

async function boot() {
    const AppContainer = new Container();
    await AppContainer.init({});
    await AppContainer.getDbService.syncSchema();
  }
  boot().then(() => {
    console.info("sync db schema complete");
    process.exit(0);
  });