@echo off
cls
Title Open Advance monthly tracker
color 0A
echo.
echo.
echo today's date:- %date%
echo current time:- %time%
echo.
echo.
echo Copyright (c) Bibek. All rights reserved.
echo.
echo.
echo.
echo.
:cmd
echo ===== Open Advance monthly expense tracker =====
echo Now you are going to open your Advance Monthly expense tracker.
echo If you press any key then it's going to open your expense tracker file.
echo If you don't want to open your Advance Monthly expense tracker now, then simply you can close this window.
echo.
echo.
echo.                                              
pause
Start /d "C:\Program Files\Microsoft Office\root\Office16" excel.exe "C:\Users\Bibek\OneDrive\Documents\advance monthly expense (V 0.7)_2024.xlsm"
exit
