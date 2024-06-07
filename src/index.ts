import App from "./app";
import ForwardingController from "./forwarding/forwarding.controller"

const app = new App(
  [
	new ForwardingController(),
  ],
);

app.listen();
