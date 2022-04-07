const fs = require('fs');
const { execSync } = require('child_process');

(async function main() {
  console.clear();

  const options = { stdio: 'inherit' };

  console.log('Building .exe file...');

  // Install packages
  execSync('yarn global add pkg');
  execSync('yarn install --check-files');

  // Update package version
  execSync('yarn version --patch', options);

  // Compile to .exe
  execSync(`pkg . -o bin/pvm`, options);

  fs.copyFileSync('bin/pvm.exe', 'setup/pvm.exe');
})();
