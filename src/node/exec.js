/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : exec.js
* Created at  : 2022-01-26
* Updated at  : 2022-03-25
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const {exec} = require("child_process");

module.exports = (command, options) => new Promise(resolve => {
  exec(command, options, (err, stdout, stderr) => {
    resolve({stdout, stderr, exit_code: err ? err.code : 0});
  });
});