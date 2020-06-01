/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : format.js
* Created at  : 2020-06-01
* Updated at  : 2020-06-01
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

const PLACEHOLDER_REGEX = /{\s*(\d+)\s*}/g;

module.exports = (format, ...args) => {
    return format.replace(PLACEHOLDER_REGEX, (match, number) => {
        return args[number] !== undefined ? args[number] : match;
    });
};
