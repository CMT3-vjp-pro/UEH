@echo off
git checkout lion
git pull origin lion

echo Updating from main...
git fetch origin
git merge origin/main

set /p MSG=Commit message: 
git add .
git commit -m "%MSG%"
git push origin lion