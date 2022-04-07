const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = () => {
  const current = execSync(`php -r "echo PHP_VERSION;"`, {
    cwd: global.phpDir,
  }).toString();

  const dir = path.join(global.baseDir, 'versions');

  console.log('Installed PHP versions:');
  console.log('');

  const output = [];

  fs.readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach(({ name }) => {
      const version = execSync(`php -r "echo PHP_VERSION;"`, {
        cwd: path.join(dir, name),
      }).toString();

      const preffix = version === current ? ' ->' : '   ';

      output.push(`${preffix} ${name} (${version})`);
    });

  console.log(output.join(`\n`));
};
