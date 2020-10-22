/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : deep_merge.js
* Created at  : 2020-07-03
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

const {isArray}   = Array;
const is_object   = v => v !== null && typeof v === "object" && !isArray(v);
const object_keys = Object.keys;

function deep_merge (target, source) {
    for (const key of object_keys(source)) {
        if (is_object(source[key])) {
            if (! target[key]) target[key] = {};
            deep_merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}

module.exports = (target, ...sources) => {
    for (const s of sources) deep_merge(target, s);
    return target;
};
