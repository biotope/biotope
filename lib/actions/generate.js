"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generate = require("@biotope/generator");
exports.registerGenerate = function (commander) { return commander
    .command('generate')
    .action(generate); };
