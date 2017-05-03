/**
 * jeefo_core : v0.0.6
 * Author     : je3f0o, <je3f0o@gmail.com>
 * Homepage   : https://github.com/je3f0o/jeefo_core
 * License    : The MIT license
 * Copyright  : undefined
 **/
(function (jeefo) {

/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : core.js
* Created at  : 2017-04-08
* Updated at  : 2017-05-03
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/

var core_module = jeefo.module("jeefo_core", []);

var _transformer = {
	CAMEL_CASE_REGEXP : /[A-Z]/g,
	snake_replacer : function (letter, pos) {
		return (pos ? '_' : '') + letter.toLowerCase();
	},
	dash_replacer : function (letter, pos) {
		return (pos ? '-' : '') + letter.toLowerCase();
	},
	snake_case : function (str) {
		return str.replace(this.CAMEL_CASE_REGEXP, this.snake_replacer);
	},
	dash_case : function (str) {
		return str.replace(this.CAMEL_CASE_REGEXP, this.dash_replacer);
	}
};

// TODO: move it into jeefo.js
core_module.extend("curry", ["$injector"], function ($injector) {

	var make_injectable = function (factory) {
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

	var t = _transformer;
	var curry_maker = make_injectable(function (name, injectable) {
		$injector.register(t.snake_case(name + "Curry"), injectable);
	});

	curry_maker("makeInjectable", function () {
		return make_injectable;
	});

	return curry_maker;
});

core_module.extend("run", ["$injector"], function ($injector) {
	var LocalArray = Array;
	return function (dependencies, fn) {
		if (typeof dependencies === "function") {
			return dependencies.call(this);
		} else if (typeof dependencies === "string") {
			return fn.call(this, $injector.resolve_sync(dependencies));
		}

		for (var args = new LocalArray(dependencies.length), i = args.length - 1; i >= 0; --i) {
			args[i] = $injector.resolve_sync(dependencies[i]);
		}

		return fn.apply(this, args);
	};
});

core_module.extend("namespace", ["$injector", "make_injectable_curry"], function (injector, make_injectable_curry) {
	var Empty = function () {};
	var object_maker = function () {
		return new Empty();
	};

	var namespace_maker = make_injectable_curry(function (full_name, injectable) {
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
					fn           : object_maker,
					dependencies : [],
					resolve_once : true,
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

	var local_transformer = _transformer;
	namespace_maker("transform.dash_case", function () {
		return function (str) {
			return local_transformer.dash_case(str);
		};
	});
	namespace_maker("transform.snake_case", function () {
		return function (str) {
			return local_transformer.snake_case(str);
		};
	});

	return namespace_maker;
});

core_module.extend("factory", [
	"$injector",
	"transform.snake_case",
	"make_injectable_curry",
], function (injector, snake_case, make_injectable_curry) {
	return make_injectable_curry(function (name, injectable) {
		injector.register(snake_case(name + "Factory"), injectable);
	});
});

core_module.extend("service", [
	"$injector",
	"transform.snake_case",
	"make_injectable_curry",
], function (injector, snake_case, make_injectable_curry) {
	return make_injectable_curry(function (name, injectable) {
		injectable.is_constructor = true;
		injector.register(snake_case(name + "Service"), injectable);
	});
});

}(jeefo));