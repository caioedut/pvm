@echo off

copy pvm.exe %APPDATA%\pvm

:: PVM PATH
setx PATH "%APPDATA%\pvm;%PATH%"
set PATH="%APPDATA%\pvm;%PATH%"

:: PHP PATH
setx PATH "C:\tools\php;%PATH%"
set PATH="C:\tools\php;%PATH%"

echo PVM has been installed.

timeout 5
exit
