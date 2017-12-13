#!/usr/bin/env node
'use strict';

const { version, name } = require('./package.json');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const config = require('./commands-config');

let options;
try {
	options = commandLineArgs(config.definitions, process.argv);
} catch (err) {
	console.log('Invalid usage! Use --help for help');
	throw err;
}

if (options.help) {
	const usage = commandLineUsage(config.usage);

	console.log(usage);
	process.exit(0);
}

if (options.version) {
	console.log(`Version of ${name} is ${version}`);
	process.exit(0);
}

if (typeof options.length !== 'number') {
	console.log('Invalid usage! Use --help for help');
	process.exit(1);
}

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const exponent = Math.ceil(Math.log2(alphabet.length));

const getNextRandomBit = () => {
	const [, nanoseconds] = process.hrtime();
	return nanoseconds % 2 ? '1' : '0';
};

const getNextLetter = () => {
	while (true) {
		const binaryString = new Array(exponent).fill(null).map(getNextRandomBit).join('');
		const decimalNumber = parseInt(binaryString, 2);
		if (decimalNumber < alphabet.length) {
			return alphabet[decimalNumber];
		}
	}
};

const generatePasswordString = (length) => {
	return new Array(length).fill(null).map(getNextLetter).join('');
};

console.log(generatePasswordString(options.length));
