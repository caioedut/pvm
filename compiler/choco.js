require('dotenv').config();

const { execSync } = require('child_process');

(async function main() {
  const options = { stdio: 'inherit', cwd: 'chocolatey' };

  console.log('Pushing to Chocolatey...');

  // Pack
  execSync(`choco pack`, options);

  // Push to Chocolatey
  execSync(`choco push --key=${process.env.CHOCO_API_KEY}`, options);

  // Done
  console.log('File pvm-setup.exe was sent to Chocolatey.');
})();
