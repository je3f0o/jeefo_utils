/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : virtual_method.js
* Created at  : 2019-10-22
* Updated at  : 2019-10-22
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
    let method_name = "...";
    try {
        throw new Error('');
    } catch (e) {
        const error_line = e.stack.split('\n')[2];
        const caller = error_line.match(CAPTURE_METHOD_NAME)[1];
        method_name = `'${ caller.split('.').pop() }'`;
    }
    throw new Error(`Derived class must be implement ${
        method_name
    } virtual method.`);
};
