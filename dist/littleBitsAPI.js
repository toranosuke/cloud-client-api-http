(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
window.littleBitsAPI = require('../lib/index')

}, {"../lib/index":2}],
2: [function(require, module, exports) {
var merge = require('merge')
var make_method = require('./make-method')
var routes = require('./routes')
var rutils = require('./route-utils')

var root_defaults = {
  host: 'https://api-http.littlebitscloud.cc',
  version: '2'
}



module.exports = API(root_defaults)

function API(base_defaults) {

  var api = routes.reduce(function(acc, route) {
    var name = rutils.calc_fname(route)
    if (name) {
      acc[name] = make_method(base_defaults, rutils.functionify(route))
    }
    return acc
  }, {})

  api.defaults = function defaults(new_defaults){
    if (arguments.length === 0) return base_defaults
    return API(merge({}, base_defaults, new_defaults))
  }

  return api
}



// Private

module.exports._process_signature = require('./method-process-signature')

}, {"./make-method":3,"./routes":4,"./route-utils":5,"./method-process-signature":6}],
3: [function(require, module, exports) {
var process_signature = require('./method-process-signature')
var merge = require('merge')



module.exports = make_method

function make_method(base_defaults, f) {
  // Give this function a better name. We could
  // accept a name parameter and create the function
  // using Function constructor.
  function todo_name_me() {
    var args = process_signature(arguments)
    var opts = merge({}, base_defaults, args.overrides)
    return f.apply(null, [opts, args.cb])
  }

  todo_name_me.defaults = function(base_defaults_method) {
    if (arguments.length === 0) return base_defaults
    return make_method(merge({}, base_defaults, base_defaults_method), f)
  }

  return todo_name_me
}

}, {"./method-process-signature":6}],
6: [function(require, module, exports) {
var snakeify = require('to-snake-case')
var transform = require('lodash.transform')
var merge = require('merge')
var default_cb = (console && console.log && console.log.bind(console)) || function noop(){};



module.exports = process_signature

function process_signature(args) {
  var args_ = {};

  if (typeof args[0] === 'function') {

    args_.overrides = {};
    args_.cb = args[0];

  } else if (typeof args[0] === 'string') {

    var overrides = typeof args[1] === 'object' ? args[1] : null
    args_.overrides = merge({device_id: args[0]}, normalize_key_case(overrides || {}));
    args_.cb = overrides
      ? (args[2] || default_cb)
      : (args[1] || default_cb)

  } else {

    args_.overrides = normalize_key_case(args[0] || {})
    args_.cb = args[1] || default_cb

  }

  return args_
}



function normalize_key_case(options) {
  return transform(options, do_snakeify, {})

  function do_snakeify(o, v, k) {
    o[snakeify(k)] = v
  }
}

}, {}],
4: [function(require, module, exports) {

// Generated from scripts/download-routes.js on Wed Jun 11 2014 00:22:37 GMT-0400 (EDT)

module.exports = [
  {
    "path": "/ping",
    "method": "GET",
    "auth": false,
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": null
  },
  {
    "path": "/devices",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "device_hash",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "update",
          "type": "object",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null,
          "children": [
            {
              "name": "label",
              "type": "string",
              "required": true,
              "allowedValues": null,
              "disallowedValues": null
            }
          ]
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "PUT",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "update",
          "type": "object",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null,
          "children": [
            {
              "name": "label",
              "type": "string",
              "required": null,
              "allowedValues": null,
              "disallowedValues": null
            }
          ]
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "DELETE",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}/light",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "mode",
          "type": "string",
          "required": false,
          "allowedValues": [
            "blink",
            "hold"
          ],
          "disallowedValues": null
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "allowedValues": [
            "green",
            "yellow",
            "red",
            "blue",
            "purple",
            "white",
            "cyan",
            "clownbarf"
          ],
          "disallowedValues": null
        },
        {
          "name": "duration_ms",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}/output",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "percent",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "duration_ms",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "publisher_id",
          "type": "string",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "subscriber_id",
          "type": "string",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "subscriber_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "publisher_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "publisher_events",
          "type": "array",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null,
          "rules": {
            "Includes": [
              {
                "type": "any",
                "required": false,
                "allowedValues": [
                  "amplitude",
                  "amplitude:delta:sustain",
                  "amplitude:delta:ignite",
                  "amplitude:delta:release",
                  "amplitude:delta:nap",
                  "amplitude:level:active",
                  "amplitude:level:idle"
                ],
                "disallowedValues": null
              }
            ]
          }
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "DELETE",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "publisher_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "subscriber_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  }
];
// Generated from scripts/download-routes.js on Wed Jun 11 2014 00:22:37 GMT-0400 (EDT)

module.exports = [
  {
    "path": "/ping",
    "method": "GET",
    "auth": false,
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": null
  },
  {
    "path": "/devices",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "device_hash",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "update",
          "type": "object",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null,
          "children": [
            {
              "name": "label",
              "type": "string",
              "required": true,
              "allowedValues": null,
              "disallowedValues": null
            }
          ]
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "PUT",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "update",
          "type": "object",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null,
          "children": [
            {
              "name": "label",
              "type": "string",
              "required": null,
              "allowedValues": null,
              "disallowedValues": null
            }
          ]
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "DELETE",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}/light",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "mode",
          "type": "string",
          "required": false,
          "allowedValues": [
            "blink",
            "hold"
          ],
          "disallowedValues": null
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "allowedValues": [
            "green",
            "yellow",
            "red",
            "blue",
            "purple",
            "white",
            "cyan",
            "clownbarf"
          ],
          "disallowedValues": null
        },
        {
          "name": "duration_ms",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}/output",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "percent",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "duration_ms",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "publisher_id",
          "type": "string",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "subscriber_id",
          "type": "string",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "subscriber_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "publisher_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "publisher_events",
          "type": "array",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null,
          "rules": {
            "Includes": [
              {
                "type": "any",
                "required": false,
                "allowedValues": [
                  "amplitude",
                  "amplitude:delta:sustain",
                  "amplitude:delta:ignite",
                  "amplitude:delta:release",
                  "amplitude:delta:nap",
                  "amplitude:level:active",
                  "amplitude:level:idle"
                ],
                "disallowedValues": null
              }
            ]
          }
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "DELETE",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "publisher_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "subscriber_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  }
];
// Generated from scripts/download-routes.js on Wed Jun 11 2014 00:22:37 GMT-0400 (EDT)

module.exports = [
  {
    "path": "/ping",
    "method": "GET",
    "auth": false,
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": null
  },
  {
    "path": "/devices",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "device_hash",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "update",
          "type": "object",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null,
          "children": [
            {
              "name": "label",
              "type": "string",
              "required": true,
              "allowedValues": null,
              "disallowedValues": null
            }
          ]
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "PUT",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "update",
          "type": "object",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null,
          "children": [
            {
              "name": "label",
              "type": "string",
              "required": null,
              "allowedValues": null,
              "disallowedValues": null
            }
          ]
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}",
    "method": "DELETE",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}/light",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "mode",
          "type": "string",
          "required": false,
          "allowedValues": [
            "blink",
            "hold"
          ],
          "disallowedValues": null
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "allowedValues": [
            "green",
            "yellow",
            "red",
            "blue",
            "purple",
            "white",
            "cyan",
            "clownbarf"
          ],
          "disallowedValues": null
        },
        {
          "name": "duration_ms",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/devices/{device_id}/output",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "percent",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "duration_ms",
          "type": "number",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "GET",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "publisher_id",
          "type": "string",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "subscriber_id",
          "type": "string",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "payloadParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "POST",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "subscriber_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "publisher_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "publisher_events",
          "type": "array",
          "required": null,
          "allowedValues": null,
          "disallowedValues": null,
          "rules": {
            "Includes": [
              {
                "type": "any",
                "required": false,
                "allowedValues": [
                  "amplitude",
                  "amplitude:delta:sustain",
                  "amplitude:delta:ignite",
                  "amplitude:delta:release",
                  "amplitude:delta:nap",
                  "amplitude:level:active",
                  "amplitude:level:idle"
                ],
                "disallowedValues": null
              }
            ]
          }
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  },
  {
    "path": "/subscriptions",
    "method": "DELETE",
    "auth": [
      "bearer"
    ],
    "pathParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "queryParams": {
      "type": "any",
      "required": false,
      "allowedValues": null,
      "disallowedValues": null
    },
    "payloadParams": {
      "type": "object",
      "required": null,
      "allowedValues": null,
      "disallowedValues": null,
      "children": [
        {
          "name": "publisher_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        },
        {
          "name": "subscriber_id",
          "type": "string",
          "required": true,
          "allowedValues": null,
          "disallowedValues": null
        }
      ]
    },
    "responseParams": null,
    "version": "2"
  }
]

}, {}],
5: [function(require, module, exports) {
var cust = require('./customizations');
var sa = require('superagent');



exports.calc_fname = route_calc_fname;
exports.path_interpolate = route_path_interpolate;
exports.functionify = route_functionify;



function route_functionify(route){
  return function(opts, cb){
    var uri = route_join(opts.host, route_path_interpolate(route, [opts.device_id]));

    // Instantiate a http request
    var r = sa(route.method, uri);
    if (route.auth && opts.access_token) r.set('Authorization', 'Bearer '+ opts.access_token);
    r.set('Accept', 'application/vnd.littlebits.v'+ opts.version +'+json');

    // Custom payload data can be provided by the user under the payload key
    if (opts.payload) r.set(opts.payload);

    // For each known valid endpoint payload/query param,
    // look for provided data in opts.
    var add_params = param_adder(route.path, route.method, r, opts);
    if (route.payloadParams.children) {
      route.payloadParams.children.forEach(add_params);
    }
    if (route.queryParams.children) {
      route.queryParams.children.forEach(add_params);
    }

    // Do the HTTP request
    r.end(function(err, response){
      if (err) return cb(err);
      if (response.error) return cb(extract_err(response));
      cb(null, response.body);
    });
  };
}



function route_path_interpolate(route, path_args){
  return path_args.reduce(function(path, arg){
    return path.replace(/{[^}]*}/, arg);
  }, route.path);
}



function route_calc_fname(route){
  var custom_name = cust.table[route.path] &&
                    cust.table[route.path][route.method.toLowerCase()] &&
                    cust.table[route.path][route.method.toLowerCase()].fname ;
  return custom_name ? custom_name : null ;
}



// Private

function param_adder(path, method, request, request_opts){
  return function(param){
    var value = cust.opt_to_pp(path, method, param.name, request_opts);
    if (value) {
      var o = {};
      o[param.name] = value;
      request[method === 'GET' ? 'query' : 'send'](o);
    }
  };
}



function route_join(){
  var path = [];
  for (var i = 0; i < arguments.length; i++) {
    path.push(arguments[i].replace(/^\//, '').replace(/\/$/, ''));
  }
  return path.join('/');
}



function extract_err(res){
  var err = res.error;
  if (res.body && res.body.message) err.message = res.body.message;
  return err;
}

}, {"./customizations":7}],
7: [function(require, module, exports) {
exports.opt_to_pp = opt_to_pp;



var table = exports.table = {
  '/devices': {
    get: {
      fname: 'devices'
    }
  },
  '/devices/{device_id}': {
    get: {
      fname: 'device'
    },
    'delete': {
      fname: 'deactivate'
    },
    'post': {
      fname: 'activate'
    },
    'put': {
      fname: 'device_update'
    }
  },
  '/devices/{device_id}/output': {
    post: {
      fname: 'output'
    }
  },
  '/devices/{device_id}/light': {
    post: {
      fname: 'light'
    }
  },
  '/subscriptions': {
    post: {
      fname: 'subscribe'
    },
    'delete': {
      fname: 'unsubscribe'
    },
    get: {
      fname: 'subscriptions'
    }
  }
};



function opt_to_pp(path, method, pp_name, opts) {
    method = method.toLowerCase();
    var cust = (table[path] && table[path][method] && table[path][method][pp_name]) || {};
    var name_used = opts[cust.rename] ? cust.rename : pp_name;
    return opts[name_used] ? (cust.trans ? cust.trans(opts[name_used], name_used) : opts[name_used]) : null ;
}

}, {}]}, {}, {"1":""})
