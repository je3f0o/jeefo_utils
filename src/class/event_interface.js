/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : event_interface.js
* Created at  : 2020-06-29
* Updated at  : 2020-06-29
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

const EventEmitter = require("../event_emitter");

module.exports = class EventInterface extends EventEmitter {
    constructor (Constructor, is_private) {
        super(is_private);
        if (new.target === Constructor) {
            throw new Error(`Abstract '${
                this.constructor.name
            }' interface class cannot be instantiated directly.`);
        }
    }
};
