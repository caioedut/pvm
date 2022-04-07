const fs = require('fs');
const { execSync } = require('child_process');

(async function main() {
  console.clear();

  const options = { stdio: 'inherit' };

  console.log('Building .exe file...');

  // Only production packages
  execSync('yarn global add pkg');
  execSync('yarn install --check-files --production');

  // Update package version
  execSync('yarn version --patch', options);

  // Package .exe
  execSync(`pkg . -o bin/pvm`, options);

  // Restore all packages
  execSync('yarn install --check-files');

  fs.copyFileSync('bin/pvm.exe', 'setup/pvm.exe');
})();
