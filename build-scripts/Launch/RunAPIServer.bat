#!/bin/bash
sudo systemctl stop callcheatonline_apiserver.service

cd ../..

echo "Deployment: Retrieving latest changes from git"
git pull

echo "Deployment: Running Configuration Manager"
cd src
dotnet run -p "CallCheatOnline.Console.ConfigurationManager" "Development" "Server=localhost,1433;Database=CallCheat_Production;User Id=application_login;Password=159789Qaz;"

echo "Deployment: Running Web API Server"
cd "CallCheatOnline.Web.API"
dotnet publish --configuration Release

echo "Moving server applicatino to public web folder"
cp "bin/Release/netcoreapp2.2/publish/CallCheatOnline.Web.API.dll" "/var/www/callcheatonline/CallCheatOnline.Web.API.dll"

echo "Starting api server service"
sudo systemctl start callcheatonline_apiserver.service
