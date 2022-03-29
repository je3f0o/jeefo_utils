/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-11-13
* Updated at  : 2021-11-10
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

const types = [
    "object",
    "number",
    "string",
    "boolean",
    "function",
    "undefined",
    "async_function",
];
for (const type of types) exports[type] = require(`./${type}`);

const {isArray} = Array;

exports.null  = v => v === null;
exports.array = v => isArray(v);