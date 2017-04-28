/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2016-09-01
* Updated at  : 2017-04-28
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

var fse      = require("fs-extra"),
	path     = require("path"),
	config   = require("./uglify_config.json"),
	uglify   = require("uglify-js"),
	_package = require("../package");

var IGNORE_REGEX = /\/\/ignore\:start(?:(?!\/\/ignore\:end)[.\s\S])+.*\n/ig;

var get_filesize  = function (path) {
	return fse.statSync(path).size;
};

var source_files = require("../source_files");

var source = source_files.map(function (file) {
	var ignore;
	var code = fse.readFileSync(`./${ file }`, "utf8").
		replace(IGNORE_REGEX, function ($1) {
			if (! ignore) {
				ignore = $1;
			}
			return '';
		});

	return code.trim();
}).join("\n\n");

// Compile

var browser_source = `(function (jeefo, $window, $document) { "use strict";\n\n${ source }\n\n}(window.jeefo, window, document));`;
var build_source   = `function fn (jeefo) {${ source }}`;
var node_source    = `"use strict";module.exports=function (jeefo) {${ source }};`;

browser_source = uglify.minify(browser_source, config).code;
build_source   = uglify.minify(build_source, config).code;
node_source    = uglify.minify(node_source, config).code;

// Final step
var output_filename  = path.resolve(__dirname, `../dist/${ _package.name }.js`);
var node_filename    = path.resolve(__dirname, `../dist/${ _package.name }.node.js`);
var build_filename   = path.resolve(__dirname, `../dist/${ _package.name }.build.js`);
var browser_filename = path.resolve(__dirname, `../dist/${ _package.name }.min.js`);

var MAX_LENGTH = _package.name.length > "copyright".length ? _package.name.length : "copyright".length;
var align = function (str) {
	var i = 0, space = '', len = MAX_LENGTH - str.length;

	for (; i < len; ++i) {
		space += ' ';
	}

	return `${ str }${ space }`;
};

browser_source = `/**
 * ${ align(_package.name) } : v${ _package.version }
 * ${ align("Author") } : ${ _package.author }
 * ${ align("Homepage") } : ${ _package.homepage }
 * ${ align("License") } : ${ _package.license }
 * ${ align("Copyright") } : 2017
 **/
${ browser_source }`;


fse.outputFileSync(output_filename, source);
fse.outputFileSync(node_filename, node_source);
fse.outputFileSync(build_filename, build_source);
fse.outputFileSync(browser_filename, browser_source);

console.log(`Raw source: ${ get_filesize(output_filename) } bytes.`);
console.log(`Node source: ${ get_filesize(build_filename) } bytes.`);
console.log(`Build source: ${ get_filesize(build_filename) } bytes.`);
console.log(`Browser source: ${ get_filesize(browser_filename) } bytes.`);
