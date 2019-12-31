#!/bin/sh

git add .;
git commit -am "Regular update: `datenow` (part-1)";

node .rawpreview/index.js;

uuid v4 > .uuid;

git add .;
git commit -am "Regular update: `datenow` (part-2)";
git push;
