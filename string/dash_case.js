/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : dash_case.js
* Created at  : 2017-08-09
* Updated at  : 2017-08-11
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start

/* globals */
/* exported */

// ignore:end

var CAMEL_CASE_REGEXP = /[A-Z]/g;

module.exports = function (str) {
	return str.replace(CAMEL_CASE_REGEXP, function (letter, pos) {
		return (pos ? '-' : '') + letter.toLowerCase();
	});
};
