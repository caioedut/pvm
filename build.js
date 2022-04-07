const { execSync } = require('child_process');
const { exec } = require('pkg');

(async function main() {
  const options = { stdio: 'inherit' };

  // Update package version
  execSync('yarn version --patch', options);

  // execSync(`pkg cli.js -c package.json -o releases/${version}`, options);
  await exec(['.', '-o', 'bin/pvm']);
})();
