#!/bin/bash
sudo systemctl stop callcheatonline_apiserver.service

cd ../..

echo "Deployment: Retrieving latest changes from git"
git pull

echo "Deployment: Running Configuration Manager"
cd src
dotnet run -p "CallCheatOnline.Console.ConfigurationManager" "Development" "Server=localhost,1433;Database=CallCheat_Production;User Id=application_login;Password=159789Qaz;"
cd ..

echo "Deployment: Running Web API Server"
cd "CallCheatOnline.Web.API"
dotnet publish --configuration Release

cp "bin/Release/netcoreapp2.2/publish/CallCheatOnline.Web.API.dll" "/var/www/callcheatonline/CallCheatOnline.Web.API.dll"

sudo systemctl start callcheatonline_apiserver.service