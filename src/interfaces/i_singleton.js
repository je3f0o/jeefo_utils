/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_singleton.js
* Created at  : 2021-11-10
* Updated at  : 2021-11-13
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

const Readonly  = require("../object/readonly");
const Interface = require("../class/interface");

class ISingleton extends Interface {
    constructor () {
        super(ISingleton);
        const {constructor} = this;

        if (constructor.shared) {
            throw new Error(
                "Singleton object cannot be instantiated more than once."
            );
        }

        const readonly = new Readonly(constructor);
        readonly.getter("shared", () => this);
    }
}

module.exports = ISingleton;