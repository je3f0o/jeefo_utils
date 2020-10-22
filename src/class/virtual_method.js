/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : virtual_method.js
* Created at  : 2019-10-22
* Updated at  : 2020-10-22
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

const CAPTURE_METHOD_NAME = /at ([^\s]+)/;

module.exports = () => {
    const e          = new Error('');
    const error_line = e.stack.split('\n')[2];
    const caller     = error_line.match(CAPTURE_METHOD_NAME)[1].split('.');
    throw new Error(`Derived class '${
        caller.shift()
    }' must be implement virtual method '${
        caller.pop()
    }()'.`);
};
