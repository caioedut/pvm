const { execSync, spawnSync } = require('child_process');

execSync('yarn version --patch', { stdio: 'inherit' });

const version = require('./package.json').version;

execSync(`pkg package.json -o releases/${version}`, { stdio: 'inherit' });
