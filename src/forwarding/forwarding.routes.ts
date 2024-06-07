import express from "express";
import * as fs from "node:fs";
import crypto from "crypto";
import App from "../app";

export async function redirect(request: express.Request, response: express.Response) {
  const slug : string = request.params.slug;

  await readAllEntries().then(data => {
	const entryObj: Record<string, string> = data;

	if(entryObj[slug]) {
	  const target = entryObj[slug];
	  response.redirect(target);
	} else {
	  response.status(400).send("Slug not found");
	}
  }).catch(err => {
	response.status(500).send("Ooopps something failed here :/");
  })
}

export async function getEntries(request: express.Request, response: express.Response) {
  await readAllEntries().then(data => {
	response.status(200).json(data);
  }).catch(err => {
	response.status(500).send("Ooopps something failed here :/");
  })
}

export async function deleteEntry(request: express.Request, response: express.Response) {
  await readAllEntries().then(data => {
	let slug: string = request.params.slug;

	if(data[slug]) {
	  delete data[slug];
	  saveAllEntries(data);
	} else {
	  response.status(400).send("Slug not found");
	}
  }).catch(err => {
	response.status(500).send("Ooopps something failed here :/");
  })
}

export async function saveEntry(request: express.Request, response: express.Response) {
  await readAllEntries().then(data => {
	let slug : string | undefined = request.body.slug;
	const url : string = request.body.url;

	if(!slug) {
	  slug = crypto.randomBytes(20).toString("hex");
	}

	data[slug] = url;
	saveAllEntries(data);
  }).catch(err => {
	response.status(500).send("Ooopps something failed here :/");
  })
}

function readAllEntries(): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
	fs.readFile(App.filePath, "utf-8", (err, data) => {

	  if(err) {
		return reject(err);
	  }

	  if(data.length == 0) {
		resolve({})
	  } else {
		resolve(JSON.parse(data));
	  }
	});
  });
}

function saveAllEntries(data : Record<string, string>): Promise<boolean> {
  return new Promise((resolve, reject) => {
	fs.writeFile(App.filePath, JSON.stringify(data), err => {
	  if(err) {
		return reject(err);
	  }

	  resolve(true)
	});
  });
}