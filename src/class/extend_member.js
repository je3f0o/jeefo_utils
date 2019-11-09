/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : extend_member.js
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

class Abc { static static_method () {} }
const member_property_descriptor = Object.getOwnPropertyDescriptor(
    Abc.prototype, "constructor"
);
const static_property_descriptor = Object.getOwnPropertyDescriptor(
    Abc, "static_method"
);
const object_define_property = Object.defineProperty;

/**
 * Extend Class methods or properties. Which is using exact same property
 * descriptor when assigning to given object.
 *
 * @param Class {class} - Class constractor
 * @param member {String} - new member's namo
 * @param value {any} - Assigning value
 * @param is_static {Boolean} - If it's true which means assign directly into Class
 * itself. If it's false which means assigning to prototype of the Class object.
 */
function extend_member (Class, member, value, is_static = false) {
    let object, property_descriptor;

    if (is_static) {
        object              = Class;
        property_descriptor = static_property_descriptor;
    } else {
        object              = Class.prototype;
        property_descriptor = member_property_descriptor;
    }

    property_descriptor.value = value;
    object_define_property(object, member, property_descriptor);
}

module.exports = extend_member;
