const { execSync } = require('child_process');

module.exports = () => {
  const cmd = {
    darwin: 'open',
    win32: 'start',
  }[process.platform];

  execSync(`${cmd || 'xdg-open'} ${global.phpIniFile}`);

  log.success('php.ini file opened.');
  log.info(`After editing, run "${global.bin} refresh".`);
};
