#!/bin/sh

echo "Starting Hugo installation..."

mkdir /etc/hugo
wget -O /etc/hugo/bin.tar.gz  https://github.com/gohugoio/hugo/releases/download/v0.90.1/hugo_0.90.1_Linux-64bit.tar.gz
tar -zxf /etc/hugo/bin.tar.gz -C /etc/hugo
mv /etc/hugo/hugo /usr/bin 
rm -r -f /etc/hugo
