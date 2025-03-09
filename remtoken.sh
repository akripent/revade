#!/bin/bash

# DO NOT SHARE
# THIS SCRIPT
# WARNING!!! DANGER!!
# you could leak ur token lol

file="system.cjs"
token="YOUR_TOKEN"

# Use sed to find the first line starting with "token =" and replace it
sed -i "0,/^token =/s/^token =.*/token = \"$token\"/" "$file"
