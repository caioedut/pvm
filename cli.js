#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let [, , cmd, ...args] = process.argv;

if (!cmd || ['-v', '--version'].includes(cmd)) {
  cmd = 'version';
}

const PATH = process.env.path;

const baseDir = path.join('C:', 'tools');
const phpDir = path.join(baseDir, 'php');
const phpIniDir = path.join(baseDir, 'php.ini');
const phpIniTargetDir = path.join(phpDir, 'php.ini');

global.bin = 'pvm';
global.baseDir = baseDir;
global.phpDir = phpDir;
global.phpIniDir = phpIniDir;

console.replace = function (...args) {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);

  for (const arg of args) {
    process.stdout.write(arg);
  }
};

// Set PHP path variable
if (!PATH.toLowerCase().includes(phpDir.toLowerCase())) {
  const newPath = `${phpDir};%PATH%`;
  execSync(`setx PATH "${newPath}"`, { stdio: 'ignore' });
  execSync(`set PATH="${newPath}"`, { stdio: 'ignore' });
}

(async function main() {
  console.log('');

  try {
    // Create php path if not exists
    if (!fs.existsSync(phpDir)) {
      fs.mkdirSync(phpDir);
    }

    // Copy global php.ini if not exists
    if (!fs.existsSync(phpIniDir) && fs.existsSync(phpIniTargetDir)) {
      fs.copyFileSync(phpIniTargetDir, phpIniDir);
    }

    // Run command script
    await require(`./src/scripts/${cmd}`)(args);

    // Restore php.ini
    if (fs.existsSync(phpIniDir)) {
      fs.copyFileSync(phpIniDir, phpIniTargetDir);
    }
  } catch (err) {
    console.error(err.message);
  }

  console.error('');
})();
