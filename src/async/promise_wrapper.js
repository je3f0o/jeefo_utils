/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : promise_wrapper.js
* Created at  : 2020-05-29
* Updated at  : 2020-05-29
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

let seperator = `--- (async) `;
seperator = seperator + '-'.repeat(80 - seperator.length);

module.exports = fn => {
    const original_error = new Error(`${fn.name} failed.`);
    return new Promise((resolve, reject) => {
        fn(resolve, err => {
            const stack = original_error.stack.split('\n');
            stack.splice(0, 3);
            err.stack = [err.stack, seperator, stack.join('\n')].join('\n');

            reject(err);
        });
    });
};
