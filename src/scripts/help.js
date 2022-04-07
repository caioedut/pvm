module.exports = () => {
  const actions = [
    { action: 'version', description: 'Current `pvm-cli` version.' },
    { action: 'dir', description: 'Open PHP directory used.' },
    { action: 'list', description: 'List installed PHP versions.' },
    { action: 'install X.X.X', description: 'Install a PHP version.' },
    { action: 'uninstall X.X.X', description: 'Uninstall a PHP version.' },
    { action: 'use X.X.X', description: 'Change PHP version.' },
    { action: 'php.ini', description: 'Open php.ini to allow editing.' },
    { action: 'refresh', description: 'Refresh changes on php.ini.' },
  ];

  console.table(actions);
};
