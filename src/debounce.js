/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : debounce.js
* Created at  : 2020-10-20
* Updated at  : 2020-10-20
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

module.exports = (fn, delay) => {
    let timeout_id;
    return function (...args) {
        clearTimeout(timeout_id);
        timeout_id = setTimeout(() => fn.apply(this, args), delay);
    };
};
