/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : wrapper.js
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
    return function () {
        const original_error = new Error(`${fn.name} failed.`);
        return fn.apply(this, arguments).catch(err => {
            const stack = original_error.stack.split('\n');
            stack.splice(0, 2);
            err.stack = [err.stack, seperator, stack.join('\n')].join('\n');

            throw err;
        });
    };
};
