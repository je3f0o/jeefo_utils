/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : event_emitter.js
* Created at  : 2019-09-17
* Updated at  : 2019-10-17
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

const Readonly     = require("./object/readonly");
const array_remove = require("./array/remove");

class EventEmitter {
    constructor (is_private = false) {
        if (! is_private) {
            this._events = {};
            return;
        }
        const events = Object.create(null);

        const readonly = new Readonly(this);
        readonly.prop("on", (event_name, listener) => {
            if (! events[event_name]) {
                events[event_name] = [];
            }
            events[event_name].push(listener);
        }, false);

        const off_handler = (event_name, listener) => {
            if (events[event_name]) {
                array_remove(events[event_name], listener);
            }
        };
        readonly.prop("off", off_handler, false);
        readonly.prop("removeListener", off_handler, false);

        readonly.prop("emit", function (event_name, ...args) {
            if (events[event_name]) {
                const listeners = events[event_name].concat();
                listeners.forEach(listener => {
                    listener.apply(this, args);
                });
            }
        }, false);
    }

    on (event_name, listener) {
        if (! this._events[event_name]) {
            this._events[event_name] = [];
        }
        this._events[event_name].push(listener);
        return listener;
    }

    removeListener (event_name, listener) {
        if (this._events[event_name]) {
            const index = this._events[event_name].indexOf(listener);
            if (index >= 0) {
                this._events[event_name].splice(index, 1);
            }
        }
    }

    emit (event_name, ...args) {
        if (this._events[event_name]) {
            const listeners = this._events[event_name].concat();
            listeners.forEach(listener => {
                listener.apply(this, args);
            });
        }
    }

    once (event_name, event_handler) {
        const listener = this.on(event_name, function () {
            this.removeListener(event_name, listener);
            event_handler.apply(this, arguments);
        });
        return listener;
    }
}
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

module.exports = EventEmitter;