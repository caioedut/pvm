const { execSync, spawnSync } = require('child_process');

execSync('yarn version --patch', { stdio: 'inherit' });

const version = require('./package.json').version;

spawnSync(`pkg src/cli.js -c package.json -o releases/${version}`);
