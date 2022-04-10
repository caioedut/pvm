const { execSync } = require('child_process');

(async function main() {
  const options = { stdio: 'inherit' };

  console.log('Creating setup file...');

  // Create pvm-setup.exe
  execSync(`iscc inno/config.iss`, options);

  // Sign pvm-setup.exe
  execSync(`signtool sign /a /fd SHA256 bin/pvm-setup.exe`, options);

  // Check certificate
  // execSync(`signtool verify bin/pvm-setup.exe`, options);

  // Done
  console.log('File pvm-setup.exe was created and signed on directory "bin".');
})();
