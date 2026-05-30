@echo off
git checkout man
git pull origin man

echo Updating from main...
git fetch origin
git merge origin/main

set /p MSG=Commit message: 
git add .
git commit -m "%MSG%"
git push origin man