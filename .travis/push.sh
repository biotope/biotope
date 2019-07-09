#!/bin/sh

git checkout -b master
git remote set-url origin https://${GH_TOKEN}@github.com/biotope/biotope.git
git push --set-upstream origin master