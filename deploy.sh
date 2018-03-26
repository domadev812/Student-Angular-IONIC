#!/bin/bash

#Create timestamp for putting the new build
app_domain="staging.app.kts.slatedev.com"
ip_address="staging.app.kts.slatedev.com"

timestamp=$(date +%s)
www_dir="~/www"
number_of_builds_saved=2
user="deploy"
env="prod"

echo "1. staging.app.kts.slatedev.com"
echo "2. beta.app.kts.slatedev.com"
echo "3. app.kts.com"
echo -n "Which domain are you deploying to? (1,2,3)[ENTER]: "
read app_domain_choice

echo $app_domain_choice
if [ "$app_domain_choice" = 1 ]; then
    app_domain="staging.app.kts.slatedev.com"
    ip_address="staging.app.kts.slatedev.com"
    env="stag"
elif [ "$app_domain_choice" = 2 ]; then
    app_domain="beta.app.kts.slatedev.com"
    ip_address="beta.app.kts.slatedev.com"
    env="beta"
elif [ "$app_domain_choice" = 3 ]; then
    app_domain="app.kts.com"
    ip_address="89.34.16.194"
    www_dir="/usr/share/nginx/html"
    user="root"
else
    echo "Invalid choice"
    exit 1
fi
echo $app_domain
echo "$www_dir/$app_domain/$timestamp"
echo "Build production Angular 2 app"
npm run browser:prod

echo "$app_domain: Create new directory for build script on the server and make sure there is a current directory as well on"
ssh $user@$ip_address "mkdir -p $www_dir/$app_domain/$timestamp" || exit 1

echo "$app_domain: Transfer the new build to the server"
rsync -auv -e ssh --progress www/* $user@$ip_address:$www_dir/$app_domain/$timestamp || exit 1

# echo "$app_domain: Transfer the .well-known dir to the server"
# rsync -auv -e ssh --progress .well-known/* deploy@$app_domain:$www_dir/$app_domain/$timestamp/.well-known/ || exit 1

# echo "$app_domain: Transfer the apple-app-site-association file to the server"
# rsync -auv -e ssh --progress apple-app-site-association deploy@$app_domain:$www_dir/$app_domain/$timestamp/apple-app-site-association || exit 1

echo "$app_domain: Link the new build folder to current"
ssh $user@$ip_address "rm -rf $www_dir/$app_domain/current; ln -s $www_dir/$app_domain/$timestamp $www_dir/$app_domain/current" || exit 1

echo "$app_domain: Remove old versions ($number_of_builds_saved will remain)" 
ssh $user@$ip_address "cd $www_dir/$app_domain; ls -1tr | head -n -$(($number_of_builds_saved+1)) | xargs -d '\n' rm -rf --"  || exit 1
