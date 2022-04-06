const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const {execSync} = require('child_process');

module.exports = function use(args) {
    const [version] = args;
    const versionDir = path.join(global.baseDir, 'versions', version);

    if (!fs.existsSync(versionDir)) {
        throw new Error(`PHP version ${version} is not installed`);
    }

    if (!fs.existsSync(global.phpDir)) {
        fs.mkdirSync(global.phpDir, {recursive: true});
    }

    fsExtra.copySync(versionDir, global.phpDir, {overwrite: true});

    execSync('php -v', {stdio: 'inherit'});
    console.log('');
    console.log(`Now using PHP version ${version}`);
};
