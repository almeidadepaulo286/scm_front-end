@echo off
setlocal

title BUILD PARA DESENVOLVIMENTO
color E
rem Light Yellow

:begin
cls
echo.
echo  *****************************************************************
echo  ***    T A R E F A S   D E   D E S E N V O L V I M E N T O    ***
echo  *****************************************************************
echo.
echo  [ 1 ]  Executar o projeto em localhost [4200]
echo.
echo  [ 2 ]  Iniciar JSON Server (api_db.json) [3002]
echo.
echo  [ 3 ]  Iniciar Lite Server (/dist/SCM) [3000]
echo.
echo  [ 4 ]  Compilar para Desenvolvimento
echo.
echo  [ 5 ]  Compilar para Producao
echo.
echo  [ 0 ]  Finalizar ^& Sair
echo.
echo.

set /p op=Digite a opcao: _
if "%op%"=="1" goto op1
if "%op%"=="2" goto op2
if "%op%"=="3" goto op3
if "%op%"=="4" goto op4
if "%op%"=="5" goto op5
if "%op%"=="0" goto end
goto begin

:op1
@echo on
ng serve
@echo off
echo.
pause
goto begin

:op2
@echo on
json-server --port 3002 --watch api_db.json
@echo off
echo.
pause
goto begin

:op3
@echo on
lite-server --baseDir="dist/SCM"
@echo off
echo.
pause
goto begin

:op4
@echo on
ng build --configuration=dev
@echo off
copy /y api_db.json dist/SCM
echo.
pause
goto begin

:op5
@echo on
ng build --configuration=production
@echo off
echo.
pause
goto begin

:end
endlocal
@exit /b
