module.exports = function(window, document) {var navigator = window.navigator;var HTMLElement = window.HTMLElement;var localStorage = window.localStorage;var sessionStorage = window.sessionStorage;var location = window.location;(window["webpackJsonpcreateApp"] = window["webpackJsonpcreateApp"] || []).push([[0],{

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return h; });
/* unused harmony export createElement */
/* unused harmony export cloneElement */
/* unused harmony export createRef */
/* unused harmony export Component */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return render; });
/* unused harmony export rerender */
/* unused harmony export options */
/* unused harmony export WeElement */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return define; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return rpx; });
/* unused harmony export defineElement */
/* unused harmony export classNames */
/* unused harmony export extractClass */
/* unused harmony export getHost */
/* unused harmony export renderToString */
/* unused harmony export tag */
/* unused harmony export merge */
/* unused harmony export html */
/* unused harmony export htm */
/* unused harmony export obaa */
/**
 * omi v2.6.0  http://omijs.org
 * Omi === Preact + Scoped CSS + Store System + Native Support in 3kb javascript.
 * By dntzhang https://github.com/dntzhang
 * Github: https://github.com/Tencent/omi
 * MIT Licensed.
 */

/** Virtual DOM Node */
function VNode() {}

function getGlobal() {
  if (typeof global !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
    if (typeof self !== 'undefined') {
      return self;
    } else if (typeof window !== 'undefined') {
      return window;
    } else if (typeof global !== 'undefined') {
      return global;
    }
    return function () {
      return this;
    }();
  }
  return global;
}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {
  scopedStyle: true,
  mapping: {},
  isWeb: true,
  staticStyleMapping: {},
  doc: typeof document === 'object' ? document : null,
  root: getGlobal(),
  //styleCache :[{ctor:ctor,ctorName:ctorName,style:style}]
  styleCache: [],
  isMultiStore: false
  //componentChange(component, element) { },
  /** If `true`, `prop` changes trigger synchronous component updates.
   *	@name syncComponentUpdates
   *	@type Boolean
   *	@default true
   */
  //syncComponentUpdates: true,

  /** Processes all created VNodes.
   *	@param {VNode} vnode	A newly-created VNode to normalize/process
   */
  //vnode(vnode) { }

  /** Hook invoked after a component is mounted. */
  //afterMount(component) { },

  /** Hook invoked after the DOM is updated with a component's latest render. */
  //afterUpdate(component) { }

  /** Hook invoked immediately before a component is unmounted. */
  // beforeUnmount(component) { }
};

var stack = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
  var children = [],
      lastSimple,
      child,
      simple,
      i;
  for (i = arguments.length; i-- > 2;) {
    stack.push(arguments[i]);
  }
  if (attributes && attributes.children != null) {
    if (!stack.length) stack.push(attributes.children);
    delete attributes.children;
  }
  while (stack.length) {
    if ((child = stack.pop()) && child.pop !== undefined) {
      for (i = child.length; i--;) {
        stack.push(child[i]);
      }
    } else {
      if (typeof child === 'boolean') child = null;

      if (simple = typeof nodeName !== 'function') {
        if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
      }

      if (simple && lastSimple) {
        children[children.length - 1] += child;
      } else if (children.length === 0) {
        children = [child];
      } else {
        children.push(child);
      }

      lastSimple = simple;
    }
  }

  var p = new VNode();
  p.nodeName = nodeName;
  p.children = children;
  p.attributes = attributes == null ? undefined : attributes;
  p.key = attributes == null ? undefined : attributes.key;

  // if a "vnode hook" is defined, pass every created VNode to it
  if (options.vnode !== undefined) options.vnode(p);

  return p;
}

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function assign(target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
}

if (typeof Element !== 'undefined' && !Element.prototype.addEventListener) {
  var runListeners = function runListeners(oEvent) {
    if (!oEvent) {
      oEvent = window.event;
    }
    for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) {
          oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent);
        }
        break;
      }
    }
  };

  var oListeners = {};

  Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
    if (oListeners.hasOwnProperty(sEventType)) {
      var oEvtListeners = oListeners[sEventType];
      for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
        if (oEvtListeners.aEls[iElId] === this) {
          nElIdx = iElId;break;
        }
      }
      if (nElIdx === -1) {
        oEvtListeners.aEls.push(this);
        oEvtListeners.aEvts.push([fListener]);
        this["on" + sEventType] = runListeners;
      } else {
        var aElListeners = oEvtListeners.aEvts[nElIdx];
        if (this["on" + sEventType] !== runListeners) {
          aElListeners.splice(0);
          this["on" + sEventType] = runListeners;
        }
        for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
          if (aElListeners[iLstId] === fListener) {
            return;
          }
        }
        aElListeners.push(fListener);
      }
    } else {
      oListeners[sEventType] = { aEls: [this], aEvts: [[fListener]] };
      this["on" + sEventType] = runListeners;
    }
  };
  Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
    if (!oListeners.hasOwnProperty(sEventType)) {
      return;
    }
    var oEvtListeners = oListeners[sEventType];
    for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        nElIdx = iElId;break;
      }
    }
    if (nElIdx === -1) {
      return;
    }
    for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
      if (aElListeners[iLstId] === fListener) {
        aElListeners.splice(iLstId, 1);
      }
    }
  };
}

if (typeof Object.create !== 'function') {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
      throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    }

    // if (typeof propertiesObject != 'undefined') {
    //     throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
    // }

    function F() {}
    F.prototype = proto;

    return new F();
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/** Invoke or update a ref, depending on whether it is a function or object ref.
 *  @param {object|function} [ref=null]
 *  @param {any} [value]
 */
function applyRef(ref, value) {
  if (ref) {
    if (typeof ref == 'function') ref(value);else ref.current = value;
  }
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */

var usePromise = typeof Promise == 'function';

// for native
if (typeof document !== 'object' && typeof global !== 'undefined' && global.__config__) {
  if (global.__config__.platform === 'android') {
    usePromise = true;
  } else {
    var systemVersion = global.__config__.systemVersion && global.__config__.systemVersion.split('.')[0] || 0;
    if (systemVersion > 8) {
      usePromise = true;
    }
  }
}

var defer = usePromise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function getUse(data, paths, out, name) {
  var obj = [];
  paths.forEach(function (path, index) {
    var isPath = typeof path === 'string';
    if (isPath) {
      obj[index] = getTargetByPath(data, path);
    } else {
      var key = Object.keys(path)[0];
      var value = path[key];
      if (typeof value === 'string') {
        obj[index] = getTargetByPath(data, value);
      } else {
        var tempPath = value[0];
        if (typeof tempPath === 'string') {
          var tempVal = getTargetByPath(data, tempPath);
          obj[index] = value[1] ? value[1](tempVal) : tempVal;
        } else {
          var args = [];
          tempPath.forEach(function (path) {
            args.push(getTargetByPath(data, path));
          });
          obj[index] = value[1].apply(null, args);
        }
      }
      obj[key] = obj[index];
    }
  });
  out && (out[name] = obj);
  return obj;
}

function getTargetByPath(origin, path) {
  var arr = path.replace(/]/g, '').replace(/\[/g, '.').split('.');
  var current = origin;
  for (var i = 0, len = arr.length; i < len; i++) {
    current = current[arr[i]];
  }
  return current;
}

function getPath(obj, out, name) {

  var result = {};
  obj.forEach(function (item) {
    if (typeof item === 'string') {
      result[item] = true;
    } else {
      var tempPath = item[Object.keys(item)[0]];
      if (typeof tempPath === 'string') {
        result[tempPath] = true;
      } else {
        if (typeof tempPath[0] === 'string') {
          result[tempPath[0]] = true;
        } else {
          tempPath[0].forEach(function (path) {
            return result[path] = true;
          });
        }
      }
    }
  });
  out && (out[name] = result);
  return result;
}

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virtual DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL$1 = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
  if (items.push(component) == 1) {
(options.debounceRendering || defer)(rerender);
  }
}

/** Rerender all enqueued dirty components */
function rerender() {
  var p;
  while (p = items.pop()) {
    renderComponent(p);
  }
}

var mapping = options.mapping;
/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hydrating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return node.splitText !== undefined;
  }
  if (typeof vnode.nodeName === 'string') {
    var ctor = mapping[vnode.nodeName];
    if (ctor) {
      return hydrating || node._componentConstructor === ctor;
    }
    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  }
  return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
  var props = extend({}, vnode.attributes);
  props.children = vnode.children;

  var defaultProps = vnode.nodeName.defaultProps;
  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
  var node = isSvg ? options.doc.createElementNS('http://www.w3.org/2000/svg', nodeName) : options.doc.createElement(nodeName);
  node.normalizedNodeName = nodeName;
  return node;
}

function parseCSSText(cssText) {
  var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ');
  var style = {},
      _ref = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [a, b, cssTxt],
      a = _ref[0],
      b = _ref[1],
      rule = _ref[2];

  var cssToJs = function cssToJs(s) {
    return s.replace(/\W+\w/g, function (match) {
      return match.slice(-1).toUpperCase();
    });
  };
  var properties = rule.split(';').map(function (o) {
    return o.split(':').map(function (x) {
      return x && x.trim();
    });
  });
  for (var i = properties, i = Array.isArray(i), i = 0, i = i ? i : i[Symbol.iterator]();;) {
    var _ref3;

    if (i) {
      if (i >= i.length) break;
      _ref3 = i[i++];
    } else {
      i = i.next();
      if (i.done) break;
      _ref3 = i.value;
    }

    var _ref2 = _ref3;
    var property = _ref2[0];
    var value = _ref2[1];
    style[cssToJs(property)] = value;
  }return style;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
  var parentNode = node.parentNode;
  if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
  if (name === 'className') name = 'class';

  if (name === 'key') {
    // ignore
  } else if (name === 'ref') {
    applyRef(old, null);
    applyRef(value, node);
  } else if (name === 'class' && !isSvg) {
    node.className = value || '';
  } else if (name === 'style') {
    if (options.isWeb) {
      if (!value || typeof value === 'string' || typeof old === 'string') {
        node.style.cssText = value || '';
      }
      if (value && typeof value === 'object') {
        if (typeof old !== 'string') {
          for (var i in old) {
            if (!(i in value)) node.style[i] = '';
          }
        }
        for (var i in value) {
          node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL$1.test(i) === false ? value[i] + 'px' : value[i];
        }
      }
    } else {
      var oldJson = old,
          currentJson = value;
      if (typeof old === 'string') {
        oldJson = parseCSSText(old);
      }
      if (typeof value == 'string') {
        currentJson = parseCSSText(value);
      }

      var result = {},
          changed = false;

      if (oldJson) {
        for (var key in oldJson) {
          if (typeof currentJson == 'object' && !(key in currentJson)) {
            result[key] = '';
            changed = true;
          }
        }

        for (var ckey in currentJson) {
          if (currentJson[ckey] !== oldJson[ckey]) {
            result[ckey] = currentJson[ckey];
            changed = true;
          }
        }

        if (changed) {
          node.setStyles(result);
        }
      } else {
        node.setStyles(currentJson);
      }
    }
  } else if (name === 'dangerouslySetInnerHTML') {
    if (value) node.innerHTML = value.__html || '';
  } else if (name[0] == 'o' && name[1] == 'n') {
    var useCapture = name !== (name = name.replace(/Capture$/, ''));
    name = name.toLowerCase().substring(2);
    if (value) {
      if (!old) {
        node.addEventListener(name, eventProxy, useCapture);
        if (name == 'tap') {
          node.addEventListener('touchstart', touchStart, useCapture);
          node.addEventListener('touchend', touchEnd, useCapture);
        }
      }
    } else {
      node.removeEventListener(name, eventProxy, useCapture);
      if (name == 'tap') {
        node.removeEventListener('touchstart', touchStart, useCapture);
        node.removeEventListener('touchend', touchEnd, useCapture);
      }
    }
(node._listeners || (node._listeners = {}))[name] = value;
  } else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
    setProperty(node, name, value == null ? '' : value);
    if (value == null || value === false) node.removeAttribute(name);
  } else {
    var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));
    if (value == null || value === false) {
      if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
    } else if (typeof value !== 'function') {
      if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
    }
  }
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
  try {
    node[name] = value;
  } catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
  return this._listeners[e.type](options.event && options.event(e) || e);
}

function touchStart(e) {
  this.___touchX = e.touches[0].pageX;
  this.___touchY = e.touches[0].pageY;
  this.___scrollTop = document.body.scrollTop;
}

function touchEnd(e) {
  if (Math.abs(e.changedTouches[0].pageX - this.___touchX) < 30 && Math.abs(e.changedTouches[0].pageY - this.___touchY) < 30 && Math.abs(document.body.scrollTop - this.___scrollTop) < 30) {
    this.dispatchEvent(new CustomEvent('tap', { detail: e }));
  }
}

var styleId = 0;

function getCtorName(ctor) {
  for (var i = 0, len = options.styleCache.length; i < len; i++) {
    var item = options.styleCache[i];

    if (item.ctor === ctor) {
      return item.attrName;
    }
  }

  var attrName = 's' + styleId;
  options.styleCache.push({ ctor: ctor, attrName: attrName });
  styleId++;

  return attrName;
}

// many thanks to https://github.com/thomaspark/scoper/
function scoper(css, prefix) {
  prefix = '[' + prefix.toLowerCase() + ']';
  // https://www.w3.org/TR/css-syntax-3/#lexical
  css = css.replace(/\/\*[^*]*\*+([^/][^*]*\*+)*\//g, '');
  // eslint-disable-next-line
  var re = new RegExp('([^\r\n,{}:]+)(:[^\r\n,{}]+)?(,(?=[^{}]*{)|\s*{)', 'g');
  /**
   * Example:
   *
   * .classname::pesudo { color:red }
   *
   * g1 is normal selector `.classname`
   * g2 is pesudo class or pesudo element
   * g3 is the suffix
   */
  css = css.replace(re, function (g0, g1, g2, g3) {
    if (typeof g2 === 'undefined') {
      g2 = '';
    }

    /* eslint-ignore-next-line */
    if (g1.match(/^\s*(@media|\d+%?|@-webkit-keyframes|@keyframes|to|from|@font-face)/)) {
      return g1 + g2 + g3;
    }

    var appendClass = g1.replace(/(\s*)$/, '') + prefix + g2;
    //let prependClass = prefix + ' ' + g1.trim() + g2;

    return appendClass + g3;
    //return appendClass + ',' + prependClass + g3;
  });

  return css;
}

function addStyle(cssText, id) {
  id = id.toLowerCase();
  var ele = document.getElementById(id);
  var head = document.getElementsByTagName('head')[0];
  if (ele && ele.parentNode === head) {
    head.removeChild(ele);
  }

  var someThingStyles = document.createElement('style');
  head.appendChild(someThingStyles);
  someThingStyles.setAttribute('type', 'text/css');
  someThingStyles.setAttribute('id', id);
  if (window.ActiveXObject) {
    someThingStyles.styleSheet.cssText = cssText;
  } else {
    someThingStyles.textContent = cssText;
  }
}

function addStyleWithoutId(cssText) {
  var head = document.getElementsByTagName('head')[0];
  var someThingStyles = document.createElement('style');
  head.appendChild(someThingStyles);
  someThingStyles.setAttribute('type', 'text/css');

  if (window.ActiveXObject) {
    someThingStyles.styleSheet.cssText = cssText;
  } else {
    someThingStyles.textContent = cssText;
  }
}

function addScopedAttrStatic(vdom, attr) {
  if (options.scopedStyle) {
    scopeVdom(attr, vdom);
  }
}

function addStyleToHead(style, attr) {
  if (options.scopedStyle) {
    if (!options.staticStyleMapping[attr]) {
      addStyle(scoper(style, attr), attr);
      options.staticStyleMapping[attr] = true;
    }
  } else if (!options.staticStyleMapping[attr]) {
    addStyleWithoutId(style);
    options.staticStyleMapping[attr] = true;
  }
}

function scopeVdom(attr, vdom) {
  if (typeof vdom === 'object') {
    vdom.attributes = vdom.attributes || {};
    vdom.attributes[attr] = '';
    vdom.css = vdom.css || {};
    vdom.css[attr] = '';
    vdom.children.forEach(function (child) {
      return scopeVdom(attr, child);
    });
  }
}

function scopeHost(vdom, css) {
  if (typeof vdom === 'object' && css) {
    vdom.attributes = vdom.attributes || {};
    for (var key in css) {
      vdom.attributes[key] = '';
    }
  }
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
  var c;
  while (c = mounts.pop()) {
    if (options.afterMount) options.afterMount(c);
    if (c.installed) c.installed();
    if (c.constructor.css || c.css) {
      addStyleToHead(c.constructor.css ? c.constructor.css : typeof c.css === 'function' ? c.css() : c.css, '_s' + getCtorName(c.constructor));
    }
  }
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot, updateSelf) {
  // diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
  if (!diffLevel++) {
    // when first starting the diff, check if we're diffing an SVG or within an SVG
    isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

    // hydration is indicated by the existing element to be diffed not having a prop cache
    hydrating = dom != null && !('__omiattr_' in dom);
  }
  var ret;

  if (isArray(vnode)) {
    vnode = {
      nodeName: 'span',
      children: vnode
    };
  }

  ret = idiff(dom, vnode, context, mountAll, componentRoot, updateSelf);
  // append the element if its a new parent
  if (parent && ret.parentNode !== parent) parent.appendChild(ret);

  // diffLevel being reduced to 0 means we're exiting the diff
  if (! --diffLevel) {
    hydrating = false;
    // invoke queued componentDidMount lifecycle methods
    if (!componentRoot) flushMounts();
  }

  return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot, updateSelf) {
  var out = dom,
      prevSvgMode = isSvgMode;

  // empty values (null, undefined, booleans) render as empty Text nodes
  if (vnode == null || typeof vnode === 'boolean') vnode = '';

  // If the VNode represents a Component, perform a component diff:
  var vnodeName = vnode.nodeName;
  if (options.mapping[vnodeName]) {
    vnode.nodeName = options.mapping[vnodeName];
    return buildComponentFromVNode(dom, vnode, context, mountAll, updateSelf);
  }
  if (typeof vnodeName == 'function') {
    return buildComponentFromVNode(dom, vnode, context, mountAll, updateSelf);
  }

  // Fast case: Strings & Numbers create/update Text nodes.
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    // update if it's already a Text node:
    if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
      /* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
      if (dom.nodeValue != vnode) {
        dom.nodeValue = vnode;
      }
    } else {
      // it wasn't a Text node: replace it with one and recycle the old Element
      out = document.createTextNode(vnode);
      if (dom) {
        if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
        recollectNodeTree(dom, true);
      }
    }

    //ie8 error
    try {
      out['__omiattr_'] = true;
    } catch (e) {}

    return out;
  }

  // Tracks entering and exiting SVG namespace when descending through the tree.
  isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

  // If there's no existing element or it's the wrong type, create a new one:
  vnodeName = String(vnodeName);
  if (!dom || !isNamedNode(dom, vnodeName)) {
    out = createNode(vnodeName, isSvgMode);

    if (dom) {
      // move children into the replacement node
      while (dom.firstChild) {
        out.appendChild(dom.firstChild);
      } // if the previous Element was mounted into the DOM, replace it inline
      if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

      // recycle the old element (skips non-Element node types)
      recollectNodeTree(dom, true);
    }
  }

  var fc = out.firstChild,
      props = out['__omiattr_'],
      vchildren = vnode.children;

  if (props == null) {
    props = out['__omiattr_'] = {};
    for (var a = out.attributes, i = a.length; i--;) {
      props[a[i].name] = a[i].value;
    }
  }

  // Optimization: fast-path for elements containing a single TextNode:
  if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
    if (fc.nodeValue != vchildren[0]) {
      fc.nodeValue = vchildren[0];
    }
  }
  // otherwise, if there are existing or new children, diff them:
  else if (vchildren && vchildren.length || fc != null) {
      innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null, updateSelf);
    }

  // Apply attributes/props from VNode to the DOM Element:
  diffAttributes(out, vnode.attributes, props);

  // restore previous SVG mode: (in case we're exiting an SVG namespace)
  isSvgMode = prevSvgMode;

  return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating, updateSelf) {
  var originalChildren = dom.childNodes,
      children = [],
      keyed = {},
      keyedLen = 0,
      min = 0,
      len = originalChildren.length,
      childrenLen = 0,
      vlen = vchildren ? vchildren.length : 0,
      j,
      c,
      f,
      vchild,
      child;

  // Build up a map of keyed children and an Array of unkeyed children:
  if (len !== 0) {
    for (var i = 0; i < len; i++) {
      var _child = originalChildren[i],
          props = _child['__omiattr_'],
          key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
      if (key != null) {
        keyedLen++;
        keyed[key] = _child;
      } else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
        children[childrenLen++] = _child;
      }
    }
  }

  if (vlen !== 0) {
    for (var i = 0; i < vlen; i++) {
      vchild = vchildren[i];
      child = null;

      // attempt to find a node based on key matching
      var key = vchild.key;
      if (key != null) {
        if (keyedLen && keyed[key] !== undefined) {
          child = keyed[key];
          keyed[key] = undefined;
          keyedLen--;
        }
      }
      // attempt to pluck a node of the same type from the existing children
      else if (!child && min < childrenLen) {
          for (j = min; j < childrenLen; j++) {
            if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
              child = c;
              children[j] = undefined;
              if (j === childrenLen - 1) childrenLen--;
              if (j === min) min++;
              break;
            }
          }
        }

      // morph the matched/found/created DOM child to match vchild (deep)
      child = idiff(child, vchild, context, mountAll, null, updateSelf);

      f = originalChildren[i];
      if (child && child !== dom && child !== f) {
        if (f == null) {
          dom.appendChild(child);
        } else if (child === f.nextSibling) {
          removeNode(f);
        } else {
          dom.insertBefore(child, f);
        }
      }
    }
  }

  // remove unused keyed children:
  if (keyedLen) {
    for (var i in keyed) {
      if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
    }
  }

  // remove orphaned unkeyed children:
  while (min <= childrenLen) {
    if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
  }
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
  var component = node._component;
  if (component) {
    // if node is owned by a Component, unmount that component (ends up recursing back here)
    unmountComponent(component);
  } else {
    // If the node's VNode had a ref function, invoke it with null here.
    // (this is part of the React spec, and smart for unsetting references)
    if (node['__omiattr_'] != null) applyRef(node['__omiattr_'].ref, null);

    if (unmountOnly === false || node['__omiattr_'] == null) {
      removeNode(node);
    }

    removeChildren(node);
  }
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
  node = node.lastChild;
  while (node) {
    var next = node.previousSibling;
    recollectNodeTree(node, true);
    node = next;
  }
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
  var name;

  // remove attributes no longer present on the vnode by setting them to undefined
  for (name in old) {
    if (!(attrs && attrs[name] != null) && old[name] != null) {
      setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
    }
  }

  // add new & update changed attributes
  for (name in attrs) {
    if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
      setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
  }
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
  var name = component.constructor.name;(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context, vnode) {
  var list = components[Ctor.name],
      inst;

  if (Ctor.prototype && Ctor.prototype.render) {
    inst = new Ctor(props, context);
    Component.call(inst, props, context);
  } else {
    inst = new Component(props, context);
    inst.constructor = Ctor;
    inst.render = doRender;
  }
  vnode && (inst.scopedCssAttr = vnode.css);

  if (inst.store) {
    if (inst.use) {
      var use = typeof inst.use === 'function' ? inst.use() : inst.use;

      if (options.isMultiStore) {
        var _updatePath = {};
        var using = {};
        for (var storeName in use) {
          _updatePath[storeName] = {};
          using[storeName] = {};
          getPath(use[storeName], _updatePath, storeName);
          getUse(inst.store[storeName].data, use[storeName], using, storeName);
          inst.store[storeName].instances.push(inst);
        }
        inst.using = using;
        inst._updatePath = _updatePath;
      } else {
        inst._updatePath = getPath(use);
        inst.using = getUse(inst.store.data, use);
        inst.store.instances.push(inst);
      }
    }

    if (inst.useSelf) {
      var _use = typeof inst.useSelf === 'function' ? inst.useSelf() : inst.useSelf;

      if (options.isMultiStore) {
        var _updatePath2 = {};
        var _using = {};
        for (var _storeName in _use) {
          getPath(_use[_storeName], _updatePath2, _storeName);
          getUse(inst.store[_storeName].data, _use[_storeName], _using, _storeName);
          inst.store[_storeName].updateSelfInstances.push(inst);
        }
        inst.usingSelf = _using;
        inst._updateSelfPath = _updatePath2;
      } else {
        inst._updateSelfPath = getPath(_use);
        inst.usingSelf = getUse(inst.store.data, _use);
        inst.store.updateSelfInstances.push(inst);
      }
    }
  }

  if (list) {
    for (var i = list.length; i--;) {
      if (list[i].constructor === Ctor) {
        inst.nextBase = list[i].nextBase;
        list.splice(i, 1);
        break;
      }
    }
  }
  return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, context) {
  return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
  if (component._disable) return;
  component._disable = true;

  if (component.__ref = props.ref) delete props.ref;
  if (component.__key = props.key) delete props.key;

  if (!component.base || mountAll) {
    if (component.beforeInstall) component.beforeInstall();
    if (component.install) component.install();
  }

  if (context && context !== component.context) {
    if (!component.prevContext) component.prevContext = component.context;
    component.context = context;
  }

  if (!component.prevProps) component.prevProps = component.props;
  component.props = props;

  component._disable = false;

  if (opts !== 0) {
    if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
      renderComponent(component, 1, mountAll);
    } else {
      enqueueRender(component);
    }
  }

  applyRef(component.__ref, component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild, updateSelf) {
  if (component._disable) return;

  var props = component.props,
      context = component.context,
      previousProps = component.prevProps || props,
      previousContext = component.prevContext || context,
      isUpdate = component.base,
      nextBase = component.nextBase,
      initialBase = isUpdate || nextBase,
      initialChildComponent = component._component,
      skip = false,
      rendered,
      inst,
      cbase;

  // if updating
  if (isUpdate) {
    component.props = previousProps;
    component.context = previousContext;

    var receiveResult = true;
    if (component.receiveProps) {
      receiveResult = component.receiveProps(props, previousProps);
    }
    if (receiveResult !== false) {
      skip = false;
      if (component.beforeUpdate) {
        component.beforeUpdate(props, context);
      }
    } else {
      skip = true;
    }
    component.props = props;
    component.context = context;
  }

  component.prevProps = component.prevContext = component.nextBase = null;

  if (!skip) {
    component.beforeRender && component.beforeRender();
    rendered = component.render(props, context);

    //don't rerender
    if (component.constructor.css || component.css) {
      addScopedAttrStatic(rendered, '_s' + getCtorName(component.constructor));
    }

    scopeHost(rendered, component.scopedCssAttr);

    // context to pass to the child, can be updated via (grand-)parent component
    if (component.getChildContext) {
      context = extend(extend({}, context), component.getChildContext());
    }

    var childComponent = rendered && rendered.nodeName,
        toUnmount,
        base,
        ctor = options.mapping[childComponent];

    if (ctor) {
      // set up high order component link

      var childProps = getNodeProps(rendered);
      inst = initialChildComponent;

      if (inst && inst.constructor === ctor && childProps.key == inst.__key) {
        setComponentProps(inst, childProps, 1, context, false);
      } else {
        toUnmount = inst;

        component._component = inst = createComponent(ctor, childProps, context);
        inst.nextBase = inst.nextBase || nextBase;
        inst._parentComponent = component;
        setComponentProps(inst, childProps, 0, context, false);
        renderComponent(inst, 1, mountAll, true);
      }

      base = inst.base;
    } else {
      cbase = initialBase;

      // destroy high order component link
      toUnmount = initialChildComponent;
      if (toUnmount) {
        cbase = component._component = null;
      }

      if (initialBase || opts === 1) {
        if (cbase) cbase._component = null;
        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true, updateSelf);
      }
    }

    if (initialBase && base !== initialBase && inst !== initialChildComponent) {
      var baseParent = initialBase.parentNode;
      if (baseParent && base !== baseParent) {
        baseParent.replaceChild(base, initialBase);

        if (!toUnmount) {
          initialBase._component = null;
          recollectNodeTree(initialBase, false);
        }
      }
    }

    if (toUnmount) {
      unmountComponent(toUnmount);
    }

    component.base = base;
    if (base && !isChild) {
      var componentRef = component,
          t = component;
      while (t = t._parentComponent) {
(componentRef = t).base = base;
      }
      base._component = componentRef;
      base._componentConstructor = componentRef.constructor;
    }
  }

  if (!isUpdate || mountAll) {
    mounts.unshift(component);
  } else if (!skip) {
    // Ensure that pending componentDidMount() hooks of child components
    // are called before the componentDidUpdate() hook in the parent.
    // Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
    // flushMounts();

    if (component.afterUpdate) {
      //deprecated
      component.afterUpdate(previousProps, previousContext);
    }
    if (component.updated) {
      component.updated(previousProps, previousContext);
    }
    if (options.afterUpdate) options.afterUpdate(component);
  }

  if (component._renderCallbacks != null) {
    while (component._renderCallbacks.length) {
      component._renderCallbacks.pop().call(component);
    }
  }

  if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll, updateSelf) {
  var c = dom && dom._component,
      originalComponent = c,
      oldDom = dom,
      isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
      isOwner = isDirectOwner,
      props = getNodeProps(vnode);
  while (c && !isOwner && (c = c._parentComponent)) {
    isOwner = c.constructor === vnode.nodeName;
  }

  if (c && isOwner && (!mountAll || c._component)) {
    if (!updateSelf) {
      setComponentProps(c, props, 3, context, mountAll);
    }
    dom = c.base;
  } else {
    if (originalComponent && !isDirectOwner) {
      unmountComponent(originalComponent);
      dom = oldDom = null;
    }

    c = createComponent(vnode.nodeName, props, context, vnode);
    if (dom && !c.nextBase) {
      c.nextBase = dom;
      // passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
      oldDom = null;
    }
    setComponentProps(c, props, 1, context, mountAll);
    dom = c.base;

    if (oldDom && dom !== oldDom) {
      oldDom._component = null;
      recollectNodeTree(oldDom, false);
    }
  }

  return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
  if (options.beforeUnmount) options.beforeUnmount(component);

  var base = component.base;

  component._disable = true;

  if (component.uninstall) component.uninstall();

  if (component.store && component.store.instances) {
    var i,
        len;
    for (i = 0, len = component.store.instances.length; i < len; i++) {
      if (component.store.instances[i] === component) {
        component.store.instances.splice(i, 1);
        break;
      }
    }

    for (i = 0, len = component.store.updateSelfInstances.length; i < len; i++) {
      if (component.store.updateSelfInstances[i] === component) {
        component.store.updateSelfInstances.splice(i, 1);
        break;
      }
    }
  }

  component.base = null;

  // recursively tear down & recollect high-order component children:
  var inner = component._component;
  if (inner) {
    unmountComponent(inner);
  } else if (base) {
    if (base['__omiattr_'] != null) applyRef(base['__omiattr_'].ref, null);

    component.nextBase = base;

    removeNode(base);
    collectComponent(component);

    removeChildren(base);
  }

  applyRef(component.__ref, null);
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 0;

var Component = function () {
  function Component(props, store) {
    _classCallCheck(this, Component);

    this.props = assign({}, this.constructor.defaultProps, props);
    this.elementId = id++;

    this._preCss = null;

    this.store = store;
  }

  Component.prototype.update = function update(callback) {
    if (this._willUpdate) return;
    this._willUpdate = true;
    if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
    renderComponent(this, 2);
    if (options.componentChange) options.componentChange(this, this.base);
    this._willUpdate = false;
  };

  Component.prototype.updateSelf = function updateSelf() {
    if (this._willUpdateSelf) return;
    this._willUpdateSelf = true;
    renderComponent(this, 2, null, null, true);
    this._willUpdateSelf = false;
  };

  Component.prototype.fire = function fire(type, data) {
    var _this = this;

    Object.keys(this.props).every(function (key) {
      if ('on' + type.toLowerCase() === key.toLowerCase()) {
        _this.props[key]({ detail: data });
        return false;
      }
      return true;
    });
  };

  Component.prototype.render = function render() {};

  return Component;
}();

Component.is = 'WeElement';

/* 
 * obaa 2.0.3
 * By dntzhang
 * Github: https://github.com/Tencent/omi/tree/master/packages/obaa
 * MIT Licensed.
 */

// $_r_: root
// $_c_: prop change callback
// $_p_: path

function obaa(target, arr, callback) {

  var eventPropArr = [];
  if (isArray$1(target)) {
    if (target.length === 0) {
      target.$_o_ = {
        $_r_: target,
        $_p_: '#'
      };
    }
    mock(target, target);
  }
  for (var prop in target) {
    if (target.hasOwnProperty(prop)) {
      if (callback) {
        if (isArray$1(arr) && isInArray(arr, prop)) {
          eventPropArr.push(prop);
          watch(target, prop, null, target);
        } else if (isString(arr) && prop == arr) {
          eventPropArr.push(prop);
          watch(target, prop, null, target);
        }
      } else {
        eventPropArr.push(prop);
        watch(target, prop, null, target);
      }
    }
  }
  if (!target.$_c_) {
    target.$_c_ = [];
  }
  var propChanged = callback ? callback : arr;
  target.$_c_.push({
    all: !callback,
    propChanged: propChanged,
    eventPropArr: eventPropArr
  });
}

var triggerStr = ['concat', 'copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'size'].join(',');

var methods = ['concat', 'copyWithin', 'entries', 'every', 'fill', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'keys', 'lastIndexOf', 'map', 'pop', 'push', 'reduce', 'reduceRight', 'reverse', 'shift', 'slice', 'some', 'sort', 'splice', 'toLocaleString', 'toString', 'unshift', 'values', 'size'];

function mock(target, root) {
  methods.forEach(function (item) {
    target[item] = function () {
      var old = Array.prototype.slice.call(this, 0);
      var result = Array.prototype[item].apply(this, Array.prototype.slice.call(arguments));
      if (new RegExp('\\b' + item + '\\b').test(triggerStr)) {
        for (var cprop in this) {
          if (this.hasOwnProperty(cprop) && !isFunction(this[cprop])) {
            watch(this, cprop, this.$_o_.$_p_, root);
          }
        }
        //todo
        onPropertyChanged('Array-' + item, this, old, this, this.$_o_.$_p_, root);
      }
      return result;
    };
    target['pure' + item.substring(0, 1).toUpperCase() + item.substring(1)] = function () {
      return Array.prototype[item].apply(this, Array.prototype.slice.call(arguments));
    };
  });
}

function watch(target, prop, path, root) {
  if (prop === '$_o_') return;
  if (isFunction(target[prop])) return;
  if (!target.$_o_) target.$_o_ = {
    $_r_: root
  };
  if (path !== undefined && path !== null) {
    target.$_o_.$_p_ = path;
  } else {
    target.$_o_.$_p_ = '#';
  }

  var currentValue = target.$_o_[prop] = target[prop];
  Object.defineProperty(target, prop, {
    get: function get() {
      return this.$_o_[prop];
    },
    set: function set(value) {
      var old = this.$_o_[prop];
      this.$_o_[prop] = value;
      onPropertyChanged(prop, value, old, this, target.$_o_.$_p_, root);
    },
    configurable: true,
    enumerable: true
  });
  if (typeof currentValue == 'object') {
    if (isArray$1(currentValue)) {
      mock(currentValue, root);
      if (currentValue.length === 0) {
        if (!currentValue.$_o_) currentValue.$_o_ = {};
        if (path !== undefined && path !== null) {
          currentValue.$_o_.$_p_ = path + '-' + prop;
        } else {
          currentValue.$_o_.$_p_ = '#' + '-' + prop;
        }
      }
    }
    for (var cprop in currentValue) {
      if (currentValue.hasOwnProperty(cprop)) {
        watch(currentValue, cprop, target.$_o_.$_p_ + '-' + prop, root);
      }
    }
  }
}

function onPropertyChanged(prop, value, oldValue, target, path, root) {
  if (value !== oldValue && !(nan(value) && nan(oldValue)) && root.$_c_) {
    var rootName = getRootName(prop, path);
    for (var i = 0, len = root.$_c_.length; i < len; i++) {
      var handler = root.$_c_[i];
      if (handler.all || isInArray(handler.eventPropArr, rootName) || rootName.indexOf('Array-') === 0) {
        handler.propChanged.call(target, prop, value, oldValue, path);
      }
    }
  }

  if (prop.indexOf('Array-') !== 0 && typeof value === 'object') {
    watch(target, prop, target.$_o_.$_p_, root);
  }
}

function isFunction(obj) {
  return Object.prototype.toString.call(obj) == '[object Function]';
}

function isArray$1(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isString(obj) {
  return typeof obj === 'string';
}

function isInArray(arr, item) {
  for (var i = arr.length; --i > -1;) {
    if (item === arr[i]) return true;
  }
  return false;
}

function nan(value) {
  return typeof value === "number" && isNaN(value);
}

function getRootName(prop, path) {
  if (path === '#') {
    return prop;
  }
  return path.split('-')[1];
}

obaa.add = function (obj, prop) {
  watch(obj, prop, obj.$_o_.$_p_, obj.$_o_.$_r_);
};

obaa.set = function (obj, prop, value) {
  watch(obj, prop, obj.$_o_.$_p_, obj.$_o_.$_r_);
  obj[prop] = value;
};

Array.prototype.size = function (length) {
  this.length = length;
};

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {object} [store]
 *	@public
 */
function render(vnode, parent, store, empty, merge) {
  parent = typeof parent === 'string' ? document.querySelector(parent) : parent;

  if (store && store.data) {

    obsStore(store);
  } else {
    options.isMultiStore = true;
    for (var key in store) {
      if (store[key].data) {
        obsStore(store[key], key);
      }
    }
  }

  if (empty) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  if (merge) {
    merge = typeof merge === 'string' ? document.querySelector(merge) : merge;
  }

  return diff(merge, vnode, store, false, parent, false);
}

function obsStore(store, storeName) {

  store.instances = [];
  store.updateSelfInstances = [];
  extendStoreUpate(store, storeName);

  obaa(store.data, function (prop, val, old, path) {
    var patchs = {};
    var key = fixPath(path + '-' + prop);
    patchs[key] = true;
    store.update(patchs);
  });
}

function merge(vnode, merge, store) {
  obsStore(store);

  merge = typeof merge === 'string' ? document.querySelector(merge) : merge;

  return diff(merge, vnode, store);
}

function extendStoreUpate(store, key) {
  store.update = function (patch) {
    if (Object.keys(patch).length > 0) {
      this.instances.forEach(function (instance) {
        if (key) {
          if (instance._updatePath && instance._updatePath[key] && needUpdate(patch, instance._updatePath[key])) {
            if (instance.use) {
              getUse(store.data, (typeof instance.use === 'function' ? instance.use() : instance.use)[key], instance.using, key);
            }

            instance.update();
          }
        } else {
          if (instance._updatePath && needUpdate(patch, instance._updatePath)) {
            if (instance.use) {
              instance.using = getUse(store.data, typeof instance.use === 'function' ? instance.use() : instance.use);
            }
            instance.update();
          }
        }
      });

      this.updateSelfInstances.forEach(function (instance) {
        if (key) {
          if (instance._updateSelfPath && instance._updateSelfPath[key] && needUpdate(patch, instance._updateSelfPath[key])) {
            if (instance.useSelf) {
              getUse(store.data, (typeof instance.useSelf === 'function' ? instance.useSelf() : instance.useSelf)[key], instance.usingSelf, key);
            }

            instance.updateSelf();
          }
        } else {
          if (instance._updateSelfPath && needUpdate(patch, instance._updateSelfPath)) {
            instance.usingSelf = getUse(store.data, typeof instance.useSelf === 'function' ? instance.useSelf() : instance.useSelf);
            instance.updateSelf();
          }
        }
      });

      this.onChange && this.onChange(patch);
    }
  };
}

function needUpdate(diffResult, updatePath) {
  for (var keyA in diffResult) {
    if (updatePath[keyA]) {
      return true;
    }
    for (var keyB in updatePath) {
      if (includePath(keyA, keyB)) {
        return true;
      }
    }
  }
  return false;
}

function includePath(pathA, pathB) {
  if (pathA.indexOf(pathB) === 0) {
    var next = pathA.substr(pathB.length, 1);
    if (next === '[' || next === '.') {
      return true;
    }
  }
  return false;
}

function fixPath(path) {
  var mpPath = '';
  var arr = path.replace('#-', '').split('-');
  arr.forEach(function (item, index) {
    if (index) {
      if (isNaN(Number(item))) {
        mpPath += '.' + item;
      } else {
        mpPath += '[' + item + ']';
      }
    } else {
      mpPath += item;
    }
  });
  return mpPath;
}

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function define(name, ctor, config) {
  if (ctor.is === 'WeElement') {
    options.mapping[name] = ctor;
  } else {

    if (typeof config === 'string') {
      config = { css: config };
    } else {
      config = config || {};
    }

    var Comp = function (_Component) {
      _inherits(Comp, _Component);

      function Comp() {
        _classCallCheck$1(this, Comp);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      Comp.prototype.render = function render() {
        return ctor.call(this, this);
      };

      Comp.prototype.install = function install() {
        config.install && config.install.apply(this, arguments);
      };

      Comp.prototype.installed = function installed() {
        config.installed && config.installed.apply(this, arguments);
      };

      Comp.prototype.uninstall = function uninstall() {
        config.uninstall && config.uninstall.apply(this, arguments);
      };

      Comp.prototype.beforeUpdate = function beforeUpdate() {
        config.beforeUpdate && config.beforeUpdate.apply(this, arguments);
      };

      Comp.prototype.updated = function updated() {
        config.updated && config.updated.apply(this, arguments);
      };

      Comp.prototype.beforeRender = function beforeRender() {
        config.beforeRender && config.beforeRender.apply(this, arguments);
      };

      Comp.prototype.rendered = function rendered() {
        config.rendered && config.rendered.apply(this, arguments);
      };

      Comp.prototype.receiveProps = function receiveProps() {
        if (config.receiveProps) {
          return config.receiveProps.apply(this, arguments);
        }
      };

      return Comp;
    }(Component);

    Comp.css = config.css;
    Comp.propTypes = config.propTypes;
    Comp.defaultProps = config.defaultProps;


    if (config.use) {
      if (typeof config.use === 'function') {
        Comp.prototype.use = function () {
          return config.use.apply(this, arguments);
        };
      } else {
        Comp.prototype.use = function () {
          return config.use;
        };
      }
    }

    if (config.useSelf) {
      if (typeof config.useSelf === 'function') {
        Comp.prototype.useSelf = function () {
          return config.useSelf.apply(this, arguments);
        };
      } else {
        Comp.prototype.useSelf = function () {
          return config.useSelf;
        };
      }
    }

    options.mapping[name] = Comp;
  }
}

function rpx(str) {
  return str.replace(/([1-9]\d*|0)(\.\d*)*rpx/g, function (a, b) {
    return window.innerWidth * Number(b) / 750 + 'px';
  });
}

function tag(name) {
  return function (target) {
    define(name, target);
  };
}

/**
 * classNames based on https://github.com/JedWatson/classnames
 * by Jed Watson
 * Licensed under the MIT License
 * https://github.com/JedWatson/classnames/blob/master/LICENSE
 * modified by dntzhang
 */

var hasOwn = {}.hasOwnProperty;

function classNames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

function extractClass() {
  var _Array$prototype$slic = Array.prototype.slice.call(arguments, 0),
      props = _Array$prototype$slic[0],
      args = _Array$prototype$slic.slice(1);

  if (props) {
    if (props['class']) {
      args.unshift(props['class']);
      delete props['class'];
    } else if (props.className) {
      args.unshift(props.className);
      delete props.className;
    }
  }
  if (args.length > 0) {
    return { 'class': classNames.apply(null, args) };
  }
}

function getHost(component) {
  var base = component.base;
  if (base) {
    while (base.parentNode) {
      if (base.parentNode._component) {
        return base.parentNode._component;
      } else {
        base = base.parentNode;
      }
    }
  }
}

/**
 * preact-render-to-string based on preact-render-to-string
 * by Jason Miller
 * Licensed under the MIT License
 * https://github.com/developit/preact-render-to-string
 *
 * modified by dntzhang
 */

var encodeEntities = function encodeEntities(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

var indent = function indent(s, char) {
  return String(s).replace(/(\n+)/g, '$1' + (char || '\t'));
};

var mapping$1 = options.mapping;

var VOID_ELEMENTS = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;

var isLargeString = function isLargeString(s, length, ignoreLines) {
  return String(s).length > (length || 40) || !ignoreLines && String(s).indexOf('\n') !== -1 || String(s).indexOf('<') !== -1;
};

var JS_TO_CSS = {};

// Convert an Object style to a CSSText string
function styleObjToCss(s) {
  var str = '';
  for (var prop in s) {
    var val = s[prop];
    if (val != null) {
      if (str) str += ' ';
      // str += jsToCss(prop);
      str += JS_TO_CSS[prop] || (JS_TO_CSS[prop] = prop.replace(/([A-Z])/g, '-$1').toLowerCase());
      str += ': ';
      str += val;
      if (typeof val === 'number' && IS_NON_DIMENSIONAL.test(prop) === false) {
        str += 'px';
      }
      str += ';';
    }
  }
  return str || undefined;
}

function renderToString(vnode, opts, store, isSvgMode) {
  store = store || {};
  opts = Object.assign({
    scopedCSS: true
  }, opts);
  var css = {};
  var html = _renderToString(vnode, opts, store, isSvgMode, css);
  return {
    css: Object.values(css),
    html: html
  };
}

/** The default export is an alias of `render()`. */
function _renderToString(vnode, opts, store, isSvgMode, css) {
  if (vnode == null || typeof vnode === 'boolean') {
    return '';
  }

  var nodeName = vnode.nodeName,
      attributes = vnode.attributes,
      isComponent = false;

  var pretty =  true && opts.pretty,
      indentChar = pretty && typeof pretty === 'string' ? pretty : '\t';

  // #text nodes
  if (typeof vnode !== 'object' && !nodeName) {
    return encodeEntities(vnode);
  }

  // components
  var ctor = mapping$1[nodeName];
  if (ctor) {
    isComponent = true;

    var props = getNodeProps$1(vnode),
        rendered;
    // class-based components
    var c = new ctor(props, store);
    // turn off stateful re-rendering:
    c._disable = c.__x = true;
    c.props = props;
    c.store = store;
    if (c.install) c.install();
    if (c.beforeRender) c.beforeRender();
    rendered = c.render(c.props, c.store);

    if (opts.scopedCSS) {

      if (c.constructor.css || c.css) {

        var cssStr = c.constructor.css ? c.constructor.css : typeof c.css === 'function' ? c.css() : c.css;
        var cssAttr = '_s' + getCtorName(c.constructor);
        css[cssAttr] = {
          id: cssAttr,
          css: scoper(cssStr, cssAttr)
        };
        addScopedAttrStatic(rendered, cssAttr);
      }

      c.scopedCSSAttr = vnode.css;
      scopeHost(rendered, c.scopedCSSAttr);
    }

    return _renderToString(rendered, opts, store, false, css);
  }

  // render JSX to HTML
  var s = '',
      html;

  if (attributes) {
    var attrs = Object.keys(attributes);

    // allow sorting lexicographically for more determinism (useful for tests, such as via preact-jsx-chai)
    if (opts && opts.sortAttributes === true) attrs.sort();

    for (var i = 0; i < attrs.length; i++) {
      var name = attrs[i],
          v = attributes[name];
      if (name === 'children') continue;

      if (name.match(/[\s\n\\/='"\0<>]/)) continue;

      if (!(opts && opts.allAttributes) && (name === 'key' || name === 'ref')) continue;

      if (name === 'className') {
        if (attributes['class']) continue;
        name = 'class';
      } else if (isSvgMode && name.match(/^xlink:?./)) {
        name = name.toLowerCase().replace(/^xlink:?/, 'xlink:');
      }

      if (name === 'style' && v && typeof v === 'object') {
        v = styleObjToCss(v);
      }

      var hooked = opts.attributeHook && opts.attributeHook(name, v, store, opts, isComponent);
      if (hooked || hooked === '') {
        s += hooked;
        continue;
      }

      if (name === 'dangerouslySetInnerHTML') {
        html = v && v.__html;
      } else if ((v || v === 0 || v === '') && typeof v !== 'function') {
        if (v === true || v === '') {
          v = name;
          // in non-xml mode, allow boolean attributes
          if (!opts || !opts.xml) {
            s += ' ' + name;
            continue;
          }
        }
        s += ' ' + name + '="' + encodeEntities(v) + '"';
      }
    }
  }

  // account for >1 multiline attribute
  if (pretty) {
    var sub = s.replace(/^\n\s*/, ' ');
    if (sub !== s && !~sub.indexOf('\n')) s = sub;else if (pretty && ~s.indexOf('\n')) s += '\n';
  }

  s = '<' + nodeName + s + '>';
  if (String(nodeName).match(/[\s\n\\/='"\0<>]/)) throw s;

  var isVoid = String(nodeName).match(VOID_ELEMENTS);
  if (isVoid) s = s.replace(/>$/, ' />');

  var pieces = [];
  if (html) {
    // if multiline, indent.
    if (pretty && isLargeString(html)) {
      html = '\n' + indentChar + indent(html, indentChar);
    }
    s += html;
  } else if (vnode.children) {
    var hasLarge = pretty && ~s.indexOf('\n');
    for (var i = 0; i < vnode.children.length; i++) {
      var child = vnode.children[i];
      if (child != null && child !== false) {
        var childSvgMode = nodeName === 'svg' ? true : nodeName === 'foreignObject' ? false : isSvgMode,
            ret = _renderToString(child, opts, store, childSvgMode, css);
        if (pretty && !hasLarge && isLargeString(ret)) hasLarge = true;
        if (ret) pieces.push(ret);
      }
    }
    if (pretty && hasLarge) {
      for (var i = pieces.length; i--;) {
        pieces[i] = '\n' + indentChar + indent(pieces[i], indentChar);
      }
    }
  }

  if (pieces.length) {
    s += pieces.join('');
  } else if (opts && opts.xml) {
    return s.substring(0, s.length - 1) + ' />';
  }

  if (!isVoid) {
    if (pretty && ~s.indexOf('\n')) s += '\n';
    s += '</' + nodeName + '>';
  }

  return s;
}

function assign$1(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

function getNodeProps$1(vnode) {
  var props = assign$1({}, vnode.attributes);
  props.children = vnode.children;

  var defaultProps = vnode.nodeName.defaultProps;
  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}

var n=function(t,r,u,e){for(var p=1;p<r.length;p++){var s=r[p++],a="number"==typeof s?u[s]:s;1===r[p]?e[0]=a:2===r[p]?(e[1]=e[1]||{})[r[++p]]=a:3===r[p]?e[1]=Object.assign(e[1]||{},a):e.push(r[p]?t.apply(null,n(t,a,u,["",null])):a);}return e},t=function(n){for(var t,r,u=1,e="",p="",s=[0],a=function(n){1===u&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(n||e,0):3===u&&(n||e)?(s.push(n||e,1), u=2):2===u&&"..."===e&&n?s.push(n,3):2===u&&e&&!n?s.push(!0,2,e):4===u&&r&&(s.push(n||e,2,r), r=""), e="";},f=0;f<n.length;f++){f&&(1===u&&a(), a(f));for(var h=0;h<n[f].length;h++)t=n[f][h], 1===u?"<"===t?(a(), s=[s], u=3):e+=t:p?t===p?p="":e+=t:'"'===t||"'"===t?p=t:">"===t?(a(), u=1):u&&("="===t?(u=4, r=e, e=""):"/"===t?(a(), 3===u&&(s=s[0]), u=s, (s=s[0]).push(u,4), u=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(a(), u=2):e+=t);}return a(), s},r="function"==typeof Map,u=r?new Map:{},e=r?function(n){var r=u.get(n);return r||u.set(n,r=t(n)), r}:function(n){for(var r="",e=0;e<n.length;e++)r+=n[e].length+"-"+n[e];return u[r]||(u[r]=t(n))};function htm(t){var r=n(this,e(t),arguments,[]);return r.length>1?r:r[0]}

var html = htm.bind(h);

var WeElement = Component;
var defineElement = define;
function createRef() {
  return {};
}

options.root.Omi = {
  h: h,
  createElement: h,
  cloneElement: cloneElement,
  createRef: createRef,
  Component: Component,
  render: render,
  rerender: rerender,
  options: options,
  WeElement: WeElement,
  define: define,
  rpx: rpx,
  defineElement: defineElement,
  classNames: classNames,
  extractClass: extractClass,
  getHost: getHost,
  renderToString: renderToString,
  tag: tag,
  merge: merge,
  html: html,
  htm: htm,
  obaa: obaa
};
options.root.omi = options.root.Omi;
options.root.Omi.version = 'omio-2.6.0';

var omi = {
  h: h,
  createElement: h,
  cloneElement: cloneElement,
  createRef: createRef,
  Component: Component,
  render: render,
  rerender: rerender,
  options: options,
  WeElement: WeElement,
  define: define,
  rpx: rpx,
  defineElement: defineElement,
  classNames: classNames,
  extractClass: extractClass,
  getHost: getHost,
  renderToString: renderToString,
  tag: tag,
  merge: merge,
  html: html,
  htm: htm,
  obaa: obaa
};

/* unused harmony default export */ var _unused_webpack_default_export = (omi);

//# sourceMappingURL=omi.esm.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);}