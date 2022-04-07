const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PATH = process.env.path;
const APPDATA = process.env.APPDATA;

const pvmDir = path.join(APPDATA, 'pvm');
const pvmExe = path.join(pvmDir, 'pvm.exe');

if (!fs.existsSync(pvmDir)) {
  fs.mkdirSync(pvmDir);
}

fs.copyFileSync('bin/pvm.exe', pvmExe);

// Set path variable
if (!PATH.toLowerCase().includes(pvmDir.toLowerCase())) {
  const newPath = `${pvmDir};%PATH%`;
  execSync(`setx PATH "${newPath}"`, { stdio: 'ignore' });
  execSync(`set PATH="${newPath}"`, { stdio: 'ignore' });
}
