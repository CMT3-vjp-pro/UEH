git pull origin tu
echo "Commit message:"
read MSG
 
git checkout tu
git add .
git commit -m "$MSG"
git push origin tu