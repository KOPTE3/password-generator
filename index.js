#!/usr/bin/env node
'use strict';

// подключаем необходимые модули
const { version, name } = require('./package.json');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const config = require('./commands-config');

let options;
try {
	// парсим аргументы командной строки с помощью специального модуля `command-line-args`
	options = commandLineArgs(config.definitions, process.argv);
} catch (err) {
	console.log('Invalid usage! Use --help for help');
	throw err;
}

// проверяем наличие параметра --help или -h в аргументах командной строки
if (options.help) {
	// выводим инструкцию по использованию модуля
	const usage = commandLineUsage(config.usage);

	console.log(usage);
	process.exit(0);
}

// если передан ключ --version или -v, выводим версию программы
if (options.version) {
	console.log(`Version of ${name} is ${version}`);
	process.exit(0);
}

// если не передана длина генерируемого пароля, печатаем сообщение об ошибке
if (typeof options.length !== 'number') {
	console.error('Invalid usage! Use --help for help');
	process.exit(1);
}

// задаём алфавит
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// вычисляем двоичный логарифм от мощности алфавита
const exponent = Math.ceil(Math.log2(alphabet.length));

/**
 * Функция получения случайного бита
 * @return {string} - случайный бит: '0' или '1'
 */
const getNextRandomBit = () => {
	/**
	 * Функция process.hrtime() возвращает массив из двух чисел:
	 *   Первое - это текущее количество секунд
	 *   Второе - текущее количество наносекунд
	 */
	const [, nanoseconds] = process.hrtime();
	return nanoseconds % 2 ? '1' : '0';
};

/**
 * Получение следующего символа пароля
 * @return {string} - случайный символ из алфавита alphabet
 */
const getNextLetter = () => {
	while (true) {
		const binaryString = new Array(exponent).fill(null).map(getNextRandomBit).join('');
		const decimalNumber = parseInt(binaryString, 2);
		if (decimalNumber < alphabet.length) {
			return alphabet[decimalNumber];
		}
	}
};

/**
 * Генерация случайного пароля заданной длины
 * @param {number} length - длина пароля
 * @return {string} - пароль
 */
const generatePasswordString = (length) => {
	return new Array(length).fill(null).map(getNextLetter).join('');
};

// Генерируем и выводим пароль
console.log(generatePasswordString(options.length));
