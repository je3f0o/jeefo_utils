/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : remove.js
* Created at  : 2017-08-09
* Updated at  : 2020-10-22
* Author      : jeefo
* Purpose     :
* Description :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const {isArray} = Array;

const remove_element = (array, element, remove_all_instances) => {
    let index = array.indexOf(element);
    if (remove_all_instances) {
        while (index !== -1) {
            array.splice(index, 1);
            index = array.indexOf(element);
        }
    } else array.splice(index, 1);
};

/**
 * Remove all elements from array by match given element.
 *
 * @param array {Array} - Array
 * @param element {any} - Removing element looking for
 */
module.exports = (array, elements, remove_all_instances = true) => {
    if (isArray(elements)) {
        elements.forEach(element => {
            remove_element(array, element, remove_all_instances);
        });
    } else {
        remove_element(array, elements, remove_all_instances);
    }
};
