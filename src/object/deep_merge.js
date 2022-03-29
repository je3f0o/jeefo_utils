/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : deep_merge.js
* Created at  : 2020-07-03
* Updated at  : 2022-03-29
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

const is_object = require("../is/object");
const {isArray} = Array;

const deep_merge = (target, source) => {
  const entries = isArray(source) ? source.entries() : Object.entries(source);
  for (const [key, value] of entries) {
    if (is_object(value) && is_object(target[key])) {
      deep_merge(target[key], value);
    } else {
      target[key] = source[key];
    }
  }
};

module.exports = (target, ...sources) => {
  for (const s of sources) deep_merge(target, s);
  return target;
};