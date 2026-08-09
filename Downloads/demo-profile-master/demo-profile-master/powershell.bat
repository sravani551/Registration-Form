@echo off
set arg1=%1
shift
set rest=%1
:loop
shift
if "%1"=="" goto endloop
set rest=%rest% %1
goto loop
:endloop
cmd.exe /c %rest%
