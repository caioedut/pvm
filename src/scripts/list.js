const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = () => {
  let current = 'none';

  if (fs.existsSync(path.join(phpDir, 'php.exe'))) {
    current = execSync(`php -r "echo PHP_VERSION;"`, {
      cwd: phpDir,
    }).toString();
  }

  log.print('Installed PHP versions:');
  log.nl();

  const dirents = fs.readdirSync(versionsDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

  if (!dirents.length) {
    log.info(`    none`);
  }

  dirents.forEach(({ name }) => {
    const cwd = path.join(versionsDir, name);

    const version = execSync(`php -r "echo PHP_VERSION;"`, { cwd }).toString().trim();

    const intSize = execSync(`php -r "echo PHP_INT_SIZE;"`, { cwd }).toString().trim();
    const arch = +intSize === 4 ? '32 bit' : '64 bit';

    const thread = execSync(`php -i | findstr "Thread"`, { cwd }).toString().trim();
    const safety = thread.includes('enabled') ? '[Thread Safety]' : '';

    const output = `${version} (${arch}) ${safety}`;

    if (version === current) {
      log.success(` -> ${output}`);
    } else {
      log.info(`    ${output}`);
    }
  });
};
