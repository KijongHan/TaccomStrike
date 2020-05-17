#!/bin/bash

sudo systemctl stop callcheatonline_uiserver.service
cd ../..

echo "Deployment: Retrieving latest changes from git"
git checkout master
git pull

cd src/CallCheatOnline.Web.UI
echo "Running Webpack"
npm run magic

sleep 5
echo "Starting ui server service"
sudo systemctl start callcheatonline_uiserver.service