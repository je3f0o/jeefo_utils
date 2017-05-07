/**
 * jeefo_core : v0.0.8
 * Author     : je3f0o, <je3f0o@gmail.com>
 * Homepage   : https://github.com/je3f0o/jeefo_core
 * License    : The MIT License
 * Copyright  : 2017
 **/
jeefo.use(function () {

/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : core.js
* Created at  : 2017-04-08
* Updated at  : 2017-05-07
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/

var core_module = jeefo.module("jeefo_core", []),

CAMEL_CASE_REGEXP = /[A-Z]/g,
dash_case = function (str) {
	return str.replace(CAMEL_CASE_REGEXP, function (letter, pos) {
		return (pos ? '-' : '') + letter.toLowerCase();
	});
},
snake_case = function (str) {
	return str.replace(CAMEL_CASE_REGEXP, function (letter, pos) {
		return (pos ? '_' : '') + letter.toLowerCase();
	});
},

to_string          = Object.prototype.toString,
function_to_string = Function.toString,

IS_DIGITS_SIGNED_INT      = /^\-?\d+$/,
IS_DIGITS_UNSIGNED_INT    = /^\d+$/,
IS_DIGITS_SIGNED_NUMBER   = /^\-?\d+(?:.\d+)?$/,
IS_DIGITS_UNSIGNED_NUMNER = /^\d+(?:.\d+)?$/,

// Used to detect host constructors (Safari > 4; really typed array specific)
HOST_CONSTRUCTOR_REGEX = /^\[object .+?Constructor\]$/,
/*
// Compile a regexp using a common native method as a template.
// We chose `Object#toString` because there's a good chance it is not being mucked with.
new RegExp('^' +
	// Coerce `Object#toString` to a string
	String(to_string).
		// Escape any special regexp characters
		replace(/[.*+?^${}()|[\]\/\\]/g, "\\$&").
		// Replace mentions of `toString` with `.*?` to keep the template generic.
		// Replace thing like `for ...` to support environments like Rhino which add extra info
		// such as method arity.
		replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + '$'
)
*/
NATIVE_REGEX = /^function.*?\(\) \{ \[native code\] \}$/,

is_date = function (value) {
	return to_string.call(value) === "[object Date]";
},

is_regex = function (value) {
	return to_string.call(value) === "[object RegExp]";
},

is_digits = function (value, is_unsigned) {
	return (is_unsigned ? IS_DIGITS_UNSIGNED_NUMNER : IS_DIGITS_SIGNED_NUMBER).test(value);
},

is_digits_int = function (value, is_unsigned) {
	return (is_unsigned ? IS_DIGITS_UNSIGNED_INT : IS_DIGITS_SIGNED_INT).test(value);
},

is_native = function (value) {
	var type = typeof value;
	return type === "function" ?
		// Use `Function#toString` to bypass the value's own `toString` method
		// and avoid being faked out.
		NATIVE_REGEX.test(function_to_string.call(value)) :
		// Fallback to a host object check because some environments will represent
		// things like typed arrays as DOM methods which may not conform to the
		// normal native pattern.
		(value && type === "object" && HOST_CONSTRUCTOR_REGEX.test(to_string.call(value))) || false;	
},

json_parse = function (value) {
	try {
		return JSON.parse(value);
	} catch (e) {}
};

core_module.extend("namespace", ["$injector", "make_injectable"], function (injector, make_injectable) {
	return function (full_name) {
		var namespaces = full_name.split('.'),
			name = namespaces.pop(),
			i = 0, namespace = '', part, container;

		for (; i < namespaces.length; ++i) {
			part = namespaces[i];

			if (namespace) {
				container = injector.resolve_sync(namespace);
			}

			namespace = namespace ? namespace + '.' + part : part;

			if (! injector.has(namespace)) {
				injector.register(namespace, {
					fn : function () { return {}; }
				});

				if (container) {
					container[part] = injector.resolve_sync(namespace);
				}
			}
		}

		injector.register(full_name, make_injectable.apply(null, arguments));

		if (namespace) {
			container       = injector.resolve_sync(namespace);
			container[name] = injector.resolve_sync(full_name);
		}

		return this;
	};
}).

namespace("transform.dash_case", function () {
	return dash_case;
}).

namespace("transform.snake_case", function () {
	return snake_case;
}).

extend("curry", [
	"$injector",
	"make_injectable",
	"transform.snake_case",
], function ($injector, make_injectable, snake_case) {
	return function (name) {
		$injector.register(snake_case(name + "Curry"), make_injectable.apply(null, arguments));
		return this;
	};
}).

extend("run", ["$injector", "$q", "Array"], function ($injector, $q, Arr) {
	var instance = this;

	return function (dependencies, fn) {
		if (typeof dependencies === "function") {
			dependencies.call(this);
		} else if (typeof dependencies === "string") {
			$injector.resolve(dependencies).then(function (value) {
				fn.call(instance, value);
			});
		} else {
			var	args = new Arr(dependencies.length);

			$q.for_each_async(dependencies, function (dependency, index, next) {
				$injector.resolve(dependency).then(function (value) {
					args[index] = value;
					next();
				});
			}).then(function () {
				fn.apply(instance, args);
			});
		}

		return this;
	};
}).

extend("factory", [
	"$injector",
	"make_injectable",
	"transform.snake_case",
], function ($injector, make_injectable, snake_case) {
	return function (name) {
		$injector.register(snake_case(name + "Factory"), make_injectable.apply(null, arguments));
		return this;
	};
}).

extend("service", [
	"$injector",
	"make_injectable",
	"transform.snake_case",
], function ($injector, make_injectable, snake_case) {
	return function (name) {
		var injectable = make_injectable.apply(null, arguments);
		injectable.is_constructor = true;

		$injector.register(snake_case(name + "Service"), injectable);
		return this;
	};
}).

run("$injector", function ($injector) {

	$injector.register("is_date", {
		fn : function () { return is_date; }
	}).
	register("is_regex", {
		fn : function () { return is_regex; }
	}).
	register("is_digit", {
		fn : function () { return is_digits; }
	}).
	register("is_digit_int", {
		fn : function () { return is_digits_int; }
	}).
	register("is_native", {
		fn : function () { return is_native; }
	}).
	register("json_parse", {
		fn : function () { return json_parse; }
	});

});

});