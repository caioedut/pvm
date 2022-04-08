$ErrorActionPreference = 'Stop'; # stop on all errors
$toolsDir   = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"

$fileLocation = Join-Path $toolsDir 'pvm-setup.exe'

$packageArgs = @{
  packageName   = 'php-version-manager'
  unzipLocation = $toolsDir
  fileType      = 'EXE' #only one of these: exe, msi, msu
  #url           = $url
  #url64bit      = $url64
  file         = $fileLocation

  softwareName  = 'php-version-manager*' #part or all of the Display Name as you see it in Programs and Features. It should be enough to be unique

  # MSI
  validExitCodes= @(0, 3010, 1641)

  #silentArgs   = '/S'           # NSIS
  silentArgs   = '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP-' # Inno Setup
}

Install-ChocolateyInstallPackage @packageArgs # https://docs.chocolatey.org/en-us/create/functions/install-chocolateyinstallpackage
