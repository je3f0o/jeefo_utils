/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : core.js
* Created at  : 2017-04-08
* Updated at  : 2017-04-27
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
//ignore:start
"use strict";

var jeefo = require("jeefo");

/* global */
/* exported */
/* exported */

//ignore:end

var core_module = jeefo.module("jeefo_core", []),

// TODO: move it into jeefo.js
make_injectable = function (factory) {
	return function (name, dependencies, fn, resolve_once) {
		if (typeof dependencies === "function") {
			resolve_once = fn;
			fn           = dependencies;
			dependencies = [];
		} else if (typeof dependencies === "string") {
			dependencies = [dependencies];
		}

		if (resolve_once === void 0) {
			resolve_once = true;
		}

		return factory.call(this, name, {
			fn           : fn,
			dependencies : dependencies,
			resolve_once : resolve_once,
		});
	};
};

var CAMEL_CASE_REGEXP = /[A-Z]/g;
var make_case_changer = function (separator) {
	var LOCAL_REGEXP = CAMEL_CASE_REGEXP;
	var changer = function (letter, pos) {
		return (pos ? separator : '') + letter.toLowerCase();
	};

	return function () {
		return this.replace(LOCAL_REGEXP, changer);
	};
};

String.prototype.dash_case  = make_case_changer('-');
String.prototype.snake_case = make_case_changer('_');

core_module.extend("curry", ["$injector"], function ($injector) {
	// Local references
	var make_injectable_local = make_injectable;

	return make_injectable_local(function (name, injectable) {
		$injector.register((name + "Curry").snake_case(), injectable);
	});
});

// TODO: move it into jeefo.js
core_module.curry("makeInjectable", function () { return make_injectable; });

core_module.extend("run", ["$injector"], function ($injector) {
	var LocalArray = Array;
	return function (dependencies, fn) {
		var i = 0, len, args;
		if (typeof dependencies === "function") {
			fn   = dependencies;
			args = [];
		} else if (typeof dependencies === "string") {
			args = [$injector.resolve_sync(dependencies)];
		} else {
			i    = 0;
			len  = dependencies.length;
			args = new LocalArray(len);
			for (; i < len; ++i) {
				args[i] = $injector.resolve_sync(dependencies[i]);
			}
		}

		return fn.apply(this, args);
	};
});

core_module.extend("namespace", ["$injector", "make_injectable_curry"], function (injector, make_injectable_curry) {
	return make_injectable_curry(function (full_name, injectable) {
		var namespaces = full_name.split('.'),
			name = namespaces.pop(),
			i = 0, len = namespaces.length,
			namespace = '', part, container;

		for (; i < len; ++i) {
			part = namespaces[i];

			if (namespace) {
				container = injector.resolve_sync(namespace);
			}

			namespace = namespace ? (namespace + '.' + part) : part;

			if (! injector.has(namespace)) {
				injector.register(namespace, {
					dependencies : [],
					resolve_once : true,
					fn : function () { return {}; }
				});

				if (container) {
					container[part] = injector.resolve_sync(namespace);
				}
			}
		}

		injector.register(full_name, injectable);

		if (namespace) {
			container       = injector.resolve_sync(namespace);
			container[name] = injector.resolve_sync(full_name);
		}
	});
});

core_module.extend("factory", [
	"$injector",
	"make_injectable_curry",
], function (injector, make_injectable_curry) {
	return make_injectable_curry(function (name, injectable) {
		injector.register((name + "Factory").snake_case(), injectable);
	});
});

core_module.extend("service", [
	"$injector",
	"make_injectable_curry",
], function (injector, make_injectable_curry) {
	return make_injectable_curry(function (name, injectable) {
		injectable.is_constructor = true;
		injector.register((name + "Service").snake_case(), injectable);
	});
});
