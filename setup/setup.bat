@echo off

mkdir %PROGRAMDATA%\pvm
copy pvm.exe %PROGRAMDATA%\pvm

:: PHP AND PVM PATH
setx PATH "C:\tools\php;%PROGRAMDATA%\pvm;%PATH%"
set PATH="C:\tools\php;%PROGRAMDATA%\pvm;%PATH%"

echo PVM has been installed
