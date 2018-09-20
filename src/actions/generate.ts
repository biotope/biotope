import * as generate from '@biotope/generator';

export const registerGenerate = commander => commander
  .command('generate')
  .action(generate);
