const { execSync } = require('child_process');

module.exports = () => {
  const cmd = {
    darwin: 'open',
    win32: 'start',
  }[process.platform];

  execSync(`${cmd || 'xdg-open'} ${global.phpIniFile}`);

  console.log('php.ini file opened.');
  console.log(`After editing, run "${global.bin} refresh".`);
};
