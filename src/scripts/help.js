const chalk = require('chalk');

module.exports = () => {
  const actions = [
    { action: 'version', description: `Current 'pvm-cli' version.` },
    { action: 'dir', description: 'Open PHP directory.' },
    { action: 'list', description: 'List installed PHP versions.' },
    { action: 'install <version>', description: 'Install a PHP version.' },
    { action: 'uninstall <version>', description: 'Uninstall a PHP version.' },
    { action: 'use <version>', description: 'Change PHP version.' },
    { action: 'php.ini', description: 'Open php.ini to allow editing.' },
    { action: 'refresh', description: 'Refresh changes on php.ini.' },
  ];

  const length = Math.max(...actions.map(({ action }) => action.length)) + 2;

  log.print('Available commands:');
  log.nl();

  for (const action of actions) {
    console.log(
      // Pretty print
      chalk.hex('#4caf50')('  ', action.action.padEnd(length, ' ')),
      chalk.hex('#2196f3')(action.description),
    );
  }
};
