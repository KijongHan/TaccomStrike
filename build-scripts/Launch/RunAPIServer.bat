#!/bin/bash
sudo systemctl stop callcheatonline_apiserver.service

cd ../..

echo "Deployment: Retrieving latest changes from git"
git pull

if [ "$CallCheatOnline_DbConnString" == "" ]; then
    echo "CallCheatOnline_DbConnString environment variable not set"
fi

echo "Deployment: Running Configuration Manager"
cd src
dotnet run -p "CallCheatOnline.Console.ConfigurationManager" "Development" $CallCheatOnline_DbConnString

echo "Deployment: Running Web API Server"
cd "CallCheatOnline.Web.API"
dotnet publish --configuration Release

echo "Starting api server service"
sudo systemctl start callcheatonline_apiserver.service
