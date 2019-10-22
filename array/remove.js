/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : remove.js
* Created at  : 2017-08-09
* Updated at  : 2019-09-05
* Author      : jeefo
* Purpose     :
* Description :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const is_array = Array.isArray;

const remove_element = (array, element, remove_all_instances) => {
	let index = array.indexOf(element);
	while (index !== -1) {
		array.splice(index, 1);
        if (remove_all_instances) {
            index = array.indexOf(element);
        } else {
            return;
        }
	}
};

/**
 * Remove all elements from array by match given element.
 *
 * @param array {Array} - Array
 * @param element {any} - Removing element looking for
 */
module.exports = (array, elements, remove_all_instances = true) => {
    if (is_array(elements)) {
        elements.forEach(element => {
            remove_element(array, element, remove_all_instances);
        });
    } else {
        remove_element(array, elements, remove_all_instances);
    }
};
