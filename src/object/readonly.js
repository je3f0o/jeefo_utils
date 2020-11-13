/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : readonly.js
* Created at  : 2019-08-04
* Updated at  : 2020-11-09
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

const readonly               = {writable: false, enumerable: true};
const object_define_property = Object.defineProperty;

class Readonly {
    constructor (object) {
        readonly.value = (property_name, value, is_enumerable = true) => {
            object_define_property(object, property_name, {
                value      : value,
                writable   : false,
                enumerable : is_enumerable,
            });
        };
        object_define_property(this, "property", readonly);
        this.prop = this.property;

        readonly.value = (property_name, getter, is_enumerable = true) => {
            if (typeof getter !== "function") {
                throw new TypeError("Getter must be callable function.");
            }
            object_define_property(object, property_name, {
                get          : getter,
                enumerable   : is_enumerable,
            });
        };
        object_define_property(this, "getter", readonly);

        readonly.value = (property_name, setter, is_enumerable = true) => {
            if (typeof setter !== "function") {
                throw new TypeError("setter must be callable function.");
            }
            object_define_property(object, property_name, {
                set          : setter,
                enumerable   : is_enumerable,
                configurable : false,
            });
        };
        object_define_property(this, "setter", readonly);

        readonly.value = (property_name, {get, set}, enumerable = true) => {
            if (typeof get !== "function") {
                throw new TypeError("getter property must be callable function.");
            }
            if (typeof set !== "function") {
                throw new TypeError("setter property must be callable function.");
            }
            object_define_property(object, property_name, {
                get, set, enumerable, configurable: false,
            });
        };
        object_define_property(this, "getter_setter", readonly);
    }
}

module.exports = Readonly;
