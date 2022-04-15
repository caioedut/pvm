#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

let [, , cmd, ...args] = process.argv;

if (['version', 'v', '--version', '-v'].includes(cmd)) {
  cmd = 'version';
}

if (['install', 'i', 'add', 'a'].includes(cmd)) {
  cmd = 'install';
}

if (['uninstall', 'u', 'remove', 'r', 'delete', 'd'].includes(cmd)) {
  cmd = 'uninstall';
}

if (!cmd) {
  cmd = 'help';
}

global.bin = 'pvm';
global.pvmDir = path.dirname(require.main.filename);
global.baseDir = path.join('C:', 'tools');
global.phpDir = path.join(baseDir, 'php');
global.versionsDir = path.join(baseDir, 'versions');

// Php.ini
global.phpIniFile = path.join(baseDir, 'php.ini');
global.phpIniTargetFile = path.join(phpDir, 'php.ini');

// Beauty log
global.log = {
  nl: () => console.log(''),
  print: (...args) => console.log(...args),
  info: (...args) => console.log(chalk.hex('#2196f3')(...args)),
  success: (...args) => console.log(chalk.hex('#4caf50')(...args)),
  warning: (...args) => console.log(chalk.hex('#ff9800')(...args)),
  error: (...args) => console.log(chalk.hex('#f44336')(...args)),
};

(async function main() {
  log.nl();

  try {
    // Create php path if not exists
    if (!fs.existsSync(phpDir)) {
      fs.mkdirSync(phpDir);
    }

    // Create versions path if not exists
    if (!fs.existsSync(versionsDir)) {
      fs.mkdirSync(versionsDir);
    }

    // Copy global php.ini if not exists
    if (!fs.existsSync(phpIniFile) && fs.existsSync(phpIniTargetFile)) {
      fs.copyFileSync(phpIniTargetFile, phpIniFile);
    }

    // Check if php is already installed
    if (cmd !== 'use') {
      try {
        const instStr = 'Loaded Configuration File => ';
        const instFind = execSync(`php -i | findstr /C:"${instStr}"`).toString() || '';
        const instPhp = instFind
          .substring(instStr.length)
          .trim()
          .replace(/[\\\/]php\.ini$/, '')
          .split(/[\\\/]/g)
          .join(path.sep);

        if (instPhp && instPhp !== phpDir) {
          log.warning('A not managed PHP version is installed. This may cause conflicts.');
          log.warning('Check the system environment variable PATH.');
          log.warning(`Directory: "${instPhp}".\n`);
        }
      } catch (err) {}
    }

    // Run command script
    await require(`./src/scripts/${cmd}`)(args);

    // Restore php.ini
    if (fs.existsSync(phpIniFile)) {
      fs.copyFileSync(phpIniFile, phpIniTargetFile);
    }
  } catch (err) {
    log.error(err.message);
  }

  log.nl();
})();
