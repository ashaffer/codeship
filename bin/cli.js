#!/usr/bin/env node

var codeship = require('..')({apiKey: process.env.CODESHIP_API_KEY});
var args = process.argv;

if(args[0] === 'node')
  args.shift();

var cmd = args[1];
switch(cmd) {
  case 'projects':
    codeship.projects(function(err, projects) {
      if(err) throw err;
      projects.forEach(function(project) {
        console.log(project.repository_name + ' (' + project.repository_provider + ')');
      });
    });
  break;
  case 'project':
    codeship.project(function(err, project) {
      if(err) throw err;

    });
}
