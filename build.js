const { execSync } = require('child_process');

(async function main() {
  console.clear();

  const options = { stdio: 'inherit' };

  console.log('Building .exe file...');

  // Install packages
  execSync('yarn global add pkg');
  execSync('yarn install --check-files');

  // Compile to .exe
  execSync(`pkg . -o bin/pvm`, options);

  // Update package version
  // execSync('yarn version --patch', options);
})();
