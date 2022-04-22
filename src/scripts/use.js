const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const { execSync } = require('child_process');

module.exports = (args) => {
  const version = getFullVersion(args[0]);
  const versionDir = path.join(versionsDir, version);

  if (!fs.existsSync(versionDir)) {
    throw new Error(`PHP version ${version} is not installed.`);
  }

  if (!fs.existsSync(phpDir)) {
    fs.mkdirSync(phpDir, { recursive: true });
  }

  // Check non existing extensions no new version
  const extDir = path.join(phpDir, 'ext');
  if (fs.existsSync(extDir)) {
    fsExtra.copySync(extDir, path.join(versionDir, 'ext'), { overwrite: false });
  }

  fsExtra.copySync(versionDir, global.phpDir, { overwrite: true });

  execSync('php -v', { stdio: 'inherit', cwd: global.phpDir });
  log.nl();
  log.success(`Now using PHP version ${version}`);
};
