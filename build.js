const {execSync} = require('child_process');

execSync('yarn version --patch', {stdio: 'inherit'});
const version = require('./package.json').version;

execSync(`pkg src/cli.js -o releases/${version}`, {stdio: 'inherit'});

