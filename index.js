#!/usr/bin/env node
const program = require('commander');
const generate = require('./actions/generate');

program.arguments('<action>')
	.action(function(action) {
		switch (action) {
			case 'generate':
				generate();
				break;
		}
	})
	.parse(process.argv);