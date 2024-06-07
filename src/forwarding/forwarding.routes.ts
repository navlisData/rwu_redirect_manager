import express from "express";
import * as fs from "node:fs";

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

export function deleteEntry(request: express.Request, response: express.Response){

}

export async function saveEntry(request: express.Request, response: express.Response) {
  await readAllEntries().then(data => {
	response.status(200).json(data);
  }).catch(err => {
	response.status(500).send("Ooopps something failed here :/");
  })
}

function readAllEntries(): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
	fs.readFile("routes.json", "utf-8", (err, data) => {

	  if(err) {
		return reject(err);
	  }

	  resolve(JSON.parse(data));
	});
  });
}

function saveAllEntries(): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
	fs.writeFile("routes.json", "utf-8", err => {
	  if(err) {

	  }
	});
  });
}