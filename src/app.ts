import express from 'express';
import {Controller} from "./Controller";
import dotenv from 'dotenv';
import * as fs from "node:fs";

class App {
  public app: express.Application;
  public port: number = parseInt(process.env.PORT) || 3000;

  constructor(controllers: Array<Controller>) {
	this.app = express();

	dotenv.config();
	this.initFileSystem();

	this.app.use(express.json());
	this.useLogger();
	this.initializeControllers(controllers);
  }

  private initFileSystem(): void {
  	if(!fs.existsSync("routes.json")) {
	  fs.open("routes.json", "w", (err: Error) => {})
	}
  }

  private initializeControllers(controllers: Array<Controller>) {
	console.log("\nInitialize controllers:");

	controllers.forEach((controller) => {
	  this.app.use("", controller.router);
	});
	console.log("Done initializing controllers\n");
  }

  private useLogger() {
	this.app.use((req, res, next) => {
	  console.log(`Incoming Request:`);
	  console.log(`Method:\t${req.method} ${req.path}`);
	  console.log(`Headers:\t${JSON.stringify(req.headers)}`);
	  console.log(`Body:\t${JSON.stringify(req.body)}\n`);
	  next();
	});
  }

  public listen() {
	this.app.listen(this.port, () => {
	  console.log(`App listening on the port ${this.port}\n`);
	});
  }
}

export default App;