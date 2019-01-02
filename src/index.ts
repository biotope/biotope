#!/usr/bin/env node
import * as commander from 'commander';
import * as actions from './actions';
const pjson = require('../package.json');

Object.keys(actions).forEach(key => actions[key](commander));

commander
    .version(pjson.version, '-v, --version')
    .parse(process.argv);
