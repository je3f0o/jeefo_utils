/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
 * File Name   : bytes.js
* Created at  : 2022-03-06
 * Updated at  : 2024-01-16
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

const is_number = require("./is/number");

const CAPTURE            = /^(\d+(?:\.\d+)?)([k|m|g|t]b)$/;
const BYTES_PER_KILOBYTE = 1024;
const BYTES_PER_MEGABYTE = Math.pow(BYTES_PER_KILOBYTE, 2);
const BYTES_PER_GIGABYTE = Math.pow(BYTES_PER_KILOBYTE, 3);
const BYTES_PER_TERABYTE = Math.pow(BYTES_PER_KILOBYTE, 4);
const BYTES_PER_PETABYTE = Math.pow(BYTES_PER_KILOBYTE, 5);

module.exports = (input, {fixed = 1, trim_zeros = true} = {}) => {
  if (typeof input === "string") {
    const matches = input.match(CAPTURE);
    if (!matches) throw new Error("Invalid input");

    let [, num, unit] = matches;
    num  = +num;
    unit = unit.toUpperCase();
    switch (unit) {
      case "KB" : return num * BYTES_PER_KILOBYTE;
      case "MB" : return num * BYTES_PER_MEGABYTE;
      case "GB" : return num * BYTES_PER_GIGABYTE;
      case "TB" : return num * BYTES_PER_TERABYTE;
      case "PB" : return num * BYTES_PER_PETABYTE;
    }
  } else if (is_number(input)) {
    let unit = 'B';

    LOOP:
    while (input >= BYTES_PER_KILOBYTE) {
      input /= BYTES_PER_KILOBYTE;
      switch (unit) {
        case 'B' : unit = "KB"; break;
        case "KB": unit = "MB"; break;
        case "MB": unit = "GB"; break;
        case "GB": unit = "TB"; break;
        case "TB": unit = "PB"; break LOOP;
      }
    }
    let result = input.toFixed(fixed);
    if (trim_zeros) result = result.replace(/\.0*$/, '');
    return `${result}${unit}`;
  }
  throw new Error("Invalid input");
};