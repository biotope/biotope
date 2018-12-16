"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gitClone = require("git-clone");
var rimraf = require("rimraf");
var npm = require("npm");
var chalk_1 = require("chalk");
exports.registerInit = function (commander) { return commander
    .command('init')
    .action(function () {
    console.log(chalk_1.default.green('========================================'));
    console.log(chalk_1.default.green('======== Pulling repository 🏎️ ========='));
    console.log(chalk_1.default.green('========================================'));
    gitClone('https://github.com/biotope/biotope-boilerplate.git', './', function () {
        rimraf('./.git', function () {
            console.log(chalk_1.default.green('========================================'));
            console.log(chalk_1.default.green('====== Installing dependencies 💻 ======'));
            console.log(chalk_1.default.green('========================================'));
            npm.load(function (err) {
                npm.commands.install(function (er, data) {
                    console.log(chalk_1.default.green('========================================'));
                    console.log(chalk_1.default.green('====== Everything ready to go 👍 ======='));
                    console.log(chalk_1.default.green('========================================'));
                });
                npm.on('log', function (message) {
                    console.log(message);
                });
            });
        });
    });
}); };
