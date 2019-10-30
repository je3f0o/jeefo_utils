/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : uuid_v4.js
* Created at  : 2019-10-24
* Updated at  : 2019-10-24
* Author      : jeefo
* Purpose     :
* Description :
* Reference   : https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const crypto   = require("crypto");
const Readonly = require("./object/readonly");

const hex = length => `[0-9a-f]{${ length }}`;
const build_regex = () => {
    return [
        hex(8),
        '-',
        hex(4),
        "-4",
        hex(3),
        "-[89ab]",
        hex(3),
        '-',
        hex(12),
    ].join('');
};

module.exports = (() => {
    const REGEX      = /[018]/g;
    const format     = ([1e7]+-1e3+-4e3+-8e3+-1e11);
    const { length } = format.match(REGEX);

    return () => {
        let index     = 0;
        const randoms = crypto.randomBytes(length);

        return format.replace(REGEX, c => {
            const r = randoms[index++];
            const v = c ^ (r & (0xf >> (c / 4)));
            return v.toString(16);
        });
    };
})();

const UUID = new RegExp(`^${ build_regex() }$`, 'i');
const readonly = new Readonly(module.exports);
readonly.prop("test", str => UUID.test(str));
