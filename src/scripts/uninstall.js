const fs = require('fs');
const path = require('path');
const axios = require('axios');
const fsExtra = require('fs-extra');
const extract = require('extract-zip');

const rootDir = path.dirname(require.main.filename);

module.exports = async function install(args) {
  const [version] = args;
  const [major] = version;
  const { platform } = process;

  const versions = {};

  console.replace('Checking...');

  if (platform === 'win32') {
    // Check current releases
    const { data: releases } = await axios.get('https://windows.php.net/downloads/releases/releases.json');

    for (const release of Object.values(releases)) {
      const newVersion = Object.values(release)[1].zip;
      versions[release.version] = `https://windows.php.net/downloads/releases/${newVersion.path}`;
    }
  }

  // Check the museum versions
  if (!versions[version]) {
    try {
      const downloadURL = `https://museum.php.net/php${major}/php-${version}-Win32.zip`;
      await axios.head(downloadURL, {});
      versions[version] = downloadURL;
    } catch (err) {}
  }

  // Check finally if found a version
  if (!versions[version]) {
    throw new Error(`PHP version ${version} is not available to install.`);
  }

  const tmpDir = 'tmp';
  const targetDir = path.join(tmpDir, version);
  const zipDir = `${targetDir}.zip`;

  // Create temp folder
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  console.replace('Downloading...');

  const url = versions[version];
  const zipFileStream = fs.createWriteStream(zipDir);

  await axios
    .get(url, {
      responseType: 'stream',
    })
    .then((response) => {
      response.data.pipe(zipFileStream);
    });

  console.replace('Extracting...');

  await new Promise((resolve, reject) => {
    zipFileStream.on('error', reject);

    zipFileStream.on('finish', () => {
      extract(path.join(rootDir, zipDir), { dir: path.join(rootDir, targetDir) })
        .then(resolve)
        .catch(reject);
    });
  });

  // Copy version
  const versionDir = path.join(global.baseDir, 'versions', version);
  fsExtra.moveSync(targetDir, versionDir, { overwrite: true });

  // Delete temp folder
  fsExtra.removeSync(tmpDir);

  console.replace('');
  console.log(`PHP version ${version} has been installed.`);
  console.log(`Run "pvm use ${version}" to use it.`);
};
