import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const slugSchema = Joi.object({
  slug: Joi.string().required(),
});

export function slug(req: Request, res: Response, next: NextFunction):void {
  const { error } = slugSchema.validate({slug: req.params.slug});
  if (error) {
	res.status(400).send(error.details[0].message);
  } else {
	next();
  }
}

const authScheme = Joi.object({
  authorization: Joi.string().required().pattern(/^Bearer [A-Za-z0-9\-_]+\.?[A-Za-z0-9\-_]*\.?[A-Za-z0-9\-_]+$/)
}).unknown(true);

export function authentication(req: Request, res: Response, next: NextFunction):void {
  const { error, value } = authScheme.validate(req.headers);
  if (error) {
	res.status(400).send(error.details[0].message);
  } else {
	const receivedToken = value.authorization.split(' ')[1];
	const expectedToken = process.env.BEARER_TOKEN;
	if (receivedToken === expectedToken) {
	  next();
	} else {
	  res.status(401).send("Invalid token");
	}
  }
}