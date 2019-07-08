#!/usr/bin/env node
import * as commander from 'commander';
import * as actions from './actions';
import checkForNewVersion from './checkForNewVersion';
const pjson = require('../package.json');

const run = async () => {
    await checkForNewVersion();

    Object.keys(actions).forEach(key => actions[key](commander));

    commander
        .version(pjson.version, '-v, --version')
        .parse(process.argv);
}

run();
