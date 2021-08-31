#!/usr/bin/node
const { exec } = require("child_process");
const fs = require("fs");
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
require('colors');

if (!argv.u) {
	console.error('Must include -u userID.'.red);
	console.log('Go to entropyengine.dev, open dev tools, find localStorage under application and add the value at id'.yellow);
	console.log('If you have not created an entropy engine.dev account yet, you will need to do so.');
	throw Error();
}

function handle (err, stdout, stderr) {
	if (err) {
		console.log(`error: ${err.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}

	if (stdout)
		console.log(`stdout: ${stdout}`);
}

if (!fs.existsSync('./EntropyEngineProjects'))
	fs.mkdirSync('./EntropyEngineProjects');

process.chdir('./EntropyEngineProjects/');
exec('npm install eeclient', handle);

fs.writeFileSync('eeconfig.json', `
	{
		"projects-root": "./",
		"user": ${argv.u}
	}
`);
fs.writeFileSync('package.json', `
{
	"name": "EntropyEngineProjects",
	"author": "",
	"license": "ISC",
	"scripts": {
		"create": "node ./node_modules/eeclient/ --create",
		"connect": "node ./node_modules/eeclient/ -p "
	}
}
`);