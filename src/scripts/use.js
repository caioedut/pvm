const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const { execSync } = require('child_process');

module.exports = (args) => {
  const [version] = args;
  const versionDir = path.join(versionsDir, version);

  if (!fs.existsSync(versionDir)) {
    throw new Error(`PHP version ${version} is not installed.`);
  }

  if (!fs.existsSync(global.phpDir)) {
    fs.mkdirSync(global.phpDir, { recursive: true });
  }

  fsExtra.copySync(versionDir, global.phpDir, { overwrite: true });

  execSync('php -v', { stdio: 'inherit', cwd: global.phpDir });
  log.nl('');
  log.success(`Now using PHP version ${version}`);
};
