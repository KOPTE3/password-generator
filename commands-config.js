'use strict';

const {version, name} = require('./package.json');

const definitions = [
	{
		name: 'version',
		alias: 'v',
		type: Boolean,
		description: 'Выводит версию утилиты',
	},
	{
		name: 'help',
		alias: 'h',
		type: Boolean,
		description: 'Выводит это руководство',
	},
	{
		name: 'length',
		alias: 'l',
		type: Number,
		description: 'Длина генерируемого пароля (обязательный параметр)',
	},
];

module.exports = {
	definitions,
	usage: [
		{
			header: name,
			content: 'Консольная утилита генерации случайного пароля',
		},
		{
			header: 'Synopsis',
			content: [
				'$ npm start -- <options>',
				'$ npm start -- [bold]{--version}',
				'$ npm start -- [bold]{--help}',
				'$ npm start -- [bold]{--length} 16',
			],
		},
		{
			header: 'Options',
			optionList: definitions,
		},
		{
			content: '[italic]{Version ' + version + '}',
		},
	],
};
