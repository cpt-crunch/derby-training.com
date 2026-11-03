# Markdown-Derby-Training

## Context
This repo contain source file for website derby-training.com

## Installation
To convert the file you must install HUGO, install_hugo.sh should help you to install HUGO 

## How to use 
content file contain markdown files that will be process by Hugo then convert in a static website on a public folder

Theme PaperMod is used on this project

Exercise pages live in `content/exercices/`. Hugo builds the `/exercices/` catalogue and its tag filters from those pages; add a Markdown file there to publish a new exercise. The `/entrainement/` page lets you compose, time, reorder, print, and randomly generate a workout. Sessions are saved in the browser. Add `duration: 15` to an exercise's front matter to set its suggested duration in minutes; otherwise the builder uses 10 minutes.

Use this command to push in prod (apache server)
```
hugo && cp -r public/* /var/www/html && rm -rf public/
```


PHP need dom extension 

```
sudo apt-get install php-dom
```
