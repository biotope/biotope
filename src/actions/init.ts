import * as gitClone from 'git-clone';
import * as rimraf from 'rimraf';
import * as npm from 'npm';
import chalk from 'chalk';

const defaultProjectName = 'biotope-boilerplate';
export const registerInit = commander => commander
    .command('init [name]')
    .action((name = defaultProjectName) => {
        console.log(chalk.green('========================================'));
        console.log(chalk.green('======== Pulling repository 🏎️ ========='));
        console.log(chalk.green('========================================'));
        gitClone(
            'https://github.com/biotope/biotope-boilerplate.git',
            name,
            () => {
                process.chdir(name);
                rimraf('./.git', () => {
                    console.log(chalk.green('========================================'));
                    console.log(chalk.green('====== Installing dependencies 💻 ======'));
                    console.log(chalk.green('========================================'));
                    npm.load((err) => {
                        npm.commands.install((er, data) => {
                            console.log(chalk.green('========================================'));
                            console.log(chalk.green('====== Everything ready to go 👍 ======='));
                            console.log(chalk.green('========================================'));
                        });
                        npm.on('log', (message) => {
                            console.log(message);
                        });
                    });
                });
            }
        );
    });
