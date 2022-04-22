const fs = require('fs');
const path = require('path');
const axios = require('axios');
const fsExtra = require('fs-extra');
const extract = require('extract-zip');

module.exports = async (args) => {
  let [version] = args;
  const [major] = version;
  const { platform } = process;

  const versions = {};

  log.print('Checking...');

  if (platform === 'win32') {
    // Check current releases
    const { data } = await axios.get('https://windows.php.net/downloads/releases/releases.json');
    const releases = Object.values(data).reverse();

    for (const release of releases) {
      const newVersion = Object.values(release)[1].zip;
      versions[release.version] = `https://windows.php.net/downloads/releases/${newVersion.path}`;
    }

    // Check the museum versions
    if (major.trim().substring(0, 1) >= 5) {
      try {
        const { data: html } = await axios.get(`https://museum.php.net/php${major}`);
        const regex = new RegExp(`php-${major}[\\d|.]*?-Win32.zip`, 'gi');

        const museums = (html.match(regex) || [])
          .filter((value, index, array) => array.indexOf(value) === index)
          .sort((a, b) => b.replace(/\D/g, '') - a.replace(/\D/g, ''));

        for (const museum of museums) {
          const itemVersion = museum.replace('php-', '').replace(/-Win32.zip/gi, '');
          versions[itemVersion] = `https://museum.php.net/php${major}/${museum}`;
        }
      } catch (err) {}
    }
  }

  // Version match
  if (!versions[version]) {
    const keys = Object.keys(versions);
    const item = keys.find((key) => key.startsWith(version));
    version = item || version;
  }

  // Check finally if found a version
  if (!versions[version]) {
    throw new Error(`PHP version ${version} is not available to install.`);
  }

  const tmpDir = path.join(versionsDir, 'tmp');
  const targetDir = path.join(tmpDir, version);
  const zipDir = `${targetDir}.zip`;

  // Create temp folder
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  log.print('Downloading...');

  const url = versions[version];
  const zipFileStream = fs.createWriteStream(zipDir);

  await axios
    .get(url, {
      responseType: 'stream',
    })
    .then((response) => {
      response.data.pipe(zipFileStream);
    });

  log.print('Extracting...');

  await new Promise((resolve, reject) => {
    zipFileStream.on('error', reject);

    zipFileStream.on('finish', () => {
      extract(zipDir, { dir: targetDir }).then(resolve).catch(reject);
    });
  });

  // Copy version
  const versionDir = path.join(baseDir, 'versions', version);
  fsExtra.moveSync(targetDir, versionDir, { overwrite: true });

  // Delete temp folder
  fsExtra.removeSync(tmpDir);

  log.nl();
  log.success(`PHP version ${version} has been installed.`);
  log.info(`Run "${bin} use ${version}" to use it.`);
};
