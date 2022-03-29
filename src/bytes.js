/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : bytes.js
* Created at  : 2022-03-06
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

const is_number = require("./is/number");

const CAPTURE            = /^(\d+(?:\.\d+)?)([k|m|g|t]b)$/;
const BYTES_PER_KILOBYTE = 1024;
const BYTES_PER_MEGABYTE = Math.pow(BYTES_PER_KILOBYTE, 2);
const BYTES_PER_GIGABYTE = Math.pow(BYTES_PER_KILOBYTE, 3);
const BYTES_PER_TERABYTE = Math.pow(BYTES_PER_KILOBYTE, 4);

module.exports = input => {
  if (typeof input === "string") {
    const matches = input.match(CAPTURE);
    if (!matches) throw new Error("Invalid input");

    let [, num, unit] = matches;
    num = +num;
    switch (unit.toLowerCase()) {
      case "kb" : return num * BYTES_PER_KILOBYTE;
      case "mb" : return num * BYTES_PER_MEGABYTE;
      case "gb" : return num * BYTES_PER_GIGABYTE;
      case "tb" : return num * BYTES_PER_TERABYTE;
    }
  } else if (is_number(input)) {
    let unit = "bytes";

    LOOP:
    while (input >= BYTES_PER_KILOBYTE) {
      input /= BYTES_PER_KILOBYTE;
      switch (unit) {
        case "bytes":
          unit = "kb";
          break;
        case "kb":
          unit = "mb";
          break;
        case "mb":
          unit = "gb";
          break;
        case "gb":
          unit = "tb";
          break LOOP;
      }
    }

    return `${input}${unit}`;
  }
  throw new Error("Invalid input");
};