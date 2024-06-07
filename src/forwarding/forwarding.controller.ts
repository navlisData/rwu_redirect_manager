import {Controller} from "../Controller";
import express, {Router} from "express";
import * as route from "./forwarding.routes"
import * as validate from "../auth.middleware"

class ForwardingController implements Controller {
  router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/entries", validate.authentication, route.getEntries);
    this.router.get("/:slug", validate.slug, route.redirect);
    this.router.delete("/entry/:slug", validate.authentication, route.deleteEntry);
    this.router.post("/entry/", validate.authentication, route.saveEntry);
  }
}

export default ForwardingController;