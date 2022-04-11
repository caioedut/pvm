#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

console.replace = function (...args) {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);

  for (const arg of args) {
    process.stdout.write(arg);
  }
};

(async function main() {
  console.log('');

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

    // Run command script
    await require(`./src/scripts/${cmd}`)(args);

    // Restore php.ini
    if (fs.existsSync(phpIniFile)) {
      fs.copyFileSync(phpIniFile, phpIniTargetFile);
    }
  } catch (err) {
    console.error(err.message);
  }

  console.error('');
})();
