/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ !(function (b, a) {
  "object" == typeof exports && "undefined" != typeof module
    ? a(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], a)
    : a(((b = b || self).React = {}));
})(this, function (a) {
  "use strict";
  var _,
    aa,
    ab,
    ac,
    ad,
    ae,
    af,
    ag,
    y,
    z,
    m,
    n,
    o,
    e,
    f,
    g,
    h,
    A = 60103,
    B = 60106;
  (a.Fragment = 60107), (a.StrictMode = 60108), (a.Profiler = 60114);
  var C = 60109,
    D = 60110,
    E = 60112;
  a.Suspense = 60113;
  var F = 60120,
    G = 60115,
    H = 60116,
    I = 60121,
    J = 60122,
    K = 60117,
    L = 60129,
    M = 60131;
  if ("function" == typeof Symbol && Symbol.for) {
    var b = Symbol.for;
    (A = b("react.element")),
      (B = b("react.portal")),
      (a.Fragment = b("react.fragment")),
      (a.StrictMode = b("react.strict_mode")),
      (a.Profiler = b("react.profiler")),
      (C = b("react.provider")),
      (D = b("react.context")),
      (E = b("react.forward_ref")),
      (a.Suspense = b("react.suspense")),
      (F = b("react.suspense_list")),
      (G = b("react.memo")),
      (H = b("react.lazy")),
      (I = b("react.block")),
      (J = b("react.server.block")),
      (K = b("react.fundamental")),
      b("react.scope"),
      b("react.opaque.id"),
      (L = b("react.debug_trace_mode")),
      b("react.offscreen"),
      (M = b("react.legacy_hidden"));
  }
  Object.prototype.hasOwnProperty;
  var p = { current: null },
    q = { transition: 0 },
    r = { current: null },
    c = {},
    ah = null;
  (c.setExtraStackFrame = function (a) {
    ah = a;
  }),
    (c.getCurrentStack = null),
    (c.getStackAddendum = function () {
      var a = "";
      ah && (a += ah);
      var b = c.getCurrentStack;
      return b && (a += b() || ""), a;
    });
  var s = { current: !1 },
    i = {
      ReactCurrentDispatcher: p,
      ReactCurrentBatchConfig: q,
      ReactCurrentOwner: r,
      IsSomeRendererActing: s,
      assign: assign,
    };
  i.ReactDebugCurrentFrame = c;
  var ai = {
      isMounted: function (a) {
        return !1;
      },
      enqueueForceUpdate: function (a, b, c) {
        warnNoop(a, "forceUpdate");
      },
      enqueueReplaceState: function (a, b, c, d) {
        warnNoop(a, "replaceState");
      },
      enqueueSetState: function (a, b, c, d) {
        warnNoop(a, "setState");
      },
    },
    N = {};
  function d(a, b, c) {
    (this.props = a),
      (this.context = b),
      (this.refs = N),
      (this.updater = c || ai);
  }
  Object.freeze(N),
    (d.prototype.isReactComponent = {}),
    (d.prototype.forceUpdate = function (a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    });
  var j = {
      isMounted: [
        "isMounted",
        "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",
      ],
      replaceState: [
        "replaceState",
        "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).",
      ],
    },
    O = function (a, b) {
      Object.defineProperty(d.prototype, a, {
        get: function () {
          warn(
            "%s(...) is deprecated in plain JavaScript React classes. %s",
            b[0],
            b[1]
          );
        },
      });
    };
  for (var k in j) j.hasOwnProperty(k) && O(k, j[k]);
  function t() {}
  t.prototype = d.prototype;
  var l = (PureComponent.prototype = new t());
  (l.constructor = PureComponent),
    assign(l, d.prototype),
    (l.isPureReactComponent = !0),
    Object.prototype.hasOwnProperty;
  var aj = !1,
    ak = /\/+/g;
  function al(a) {
    return a.replace(ak, "$&/");
  }
  function am(a, b) {
    return "object" == typeof a && null !== a && null != a.key
      ? escape("" + a.key)
      : b.toString(36);
  }
  function an(a, c, i, d, j) {
    var e = typeof a;
    ("undefined" === e || "boolean" === e) && (a = null);
    var f = !1;
    if (null === a) f = !0;
    else
      switch (e) {
        case "string":
        case "number":
          f = !0;
          break;
        case "object":
          switch (a.$$typeof) {
            case A:
            case B:
              f = !0;
          }
      }
    if (f) {
      var g = a,
        b = j(g),
        k = "" === d ? "." + am(g, 0) : d;
      if (Array.isArray(b)) {
        var n = "";
        null != k && (n = al(k) + "/"),
          an(b, c, n, "", function (a) {
            return a;
          });
      } else
        null != b &&
          (isValidElement(b) &&
            (b = cloneAndReplaceKey(
              b,
              i +
                (b.key && (!g || g.key !== b.key) ? al("" + b.key) + "/" : "") +
                k
            )),
          c.push(b));
      return 1;
    }
    var l = 0,
      o = "" === d ? "." : d + ":";
    if (Array.isArray(a))
      for (var h = 0; h < a.length; h++)
        (q = o + am((p = a[h]), h)), (l += an(p, c, i, q, j));
    else {
      var m = getIteratorFn(a);
      if ("function" == typeof m) {
        var p,
          q,
          r,
          s = a;
        m === s.entries &&
          (aj ||
            warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ),
          (aj = !0));
        for (var u = m.call(s), v = 0; !(r = u.next()).done; )
          (q = o + am((p = r.value), v++)), (l += an(p, c, i, q, j));
      } else if ("object" === e) {
        var t = "" + a;
        throw Error(
          "Objects are not valid as a React child (found: " +
            ("[object Object]" === t
              ? "object with keys {" + Object.keys(a).join(", ") + "}"
              : t) +
            "). If you meant to render a collection of children, use an array instead."
        );
      }
    }
    return l;
  }
  function P(a, c, d) {
    if (null == a) return a;
    var b = [],
      e = 0;
    return (
      an(a, b, "", "", function (a) {
        return c.call(d, a, e++);
      }),
      b
    );
  }
  function ao(a) {
    if (-1 === a._status) {
      var b = (0, a._result)(),
        c = a;
      (c._status = 0),
        (c._result = b),
        b.then(
          function (b) {
            if (0 === a._status) {
              var c = b.default;
              void 0 === c &&
                error(
                  "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
                  b
                );
              var d = a;
              (d._status = 1), (d._result = c);
            }
          },
          function (c) {
            if (0 === a._status) {
              var b = a;
              (b._status = 2), (b._result = c);
            }
          }
        );
    }
    if (1 === a._status) return a._result;
    throw a._result;
  }
  function ap(b) {
    return (
      "string" == typeof b ||
      "function" == typeof b ||
      b === a.Fragment ||
      b === a.Profiler ||
      b === L ||
      b === a.StrictMode ||
      b === a.Suspense ||
      b === F ||
      b === M ||
      ("object" == typeof b &&
        null !== b &&
        (b.$$typeof === H ||
          b.$$typeof === G ||
          b.$$typeof === C ||
          b.$$typeof === D ||
          b.$$typeof === E ||
          b.$$typeof === K ||
          b.$$typeof === I ||
          b[0] === J))
    );
  }
  function aq() {
    var a = p.current;
    if (!(null !== a))
      throw Error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."
      );
    return a;
  }
  var ar = 0;
  function Q() {}
  Q.__reactDisabledLog = !0;
  var as = i.ReactCurrentDispatcher;
  function at(b, d, e) {
    if (void 0 === ag)
      try {
        throw Error();
      } catch (c) {
        var a = c.stack.trim().match(/\n( *(at )?)/);
        ag = (a && a[1]) || "";
      }
    return "\n" + ag + b;
  }
  var au = !1;
  function av(a, n) {
    if (!a || au) return "";
    var d,
      i,
      j = y.get(a);
    if (void 0 !== j) return j;
    au = !0;
    var o = Error.prepareStackTrace;
    (Error.prepareStackTrace = void 0),
      (i = as.current),
      (as.current = null),
      (function () {
        if (0 === ar) {
          (_ = console.log),
            (aa = console.info),
            (ab = console.warn),
            (ac = console.error),
            (ad = console.group),
            (ae = console.groupCollapsed),
            (af = console.groupEnd);
          var a = { configurable: !0, enumerable: !0, value: Q, writable: !0 };
          Object.defineProperties(console, {
            info: a,
            log: a,
            warn: a,
            error: a,
            group: a,
            groupCollapsed: a,
            groupEnd: a,
          });
        }
        ar++;
      })();
    try {
      if (n) {
        var e = function () {
          throw Error();
        };
        if (
          (Object.defineProperty(e.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          "object" == typeof Reflect && Reflect.construct)
        ) {
          try {
            Reflect.construct(e, []);
          } catch (p) {
            d = p;
          }
          Reflect.construct(a, [], e);
        } else {
          try {
            e.call();
          } catch (q) {
            d = q;
          }
          a.call(e.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (r) {
          d = r;
        }
        a();
      }
    } catch (h) {
      if (h && d && "string" == typeof h.stack) {
        for (
          var f = h.stack.split("\n"),
            g = d.stack.split("\n"),
            b = f.length - 1,
            c = g.length - 1;
          b >= 1 && c >= 0 && f[b] !== g[c];

        )
          c--;
        for (; b >= 1 && c >= 0; b--, c--)
          if (f[b] !== g[c]) {
            if (1 !== b || 1 !== c)
              do
                if ((b--, --c < 0 || f[b] !== g[c])) {
                  var k = "\n" + f[b].replace(" at new ", " at ");
                  return "function" == typeof a && y.set(a, k), k;
                }
              while (b >= 1 && c >= 0);
            break;
          }
      }
    } finally {
      (au = !1),
        (as.current = i),
        (function () {
          if (0 == --ar) {
            var a = { configurable: !0, enumerable: !0, writable: !0 };
            Object.defineProperties(console, {
              log: assign({}, a, { value: _ }),
              info: assign({}, a, { value: aa }),
              warn: assign({}, a, { value: ab }),
              error: assign({}, a, { value: ac }),
              group: assign({}, a, { value: ad }),
              groupCollapsed: assign({}, a, { value: ae }),
              groupEnd: assign({}, a, { value: af }),
            });
          }
          ar < 0 &&
            error(
              "disabledDepth fell below zero. This is a bug in React. Please file an issue."
            );
        })(),
        (Error.prepareStackTrace = o);
    }
    var l = a ? a.displayName || a.name : "",
      m = l ? at(l) : "";
    return "function" == typeof a && y.set(a, m), m;
  }
  function aw(b, c, d) {
    if (null == b) return "";
    if ("function" == typeof b)
      return av(b, !!((i = b.prototype) && i.isReactComponent));
    if ("string" == typeof b) return at(b);
    switch (b) {
      case a.Suspense:
        return at("Suspense");
      case F:
        return at("SuspenseList");
    }
    if ("object" == typeof b)
      switch (b.$$typeof) {
        case E:
          return av(b.render, !1);
        case G:
          return aw(b.type, c, d);
        case I:
          return av(b._render, !1);
        case H:
          var h,
            i,
            j,
            k,
            e = b,
            f = e._payload,
            g = e._init;
          try {
            return aw(g(f), c, d);
          } catch (l) {}
      }
    return "";
  }
  y = new ("function" == typeof WeakMap ? WeakMap : Map)();
  var ax = {},
    ay = i.ReactDebugCurrentFrame;
  function az(a) {
    if (a) {
      var b = a._owner,
        c = aw(a.type, a._source, b ? b.type : null);
      ay.setExtraStackFrame(c);
    } else ay.setExtraStackFrame(null);
  }
  function aA(a) {
    if (a) {
      var b = a._owner,
        c = aw(a.type, a._source, b ? b.type : null);
      setExtraStackFrame(c);
    } else setExtraStackFrame(null);
  }
  function aB() {
    if (r.current) {
      var a = getComponentName(r.current.type);
      if (a) return "\n\nCheck the render method of `" + a + "`.";
    }
    return "";
  }
  z = !1;
  var aC = {};
  function aD(a, d) {
    if (a._store && !a._store.validated && null == a.key) {
      a._store.validated = !0;
      var b = (function (a) {
        var b = aB();
        if (!b) {
          var c = "string" == typeof a ? a : a.displayName || a.name;
          c && (b = "\n\nCheck the top-level render call using <" + c + ">.");
        }
        return b;
      })(d);
      if (!aC[b]) {
        aC[b] = !0;
        var c = "";
        a &&
          a._owner &&
          a._owner !== r.current &&
          (c =
            " It was passed a child from " +
            getComponentName(a._owner.type) +
            "."),
          aA(a),
          error(
            'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
            b,
            c
          ),
          aA(null);
      }
    }
  }
  function aE(a, e) {
    if ("object" == typeof a) {
      if (Array.isArray(a))
        for (var b = 0; b < a.length; b++) {
          var f = a[b];
          isValidElement(f) && aD(f, e);
        }
      else if (isValidElement(a)) a._store && (a._store.validated = !0);
      else if (a) {
        var c = getIteratorFn(a);
        if ("function" == typeof c && c !== a.entries)
          for (var d, g = c.call(a); !(d = g.next()).done; )
            isValidElement(d.value) && aD(d.value, e);
      }
    }
  }
  function aF(c) {
    var b,
      a = c.type;
    if (null != a && "string" != typeof a) {
      if ("function" == typeof a) b = a.propTypes;
      else {
        if ("object" != typeof a || (a.$$typeof !== E && a.$$typeof !== G))
          return;
        b = a.propTypes;
      }
      if (b) {
        var d = getComponentName(a);
        !(function (c, h, d, e, f) {
          var i = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var b in c)
            if (i(c, b)) {
              var a = void 0;
              try {
                if ("function" != typeof c[b]) {
                  var g = Error(
                    (e || "React class") +
                      ": " +
                      d +
                      " type `" +
                      b +
                      "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                      typeof c[b] +
                      "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                  );
                  throw ((g.name = "Invariant Violation"), g);
                }
                a = c[b](
                  h,
                  b,
                  e,
                  d,
                  null,
                  "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
                );
              } catch (j) {
                a = j;
              }
              !a ||
                a instanceof Error ||
                (az(f),
                error(
                  "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                  e || "React class",
                  d,
                  b,
                  typeof a
                ),
                az(null)),
                a instanceof Error &&
                  !(a.message in ax) &&
                  ((ax[a.message] = !0),
                  az(f),
                  error("Failed %s type: %s", d, a.message),
                  az(null));
            }
        })(b, c.props, "prop", d, c);
      } else if (void 0 !== a.PropTypes && !z) {
        z = !0;
        var e = getComponentName(a);
        error(
          "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
          e || "Unknown"
        );
      }
      "function" != typeof a.getDefaultProps ||
        a.getDefaultProps.isReactClassApproved ||
        error(
          "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead."
        );
    }
  }
  function R(b, j, k) {
    var g = ap(b);
    if (!g) {
      var c,
        h,
        d = "";
      (void 0 === b ||
        ("object" == typeof b && null !== b && 0 === Object.keys(b).length)) &&
        (d +=
          " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
      var i =
        null != (h = j)
          ? (function (a) {
              if (void 0 !== a) {
                var b = a.fileName.replace(/^.*[\\\/]/, ""),
                  c = a.lineNumber;
                return "\n\nCheck your code at " + b + ":" + c + ".";
              }
              return "";
            })(h.__source)
          : "";
      i ? (d += i) : (d += aB()),
        null === b
          ? (c = "null")
          : Array.isArray(b)
          ? (c = "array")
          : void 0 !== b && b.$$typeof === A
          ? ((c = "<" + (getComponentName(b.type) || "Unknown") + " />"),
            (d =
              " Did you accidentally export a JSX literal instead of a component?"))
          : (c = typeof b),
        error(
          "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          c,
          d
        );
    }
    var e = createElement.apply(this, arguments);
    if (null == e) return e;
    if (g) for (var f = 2; f < arguments.length; f++) aE(arguments[f], b);
    return (
      b === a.Fragment
        ? (function (a) {
            for (var d = Object.keys(a.props), b = 0; b < d.length; b++) {
              var c = d[b];
              if ("children" !== c && "key" !== c) {
                aA(a),
                  error(
                    "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                    c
                  ),
                  aA(null);
                break;
              }
            }
            null !== a.ref &&
              (aA(a),
              error("Invalid attribute `ref` supplied to `React.Fragment`."),
              aA(null));
          })(e)
        : aF(e),
      e
    );
  }
  var aG = !1;
  if ("object" == typeof performance && "function" == typeof performance.now) {
    var aH = performance;
    g = function () {
      return aH.now();
    };
  } else {
    var S = Date,
      aI = S.now();
    g = function () {
      return S.now() - aI;
    };
  }
  if ("undefined" == typeof window || "function" != typeof MessageChannel) {
    var aJ = null,
      aK = null,
      aL = function () {
        if (null !== aJ)
          try {
            var a = g(),
              b = !0;
            aJ(b, a), (aJ = null);
          } catch (c) {
            throw (setTimeout(aL, 0), c);
          }
      };
    (m = function (a) {
      null !== aJ ? setTimeout(m, 0, a) : ((aJ = a), setTimeout(aL, 0));
    }),
      (n = function (a, b) {
        aK = setTimeout(a, b);
      }),
      (o = function () {
        clearTimeout(aK);
      }),
      (e = function () {
        return !1;
      }),
      (f = h = function () {});
  } else {
    var aM = window.setTimeout,
      aN = window.clearTimeout;
    if ("undefined" != typeof console) {
      var T = window.requestAnimationFrame,
        U = window.cancelAnimationFrame;
      "function" != typeof T &&
        console.error(
          "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
        ),
        "function" != typeof U &&
          console.error(
            "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
          );
    }
    var aO = !1,
      aP = null,
      aQ = -1,
      aR = 5,
      aS = 0;
    (e = function () {
      return g() >= aS;
    }),
      (f = function () {}),
      (h = function (a) {
        if (a < 0 || a > 125) {
          console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          );
          return;
        }
        aR = a > 0 ? Math.floor(1e3 / a) : 5;
      });
    var V = function () {
        if (null !== aP) {
          var a = g();
          aS = a + aR;
          var b = !0;
          try {
            aP(b, a) ? aT.postMessage(null) : ((aO = !1), (aP = null));
          } catch (c) {
            throw (aT.postMessage(null), c);
          }
        } else aO = !1;
      },
      u = new MessageChannel(),
      aT = u.port2;
    (u.port1.onmessage = V),
      (m = function (a) {
        (aP = a), aO || ((aO = !0), aT.postMessage(null));
      }),
      (n = function (b, a) {
        aQ = aM(function () {
          b(g());
        }, a);
      }),
      (o = function () {
        aN(aQ), (aQ = -1);
      });
  }
  function aU(a, b) {
    var c = a.length;
    a.push(b), aX(a, b, c);
  }
  function aV(b) {
    var a = b[0];
    return void 0 === a ? null : a;
  }
  function aW(a) {
    var b = a[0];
    if (void 0 === b) return null;
    var c = a.pop();
    return c !== b && ((a[0] = c), aY(a, c, 0)), b;
  }
  function aX(a, e, f) {
    for (var b = f; ; ) {
      var c = (b - 1) >>> 1,
        d = a[c];
      if (!(void 0 !== d && aZ(d, e) > 0)) return;
      (a[c] = e), (a[b] = d), (b = c);
    }
  }
  function aY(a, d, h) {
    for (var b = h, i = a.length; b < i; ) {
      var f = (b + 1) * 2 - 1,
        g = a[f],
        e = f + 1,
        c = a[e];
      if (void 0 !== g && 0 > aZ(g, d))
        void 0 !== c && 0 > aZ(c, g)
          ? ((a[b] = c), (a[e] = d), (b = e))
          : ((a[b] = g), (a[f] = d), (b = f));
      else {
        if (!(void 0 !== c && 0 > aZ(c, d))) return;
        (a[b] = c), (a[e] = d), (b = e);
      }
    }
  }
  function aZ(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  var a$ = [],
    a_ = [],
    a0 = 1,
    a1 = null,
    a2 = 3,
    a3 = !1,
    a4 = !1,
    a5 = !1;
  function a6(b) {
    for (var a = aV(a_); null !== a; ) {
      if (null === a.callback) aW(a_);
      else {
        if (!(a.startTime <= b)) return;
        aW(a_), (a.sortIndex = a.expirationTime), aU(a$, a);
      }
      a = aV(a_);
    }
  }
  function a7(a) {
    if (((a5 = !1), a6(a), !a4)) {
      if (null !== aV(a$)) (a4 = !0), m(a8);
      else {
        var b = aV(a_);
        null !== b && n(a7, b.startTime - a);
      }
    }
  }
  function a8(a, b) {
    (a4 = !1), a5 && ((a5 = !1), o()), (a3 = !0);
    var c = a2;
    try {
      return a9(a, b);
    } finally {
      (a1 = null), (a2 = c), (a3 = !1);
    }
  }
  function a9(f, h) {
    var a = h;
    for (
      a6(a), a1 = aV(a$);
      null !== a1 && !(a1.expirationTime > a && (!f || e()));

    ) {
      var b = a1.callback;
      if ("function" == typeof b) {
        (a1.callback = null), (a2 = a1.priorityLevel);
        var i = a1.expirationTime <= a,
          c = b(i);
        (a = g()),
          "function" == typeof c ? (a1.callback = c) : a1 === aV(a$) && aW(a$),
          a6(a);
      } else aW(a$);
      a1 = aV(a$);
    }
    if (null !== a1) return !0;
    var d = aV(a_);
    return null !== d && n(a7, d.startTime - a), !1;
  }
  function W() {
    return a2;
  }
  var X = f,
    Y = Object.freeze({
      __proto__: null,
      unstable_ImmediatePriority: 1,
      unstable_UserBlockingPriority: 2,
      unstable_NormalPriority: 3,
      unstable_IdlePriority: 5,
      unstable_LowPriority: 4,
      unstable_runWithPriority: function (a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = a2;
        a2 = a;
        try {
          return b();
        } finally {
          a2 = c;
        }
      },
      unstable_next: function (a) {
        switch (a2) {
          case 1:
          case 2:
          case 3:
            b = 3;
            break;
          default:
            b = a2;
        }
        var b,
          c = a2;
        a2 = b;
        try {
          return a();
        } finally {
          a2 = c;
        }
      },
      unstable_scheduleCallback: function (h, j, e) {
        var a,
          b,
          d = g();
        if ("object" == typeof e && null !== e) {
          var f = e.delay;
          a = "number" == typeof f && f > 0 ? d + f : d;
        } else a = d;
        switch (h) {
          case 1:
            b = -1;
            break;
          case 2:
            b = 250;
            break;
          case 5:
            b = 1073741823;
            break;
          case 4:
            b = 1e4;
            break;
          default:
            b = 5e3;
        }
        var i = a + b,
          c = {
            id: a0++,
            callback: j,
            priorityLevel: h,
            startTime: a,
            expirationTime: i,
            sortIndex: -1,
          };
        return (
          a > d
            ? ((c.sortIndex = a),
              aU(a_, c),
              null === aV(a$) &&
                c === aV(a_) &&
                (a5 ? o() : (a5 = !0), n(a7, a - d)))
            : ((c.sortIndex = i), aU(a$, c), a4 || a3 || ((a4 = !0), m(a8))),
          c
        );
      },
      unstable_cancelCallback: function (a) {
        a.callback = null;
      },
      unstable_wrapCallback: function (a) {
        var b = a2;
        return function () {
          var c = a2;
          a2 = b;
          try {
            return a.apply(this, arguments);
          } finally {
            a2 = c;
          }
        };
      },
      unstable_getCurrentPriorityLevel: W,
      get unstable_shouldYield() {
        return e;
      },
      unstable_requestPaint: X,
      unstable_continueExecution: function () {
        a4 || a3 || ((a4 = !0), m(a8));
      },
      unstable_pauseExecution: function () {},
      unstable_getFirstCallbackNode: function () {
        return aV(a$);
      },
      get unstable_now() {
        return g;
      },
      get unstable_forceFrameRate() {
        return h;
      },
      unstable_Profiling: null,
    }),
    ba = 0,
    bb = 0,
    v = null,
    w = null;
  (v = { current: new Set() }), (w = { current: null });
  var Z = null;
  function bc(c) {
    var a = !1,
      b = null;
    if (
      (Z.forEach(function (d) {
        try {
          d.onInteractionTraced(c);
        } catch (e) {
          a || ((a = !0), (b = e));
        }
      }),
      a)
    )
      throw b;
  }
  function bd(c) {
    var a = !1,
      b = null;
    if (
      (Z.forEach(function (d) {
        try {
          d.onInteractionScheduledWorkCompleted(c);
        } catch (e) {
          a || ((a = !0), (b = e));
        }
      }),
      a)
    )
      throw b;
  }
  function be(c, d) {
    var a = !1,
      b = null;
    if (
      (Z.forEach(function (e) {
        try {
          e.onWorkScheduled(c, d);
        } catch (f) {
          a || ((a = !0), (b = f));
        }
      }),
      a)
    )
      throw b;
  }
  function bf(c, d) {
    var a = !1,
      b = null;
    if (
      (Z.forEach(function (e) {
        try {
          e.onWorkStarted(c, d);
        } catch (f) {
          a || ((a = !0), (b = f));
        }
      }),
      a)
    )
      throw b;
  }
  function bg(c, d) {
    var a = !1,
      b = null;
    if (
      (Z.forEach(function (e) {
        try {
          e.onWorkStopped(c, d);
        } catch (f) {
          a || ((a = !0), (b = f));
        }
      }),
      a)
    )
      throw b;
  }
  function bh(c, d) {
    var a = !1,
      b = null;
    if (
      (Z.forEach(function (e) {
        try {
          e.onWorkCanceled(c, d);
        } catch (f) {
          a || ((a = !0), (b = f));
        }
      }),
      a)
    )
      throw b;
  }
  Z = new Set();
  var $ = Object.freeze({
      __proto__: null,
      get __interactionsRef() {
        return v;
      },
      get __subscriberRef() {
        return w;
      },
      unstable_clear: function (a) {
        var b = v.current;
        v.current = new Set();
        try {
          return a();
        } finally {
          v.current = b;
        }
      },
      unstable_getCurrent: function () {
        return v.current;
      },
      unstable_getThreadID: function () {
        return ++bb;
      },
      unstable_trace: function (g, h, i) {
        var d,
          e =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
          b = { __count: 1, id: ba++, name: g, timestamp: h },
          f = v.current,
          c = new Set(f);
        c.add(b), (v.current = c);
        var a = w.current;
        try {
          null !== a && a.onInteractionTraced(b);
        } finally {
          try {
            null !== a && a.onWorkStarted(c, e);
          } finally {
            try {
              d = i();
            } finally {
              v.current = f;
              try {
                null !== a && a.onWorkStopped(c, e);
              } finally {
                b.__count--,
                  null !== a &&
                    0 === b.__count &&
                    a.onInteractionScheduledWorkCompleted(b);
              }
            }
          }
        }
        return d;
      },
      unstable_wrap: function (e) {
        var d =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          a = v.current,
          b = w.current;
        null !== b && b.onWorkScheduled(a, d),
          a.forEach(function (a) {
            a.__count++;
          });
        var f = !1;
        function c() {
          var c,
            g = v.current;
          (v.current = a), (b = w.current);
          try {
            try {
              null !== b && b.onWorkStarted(a, d);
            } finally {
              try {
                c = e.apply(void 0, arguments);
              } finally {
                (v.current = g), null !== b && b.onWorkStopped(a, d);
              }
            }
            return c;
          } finally {
            f ||
              ((f = !0),
              a.forEach(function (a) {
                a.__count--,
                  null !== b &&
                    0 === a.__count &&
                    b.onInteractionScheduledWorkCompleted(a);
              }));
          }
        }
        return (
          (c.cancel = function () {
            b = w.current;
            try {
              null !== b && b.onWorkCanceled(a, d);
            } finally {
              a.forEach(function (a) {
                a.__count--,
                  b &&
                    0 === a.__count &&
                    b.onInteractionScheduledWorkCompleted(a);
              });
            }
          }),
          c
        );
      },
      unstable_subscribe: function (a) {
        Z.add(a),
          1 === Z.size &&
            (w.current = {
              onInteractionScheduledWorkCompleted: bd,
              onInteractionTraced: bc,
              onWorkCanceled: bh,
              onWorkScheduled: be,
              onWorkStarted: bf,
              onWorkStopped: bg,
            });
      },
      unstable_unsubscribe: function (a) {
        Z.delete(a), 0 === Z.size && (w.current = null);
      },
    }),
    x = {
      ReactCurrentDispatcher: p,
      ReactCurrentOwner: r,
      IsSomeRendererActing: s,
      ReactCurrentBatchConfig: q,
      assign: assign,
      Scheduler: Y,
      SchedulerTracing: $,
    };
  x.ReactDebugCurrentFrame = c;
  try {
    Object.freeze({});
  } catch (bi) {}
  (a.Children = {
    map: P,
    forEach: function (a, c, b) {
      P(
        a,
        function () {
          c.apply(this, arguments);
        },
        b
      );
    },
    count: function (a) {
      var b = 0;
      return (
        P(a, function () {
          b++;
        }),
        b
      );
    },
    toArray: function (a) {
      return (
        P(a, function (a) {
          return a;
        }) || []
      );
    },
    only: function (a) {
      if (!isValidElement(a))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return a;
    },
  }),
    (a.Component = d),
    (a.PureComponent = PureComponent),
    (a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = x),
    (a.cloneElement = function (c, d, e) {
      for (
        var a = cloneElement.apply(this, arguments), b = 2;
        b < arguments.length;
        b++
      )
        aE(arguments[b], a.type);
      return aF(a), a;
    }),
    (a.createContext = function (c, b) {
      void 0 === b
        ? (b = null)
        : null !== b &&
          "function" != typeof b &&
          error(
            "createContext: Expected the optional second argument to be a function. Instead received: %s",
            b
          );
      var a = {
        $$typeof: D,
        _calculateChangedBits: b,
        _currentValue: c,
        _currentValue2: c,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
      };
      a.Provider = { $$typeof: C, _context: a };
      var e = !1,
        f = !1,
        g = !1,
        d = {
          $$typeof: D,
          _context: a,
          _calculateChangedBits: a._calculateChangedBits,
        };
      return (
        Object.defineProperties(d, {
          Provider: {
            get: function () {
              return (
                f ||
                  ((f = !0),
                  error(
                    "Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?"
                  )),
                a.Provider
              );
            },
            set: function (b) {
              a.Provider = b;
            },
          },
          _currentValue: {
            get: function () {
              return a._currentValue;
            },
            set: function (b) {
              a._currentValue = b;
            },
          },
          _currentValue2: {
            get: function () {
              return a._currentValue2;
            },
            set: function (b) {
              a._currentValue2 = b;
            },
          },
          _threadCount: {
            get: function () {
              return a._threadCount;
            },
            set: function (b) {
              a._threadCount = b;
            },
          },
          Consumer: {
            get: function () {
              return (
                e ||
                  ((e = !0),
                  error(
                    "Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"
                  )),
                a.Consumer
              );
            },
          },
          displayName: {
            get: function () {
              return a.displayName;
            },
            set: function (a) {
              g ||
                (warn(
                  "Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",
                  a
                ),
                (g = !0));
            },
          },
        }),
        (a.Consumer = d),
        (a._currentRenderer = null),
        (a._currentRenderer2 = null),
        a
      );
    }),
    (a.createElement = R),
    (a.createFactory = function (b) {
      var a = R.bind(null, b);
      return (
        (a.type = b),
        aG ||
          ((aG = !0),
          warn(
            "React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead."
          )),
        Object.defineProperty(a, "type", {
          enumerable: !1,
          get: function () {
            return (
              warn(
                "Factory.type is deprecated. Access the class directly before passing it to createFactory."
              ),
              Object.defineProperty(this, "type", { value: b }),
              b
            );
          },
        }),
        a
      );
    }),
    (a.createRef = createRef),
    (a.forwardRef = function (a) {
      null != a && a.$$typeof === G
        ? error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          )
        : "function" != typeof a
        ? error(
            "forwardRef requires a render function but was given %s.",
            null === a ? "null" : typeof a
          )
        : 0 !== a.length &&
          2 !== a.length &&
          error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === a.length
              ? "Did you forget to use the ref parameter?"
              : "Any additional parameter will be undefined."
          ),
        null != a &&
          (null != a.defaultProps || null != a.propTypes) &&
          error(
            "forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?"
          );
      var c,
        b = { $$typeof: E, render: a };
      return (
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function () {
            return c;
          },
          set: function (b) {
            (c = b), null == a.displayName && (a.displayName = b);
          },
        }),
        b
      );
    }),
    (a.isValidElement = isValidElement),
    (a.lazy = function (b) {
      var c,
        d,
        a = { $$typeof: H, _payload: { _status: -1, _result: b }, _init: ao };
      return (
        Object.defineProperties(a, {
          defaultProps: {
            configurable: !0,
            get: function () {
              return c;
            },
            set: function (b) {
              error(
                "React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."
              ),
                (c = b),
                Object.defineProperty(a, "defaultProps", { enumerable: !0 });
            },
          },
          propTypes: {
            configurable: !0,
            get: function () {
              return d;
            },
            set: function (b) {
              error(
                "React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."
              ),
                (d = b),
                Object.defineProperty(a, "propTypes", { enumerable: !0 });
            },
          },
        }),
        a
      );
    }),
    (a.memo = function (a, b) {
      ap(a) ||
        error(
          "memo: The first argument must be a component. Instead received: %s",
          null === a ? "null" : typeof a
        );
      var d,
        c = { $$typeof: G, type: a, compare: void 0 === b ? null : b };
      return (
        Object.defineProperty(c, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function () {
            return d;
          },
          set: function (b) {
            (d = b), null == a.displayName && (a.displayName = b);
          },
        }),
        c
      );
    }),
    (a.useCallback = function (a, b) {
      return aq().useCallback(a, b);
    }),
    (a.useContext = function (a, b) {
      var d = aq();
      if (
        (void 0 !== b &&
          error(
            "useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s",
            b,
            "number" == typeof b && Array.isArray(arguments[2])
              ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks"
              : ""
          ),
        void 0 !== a._context)
      ) {
        var c = a._context;
        c.Consumer === a
          ? error(
              "Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"
            )
          : c.Provider === a &&
            error(
              "Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?"
            );
      }
      return d.useContext(a, b);
    }),
    (a.useDebugValue = function (a, b) {
      return aq().useDebugValue(a, b);
    }),
    (a.useEffect = function (a, b) {
      return aq().useEffect(a, b);
    }),
    (a.useImperativeHandle = function (a, b, c) {
      return aq().useImperativeHandle(a, b, c);
    }),
    (a.useLayoutEffect = function (a, b) {
      return aq().useLayoutEffect(a, b);
    }),
    (a.useMemo = function (a, b) {
      return aq().useMemo(a, b);
    }),
    (a.useReducer = function (a, b, c) {
      return aq().useReducer(a, b, c);
    }),
    (a.useRef = function (a) {
      return aq().useRef(a);
    }),
    (a.useState = function (a) {
      return aq().useState(a);
    }),
    (a.version = "17.0.2");
});
