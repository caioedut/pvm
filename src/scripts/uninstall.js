const path = require('path');
const fsExtra = require('fs-extra');

module.exports = (args) => {
  const [version] = args;

  // Delete folder
  const versionDir = path.join(versionsDir, version);
  fsExtra.removeSync(versionDir);

  log.success(`PHP version ${version} has been uninstalled.`);
};
