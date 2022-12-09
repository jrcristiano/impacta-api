import express from 'express';
import routes from './routes'; 
import cors from 'cors';

class App {
  public express = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default App;
