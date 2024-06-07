import {Controller} from "../Controller";
import express, {Router} from "express";
import * as route from "./forwarding.routes"
import * as validate from "./forwarding.middleware"

class ForwardingController implements Controller {
  router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.delete("/entry/:slug", validate.deleteEntry, route.deleteEntry);
    this.router.post("/entry", validate.addEntry, route.saveEntry);

    this.router.get("/entries", validate.authentication, route.getEntries);
    this.router.get("/:slug", validate.slug, route.redirect);
  }
}

export default ForwardingController;