/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : remove.js
* Created at  : 2017-08-09
* Updated at  : 2019-07-04
* Author      : jeefo
* Purpose     :
* Description :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

/**
 * Remove all elements from array by match given element.
 *
 * @param array {Array} - Array
 * @param element {any} - Removing element looking for
 */
module.exports = (array, element, remove_all_instances = true) => {
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
