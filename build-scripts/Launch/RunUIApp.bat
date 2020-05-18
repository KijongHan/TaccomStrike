#!/bin/bash

sudo systemctl stop callcheatonline_uiserver.service
cd ../..

echo "Deployment: Retrieving latest changes from git"
git checkout master
git pull

if [ "$CallCheatOnline_DbConnString" == "" ]; then
    echo "CallCheatOnline_DbConnString environment variable not set"
fi

echo "Deployment: Running Configuration Manager"
cd src
dotnet run -p "CallCheatOnline.Console.ConfigurationManager" "Development" $CallCheatOnline_DbConnString
cd CallCheatOnline.Web.UI
echo "Running Webpack"
npm run magic

sleep 5
echo "Starting ui server service"
sudo systemctl start callcheatonline_uiserver.service