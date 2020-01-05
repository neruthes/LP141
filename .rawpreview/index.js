#!/usr/bin/env node

'use strict';

const fs = require('fs');

const exec = require('child_process').exec;



exec('mkdir _; mkdir _/_.neruthes.rawpreview; mkdir _/_.neruthes.rawpreview/config;');
exec('touch _/_.neruthes.rawpreview/config/list-of-files.txt;');
exec('touch _/_.neruthes.rawpreview/config/github-username.txt;');
exec('touch _/_.neruthes.rawpreview/config/github-repo.txt;');




let config = {
    username: fs.readFileSync('_/_.neruthes.rawpreview/config/github-username.txt').toString().trim(),
    repo: fs.readFileSync('_/_.neruthes.rawpreview/config/github-repo.txt').toString().trim(),
    files: fs.readFileSync('_/_.neruthes.rawpreview/config/list-of-files.txt').toString().trim().split('\n'),
    lastCommit: fs.readFileSync('.git/refs/heads/master').toString().trim()
};

exec('git log -n 1 | grep commit', function (err, stdout, stderr) {
    console.log('ver    ' + config.lastCommit);
    console.log(stdout.trim());
});

const indexPageBuilder = function () {
    const indexPage = fs.readFileSync(__dirname + '/base-template.html').toString().trim().replace('{{LIST}}', config.files.join('\n')).replace(/\{\{USERNAME\}\}/g, config.username).replace(/\{\{REPO\}\}/g, config.repo).replace('{{COMMIT}}', config.lastCommit);
    fs.writeFileSync('index.html', indexPage);
};

const tocDoc = `# Index of «${config.username}/${config.repo}»

${
    config.files.map(function (fileEntry, i) {
        var file;
        if (fileEntry.indexOf('|') !== -1) {
            file = {
                path: fileEntry.split('|')[0],
                title: fileEntry.split('|')[1]
            };
        } else {
            file = {
                path: fileEntry,
                title: fileEntry
            };
        };
        return `- [${file.title}](https://${config.username}.github.io/${config.repo}/?read=${i})`;
        // return `- [${file.title}](http://localhost:8000/?read=${i})`;
    }).join('\n')
}`;

const tocDocBuilder = function () {
    fs.writeFileSync('_/_.neruthes.rawpreview/TOC.md', tocDoc);
};

indexPageBuilder();
tocDocBuilder();

console.log('Build completed.');
