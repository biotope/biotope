import * as gitClone from 'git-clone';
import * as rimraf from 'rimraf';
import * as npm from 'npm';
import chalk from 'chalk';

const defaultProjectName = 'biotope-boilerplate';

const pullRepositoryTo = async (name = defaultProjectName) => {
    console.log(chalk.green('========================================'));
    console.log(chalk.green('======== Pulling repository 🏎️ ========='));
    console.log(chalk.green('========================================'));
    return gitClone(
        'https://github.com/biotope/biotope-boilerplate.git',
        name
    );
}

const cleanup = (name) => {
    process.chdir(name);
    rimraf.sync('./.git');
}

const npmInstall = async () => {
    console.log(chalk.green('========================================'));
    console.log(chalk.green('====== Installing dependencies 💻 ======'));
    console.log(chalk.green('========================================'));
    await npm.load();
    npm.on('log', (message) => {
        console.log(message);
    });
    return npm.commands.install();
}

const notifySuccess = () => {
    console.log(chalk.green('========================================'));
    console.log(chalk.green('====== Everything ready to go 👍 ======='));
    console.log(chalk.green('========================================'));
}

const init = async (name = defaultProjectName) => {
    await pullRepositoryTo(name);
    cleanup(name);
    await npmInstall();
    notifySuccess();
}

export const registerInit = commander => commander
    .command('init [name]')
    .action(init);
