const { execSync } = require('child_process');
const fsExtra = require('fs-extra');

module.exports = function install() {
  const cmd = {
    darwin: 'open',
    win32: 'start',
  }[process.platform];

  execSync(`${cmd || 'xdg-open'} ${global.phpIniDir}`);
};
