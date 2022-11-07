import { AppDataSource } from "./data-source"
import env from '../env';
import App from "./App";

AppDataSource.initialize()
  .then(async () => {
    const app = new App().express;

    return app.listen(env.PORT, () => {
      console.log(`Server running at port ${env.PORT}`);
    });
  })
  .catch(error => console.log(error))
