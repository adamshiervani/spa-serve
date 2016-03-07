#!/usr/bin/env node

var program = require('commander');
var express = require('express');
var app = express();

program
  .version(require('./package.json').version)
  .usage('<dir> [options]')
  .option('-i, --index [indexfile]', 'Specify the index file')
  .option('-p, --port [port]', 'Specify the port number')
  .parse(process.argv);

var opts = {
  index: program.index || 'index.html',
  port: program.port || '3000',
  dir: program.args[0] || './'
};

app.use(express.static(opts.dir));
app.use(function (req, res, next) {
  if (req.method === 'GET' && req.accepts('html')) {
    return res.sendFile(opts.index, {root: opts.dir}, next);
  } else {
    return next();
  }
});

app.listen(opts.port, () => {
  console.log('Listening at localhost:' + opts.port);
});
