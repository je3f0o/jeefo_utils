/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : readonly.js
* Created at  : 2019-08-04
* Updated at  : 2019-10-21
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

const object_define_property = Object.defineProperty;

class Readonly {
    constructor (object) {
        this.prop = (property_name, value, is_enumerable = true) => {
            object_define_property(object, property_name, {
                value      : value,
                writable   : false,
                enumerable : is_enumerable,
            });
        };

        this.getter = (property_name, getter, is_enumerable = true) => {
            if (typeof getter !== "function") {
                throw new TypeError("Getter must be callable function.");
            }
            object_define_property(object, property_name, {
                get        : getter,
                enumerable : is_enumerable,
            });
        };

        this.setter = (property_name, setter, is_enumerable = true) => {
            if (typeof setter !== "function") {
                throw new TypeError("Getter must be callable function.");
            }
            object_define_property(object, property_name, {
                set        : setter,
                enumerable : is_enumerable,
            });
        };

        this.getter_setter = (property_name, {
            get,
            set,
        }, enumerable = true) => {
            if (! get) {
                throw new TypeError("get property must be callable function.");
            }
            if (! set) {
                throw new TypeError("set property must be callable function.");
            }
            const descriptor = { get, set, enumerable };
            object_define_property(object, property_name, descriptor);
        };
    }
}

/**
 * Assign readonly property or method to given object.
 *
 * @param object {Object} - any instance of object
 * @param property {String} - property or method name
 * @param value {Any} - readonly value
 */

module.exports = Readonly;
