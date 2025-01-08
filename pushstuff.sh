#!/bin/bash
# First stuff
echo Removing token
./remtoken.sh
echo Removed token.

git add .
read -p "Give me a commit desc: " desc
git commit -m desc

echo "Now git push it yourself!"
