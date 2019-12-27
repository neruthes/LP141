#!/usr/bin/env node

'use strict';

const fs = require('fs');

const exec = require('child_process').exec;



exec('mkdir _; mkdir _/_rawpreview; mkdir _/_rawpreview/config;');
exec('touch _/_rawpreview/config/list-of-files.txt;');
exec('touch _/_rawpreview/config/github-username.txt;');
exec('touch _/_rawpreview/config/github-repo.txt;');




let config = {
    username: fs.readFileSync('_/_rawpreview/config/github-username.txt').toString().trim(),
    repo: fs.readFileSync('_/_rawpreview/config/github-repo.txt').toString().trim(),
    files: fs.readFileSync('_/_rawpreview/config/list-of-files.txt').toString().trim().split('\n').join('[[4f4c84781da6]]'),
    lastCommit: fs.readFileSync('.git/refs/heads/master').toString().trim()
};

console.log(config.lastCommit);


const builder = function () {
    const indexPageTemplateDefault = fs.readFileSync(__dirname + '/base-template.html').toString().trim().replace('{{LIST}}', config.files).replace('{{USERNAME}}', config.username).replace('{{REPO}}', config.repo).replace('{{COMMIT}}', config.lastCommit);
    fs.writeFileSync('index.html', indexPageTemplateDefault);
};

builder();

console.log('Build completed.');
