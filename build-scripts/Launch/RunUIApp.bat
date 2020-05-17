#!/bin/bash

sudo systemctl stop callcheatonline_uiserver.service
cd ../..

echo "Deployment: Retrieving latest changes from git"
git checkout master
git pull

echo "Deployment: Running Configuration Manager"
cd src
dotnet run -p "CallCheatOnline.Console.ConfigurationManager" "Development" "Server=localhost,1433;Database=CallCheat_Production;User Id=application_login;Password=159789Qaz;"

cd CallCheatOnline.Web.UI
echo "Running Webpack"
npm run magic

sleep 5
echo "Starting ui server service"
sudo systemctl start callcheatonline_uiserver.service