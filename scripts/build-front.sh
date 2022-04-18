#!/bin/sh
if [ ! -f node-v16.13.0-linux-x64.tar.gz ]; then
	wget http://[IP]/artifactory/nodejs/v16.13.0/node-v16.13.0-linux-x64.tar.gz
	tar xvzf node-v16.13.0-linux-x64.tar.gz

fi

if [ ! -f linux-x64-48_binding.node ]; then
	wget http://[IP]/artifactory/repo-dev/com/sass-lang/node-sass/4.9.0/linux-x64-48_binding.node
fi

BASE_PATH=$PWD
export PATH=$PATH:$BASE_PATH/node-v16.13.0-linux-x64/bin
export SASS_BINARY_PATH=$BASE_PATH/linux-x64-48_binding.node
ln -s $BASE_PATH/node-v16.13.0-linux-x64/bin/node $BASE_PATH/node-v16.13.0-linux-x64/bin/nodejs

echo "PATH=$PATH"

npm config set registry http://[IP]/artifactory/api/npm/npm/
npm config set always-auth false
npm config set strict-ssl false
npm config set legacy-peer-deps true

cd src\/main\/frontend

npm install npm
npm install
npm install ngx-bootstrap\@8.0.0-RC.5
if [ $? -eq 0 ]
then
  echo "npm install successfully executed"
else
  echo "npm install failed" >&2
  exit 1
fi

node ./node_modules/@angular/cli/bin/ng build --prod
if [ $? -eq 0 ]
then
  echo "npm run build successfully executed"
else
  echo "npm run build failed" >&2
  exit 1
fi

node ./node_modules/@angular/cli/bin/ng test --codeCoverage=true --watch=false --browsers=ChromeHeadless
if [ $? -eq 0 ]
then
  echo "npm run test successfully executed"
else
  echo "npm run test failed" >&2
  exit 1
fi

