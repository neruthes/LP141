#!/bin/sh

git add .;
git commit -am "Regular update: `datenow` (Pre-commit)";
node .rawpreview/index.js;
uuid v4 > .uuid;
u;
