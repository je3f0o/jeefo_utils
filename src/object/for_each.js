/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : for_each.js
* Created at  : 2019-07-13
* Updated at  : 2019-10-09
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

const object_keys = Object.keys;

module.exports = function object_for_each (object, callback) {
    for (let keys = object_keys(object), i = 0; i < keys.length; ++i) {
        callback(keys[i], object[keys[i]], i);
    }
};
