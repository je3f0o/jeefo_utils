/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : readonly.js
* Created at  : 2019-08-04
* Updated at  : 2021-11-10
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

const readonly         = {writable: false, enumerable: true};
const {defineProperty} = Object;

class Readonly {
    constructor (object) {
        readonly.value = (property_name, value, is_enumerable = true) => {
            defineProperty(object, property_name, {
                value      : value,
                writable   : false,
                enumerable : is_enumerable,
            });
        };
        defineProperty(this, "property", readonly);
        this.prop = this.property;

        readonly.value = (property_name, getter, is_enumerable = true) => {
            if (typeof getter !== "function") {
                throw new TypeError("Getter must be callable function.");
            }
            defineProperty(object, property_name, {
                get          : getter,
                enumerable   : is_enumerable,
            });
        };
        defineProperty(this, "getter", readonly);

        readonly.value = (property_name, setter, is_enumerable = true) => {
            if (typeof setter !== "function") {
                throw new TypeError("setter must be callable function.");
            }
            defineProperty(object, property_name, {
                set          : setter,
                enumerable   : is_enumerable,
                configurable : false,
            });
        };
        defineProperty(this, "setter", readonly);

        readonly.value = (property_name, {get, set}, enumerable = true) => {
            if (typeof get !== "function") {
                throw new TypeError("getter property must be callable function.");
            }
            if (typeof set !== "function") {
                throw new TypeError("setter property must be callable function.");
            }
            defineProperty(object, property_name, {
                get, set, enumerable, configurable: false,
            });
        };
        defineProperty(this, "getter_setter", readonly);
    }
}

module.exports = Readonly;