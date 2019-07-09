#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_package_json() {
  git checkout -b master
  git add package.json
  git commit --message "Travis release: $TRAVIS_TAG"
}

upload_files() {
  git remote set-url origin https://${GH_TOKEN}@github.com/biotope/biotope.git
  git push --set-upstream origin master
}

setup_git
commit_package_json
upload_files