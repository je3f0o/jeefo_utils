/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : interface.js
* Created at  : 2019-10-16
* Updated at  : 2019-10-16
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

class Interface {
    constructor (Constructor = Interface) {
        if (new.target === Constructor) {
            throw new Error(`Abstract '${
                this.constructor.name
            }' interface class cannot be instantiated directly.`);
        }
    }
}

module.exports = Interface;
