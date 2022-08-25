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
  var aj = !1,
    ak = /\/+/g;
  var ar = 0;
  function Q() {}
  Q.__reactDisabledLog = !0;
  var as = i.ReactCurrentDispatcher;

  var au = !1;

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

  z = !1;
  var aC = {};

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
    aT = u.port2;
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
      unstable_cancelCallback: function (a) {
        a.callback = null;
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
