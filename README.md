# Markdown-Derby-Training

## Context
This repo contain source file for website derby-training.com

## Installation
To convert the file you must install HUGO, install_hugo.sh should help you to install HUGO 

## How to use 
content file contain markdown files that will be process by Hugo then convert in a static website on a public folder

Theme PaperMod is used on this project

Use this command to push in prod (apache server)
```
hugo && cp -r public/* /var/www/html && rm -rf public/
```
