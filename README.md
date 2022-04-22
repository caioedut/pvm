## PHP Version Manager
CLI to manage PHP versions, created for Windows.

## Before Install
If PHP is already installed, it is recommended that you remove it. Also remove the directory from the system environment "PATH" variable.

## CLI
#### `pvm help`
Show all `pvm-cli` actions.

#### `pvm version`
Show current `pvm-cli` version.

#### `pvm dir`
Show installed PHP directory used by PVM.

#### `pvm list`
List all installed PHP versions.

#### `pvm install X.X.X`
Install a PHP version.

#### `pvm uninstall X.X.X`
Uninstall a PHP version.

#### `pvm use X.X.X`
Change PHP version.

#### `pvm php.ini`
Open php.ini to allow editing (see `pvm refresh`).

#### `pvm refresh`
Refresh changes on php.ini (see `pvm php.ini`).
