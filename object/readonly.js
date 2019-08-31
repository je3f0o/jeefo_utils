/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : readonly.js
* Created at  : 2019-08-04
* Updated at  : 2019-08-05
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

/**
 * Assign readonly property or method to given object.
 *
 * @param object {Object} - any instance of object
 * @param property {String} - property or method name
 * @param value {Any} - readonly value
 */
function readonly (object, property, value, is_enumerable = true) {
    object_define_property(object, property, {
        value      : value,
        writable   : false,
        enumerable : is_enumerable,
    });
}

module.exports = readonly;
