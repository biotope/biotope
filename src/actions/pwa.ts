import * as generate from '@biotope/pwa';

export const registerPwa = commander => commander
  .command('pwa')
  .action(generate);
