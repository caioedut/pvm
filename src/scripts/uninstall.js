const path = require('path');
const fsExtra = require('fs-extra');

module.exports = (args) => {
  const [version] = args;

  // Delete folder
  const versionDir = path.join(global.baseDir, 'versions', version);
  fsExtra.removeSync(versionDir);

  console.log(`PHP version ${version} has been uninstalled.`);
};
