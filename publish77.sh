#! /bin/bash

ver=`egret publish . | sed -n '1p' | sed -n 's/\(.*[^0-9]\)\([0-9]*\).*/\2/p'`
mkdir -p release/html5/$ver/src/share
cp -r src/share/* release/html5/$ver/src/share
scp -r release/html5/$ver/* root@172.16.0.77:/var/www/h5
echo “OK!”
