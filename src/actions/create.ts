import * as gitClone from 'git-clone';
import * as rimraf from 'rimraf';
import * as npm from 'npm';
import chalk from 'chalk';
import * as inquirer from 'inquirer';

const defaultProjectName = 'biotope-boilerplate';

const log = message => console.log(chalk.green(message));
const logError = message => console.log(chalk.red(message));
const logBox = message => {
    const padding = (40 - message.length - 2) / 2;
    log('='.repeat(40));
    log(`${'='.repeat(Math.ceil(padding))} ${message} ${'='.repeat(Math.floor(padding))}`);
    log('='.repeat(40));
};

const createTemplateBranchName = template => `cli-template/${template}`;

const pullRepositoryTo = async (name = defaultProjectName, answers) => {
    logBox('Pulling repository');
    return new Promise((res, rej) => gitClone(
        'https://github.com/biotope/biotope-boilerplate.git',
        name,
        {
          checkout: answers.template ? createTemplateBranchName(answers.template) : 'master'
        },
        (err) => {
          if(err) {
            rej(err);
          }
          res();
        } 
    ));
}

const cleanup = (name) => {
    process.chdir(name);
    rimraf.sync('./.git');
}

const npmInstall = async () => {
    logBox('Installing dependencies');
    await new Promise((res, rej) => npm.load(res));
    npm.on('log', (message) => {
        console.log(message);
    });
    return new Promise((res, rej) => npm.commands.install([], res));
}

const notifySuccess = () => {
    logBox('Everything ready to go');
}

const create = async (name = defaultProjectName) => {
    const answers = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'version',
          default: 'lts',
          message: 'Which version do you want to generate?',
          choices: [
            {
              name: 'Stable',
              value: 'lts'
            },
            {
              name: 'Beta (all the nice new features)',
              value: 'beta'
            }
          ]
        },
        {
          when: (answers) => answers.version === 'lts',
          type: 'list',
          name: 'template',
          default: 'empty',
          message: 'Which template do you want to generate?',
          choices: [
            {
              name: 'Empty biotope instance',
              value: 'empty'
            },
            {
              name: 'Prefilled biotope instance with examples',
              value: 'prefilled'
            }
          ]
        }
      ]);
    await pullRepositoryTo(name, answers).catch((err) => {
      logError(`Pulling @biotope/boilerplate to ./${name} from branch ${createTemplateBranchName(answers.template)} failed.`);
      process.exit(1)
    });
    cleanup(name);
    await npmInstall();
    notifySuccess();
}

export const registerInit = commander => commander
    .command('create [name]')
    .action(create);
