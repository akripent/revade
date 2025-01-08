#!/bin/bash
# First stuff
echo Removing token
./remtoken.sh
echo Removed token.

git add .
read -p "Give me a commit desc: " desc
git commit -m desc

echo "PUSHING!!!"

# Your push command (i have an alias)
shopt -s expand_aliases
uprevade
