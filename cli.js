#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// install
// uninstall
// list
// use
// php.ini

let [, , cmd, ...args] = process.argv;

if (!cmd || ['-v', '--version'].includes(cmd)) {
  cmd = 'version';
}

const PATH = process.env.path;

const baseDir = path.join('C:', 'tools');
const phpDir = path.join(baseDir, 'php');
const phpIniDir = path.join(phpDir, '..', 'php.ini');
const phpIniTargetDir = path.join(phpDir, 'php.ini');

global.baseDir = baseDir;
global.phpDir = phpDir;

// // Set PHP path variable
// if (!PATH.toLowerCase().includes(phpDir.toLowerCase())) {
//   const newPath = `${phpDir};%PATH%`;
//   execSync(`setx PATH "${newPath}"`, { stdio: 'ignore' });
//   execSync(`set PATH="${newPath}"`, { stdio: 'ignore' });
// }

console.log('');

try {
  // Copy global php.ini if not exists
  if (!fs.existsSync(phpIniDir) && fs.existsSync(phpIniTargetDir)) {
    fs.copyFileSync(phpIniTargetDir, phpIniDir);
  }

  // Run command script
  require(`./scripts/${cmd}`)(args);

  // Restore php.ini
  if (fs.existsSync(phpIniDir)) {
    fs.copyFileSync(phpIniDir, phpIniTargetDir);
  }
} catch (err) {
  console.error(err.message);
}

console.error('');
