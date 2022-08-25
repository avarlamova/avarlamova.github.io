/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global = global || self), factory((global.React = {})));
})(this, function (exports) {
  "use strict";

  var ReactVersion = "17.0.2";
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  exports.Fragment = 0xeacb;
  exports.StrictMode = 0xeacc;
  exports.Profiler = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  exports.Suspense = 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_SCOPE_TYPE = 0xead7;
  var REACT_OPAQUE_ID_TYPE = 0xeae0;
  var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
  var REACT_OFFSCREEN_TYPE = 0xeae2;
  var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

  if (typeof Symbol === "function" && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor("react.element");
    REACT_PORTAL_TYPE = symbolFor("react.portal");
    exports.Fragment = symbolFor("react.fragment");
    exports.StrictMode = symbolFor("react.strict_mode");
    exports.Profiler = symbolFor("react.profiler");
    REACT_PROVIDER_TYPE = symbolFor("react.provider");
    REACT_CONTEXT_TYPE = symbolFor("react.context");
    REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
    exports.Suspense = symbolFor("react.suspense");
    REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
    REACT_MEMO_TYPE = symbolFor("react.memo");
    REACT_LAZY_TYPE = symbolFor("react.lazy");
    REACT_BLOCK_TYPE = symbolFor("react.block");
    REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
    REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
    REACT_SCOPE_TYPE = symbolFor("react.scope");
    REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
    REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
    REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
    REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
  }

  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = "@@iterator";

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var ReactCurrentDispatcher = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null,
  };

  var ReactCurrentBatchConfig = {
    transition: 0,
  };

  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   */
  var ReactCurrentOwner = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null,
  };

  var ReactDebugCurrentFrame = {};
  var currentExtraStackFrame = null;
  {
    ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
      {
        currentExtraStackFrame = stack;
      }
    }; // Stack implementation injected by the current renderer.

    ReactDebugCurrentFrame.getCurrentStack = null;

    ReactDebugCurrentFrame.getStackAddendum = function () {
      var stack = ""; // Add an extra top frame while an element is being validated

      if (currentExtraStackFrame) {
        stack += currentExtraStackFrame;
      } // Delegate to the injected renderer-specific implementation

      var impl = ReactDebugCurrentFrame.getCurrentStack;

      if (impl) {
        stack += impl() || "";
      }

      return stack;
    };
  }

  /**
   * Used by act() to track whether you're inside an act() scope.
   */
  var IsSomeRendererActing = {
    current: false,
  };

  var ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: IsSomeRendererActing,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: assign,
  };

  {
    ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
  }

  // by calls to these methods by a Babel plugin.
  //
  // In PROD (or in packages without access to React internals),
  // they are left as they are instead.

  var didWarnStateUpdateForUnmountedComponent = {};
  var ReactNoopUpdateQueue = {
    /**
     * Checks whether or not this composite component is mounted.
     * @param {ReactClass} publicInstance The instance we want to test.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function (publicInstance) {
      return false;
    },

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueForceUpdate: function (publicInstance, callback, callerName) {
      warnNoop(publicInstance, "forceUpdate");
    },

    /**
     * Replaces all of the state. Always use this or `setState` to mutate state.
     * You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} completeState Next state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueReplaceState: function (
      publicInstance,
      completeState,
      callback,
      callerName
    ) {
      warnNoop(publicInstance, "replaceState");
    },

    /**
     * Sets a subset of the state. This only exists because _pendingState is
     * internal. This provides a merging strategy that is not available to deep
     * properties which is confusing. TODO: Expose pendingState or don't use it
     * during the merge.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialState Next partial state to be merged with state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} Name of the calling function in the public API.
     * @internal
     */
    enqueueSetState: function (
      publicInstance,
      partialState,
      callback,
      callerName
    ) {
      warnNoop(publicInstance, "setState");
    },
  };

  var emptyObject = {};

  {
    Object.freeze(emptyObject);
  }
  /**
   * Base class helpers for the updating state of a component.
   */

  function Component(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
    // renderer.

    this.updater = updater || ReactNoopUpdateQueue;
  }

  Component.prototype.isReactComponent = {};
  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * When a function is provided to setState, it will be called at some point in
   * the future (not synchronously). It will be called with the up to date
   * component arguments (state, props, context). These values can be different
   * from this.* because your function may be called after receiveProps but before
   * shouldComponentUpdate, and this new state, props, and context will not yet be
   * assigned to this.
   *
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */

  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  {
    var deprecatedAPIs = {
      isMounted: [
        "isMounted",
        "Instead, make sure to clean up subscriptions and pending requests in " +
          "componentWillUnmount to prevent memory leaks.",
      ],
      replaceState: [
        "replaceState",
        "Refactor your code to use setState instead (see " +
          "https://github.com/facebook/react/issues/3236).",
      ],
    };

    var defineDeprecationWarning = function (methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function () {
          warn(
            "%s(...) is deprecated in plain JavaScript React classes. %s",
            info[0],
            info[1]
          );

          return undefined;
        },
      });
    };

    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }

  function ComponentDummy() {}

  ComponentDummy.prototype = Component.prototype;

  var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
  pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

  assign(pureComponentPrototype, Component.prototype);

  pureComponentPrototype.isPureReactComponent = true;

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true,
  };
  var specialPropKeyWarningShown,
    specialPropRefWarningShown,
    didWarnAboutStringRefs;

  {
    didWarnAboutStringRefs = {};
  }

  var SEPARATOR = ".";
  var SUBSEPARATOR = ":";

  /**
   * TODO: Test that a single child and an array with one item have the same key
   * pattern.
   */

  var didWarnAboutMaps = false;
  var userProvidedKeyEscapeRegex = /\/+/g;

  function escapeUserProvidedKey(text) {
    return text.replace(userProvidedKeyEscapeRegex, "$&/");
  }
  /**
   * Generate a key string that identifies a element within a set.
   *
   * @param {*} element A element that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */

  function getElementKey(element, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if (
      typeof element === "object" &&
      element !== null &&
      element.key != null
    ) {
      // Explicit key
      return escape("" + element.key);
    } // Implicit key determined by the index in the set

    return index.toString(36);
  }

  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;

    if (type === "undefined" || type === "boolean") {
      // All of the above are perceived as null.
      children = null;
    }

    var invokeCallback = false;

    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case "string":
        case "number":
          invokeCallback = true;
          break;

        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }
      }
    }

    if (invokeCallback) {
      var _child = children;
      var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows:

      var childKey =
        nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

      if (Array.isArray(mappedChild)) {
        var escapedChildKey = "";

        if (childKey != null) {
          escapedChildKey = escapeUserProvidedKey(childKey) + "/";
        }

        mapIntoArray(mappedChild, array, escapedChildKey, "", function (c) {
          return c;
        });
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(
            mappedChild, // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (mappedChild.key && (!_child || _child.key !== mappedChild.key) // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                ? escapeUserProvidedKey("" + mappedChild.key) + "/"
                : "") +
              childKey
          );
        }

        array.push(mappedChild);
      }

      return 1;
    }

    var child;
    var nextName;
    var subtreeCount = 0; // Count of children found in the current subtree.

    var nextNamePrefix =
      nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;

    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getElementKey(child, i);
        subtreeCount += mapIntoArray(
          child,
          array,
          escapedPrefix,
          nextName,
          callback
        );
      }
    } else {
      var iteratorFn = getIteratorFn(children);

      if (typeof iteratorFn === "function") {
        var iterableChildren = children;

        {
          // Warn about using Maps as children
          if (iteratorFn === iterableChildren.entries) {
            if (!didWarnAboutMaps) {
              warn(
                "Using Maps as children is not supported. " +
                  "Use an array of keyed ReactElements instead."
              );
            }

            didWarnAboutMaps = true;
          }
        }

        var iterator = iteratorFn.call(iterableChildren);
        var step;
        var ii = 0;

        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getElementKey(child, ii++);
          subtreeCount += mapIntoArray(
            child,
            array,
            escapedPrefix,
            nextName,
            callback
          );
        }
      } else if (type === "object") {
        var childrenString = "" + children;

        {
          {
            throw Error(
              "Objects are not valid as a React child (found: " +
                (childrenString === "[object Object]"
                  ? "object with keys {" +
                    Object.keys(children).join(", ") +
                    "}"
                  : childrenString) +
                "). If you meant to render a collection of children, use an array instead."
            );
          }
        }
      }
    }

    return subtreeCount;
  }

  /**
   * Maps children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenmap
   *
   * The provided mapFunction(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func The map function.
   * @param {*} context Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }

    var result = [];
    var count = 0;
    mapIntoArray(children, result, "", "", function (child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrencount
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */

  function countChildren(children) {
    var n = 0;
    mapChildren(children, function () {
      n++; // Don't return anything
    });
    return n;
  }

  /**
   * Iterates through children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc
   * @param {*} forEachContext Context for forEachContext.
   */
  function forEachChildren(children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function () {
        forEachFunc.apply(this, arguments); // Don't return anything.
      },
      forEachContext
    );
  }
  /**
   * Flatten a children object (typically specified as `props.children`) and
   * return an array with appropriately re-keyed children.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
   */

  function toArray(children) {
    return (
      mapChildren(children, function (child) {
        return child;
      }) || []
    );
  }
  /**
   * Returns the first child in a collection of children and verifies that there
   * is only one child in the collection.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenonly
   *
   * The current implementation of this function assumes that a single child gets
   * passed without a wrapper, but the purpose of this helper function is to
   * abstract away the particular structure of children.
   *
   * @param {?object} children Child collection structure.
   * @return {ReactElement} The first and only `ReactElement` contained in the
   * structure.
   */

  function onlyChild(children) {
    if (!isValidElement(children)) {
      {
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      }
    }

    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      {
        if (
          calculateChangedBits !== null &&
          typeof calculateChangedBits !== "function"
        ) {
          error(
            "createContext: Expected the optional second argument to be a " +
              "function. Instead received: %s",
            calculateChangedBits
          );
        }
      }
    }

    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      // As a workaround to support multiple concurrent renderers, we categorize
      // some renderers as primary and others as secondary. We only expect
      // there to be two concurrent renderers at most: React Native (primary) and
      // Fabric (secondary); React DOM (primary) and React ART (secondary).
      // Secondary renderers store their context values on separate fields.
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      // Used to track how many concurrent renderers this context currently
      // supports within in a single renderer. Such as parallel server rendering.
      _threadCount: 0,
      // These are circular
      Provider: null,
      Consumer: null,
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context,
    };
    var hasWarnedAboutUsingNestedContextConsumers = false;
    var hasWarnedAboutUsingConsumerProvider = false;
    var hasWarnedAboutDisplayNameOnConsumer = false;

    {
      // A separate object, but proxies back to the original context object for
      // backwards compatibility. It has a different $$typeof, so we can properly
      // warn for the incorrect usage of Context as a Consumer.
      var Consumer = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
        _calculateChangedBits: context._calculateChangedBits,
      }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

      Object.defineProperties(Consumer, {
        Provider: {
          get: function () {
            if (!hasWarnedAboutUsingConsumerProvider) {
              hasWarnedAboutUsingConsumerProvider = true;

              error(
                "Rendering <Context.Consumer.Provider> is not supported and will be removed in " +
                  "a future major release. Did you mean to render <Context.Provider> instead?"
              );
            }

            return context.Provider;
          },
          set: function (_Provider) {
            context.Provider = _Provider;
          },
        },
        _currentValue: {
          get: function () {
            return context._currentValue;
          },
          set: function (_currentValue) {
            context._currentValue = _currentValue;
          },
        },
        _currentValue2: {
          get: function () {
            return context._currentValue2;
          },
          set: function (_currentValue2) {
            context._currentValue2 = _currentValue2;
          },
        },
        _threadCount: {
          get: function () {
            return context._threadCount;
          },
          set: function (_threadCount) {
            context._threadCount = _threadCount;
          },
        },
        Consumer: {
          get: function () {
            if (!hasWarnedAboutUsingNestedContextConsumers) {
              hasWarnedAboutUsingNestedContextConsumers = true;

              error(
                "Rendering <Context.Consumer.Consumer> is not supported and will be removed in " +
                  "a future major release. Did you mean to render <Context.Consumer> instead?"
              );
            }

            return context.Consumer;
          },
        },
        displayName: {
          get: function () {
            return context.displayName;
          },
          set: function (displayName) {
            if (!hasWarnedAboutDisplayNameOnConsumer) {
              warn(
                "Setting `displayName` on Context.Consumer has no effect. " +
                  "You should set it directly on the context with Context.displayName = '%s'.",
                displayName
              );

              hasWarnedAboutDisplayNameOnConsumer = true;
            }
          },
        },
      }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

      context.Consumer = Consumer;
    }

    {
      context._currentRenderer = null;
      context._currentRenderer2 = null;
    }

    return context;
  }

  var Uninitialized = -1;
  var Pending = 0;
  var Resolved = 1;
  var Rejected = 2;

  function lazyInitializer(payload) {
    if (payload._status === Uninitialized) {
      var ctor = payload._result;
      var thenable = ctor(); // Transition to the next state.

      var pending = payload;
      pending._status = Pending;
      pending._result = thenable;
      thenable.then(
        function (moduleObject) {
          if (payload._status === Pending) {
            var defaultExport = moduleObject.default;

            {
              if (defaultExport === undefined) {
                error(
                  "lazy: Expected the result of a dynamic import() call. " +
                    "Instead received: %s\n\nYour code should look like: \n  " + // Break up imports to avoid accidentally parsing them as dependencies.
                    "const MyComponent = lazy(() => imp" +
                    "ort('./MyComponent'))",
                  moduleObject
                );
              }
            } // Transition to the next state.

            var resolved = payload;
            resolved._status = Resolved;
            resolved._result = defaultExport;
          }
        },
        function (error) {
          if (payload._status === Pending) {
            // Transition to the next state.
            var rejected = payload;
            rejected._status = Rejected;
            rejected._result = error;
          }
        }
      );
    }

    if (payload._status === Resolved) {
      return payload._result;
    } else {
      throw payload._result;
    }
  }

  function lazy(ctor) {
    var payload = {
      // We use these fields to store the result.
      _status: -1,
      _result: ctor,
    };
    var lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _payload: payload,
      _init: lazyInitializer,
    };

    {
      // In production, this would just set it on the object.
      var defaultProps;
      var propTypes; // $FlowFixMe

      Object.defineProperties(lazyType, {
        defaultProps: {
          configurable: true,
          get: function () {
            return defaultProps;
          },
          set: function (newDefaultProps) {
            error(
              "React.lazy(...): It is not supported to assign `defaultProps` to " +
                "a lazy component import. Either specify them where the component " +
                "is defined, or create a wrapping component around it."
            );

            defaultProps = newDefaultProps; // Match production behavior more closely:
            // $FlowFixMe

            Object.defineProperty(lazyType, "defaultProps", {
              enumerable: true,
            });
          },
        },
        propTypes: {
          configurable: true,
          get: function () {
            return propTypes;
          },
          set: function (newPropTypes) {
            error(
              "React.lazy(...): It is not supported to assign `propTypes` to " +
                "a lazy component import. Either specify them where the component " +
                "is defined, or create a wrapping component around it."
            );

            propTypes = newPropTypes; // Match production behavior more closely:
            // $FlowFixMe

            Object.defineProperty(lazyType, "propTypes", {
              enumerable: true,
            });
          },
        },
      });
    }

    return lazyType;
  }

  function forwardRef(render) {
    {
      if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
        error(
          "forwardRef requires a render function but received a `memo` " +
            "component. Instead of forwardRef(memo(...)), use " +
            "memo(forwardRef(...))."
        );
      } else if (typeof render !== "function") {
        error(
          "forwardRef requires a render function but was given %s.",
          render === null ? "null" : typeof render
        );
      } else {
        if (render.length !== 0 && render.length !== 2) {
          error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            render.length === 1
              ? "Did you forget to use the ref parameter?"
              : "Any additional parameter will be undefined."
          );
        }
      }

      if (render != null) {
        if (render.defaultProps != null || render.propTypes != null) {
          error(
            "forwardRef render functions do not support propTypes or defaultProps. " +
              "Did you accidentally pass a React component?"
          );
        }
      }
    }

    var elementType = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render,
    };

    {
      var ownName;
      Object.defineProperty(elementType, "displayName", {
        enumerable: false,
        configurable: true,
        get: function () {
          return ownName;
        },
        set: function (name) {
          ownName = name;

          if (render.displayName == null) {
            render.displayName = name;
          }
        },
      });
    }

    return elementType;
  }

  // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

  var enableScopeAPI = false; // Experimental Create Event Handle API.

  function isValidElementType(type) {
    if (typeof type === "string" || typeof type === "function") {
      return true;
    } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).

    if (
      type === exports.Fragment ||
      type === exports.Profiler ||
      type === REACT_DEBUG_TRACING_MODE_TYPE ||
      type === exports.StrictMode ||
      type === exports.Suspense ||
      type === REACT_SUSPENSE_LIST_TYPE ||
      type === REACT_LEGACY_HIDDEN_TYPE ||
      enableScopeAPI
    ) {
      return true;
    }

    if (typeof type === "object" && type !== null) {
      if (
        type.$$typeof === REACT_LAZY_TYPE ||
        type.$$typeof === REACT_MEMO_TYPE ||
        type.$$typeof === REACT_PROVIDER_TYPE ||
        type.$$typeof === REACT_CONTEXT_TYPE ||
        type.$$typeof === REACT_FORWARD_REF_TYPE ||
        type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
        type.$$typeof === REACT_BLOCK_TYPE ||
        type[0] === REACT_SERVER_BLOCK_TYPE
      ) {
        return true;
      }
    }

    return false;
  }

  function memo(type, compare) {
    {
      if (!isValidElementType(type)) {
        error(
          "memo: The first argument must be a component. Instead " +
            "received: %s",
          type === null ? "null" : typeof type
        );
      }
    }

    var elementType = {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare,
    };

    {
      var ownName;
      Object.defineProperty(elementType, "displayName", {
        enumerable: false,
        configurable: true,
        get: function () {
          return ownName;
        },
        set: function (name) {
          ownName = name;

          if (type.displayName == null) {
            type.displayName = name;
          }
        },
      });
    }

    return elementType;
  }

  function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;

    if (!(dispatcher !== null)) {
      {
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      }
    }

    return dispatcher;
  }

  function useContext(Context, unstable_observedBits) {
    var dispatcher = resolveDispatcher();

    {
      if (unstable_observedBits !== undefined) {
        error(
          "useContext() second argument is reserved for future " +
            "use in React. Passing it is not supported. " +
            "You passed: %s.%s",
          unstable_observedBits,
          typeof unstable_observedBits === "number" &&
            Array.isArray(arguments[2])
            ? "\n\nDid you call array.map(useContext)? " +
                "Calling Hooks inside a loop is not supported. " +
                "Learn more at https://reactjs.org/link/rules-of-hooks"
            : ""
        );
      } // TODO: add a more generic warning for invalid values.

      if (Context._context !== undefined) {
        var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
        // and nobody should be using this in existing code.

        if (realContext.Consumer === Context) {
          error(
            "Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be " +
              "removed in a future major release. Did you mean to call useContext(Context) instead?"
          );
        } else if (realContext.Provider === Context) {
          error(
            "Calling useContext(Context.Provider) is not supported. " +
              "Did you mean to call useContext(Context) instead?"
          );
        }
      }
    }

    return dispatcher.useContext(Context, unstable_observedBits);
  }
  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }
  function useReducer(reducer, initialArg, init) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }
  function useRef(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }
  function useEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, deps);
  }
  function useLayoutEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, deps);
  }
  function useCallback(callback, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, deps);
  }
  function useMemo(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, deps);
  }
  function useImperativeHandle(ref, create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, deps);
  }
  function useDebugValue(value, formatterFn) {
    {
      var dispatcher = resolveDispatcher();
      return dispatcher.useDebugValue(value, formatterFn);
    }
  }

  // Helpers to patch console.logs to avoid logging during side-effect free
  // replaying on render function. This currently only patches the object
  // lazily which won't cover if the log function was extracted eagerly.
  // We could also eagerly patch the method.
  var disabledDepth = 0;
  var prevLog;
  var prevInfo;
  var prevWarn;
  var prevError;
  var prevGroup;
  var prevGroupCollapsed;
  var prevGroupEnd;

  function disabledLog() {}

  disabledLog.__reactDisabledLog = true;
  function disableLogs() {
    {
      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        prevLog = console.log;
        prevInfo = console.info;
        prevWarn = console.warn;
        prevError = console.error;
        prevGroup = console.group;
        prevGroupCollapsed = console.groupCollapsed;
        prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

        var props = {
          configurable: true,
          enumerable: true,
          value: disabledLog,
          writable: true,
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          info: props,
          log: props,
          warn: props,
          error: props,
          group: props,
          groupCollapsed: props,
          groupEnd: props,
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      disabledDepth++;
    }
  }
  function reenableLogs() {
    {
      disabledDepth--;

      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        var props = {
          configurable: true,
          enumerable: true,
          writable: true,
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          log: assign({}, props, {
            value: prevLog,
          }),
          info: assign({}, props, {
            value: prevInfo,
          }),
          warn: assign({}, props, {
            value: prevWarn,
          }),
          error: assign({}, props, {
            value: prevError,
          }),
          group: assign({}, props, {
            value: prevGroup,
          }),
          groupCollapsed: assign({}, props, {
            value: prevGroupCollapsed,
          }),
          groupEnd: assign({}, props, {
            value: prevGroupEnd,
          }),
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      if (disabledDepth < 0) {
        error(
          "disabledDepth fell below zero. " +
            "This is a bug in React. Please file an issue."
        );
      }
    }
  }

  var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
  var prefix;
  function describeBuiltInComponentFrame(name, source, ownerFn) {
    {
      if (prefix === undefined) {
        // Extract the VM specific prefix used by each line.
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = (match && match[1]) || "";
        }
      } // We use the prefix to ensure our stacks line up with native stack frames.

      return "\n" + prefix + name;
    }
  }
  var reentry = false;
  var componentFrameCache;

  {
    var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
    componentFrameCache = new PossiblyWeakMap();
  }

  function describeNativeComponentFrame(fn, construct) {
    // If something asked for a stack inside a fake render, it should get ignored.
    if (!fn || reentry) {
      return "";
    }

    {
      var frame = componentFrameCache.get(fn);

      if (frame !== undefined) {
        return frame;
      }
    }

    var control;
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

    Error.prepareStackTrace = undefined;
    var previousDispatcher;

    {
      previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
      // for warnings.

      ReactCurrentDispatcher$1.current = null;
      disableLogs();
    }

    try {
      // This should throw.
      if (construct) {
        // Something should be setting the props in the constructor.
        var Fake = function () {
          throw Error();
        }; // $FlowFixMe

        Object.defineProperty(Fake.prototype, "props", {
          set: function () {
            // We use a throwing setter instead of frozen or non-writable props
            // because that won't throw in a non-strict mode function.
            throw Error();
          },
        });

        if (typeof Reflect === "object" && Reflect.construct) {
          // We construct a different control for this case to include any extra
          // frames added by the construct call.
          try {
            Reflect.construct(Fake, []);
          } catch (x) {
            control = x;
          }

          Reflect.construct(fn, [], Fake);
        } else {
          try {
            Fake.call();
          } catch (x) {
            control = x;
          }

          fn.call(Fake.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (x) {
          control = x;
        }

        fn();
      }
    } catch (sample) {
      // This is inlined manually because closure doesn't do it for us.
      if (sample && control && typeof sample.stack === "string") {
        // This extracts the first frame from the sample that isn't also in the control.
        // Skipping one frame that we assume is the frame that calls the two.
        var sampleLines = sample.stack.split("\n");
        var controlLines = control.stack.split("\n");
        var s = sampleLines.length - 1;
        var c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }

        for (; s >= 1 && c >= 0; s--, c--) {
          // Next we find the first one that isn't the same which should be the
          // frame that called our sample function and the control.
          if (sampleLines[s] !== controlLines[c]) {
            // In V8, the first line is describing the message but other VMs don't.
            // If we're about to return the first line, and the control is also on the same
            // line, that's a pretty good indicator that our sample threw at same line as
            // the control. I.e. before we entered the sample frame. So we ignore this result.
            // This can happen if you passed a class to function component, or non-function.
            if (s !== 1 || c !== 1) {
              do {
                s--;
                c--; // We may still have similar intermediate frames from the construct call.
                // The next one that isn't the same should be our match though.

                if (c < 0 || sampleLines[s] !== controlLines[c]) {
                  // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                  var _frame =
                    "\n" + sampleLines[s].replace(" at new ", " at ");

                  {
                    if (typeof fn === "function") {
                      componentFrameCache.set(fn, _frame);
                    }
                  } // Return the line we found.

                  return _frame;
                }
              } while (s >= 1 && c >= 0);
            }

            break;
          }
        }
      }
    } finally {
      reentry = false;

      {
        ReactCurrentDispatcher$1.current = previousDispatcher;
        reenableLogs();
      }

      Error.prepareStackTrace = previousPrepareStackTrace;
    } // Fallback to just using the name if we couldn't make it throw.

    var name = fn ? fn.displayName || fn.name : "";
    var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";

    {
      if (typeof fn === "function") {
        componentFrameCache.set(fn, syntheticFrame);
      }
    }

    return syntheticFrame;
  }
  function describeFunctionComponentFrame(fn, source, ownerFn) {
    {
      return describeNativeComponentFrame(fn, false);
    }
  }

  function shouldConstruct(Component) {
    var prototype = Component.prototype;
    return !!(prototype && prototype.isReactComponent);
  }

  function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
    if (type == null) {
      return "";
    }

    if (typeof type === "function") {
      {
        return describeNativeComponentFrame(type, shouldConstruct(type));
      }
    }

    if (typeof type === "string") {
      return describeBuiltInComponentFrame(type);
    }

    switch (type) {
      case exports.Suspense:
        return describeBuiltInComponentFrame("Suspense");

      case REACT_SUSPENSE_LIST_TYPE:
        return describeBuiltInComponentFrame("SuspenseList");
    }

    if (typeof type === "object") {
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          return describeFunctionComponentFrame(type.render);

        case REACT_MEMO_TYPE:
          // Memo may contain any component type so we recursively resolve it.
          return describeUnknownElementTypeFrameInDEV(
            type.type,
            source,
            ownerFn
          );

        case REACT_BLOCK_TYPE:
          return describeFunctionComponentFrame(type._render);

        case REACT_LAZY_TYPE: {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(
              init(payload),
              source,
              ownerFn
            );
          } catch (x) {}
        }
      }
    }

    return "";
  }

  var loggedTypeFailures = {};
  var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

  function setCurrentlyValidatingElement(element) {
    {
      if (element) {
        var owner = element._owner;
        var stack = describeUnknownElementTypeFrameInDEV(
          element.type,
          element._source,
          owner ? owner.type : null
        );
        ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
      } else {
        ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
    }
  }

  function checkPropTypes(typeSpecs, values, location, componentName, element) {
    {
      // $FlowFixMe This is okay but Flow doesn't know it.
      var has = Function.call.bind(Object.prototype.hasOwnProperty);

      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.

          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== "function") {
              var err = Error(
                (componentName || "React class") +
                  ": " +
                  location +
                  " type `" +
                  typeSpecName +
                  "` is invalid; " +
                  "it must be a function, usually from the `prop-types` package, but received `" +
                  typeof typeSpecs[typeSpecName] +
                  "`." +
                  "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              err.name = "Invariant Violation";
              throw err;
            }

            error$1 = typeSpecs[typeSpecName](
              values,
              typeSpecName,
              componentName,
              location,
              null,
              "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
            );
          } catch (ex) {
            error$1 = ex;
          }

          if (error$1 && !(error$1 instanceof Error)) {
            setCurrentlyValidatingElement(element);

            error(
              "%s: type specification of %s" +
                " `%s` is invalid; the type checker " +
                "function must return `null` or an `Error` but returned a %s. " +
                "You may have forgotten to pass an argument to the type checker " +
                "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                "shape all require an argument).",
              componentName || "React class",
              location,
              typeSpecName,
              typeof error$1
            );

            setCurrentlyValidatingElement(null);
          }

          if (
            error$1 instanceof Error &&
            !(error$1.message in loggedTypeFailures)
          ) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error$1.message] = true;
            setCurrentlyValidatingElement(element);

            error("Failed %s type: %s", location, error$1.message);

            setCurrentlyValidatingElement(null);
          }
        }
      }
    }
  }

  function setCurrentlyValidatingElement$1(element) {
    {
      if (element) {
        var owner = element._owner;
        var stack = describeUnknownElementTypeFrameInDEV(
          element.type,
          element._source,
          owner ? owner.type : null
        );
        setExtraStackFrame(stack);
      } else {
        setExtraStackFrame(null);
      }
    }
  }

  var propTypesMisspellWarningShown;

  {
    propTypesMisspellWarningShown = false;
  }

  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current.type);

      if (name) {
        return "\n\nCheck the render method of `" + name + "`.";
      }
    }

    return "";
  }

  function getSourceInfoErrorAddendum(source) {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, "");
      var lineNumber = source.lineNumber;
      return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
    }

    return "";
  }

  function getSourceInfoErrorAddendumForProps(elementProps) {
    if (elementProps !== null && elementProps !== undefined) {
      return getSourceInfoErrorAddendum(elementProps.__source);
    }

    return "";
  }
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */

  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName =
        typeof parentType === "string"
          ? parentType
          : parentType.displayName || parentType.name;

      if (parentName) {
        info =
          "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */

  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = "";

    if (
      element &&
      element._owner &&
      element._owner !== ReactCurrentOwner.current
    ) {
      // Give the component that originally created this child.
      childOwner =
        " It was passed a child from " +
        getComponentName(element._owner.type) +
        ".";
    }

    {
      setCurrentlyValidatingElement$1(element);

      error(
        'Each child in a list should have a unique "key" prop.' +
          "%s%s See https://reactjs.org/link/warning-keys for more information.",
        currentComponentErrorInfo,
        childOwner
      );

      setCurrentlyValidatingElement$1(null);
    }
  }
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */

  function validateChildKeys(node, parentType) {
    if (typeof node !== "object") {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === "function") {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */

  function validatePropTypes(element) {
    {
      var type = element.type;

      if (type === null || type === undefined || typeof type === "string") {
        return;
      }

      var propTypes;

      if (typeof type === "function") {
        propTypes = type.propTypes;
      } else if (
        typeof type === "object" &&
        (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)
      ) {
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        // Intentionally inside to avoid triggering lazy initializers:
        var name = getComponentName(type);
        checkPropTypes(propTypes, element.props, "prop", name, element);
      } else if (
        type.PropTypes !== undefined &&
        !propTypesMisspellWarningShown
      ) {
        propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

        var _name = getComponentName(type);

        error(
          "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
          _name || "Unknown"
        );
      }

      if (
        typeof type.getDefaultProps === "function" &&
        !type.getDefaultProps.isReactClassApproved
      ) {
        error(
          "getDefaultProps is only used on classic React.createClass " +
            "definitions. Use a static property named `defaultProps` instead."
        );
      }
    }
  }
  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */

  function validateFragmentProps(fragment) {
    {
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "children" && key !== "key") {
          setCurrentlyValidatingElement$1(fragment);

          error(
            "Invalid prop `%s` supplied to `React.Fragment`. " +
              "React.Fragment can only have `key` and `children` props.",
            key
          );

          setCurrentlyValidatingElement$1(null);
          break;
        }
      }

      if (fragment.ref !== null) {
        setCurrentlyValidatingElement$1(fragment);

        error("Invalid attribute `ref` supplied to `React.Fragment`.");

        setCurrentlyValidatingElement$1(null);
      }
    }
  }
  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = "";

      if (
        type === undefined ||
        (typeof type === "object" &&
          type !== null &&
          Object.keys(type).length === 0)
      ) {
        info +=
          " You likely forgot to export your component from the file " +
          "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendumForProps(props);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = "null";
      } else if (Array.isArray(type)) {
        typeString = "array";
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
        info =
          " Did you accidentally export a JSX literal instead of a component?";
      } else {
        typeString = typeof type;
      }

      {
        error(
          "React.createElement: type is invalid -- expected a string (for " +
            "built-in components) or a class/function (for composite " +
            "components) but got: %s.%s",
          typeString,
          info
        );
      }
    }

    var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)

    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    if (type === exports.Fragment) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
  var didWarnAboutDeprecatedCreateFactory = false;
  function createFactoryWithValidation(type) {
    var validatedFactory = createElementWithValidation.bind(null, type);
    validatedFactory.type = type;

    {
      if (!didWarnAboutDeprecatedCreateFactory) {
        didWarnAboutDeprecatedCreateFactory = true;

        warn(
          "React.createFactory() is deprecated and will be removed in " +
            "a future major release. Consider using JSX " +
            "or use React.createElement() directly instead."
        );
      } // Legacy hook: remove it

      Object.defineProperty(validatedFactory, "type", {
        enumerable: false,
        get: function () {
          warn(
            "Factory.type is deprecated. Access the class directly " +
              "before passing it to createFactory."
          );

          Object.defineProperty(this, "type", {
            value: type,
          });
          return type;
        },
      });
    }

    return validatedFactory;
  }
  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement.apply(this, arguments);

    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }

    validatePropTypes(newElement);
    return newElement;
  }

  var enableSchedulerDebugging = false;
  var enableProfiling = false;

  var requestHostCallback;
  var requestHostTimeout;
  var cancelHostTimeout;
  var shouldYieldToHost;
  var requestPaint;
  var getCurrentTime;
  var forceFrameRate;
  var hasPerformanceNow =
    typeof performance === "object" && typeof performance.now === "function";

  if (hasPerformanceNow) {
    var localPerformance = performance;

    getCurrentTime = function () {
      return localPerformance.now();
    };
  } else {
    var localDate = Date;
    var initialTime = localDate.now();

    getCurrentTime = function () {
      return localDate.now() - initialTime;
    };
  }

  if (
    // If Scheduler runs in a non-DOM environment, it falls back to a naive
    // implementation using setTimeout.
    typeof window === "undefined" || // Check if MessageChannel is supported, too.
    typeof MessageChannel !== "function"
  ) {
    // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
    // fallback to a naive implementation.
    var _callback = null;
    var _timeoutID = null;

    var _flushCallback = function () {
      if (_callback !== null) {
        try {
          var currentTime = getCurrentTime();
          var hasRemainingTime = true;

          _callback(hasRemainingTime, currentTime);

          _callback = null;
        } catch (e) {
          setTimeout(_flushCallback, 0);
          throw e;
        }
      }
    };

    requestHostCallback = function (cb) {
      if (_callback !== null) {
        // Protect against re-entrancy.
        setTimeout(requestHostCallback, 0, cb);
      } else {
        _callback = cb;
        setTimeout(_flushCallback, 0);
      }
    };

    requestHostTimeout = function (cb, ms) {
      _timeoutID = setTimeout(cb, ms);
    };

    cancelHostTimeout = function () {
      clearTimeout(_timeoutID);
    };

    shouldYieldToHost = function () {
      return false;
    };

    requestPaint = forceFrameRate = function () {};
  } else {
    // Capture local references to native APIs, in case a polyfill overrides them.
    var _setTimeout = window.setTimeout;
    var _clearTimeout = window.clearTimeout;

    if (typeof console !== "undefined") {
      // TODO: Scheduler no longer requires these methods to be polyfilled. But
      // maybe we want to continue warning if they don't exist, to preserve the
      // option to rely on it in the future?
      var requestAnimationFrame = window.requestAnimationFrame;
      var cancelAnimationFrame = window.cancelAnimationFrame;

      if (typeof requestAnimationFrame !== "function") {
        // Using console['error'] to evade Babel and ESLint
        console["error"](
          "This browser doesn't support requestAnimationFrame. " +
            "Make sure that you load a " +
            "polyfill in older browsers. https://reactjs.org/link/react-polyfills"
        );
      }

      if (typeof cancelAnimationFrame !== "function") {
        // Using console['error'] to evade Babel and ESLint
        console["error"](
          "This browser doesn't support cancelAnimationFrame. " +
            "Make sure that you load a " +
            "polyfill in older browsers. https://reactjs.org/link/react-polyfills"
        );
      }
    }

    var isMessageLoopRunning = false;
    var scheduledHostCallback = null;
    var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
    // thread, like user events. By default, it yields multiple times per frame.
    // It does not attempt to align with frame boundaries, since most tasks don't
    // need to be frame aligned; for those that do, use requestAnimationFrame.

    var yieldInterval = 5;
    var deadline = 0; // TODO: Make this configurable

    {
      // `isInputPending` is not available. Since we have no way of knowing if
      // there's pending input, always yield at the end of the frame.
      shouldYieldToHost = function () {
        return getCurrentTime() >= deadline;
      }; // Since we yield every frame regardless, `requestPaint` has no effect.

      requestPaint = function () {};
    }

    forceFrameRate = function (fps) {
      if (fps < 0 || fps > 125) {
        // Using console['error'] to evade Babel and ESLint
        console["error"](
          "forceFrameRate takes a positive int between 0 and 125, " +
            "forcing frame rates higher than 125 fps is not supported"
        );
        return;
      }

      if (fps > 0) {
        yieldInterval = Math.floor(1000 / fps);
      } else {
        // reset the framerate
        yieldInterval = 5;
      }
    };

    var performWorkUntilDeadline = function () {
      if (scheduledHostCallback !== null) {
        var currentTime = getCurrentTime(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
        // cycle. This means there's always time remaining at the beginning of
        // the message event.

        deadline = currentTime + yieldInterval;
        var hasTimeRemaining = true;

        try {
          var hasMoreWork = scheduledHostCallback(
            hasTimeRemaining,
            currentTime
          );

          if (!hasMoreWork) {
            isMessageLoopRunning = false;
            scheduledHostCallback = null;
          } else {
            // If there's more work, schedule the next message event at the end
            // of the preceding one.
            port.postMessage(null);
          }
        } catch (error) {
          // If a scheduler task throws, exit the current browser task so the
          // error can be observed.
          port.postMessage(null);
          throw error;
        }
      } else {
        isMessageLoopRunning = false;
      } // Yielding to the browser will give it a chance to paint, so we can
    };

    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;

    requestHostCallback = function (callback) {
      scheduledHostCallback = callback;

      if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
      }
    };

    requestHostTimeout = function (callback, ms) {
      taskTimeoutID = _setTimeout(function () {
        callback(getCurrentTime());
      }, ms);
    };

    cancelHostTimeout = function () {
      _clearTimeout(taskTimeoutID);

      taskTimeoutID = -1;
    };
  }

  function push(heap, node) {
    var index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
  }
  function peek(heap) {
    var first = heap[0];
    return first === undefined ? null : first;
  }
  function pop(heap) {
    var first = heap[0];

    if (first !== undefined) {
      var last = heap.pop();

      if (last !== first) {
        heap[0] = last;
        siftDown(heap, last, 0);
      }

      return first;
    } else {
      return null;
    }
  }

  function siftUp(heap, node, i) {
    var index = i;

    while (true) {
      var parentIndex = (index - 1) >>> 1;
      var parent = heap[parentIndex];

      if (parent !== undefined && compare(parent, node) > 0) {
        // The parent is larger. Swap positions.
        heap[parentIndex] = node;
        heap[index] = parent;
        index = parentIndex;
      } else {
        // The parent is smaller. Exit.
        return;
      }
    }
  }

  function siftDown(heap, node, i) {
    var index = i;
    var length = heap.length;

    while (index < length) {
      var leftIndex = (index + 1) * 2 - 1;
      var left = heap[leftIndex];
      var rightIndex = leftIndex + 1;
      var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

      if (left !== undefined && compare(left, node) < 0) {
        if (right !== undefined && compare(right, left) < 0) {
          heap[index] = right;
          heap[rightIndex] = node;
          index = rightIndex;
        } else {
          heap[index] = left;
          heap[leftIndex] = node;
          index = leftIndex;
        }
      } else if (right !== undefined && compare(right, node) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        // Neither child is smaller. Exit.
        return;
      }
    }
  }

  function compare(a, b) {
    // Compare sort index first, then task id.
    var diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
  }

  // TODO: Use symbols?
  var ImmediatePriority = 1;
  var UserBlockingPriority = 2;
  var NormalPriority = 3;
  var LowPriority = 4;
  var IdlePriority = 5;

  function markTaskErrored(task, ms) {}

  /* eslint-disable no-var */
  // Math.pow(2, 30) - 1
  // 0b111111111111111111111111111111

  var maxSigned31BitInt = 1073741823; // Times out immediately

  var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

  var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5000;
  var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

  var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap

  var taskQueue = [];
  var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

  var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
  var currentTask = null;
  var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.

  var isPerformingWork = false;
  var isHostCallbackScheduled = false;
  var isHostTimeoutScheduled = false;

  function advanceTimers(currentTime) {
    // Check for tasks that are no longer delayed and add them to the queue.
    var timer = peek(timerQueue);

    while (timer !== null) {
      if (timer.callback === null) {
        // Timer was cancelled.
        pop(timerQueue);
      } else if (timer.startTime <= currentTime) {
        // Timer fired. Transfer to the task queue.
        pop(timerQueue);
        timer.sortIndex = timer.expirationTime;
        push(taskQueue, timer);
      } else {
        // Remaining timers are pending.
        return;
      }

      timer = peek(timerQueue);
    }
  }

  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);

    if (!isHostCallbackScheduled) {
      if (peek(taskQueue) !== null) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      } else {
        var firstTimer = peek(timerQueue);

        if (firstTimer !== null) {
          requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
      }
    }
  }

  function flushWork(hasTimeRemaining, initialTime) {
    isHostCallbackScheduled = false;

    if (isHostTimeoutScheduled) {
      // We scheduled a timeout but it's no longer needed. Cancel it.
      isHostTimeoutScheduled = false;
      cancelHostTimeout();
    }

    isPerformingWork = true;
    var previousPriorityLevel = currentPriorityLevel;

    try {
      if (enableProfiling) {
        try {
          return workLoop(hasTimeRemaining, initialTime);
        } catch (error) {
          if (currentTask !== null) {
            var currentTime = getCurrentTime();
            markTaskErrored(currentTask, currentTime);
            currentTask.isQueued = false;
          }

          throw error;
        }
      } else {
        // No catch in prod code path.
        return workLoop(hasTimeRemaining, initialTime);
      }
    } finally {
      currentTask = null;
      currentPriorityLevel = previousPriorityLevel;
      isPerformingWork = false;
    }
  }

  function workLoop(hasTimeRemaining, initialTime) {
    var currentTime = initialTime;
    advanceTimers(currentTime);
    currentTask = peek(taskQueue);

    while (currentTask !== null && !enableSchedulerDebugging) {
      if (
        currentTask.expirationTime > currentTime &&
        (!hasTimeRemaining || shouldYieldToHost())
      ) {
        // This currentTask hasn't expired, and we've reached the deadline.
        break;
      }

      var callback = currentTask.callback;

      if (typeof callback === "function") {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;

        var continuationCallback = callback(didUserCallbackTimeout);
        currentTime = getCurrentTime();

        if (typeof continuationCallback === "function") {
          currentTask.callback = continuationCallback;
        } else {
          if (currentTask === peek(taskQueue)) {
            pop(taskQueue);
          }
        }

        advanceTimers(currentTime);
      } else {
        pop(taskQueue);
      }

      currentTask = peek(taskQueue);
    } // Return whether there's additional work

    if (currentTask !== null) {
      return true;
    } else {
      var firstTimer = peek(timerQueue);

      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }

      return false;
    }
  }

  function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
      case LowPriority:
      case IdlePriority:
        break;

      default:
        priorityLevel = NormalPriority;
    }

    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_next(eventHandler) {
    var priorityLevel;

    switch (currentPriorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
        // Shift down to normal priority
        priorityLevel = NormalPriority;
        break;

      default:
        // Anything lower than normal priority should remain at the current level.
        priorityLevel = currentPriorityLevel;
        break;
    }

    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_wrapCallback(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function () {
      // This is a fork of runWithPriority, inlined for performance.
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;

      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  }

  function unstable_scheduleCallback(priorityLevel, callback, options) {
    var currentTime = getCurrentTime();
    var startTime;

    if (typeof options === "object" && options !== null) {
      var delay = options.delay;

      if (typeof delay === "number" && delay > 0) {
        startTime = currentTime + delay;
      } else {
        startTime = currentTime;
      }
    } else {
      startTime = currentTime;
    }

    var timeout;

    switch (priorityLevel) {
      case ImmediatePriority:
        timeout = IMMEDIATE_PRIORITY_TIMEOUT;
        break;

      case UserBlockingPriority:
        timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
        break;

      case IdlePriority:
        timeout = IDLE_PRIORITY_TIMEOUT;
        break;

      case LowPriority:
        timeout = LOW_PRIORITY_TIMEOUT;
        break;

      case NormalPriority:
      default:
        timeout = NORMAL_PRIORITY_TIMEOUT;
        break;
    }

    var expirationTime = startTime + timeout;
    var newTask = {
      id: taskIdCounter++,
      callback: callback,
      priorityLevel: priorityLevel,
      startTime: startTime,
      expirationTime: expirationTime,
      sortIndex: -1,
    };

    if (startTime > currentTime) {
      // This is a delayed task.
      newTask.sortIndex = startTime;
      push(timerQueue, newTask);

      if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
        // All tasks are delayed, and this is the task with the earliest delay.
        if (isHostTimeoutScheduled) {
          // Cancel an existing timeout.
          cancelHostTimeout();
        } else {
          isHostTimeoutScheduled = true;
        } // Schedule a timeout.

        requestHostTimeout(handleTimeout, startTime - currentTime);
      }
    } else {
      newTask.sortIndex = expirationTime;
      push(taskQueue, newTask);
      // wait until the next time we yield.

      if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      }
    }

    return newTask;
  }

  function unstable_pauseExecution() {}

  function unstable_continueExecution() {
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  function unstable_getFirstCallbackNode() {
    return peek(taskQueue);
  }

  function unstable_cancelCallback(task) {
    // remove from the queue because you can't remove arbitrary nodes from an
    // array based heap, only the first one.)

    task.callback = null;
  }

  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel;
  }

  var unstable_requestPaint = requestPaint;
  var unstable_Profiling = null;

  var Scheduler = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    unstable_ImmediatePriority: ImmediatePriority,
    unstable_UserBlockingPriority: UserBlockingPriority,
    unstable_NormalPriority: NormalPriority,
    unstable_IdlePriority: IdlePriority,
    unstable_LowPriority: LowPriority,
    unstable_runWithPriority: unstable_runWithPriority,
    unstable_next: unstable_next,
    unstable_scheduleCallback: unstable_scheduleCallback,
    unstable_cancelCallback: unstable_cancelCallback,
    unstable_wrapCallback: unstable_wrapCallback,
    unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
    get unstable_shouldYield() {
      return shouldYieldToHost;
    },
    unstable_requestPaint: unstable_requestPaint,
    unstable_continueExecution: unstable_continueExecution,
    unstable_pauseExecution: unstable_pauseExecution,
    unstable_getFirstCallbackNode: unstable_getFirstCallbackNode,
    get unstable_now() {
      return getCurrentTime;
    },
    get unstable_forceFrameRate() {
      return forceFrameRate;
    },
    unstable_Profiling: unstable_Profiling,
  });

  var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.

  var interactionIDCounter = 0;
  var threadIDCounter = 0; // Set of currently traced interactions.
  // Interactions "stack"–
  // Meaning that newly traced interactions are appended to the previously active set.
  // When an interaction goes out of scope, the previous set (if any) is restored.

  var interactionsRef = null; // Listener(s) to notify when interactions begin and end.

  var subscriberRef = null;

  {
    interactionsRef = {
      current: new Set(),
    };
    subscriberRef = {
      current: null,
    };
  }
  function unstable_clear(callback) {
    var prevInteractions = interactionsRef.current;
    interactionsRef.current = new Set();

    try {
      return callback();
    } finally {
      interactionsRef.current = prevInteractions;
    }
  }
  function unstable_getCurrent() {
    {
      return interactionsRef.current;
    }
  }
  function unstable_getThreadID() {
    return ++threadIDCounter;
  }
  function unstable_trace(name, timestamp, callback) {
    var threadID =
      arguments.length > 3 && arguments[3] !== undefined
        ? arguments[3]
        : DEFAULT_THREAD_ID;

    var interaction = {
      __count: 1,
      id: interactionIDCounter++,
      name: name,
      timestamp: timestamp,
    };
    var prevInteractions = interactionsRef.current; // Traced interactions should stack/accumulate.
    // To do that, clone the current interactions.
    // The previous set will be restored upon completion.

    var interactions = new Set(prevInteractions);
    interactions.add(interaction);
    interactionsRef.current = interactions;
    var subscriber = subscriberRef.current;
    var returnValue;

    try {
      if (subscriber !== null) {
        subscriber.onInteractionTraced(interaction);
      }
    } finally {
      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(interactions, threadID);
        }
      } finally {
        try {
          returnValue = callback();
        } finally {
          interactionsRef.current = prevInteractions;

          try {
            if (subscriber !== null) {
              subscriber.onWorkStopped(interactions, threadID);
            }
          } finally {
            interaction.__count--; // If no async work was scheduled for this interaction,
            // Notify subscribers that it's completed.

            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          }
        }
      }
    }

    return returnValue;
  }
  function unstable_wrap(callback) {
    var threadID =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : DEFAULT_THREAD_ID;

    var wrappedInteractions = interactionsRef.current;
    var subscriber = subscriberRef.current;

    if (subscriber !== null) {
      subscriber.onWorkScheduled(wrappedInteractions, threadID);
    } // Update the pending async work count for the current interactions.
    // Update after calling subscribers in case of error.

    wrappedInteractions.forEach(function (interaction) {
      interaction.__count++;
    });
    var hasRun = false;

    function wrapped() {
      var prevInteractions = interactionsRef.current;
      interactionsRef.current = wrappedInteractions;
      subscriber = subscriberRef.current;

      try {
        var returnValue;

        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(wrappedInteractions, threadID);
          }
        } finally {
          try {
            returnValue = callback.apply(undefined, arguments);
          } finally {
            interactionsRef.current = prevInteractions;

            if (subscriber !== null) {
              subscriber.onWorkStopped(wrappedInteractions, threadID);
            }
          }
        }

        return returnValue;
      } finally {
        if (!hasRun) {
          // We only expect a wrapped function to be executed once,
          // But in the event that it's executed more than once–
          // Only decrement the outstanding interaction counts once.
          hasRun = true; // Update pending async counts for all wrapped interactions.
          // If this was the last scheduled async work for any of them,
          // Mark them as completed.

          wrappedInteractions.forEach(function (interaction) {
            interaction.__count--;

            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      }
    }

    wrapped.cancel = function cancel() {
      subscriber = subscriberRef.current;

      try {
        if (subscriber !== null) {
          subscriber.onWorkCanceled(wrappedInteractions, threadID);
        }
      } finally {
        // Update pending async counts for all wrapped interactions.
        // If this was the last scheduled async work for any of them,
        // Mark them as completed.
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;

          if (subscriber && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    };

    return wrapped;
  }

  var subscribers = null;

  {
    subscribers = new Set();
  }

  function unstable_subscribe(subscriber) {
    {
      subscribers.add(subscriber);

      if (subscribers.size === 1) {
        subscriberRef.current = {
          onInteractionScheduledWorkCompleted:
            onInteractionScheduledWorkCompleted,
          onInteractionTraced: onInteractionTraced,
          onWorkCanceled: onWorkCanceled,
          onWorkScheduled: onWorkScheduled,
          onWorkStarted: onWorkStarted,
          onWorkStopped: onWorkStopped,
        };
      }
    }
  }
  function unstable_unsubscribe(subscriber) {
    {
      subscribers.delete(subscriber);

      if (subscribers.size === 0) {
        subscriberRef.current = null;
      }
    }
  }

  function onInteractionTraced(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionTraced(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onInteractionScheduledWorkCompleted(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionScheduledWorkCompleted(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkScheduled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkScheduled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStarted(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStarted(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStopped(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStopped(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkCanceled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkCanceled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  var SchedulerTracing = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    get __interactionsRef() {
      return interactionsRef;
    },
    get __subscriberRef() {
      return subscriberRef;
    },
    unstable_clear: unstable_clear,
    unstable_getCurrent: unstable_getCurrent,
    unstable_getThreadID: unstable_getThreadID,
    unstable_trace: unstable_trace,
    unstable_wrap: unstable_wrap,
    unstable_subscribe: unstable_subscribe,
    unstable_unsubscribe: unstable_unsubscribe,
  });

  var ReactSharedInternals$1 = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: IsSomeRendererActing,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: assign,
    // Re-export the schedule API(s) for UMD bundles.
    // This avoids introducing a dependency on a new UMD global in a minor update,
    // Since that would be a breaking change (e.g. for all existing CodeSandboxes).
    // This re-export is only required for UMD bundles;
    // CJS bundles use the shared NPM package.
    Scheduler: Scheduler,
    SchedulerTracing: SchedulerTracing,
  };

  {
    ReactSharedInternals$1.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
  }

  {
    try {
      var frozenObject = Object.freeze({});
      /* eslint-disable no-new */

      new Map([[frozenObject, null]]);
      new Set([frozenObject]);
      /* eslint-enable no-new */
    } catch (e) {}
  }

  var createElement$1 = createElementWithValidation;
  var cloneElement$1 = cloneElementWithValidation;
  var createFactory = createFactoryWithValidation;
  var Children = {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild,
  };

  exports.Children = Children;
  exports.Component = Component;
  exports.PureComponent = PureComponent;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
    ReactSharedInternals$1;
  exports.cloneElement = cloneElement$1;
  exports.createContext = createContext;
  exports.createElement = createElement$1;
  exports.createFactory = createFactory;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.version = ReactVersion;
});
/** @license React v17.0.2
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("react"))
    : typeof define === "function" && define.amd
    ? define(["exports", "react"], factory)
    : ((global = global || self),
      factory((global.ReactDOM = {}), global.React));
})(this, function (exports, React) {
  "use strict";

  var ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  // by calls to these methods by a Babel plugin.
  //
  // In PROD (or in packages without access to React internals),
  // they are left as they are instead.

  function warn(format) {
    {
      for (
        var _len = arguments.length,
          args = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }

      printWarning("warn", format, args);
    }
  }
  function error(format) {
    {
      for (
        var _len2 = arguments.length,
          args = new Array(_len2 > 1 ? _len2 - 1 : 0),
          _key2 = 1;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning("error", format, args);
    }
  }

  function printWarning(level, format, args) {
    // When changing this logic, you might want to also
    // update consoleWithStackDev.www.js as well.
    {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== "") {
        format += "%s";
        args = args.concat([stack]);
      }

      var argsWithFormat = args.map(function (item) {
        return "" + item;
      }); // Careful: RN currently depends on this prefix

      argsWithFormat.unshift("Warning: " + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      // eslint-disable-next-line react-internal/no-production-logging

      Function.prototype.apply.call(console[level], console, argsWithFormat);
    }
  }

  if (!React) {
    {
      throw Error(
        "ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM."
      );
    }
  }

  var FunctionComponent = 0;
  var ClassComponent = 1;
  var IndeterminateComponent = 2; // Before we know whether it is function or class

  var HostRoot = 3; // Root of a host tree. Could be nested inside another node.

  var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.

  var HostComponent = 5;
  var HostText = 6;
  var Fragment = 7;
  var Mode = 8;
  var ContextConsumer = 9;
  var ContextProvider = 10;
  var ForwardRef = 11;
  var Profiler = 12;
  var SuspenseComponent = 13;
  var MemoComponent = 14;
  var SimpleMemoComponent = 15;
  var LazyComponent = 16;
  var IncompleteClassComponent = 17;
  var DehydratedFragment = 18;
  var SuspenseListComponent = 19;
  var FundamentalComponent = 20;
  var ScopeComponent = 21;
  var Block = 22;
  var OffscreenComponent = 23;
  var LegacyHiddenComponent = 24;

  // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

  var enableProfilerTimer = true; // Record durations for commit and passive effects phases.

  var enableFundamentalAPI = false; // Experimental Scope support.
  var enableNewReconciler = false; // Errors that are thrown while unmounting (or after in the case of passive effects)
  var warnAboutStringRefs = false;

  var allNativeEvents = new Set();
  /**
   * Mapping from registration name to event name
   */

  var registrationNameDependencies = {};
  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in true.
   * @type {Object}
   */

  var possibleRegistrationNames = {}; // Trust the developer to only use possibleRegistrationNames in true

  function registerTwoPhaseEvent(registrationName, dependencies) {
    registerDirectEvent(registrationName, dependencies);
    registerDirectEvent(registrationName + "Capture", dependencies);
  }
  function registerDirectEvent(registrationName, dependencies) {
    {
      if (registrationNameDependencies[registrationName]) {
        error(
          "EventRegistry: More than one plugin attempted to publish the same " +
            "registration name, `%s`.",
          registrationName
        );
      }
    }

    registrationNameDependencies[registrationName] = dependencies;

    {
      var lowerCasedName = registrationName.toLowerCase();
      possibleRegistrationNames[lowerCasedName] = registrationName;

      if (registrationName === "onDoubleClick") {
        possibleRegistrationNames.ondblclick = registrationName;
      }
    }

    for (var i = 0; i < dependencies.length; i++) {
      allNativeEvents.add(dependencies[i]);
    }
  }

  var canUseDOM = !!(
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );

  // A reserved attribute.
  // It is handled by React separately and shouldn't be written to the DOM.
  var RESERVED = 0; // A simple string attribute.
  // Attributes that aren't in the filter are presumed to have this type.

  var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
  // "enumerated" attributes with "true" and "false" as possible values.
  // When true, it should be set to a "true" string.
  // When false, it should be set to a "false" string.

  var BOOLEANISH_STRING = 2; // A real boolean attribute.
  // When true, it should be present (set either to an empty string or its name).
  // When false, it should be omitted.

  var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
  // When true, it should be present (set either to an empty string or its name).
  // When false, it should be omitted.
  // For any other value, should be present with that value.

  var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
  // When falsy, it should be removed.

  var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
  // When falsy, it should be removed.

  var POSITIVE_NUMERIC = 6;

  /* eslint-disable max-len */
  var ATTRIBUTE_NAME_START_CHAR =
    ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  /* eslint-enable max-len */

  var ATTRIBUTE_NAME_CHAR =
    ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  var ROOT_ATTRIBUTE_NAME = "data-reactroot";
  var VALID_ATTRIBUTE_NAME_REGEX = new RegExp(
    "^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"
  );
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var illegalAttributeNameCache = {};
  var validatedAttributeNameCache = {};
  function isAttributeNameSafe(attributeName) {
    if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
      return true;
    }

    if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
      return false;
    }

    if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
      validatedAttributeNameCache[attributeName] = true;
      return true;
    }

    illegalAttributeNameCache[attributeName] = true;

    {
      error("Invalid attribute name: `%s`", attributeName);
    }

    return false;
  }
  function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
    if (propertyInfo !== null) {
      return propertyInfo.type === RESERVED;
    }

    if (isCustomComponentTag) {
      return false;
    }

    if (
      name.length > 2 &&
      (name[0] === "o" || name[0] === "O") &&
      (name[1] === "n" || name[1] === "N")
    ) {
      return true;
    }

    return false;
  }
  function shouldRemoveAttributeWithWarning(
    name,
    value,
    propertyInfo,
    isCustomComponentTag
  ) {
    if (propertyInfo !== null && propertyInfo.type === RESERVED) {
      return false;
    }

    switch (typeof value) {
      case "function": // $FlowIssue symbol is perfectly valid here

      case "symbol":
        // eslint-disable-line
        return true;

      case "boolean": {
        if (isCustomComponentTag) {
          return false;
        }

        if (propertyInfo !== null) {
          return !propertyInfo.acceptsBooleans;
        } else {
          var prefix = name.toLowerCase().slice(0, 5);
          return prefix !== "data-" && prefix !== "aria-";
        }
      }

      default:
        return false;
    }
  }
  function shouldRemoveAttribute(
    name,
    value,
    propertyInfo,
    isCustomComponentTag
  ) {
    if (value === null || typeof value === "undefined") {
      return true;
    }

    if (
      shouldRemoveAttributeWithWarning(
        name,
        value,
        propertyInfo,
        isCustomComponentTag
      )
    ) {
      return true;
    }

    if (isCustomComponentTag) {
      return false;
    }

    if (propertyInfo !== null) {
      switch (propertyInfo.type) {
        case BOOLEAN:
          return !value;

        case OVERLOADED_BOOLEAN:
          return value === false;

        case NUMERIC:
          return isNaN(value);

        case POSITIVE_NUMERIC:
          return isNaN(value) || value < 1;
      }
    }

    return false;
  }
  function getPropertyInfo(name) {
    return properties.hasOwnProperty(name) ? properties[name] : null;
  }

  function PropertyInfoRecord(
    name,
    type,
    mustUseProperty,
    attributeName,
    attributeNamespace,
    sanitizeURL,
    removeEmptyString
  ) {
    this.acceptsBooleans =
      type === BOOLEANISH_STRING ||
      type === BOOLEAN ||
      type === OVERLOADED_BOOLEAN;
    this.attributeName = attributeName;
    this.attributeNamespace = attributeNamespace;
    this.mustUseProperty = mustUseProperty;
    this.propertyName = name;
    this.type = type;
    this.sanitizeURL = sanitizeURL;
    this.removeEmptyString = removeEmptyString;
  } // When adding attributes to this list, be sure to also add them to
  // the `possibleStandardNames` module to ensure casing and incorrect
  // name warnings.

  var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

  var reservedProps = [
    "children",
    "dangerouslySetInnerHTML", // TODO: This prevents the assignment of defaultValue to regular
    // elements (not just inputs). Now that ReactDOMInput assigns to the
    // defaultValue property -- do we need this?
    "defaultValue",
    "defaultChecked",
    "innerHTML",
    "suppressContentEditableWarning",
    "suppressHydrationWarning",
    "style",
  ];
  reservedProps.forEach(function (name) {
    properties[name] = new PropertyInfoRecord(
      name,
      RESERVED,
      false, // mustUseProperty
      name, // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // A few React string attributes have a different name.
  // This is a mapping from React prop names to the attribute names.

  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (_ref) {
    var name = _ref[0],
      attributeName = _ref[1];
    properties[name] = new PropertyInfoRecord(
      name,
      STRING,
      false, // mustUseProperty
      attributeName, // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These are "enumerated" HTML attributes that accept "true" and "false".
  // In React, we let users pass `true` and `false` even though technically
  // these aren't boolean attributes (they are coerced to strings).

  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
    name
  ) {
    properties[name] = new PropertyInfoRecord(
      name,
      BOOLEANISH_STRING,
      false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These are "enumerated" SVG attributes that accept "true" and "false".
  // In React, we let users pass `true` and `false` even though technically
  // these aren't boolean attributes (they are coerced to strings).
  // Since these are SVG attributes, their attribute names are case-sensitive.

  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (name) {
    properties[name] = new PropertyInfoRecord(
      name,
      BOOLEANISH_STRING,
      false, // mustUseProperty
      name, // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These are HTML boolean attributes.

  [
    "allowFullScreen",
    "async", // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    "autoFocus",
    "autoPlay",
    "controls",
    "default",
    "defer",
    "disabled",
    "disablePictureInPicture",
    "disableRemotePlayback",
    "formNoValidate",
    "hidden",
    "loop",
    "noModule",
    "noValidate",
    "open",
    "playsInline",
    "readOnly",
    "required",
    "reversed",
    "scoped",
    "seamless", // Microdata
    "itemScope",
  ].forEach(function (name) {
    properties[name] = new PropertyInfoRecord(
      name,
      BOOLEAN,
      false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These are the few React props that we set as DOM properties
  // rather than attributes. These are all booleans.

  [
    "checked", // Note: `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`. We have special logic for handling this.
    "multiple",
    "muted",
    "selected", // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function (name) {
    properties[name] = new PropertyInfoRecord(
      name,
      BOOLEAN,
      true, // mustUseProperty
      name, // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These are HTML attributes that are "overloaded booleans": they behave like
  // booleans, but can also accept a string value.

  [
    "capture",
    "download", // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function (name) {
    properties[name] = new PropertyInfoRecord(
      name,
      OVERLOADED_BOOLEAN,
      false, // mustUseProperty
      name, // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These are HTML attributes that must be positive numbers.

  [
    "cols",
    "rows",
    "size",
    "span", // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function (name) {
    properties[name] = new PropertyInfoRecord(
      name,
      POSITIVE_NUMERIC,
      false, // mustUseProperty
      name, // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These are HTML attributes that must be numbers.

  ["rowSpan", "start"].forEach(function (name) {
    properties[name] = new PropertyInfoRecord(
      name,
      NUMERIC,
      false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  });
  var CAMELIZE = /[\-\:]([a-z])/g;

  var capitalize = function (token) {
    return token[1].toUpperCase();
  }; // This is a list of all SVG attributes that need special casing, namespacing,
  // or boolean value assignment. Regular attributes that just accept strings
  // and have the same names are omitted, just like in the HTML attribute filter.
  // Some of these attributes can be hard to find. This list was created by
  // scraping the MDN documentation.

  [
    "accent-height",
    "alignment-baseline",
    "arabic-form",
    "baseline-shift",
    "cap-height",
    "clip-path",
    "clip-rule",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "dominant-baseline",
    "enable-background",
    "fill-opacity",
    "fill-rule",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-name",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "horiz-origin-x",
    "image-rendering",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "overline-position",
    "overline-thickness",
    "paint-order",
    "panose-1",
    "pointer-events",
    "rendering-intent",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "strikethrough-position",
    "strikethrough-thickness",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "underline-position",
    "underline-thickness",
    "unicode-bidi",
    "unicode-range",
    "units-per-em",
    "v-alphabetic",
    "v-hanging",
    "v-ideographic",
    "v-mathematical",
    "vector-effect",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "word-spacing",
    "writing-mode",
    "xmlns:xlink",
    "x-height", // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function (attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      STRING,
      false, // mustUseProperty
      attributeName,
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // String SVG attributes with the xlink namespace.

  [
    "xlink:actuate",
    "xlink:arcrole",
    "xlink:role",
    "xlink:show",
    "xlink:title",
    "xlink:type", // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function (attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      STRING,
      false, // mustUseProperty
      attributeName,
      "http://www.w3.org/1999/xlink",
      false, // sanitizeURL
      false
    );
  }); // String SVG attributes with the xml namespace.

  [
    "xml:base",
    "xml:lang",
    "xml:space", // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function (attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      STRING,
      false, // mustUseProperty
      attributeName,
      "http://www.w3.org/XML/1998/namespace",
      false, // sanitizeURL
      false
    );
  }); // These attribute exists both in HTML and SVG.
  // The attribute name is case-sensitive in SVG so we can't just use
  // the React name like we do for attributes that exist only in HTML.

  ["tabIndex", "crossOrigin"].forEach(function (attributeName) {
    properties[attributeName] = new PropertyInfoRecord(
      attributeName,
      STRING,
      false, // mustUseProperty
      attributeName.toLowerCase(), // attributeName
      null, // attributeNamespace
      false, // sanitizeURL
      false
    );
  }); // These attributes accept URLs. These must not allow javascript: URLS.
  // These will also need to accept Trusted Types object in the future.

  var xlinkHref = "xlinkHref";
  properties[xlinkHref] = new PropertyInfoRecord(
    "xlinkHref",
    STRING,
    false, // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    true, // sanitizeURL
    false
  );
  ["src", "href", "action", "formAction"].forEach(function (attributeName) {
    properties[attributeName] = new PropertyInfoRecord(
      attributeName,
      STRING,
      false, // mustUseProperty
      attributeName.toLowerCase(), // attributeName
      null, // attributeNamespace
      true, // sanitizeURL
      true
    );
  });

  // and any newline or tab are filtered out as if they're not part of the URL.
  // https://url.spec.whatwg.org/#url-parsing
  // Tab or newline are defined as \r\n\t:
  // https://infra.spec.whatwg.org/#ascii-tab-or-newline
  // A C0 control is a code point in the range \u0000 NULL to \u001F
  // INFORMATION SEPARATOR ONE, inclusive:
  // https://infra.spec.whatwg.org/#c0-control-or-space

  /* eslint-disable max-len */

  var isJavaScriptProtocol =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
  var didWarn = false;

  function sanitizeURL(url) {
    {
      if (!didWarn && isJavaScriptProtocol.test(url)) {
        didWarn = true;

        error(
          "A future version of React will block javascript: URLs as a security precaution. " +
            "Use event handlers instead if you can. If you need to generate unsafe HTML try " +
            "using dangerouslySetInnerHTML instead. React was passed %s.",
          JSON.stringify(url)
        );
      }
    }
  }

  /**
   * Get the value for a property on a node. Only used in DEV for SSR validation.
   * The "expected" argument is used as a hint of what the expected value is.
   * Some properties have multiple equivalent values.
   */
  function getValueForProperty(node, name, expected, propertyInfo) {
    {
      if (propertyInfo.mustUseProperty) {
        var propertyName = propertyInfo.propertyName;
        return node[propertyName];
      } else {
        if (propertyInfo.sanitizeURL) {
          // If we haven't fully disabled javascript: URLs, and if
          // the hydration is successful of a javascript: URL, we
          // still want to warn on the client.
          sanitizeURL("" + expected);
        }

        var attributeName = propertyInfo.attributeName;
        var stringValue = null;

        if (propertyInfo.type === OVERLOADED_BOOLEAN) {
          if (node.hasAttribute(attributeName)) {
            var value = node.getAttribute(attributeName);

            if (value === "") {
              return true;
            }

            if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
              return value;
            }

            if (value === "" + expected) {
              return expected;
            }

            return value;
          }
        } else if (node.hasAttribute(attributeName)) {
          if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
            // We had an attribute but shouldn't have had one, so read it
            // for the error message.
            return node.getAttribute(attributeName);
          }

          if (propertyInfo.type === BOOLEAN) {
            // If this was a boolean, it doesn't matter what the value is
            // the fact that we have it is the same as the expected.
            return expected;
          } // Even if this property uses a namespace we use getAttribute
          // because we assume its namespaced name is the same as our config.
          // To use getAttributeNS we need the local name which we don't have
          // in our config atm.

          stringValue = node.getAttribute(attributeName);
        }

        if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
          return stringValue === null ? expected : stringValue;
        } else if (stringValue === "" + expected) {
          return expected;
        } else {
          return stringValue;
        }
      }
    }
  }
  /**
   * Get the value for a attribute on a node. Only used in DEV for SSR validation.
   * The third argument is used as a hint of what the expected value is. Some
   * attributes have multiple equivalent values.
   */

  function getValueForAttribute(node, name, expected) {
    {
      if (!isAttributeNameSafe(name)) {
        return;
      } // If the object is an opaque reference ID, it's expected that
      // the next prop is different than the server value, so just return
      // expected

      if (isOpaqueHydratingObject(expected)) {
        return expected;
      }

      if (!node.hasAttribute(name)) {
        return expected === undefined ? undefined : null;
      }

      var value = node.getAttribute(name);

      if (value === "" + expected) {
        return expected;
      }

      return value;
    }
  }
  /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */

  function setValueForProperty(node, name, value, isCustomComponentTag) {
    var propertyInfo = getPropertyInfo(name);

    if (shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) {
      return;
    }

    if (
      shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag)
    ) {
      value = null;
    } // If the prop isn't in the special list, treat it as a simple attribute.

    if (isCustomComponentTag || propertyInfo === null) {
      if (isAttributeNameSafe(name)) {
        var _attributeName = name;

        if (value === null) {
          node.removeAttribute(_attributeName);
        } else {
          node.setAttribute(_attributeName, "" + value);
        }
      }

      return;
    }

    var mustUseProperty = propertyInfo.mustUseProperty;

    if (mustUseProperty) {
      var propertyName = propertyInfo.propertyName;

      if (value === null) {
        var type = propertyInfo.type;
        node[propertyName] = type === BOOLEAN ? false : "";
      } else {
        // Contrary to `setAttribute`, object properties are properly
        // `toString`ed by IE8/9.
        node[propertyName] = value;
      }

      return;
    } // The rest are treated as attributes with special cases.

    var attributeName = propertyInfo.attributeName,
      attributeNamespace = propertyInfo.attributeNamespace;

    if (value === null) {
      node.removeAttribute(attributeName);
    } else {
      var _type = propertyInfo.type;
      var attributeValue;

      if (
        _type === BOOLEAN ||
        (_type === OVERLOADED_BOOLEAN && value === true)
      ) {
        // If attribute type is boolean, we know for sure it won't be an execution sink
        // and we won't require Trusted Type here.
        attributeValue = "";
      } else {
        // `setAttribute` with objects becomes only `[object]` in IE8/9,
        // ('' + value) makes it output the correct toString()-value.
        {
          attributeValue = "" + value;
        }

        if (propertyInfo.sanitizeURL) {
          sanitizeURL(attributeValue.toString());
        }
      }

      if (attributeNamespace) {
        node.setAttributeNS(attributeNamespace, attributeName, attributeValue);
      } else {
        node.setAttribute(attributeName, attributeValue);
      }
    }
  }

  var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var _assign = ReactInternals.assign;

  // ATTENTION
  // When adding new symbols to this file,
  // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  var REACT_FRAGMENT_TYPE = 0xeacb;
  var REACT_STRICT_MODE_TYPE = 0xeacc;
  var REACT_PROFILER_TYPE = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  var REACT_SUSPENSE_TYPE = 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_SCOPE_TYPE = 0xead7;
  var REACT_OPAQUE_ID_TYPE = 0xeae0;
  var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
  var REACT_OFFSCREEN_TYPE = 0xeae2;
  var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

  if (typeof Symbol === "function" && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor("react.element");
    REACT_PORTAL_TYPE = symbolFor("react.portal");
    REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
    REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
    REACT_PROFILER_TYPE = symbolFor("react.profiler");
    REACT_PROVIDER_TYPE = symbolFor("react.provider");
    REACT_CONTEXT_TYPE = symbolFor("react.context");
    REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
    REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
    REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
    REACT_MEMO_TYPE = symbolFor("react.memo");
    REACT_LAZY_TYPE = symbolFor("react.lazy");
    REACT_BLOCK_TYPE = symbolFor("react.block");
    REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
    REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
    REACT_SCOPE_TYPE = symbolFor("react.scope");
    REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
    REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
    REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
    REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
  }

  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = "@@iterator";
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== "object") {
      return null;
    }

    var maybeIterator =
      (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
      maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === "function") {
      return maybeIterator;
    }

    return null;
  }

  // Helpers to patch console.logs to avoid logging during side-effect free
  // replaying on render function. This currently only patches the object
  // lazily which won't cover if the log function was extracted eagerly.
  // We could also eagerly patch the method.
  var disabledDepth = 0;
  var prevLog;
  var prevInfo;
  var prevWarn;
  var prevError;
  var prevGroup;
  var prevGroupCollapsed;
  var prevGroupEnd;

  function disabledLog() {}

  disabledLog.__reactDisabledLog = true;
  function disableLogs() {
    {
      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        prevLog = console.log;
        prevInfo = console.info;
        prevWarn = console.warn;
        prevError = console.error;
        prevGroup = console.group;
        prevGroupCollapsed = console.groupCollapsed;
        prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

        var props = {
          configurable: true,
          enumerable: true,
          value: disabledLog,
          writable: true,
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          info: props,
          log: props,
          warn: props,
          error: props,
          group: props,
          groupCollapsed: props,
          groupEnd: props,
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      disabledDepth++;
    }
  }
  function reenableLogs() {
    {
      disabledDepth--;

      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        var props = {
          configurable: true,
          enumerable: true,
          writable: true,
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          log: _assign({}, props, {
            value: prevLog,
          }),
          info: _assign({}, props, {
            value: prevInfo,
          }),
          warn: _assign({}, props, {
            value: prevWarn,
          }),
          error: _assign({}, props, {
            value: prevError,
          }),
          group: _assign({}, props, {
            value: prevGroup,
          }),
          groupCollapsed: _assign({}, props, {
            value: prevGroupCollapsed,
          }),
          groupEnd: _assign({}, props, {
            value: prevGroupEnd,
          }),
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      if (disabledDepth < 0) {
        error(
          "disabledDepth fell below zero. " +
            "This is a bug in React. Please file an issue."
        );
      }
    }
  }

  var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  var prefix;
  function describeBuiltInComponentFrame(name, source, ownerFn) {
    {
      if (prefix === undefined) {
        // Extract the VM specific prefix used by each line.
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = (match && match[1]) || "";
        }
      } // We use the prefix to ensure our stacks line up with native stack frames.

      return "\n" + prefix + name;
    }
  }
  var reentry = false;
  var componentFrameCache;

  {
    var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
    componentFrameCache = new PossiblyWeakMap();
  }

  function describeNativeComponentFrame(fn, construct) {
    // If something asked for a stack inside a fake render, it should get ignored.
    if (!fn || reentry) {
      return "";
    }

    {
      var frame = componentFrameCache.get(fn);

      if (frame !== undefined) {
        return frame;
      }
    }

    var control;
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

    Error.prepareStackTrace = undefined;
    var previousDispatcher;

    {
      previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
      // for warnings.

      ReactCurrentDispatcher.current = null;
      disableLogs();
    }

    try {
      // This should throw.
      if (construct) {
        // Something should be setting the props in the constructor.
        var Fake = function () {
          throw Error();
        }; // $FlowFixMe

        Object.defineProperty(Fake.prototype, "props", {
          set: function () {
            // We use a throwing setter instead of frozen or non-writable props
            // because that won't throw in a non-strict mode function.
            throw Error();
          },
        });

        if (typeof Reflect === "object" && Reflect.construct) {
          // We construct a different control for this case to include any extra
          // frames added by the construct call.
          try {
            Reflect.construct(Fake, []);
          } catch (x) {
            control = x;
          }

          Reflect.construct(fn, [], Fake);
        } else {
          try {
            Fake.call();
          } catch (x) {
            control = x;
          }

          fn.call(Fake.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (x) {
          control = x;
        }

        fn();
      }
    } catch (sample) {
      // This is inlined manually because closure doesn't do it for us.
      if (sample && control && typeof sample.stack === "string") {
        // This extracts the first frame from the sample that isn't also in the control.
        // Skipping one frame that we assume is the frame that calls the two.
        var sampleLines = sample.stack.split("\n");
        var controlLines = control.stack.split("\n");
        var s = sampleLines.length - 1;
        var c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }

        for (; s >= 1 && c >= 0; s--, c--) {
          // Next we find the first one that isn't the same which should be the
          // frame that called our sample function and the control.
          if (sampleLines[s] !== controlLines[c]) {
            // In V8, the first line is describing the message but other VMs don't.
            // If we're about to return the first line, and the control is also on the same
            // line, that's a pretty good indicator that our sample threw at same line as
            // the control. I.e. before we entered the sample frame. So we ignore this result.
            // This can happen if you passed a class to function component, or non-function.
            if (s !== 1 || c !== 1) {
              do {
                s--;
                c--; // We may still have similar intermediate frames from the construct call.
                // The next one that isn't the same should be our match though.

                if (c < 0 || sampleLines[s] !== controlLines[c]) {
                  // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                  var _frame =
                    "\n" + sampleLines[s].replace(" at new ", " at ");

                  {
                    if (typeof fn === "function") {
                      componentFrameCache.set(fn, _frame);
                    }
                  } // Return the line we found.

                  return _frame;
                }
              } while (s >= 1 && c >= 0);
            }

            break;
          }
        }
      }
    } finally {
      reentry = false;

      {
        ReactCurrentDispatcher.current = previousDispatcher;
        reenableLogs();
      }

      Error.prepareStackTrace = previousPrepareStackTrace;
    } // Fallback to just using the name if we couldn't make it throw.

    var name = fn ? fn.displayName || fn.name : "";
    var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";

    {
      if (typeof fn === "function") {
        componentFrameCache.set(fn, syntheticFrame);
      }
    }

    return syntheticFrame;
  }

  function describeClassComponentFrame(ctor, source, ownerFn) {
    {
      return describeNativeComponentFrame(ctor, true);
    }
  }
  function describeFunctionComponentFrame(fn, source, ownerFn) {
    {
      return describeNativeComponentFrame(fn, false);
    }
  }

  function shouldConstruct(Component) {
    var prototype = Component.prototype;
    return !!(prototype && prototype.isReactComponent);
  }

  function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
    if (type == null) {
      return "";
    }

    if (typeof type === "function") {
      {
        return describeNativeComponentFrame(type, shouldConstruct(type));
      }
    }

    if (typeof type === "string") {
      return describeBuiltInComponentFrame(type);
    }

    switch (type) {
      case REACT_SUSPENSE_TYPE:
        return describeBuiltInComponentFrame("Suspense");

      case REACT_SUSPENSE_LIST_TYPE:
        return describeBuiltInComponentFrame("SuspenseList");
    }

    if (typeof type === "object") {
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          return describeFunctionComponentFrame(type.render);

        case REACT_MEMO_TYPE:
          // Memo may contain any component type so we recursively resolve it.
          return describeUnknownElementTypeFrameInDEV(
            type.type,
            source,
            ownerFn
          );

        case REACT_BLOCK_TYPE:
          return describeFunctionComponentFrame(type._render);

        case REACT_LAZY_TYPE: {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(
              init(payload),
              source,
              ownerFn
            );
          } catch (x) {}
        }
      }
    }

    return "";
  }

  function describeFiber(fiber) {
    var owner = fiber._debugOwner ? fiber._debugOwner.type : null;
    var source = fiber._debugSource;

    switch (fiber.tag) {
      case HostComponent:
        return describeBuiltInComponentFrame(fiber.type);

      case LazyComponent:
        return describeBuiltInComponentFrame("Lazy");

      case SuspenseComponent:
        return describeBuiltInComponentFrame("Suspense");

      case SuspenseListComponent:
        return describeBuiltInComponentFrame("SuspenseList");

      case FunctionComponent:
      case IndeterminateComponent:
      case SimpleMemoComponent:
        return describeFunctionComponentFrame(fiber.type);

      case ForwardRef:
        return describeFunctionComponentFrame(fiber.type.render);

      case Block:
        return describeFunctionComponentFrame(fiber.type._render);

      case ClassComponent:
        return describeClassComponentFrame(fiber.type);

      default:
        return "";
    }
  }

  function getStackByFiberInDevAndProd(workInProgress) {
    try {
      var info = "";
      var node = workInProgress;

      do {
        info += describeFiber(node);
        node = node.return;
      } while (node);

      return info;
    } catch (x) {
      return "\nError generating stack: " + x.message + "\n" + x.stack;
    }
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || "";
    return (
      outerType.displayName ||
      (functionName !== ""
        ? wrapperName + "(" + functionName + ")"
        : wrapperName)
    );
  }

  function getContextName(type) {
    return type.displayName || "Context";
  }

  function getComponentName(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }

    {
      if (typeof type.tag === "number") {
        error(
          "Received an unexpected object in getComponentName(). " +
            "This is likely a bug in React. Please file an issue."
        );
      }
    }

    if (typeof type === "function") {
      return type.displayName || type.name || null;
    }

    if (typeof type === "string") {
      return type;
    }

    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";

      case REACT_PORTAL_TYPE:
        return "Portal";

      case REACT_PROFILER_TYPE:
        return "Profiler";

      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";

      case REACT_SUSPENSE_TYPE:
        return "Suspense";

      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
    }

    if (typeof type === "object") {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          var context = type;
          return getContextName(context) + ".Consumer";

        case REACT_PROVIDER_TYPE:
          var provider = type;
          return getContextName(provider._context) + ".Provider";

        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, "ForwardRef");

        case REACT_MEMO_TYPE:
          return getComponentName(type.type);

        case REACT_BLOCK_TYPE:
          return getComponentName(type._render);

        case REACT_LAZY_TYPE: {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
        }
      }
    }

    return null;
  }

  var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
  var current = null;
  var isRendering = false;
  function getCurrentFiberOwnerNameInDevOrNull() {
    {
      if (current === null) {
        return null;
      }

      var owner = current._debugOwner;

      if (owner !== null && typeof owner !== "undefined") {
        return getComponentName(owner.type);
      }
    }

    return null;
  }

  function getCurrentFiberStackInDev() {
    {
      if (current === null) {
        return "";
      } // Safe because if current fiber exists, we are reconciling,
      // and it is guaranteed to be the work-in-progress version.

      return getStackByFiberInDevAndProd(current);
    }
  }

  function resetCurrentFiber() {
    {
      ReactDebugCurrentFrame.getCurrentStack = null;
      current = null;
      isRendering = false;
    }
  }
  function setCurrentFiber(fiber) {
    {
      ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackInDev;
      current = fiber;
      isRendering = false;
    }
  }
  function setIsRendering(rendering) {
    {
      isRendering = rendering;
    }
  }
  function getIsRendering() {
    {
      return isRendering;
    }
  }

  // Flow does not allow string concatenation of most non-string types. To work
  // around this limitation, we use an opaque type that can only be obtained by
  // passing the value through getToStringValue first.
  function toString(value) {
    return "" + value;
  }
  function getToStringValue(value) {
    switch (typeof value) {
      case "boolean":
      case "number":
      case "object":
      case "string":
      case "undefined":
        return value;

      default:
        // function, symbol are assigned as empty strings
        return "";
    }
  }

  var hasReadOnlyValue = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true,
  };
  function checkControlledValueProps(tagName, props) {
    {
      if (
        !(
          hasReadOnlyValue[props.type] ||
          props.onChange ||
          props.onInput ||
          props.readOnly ||
          props.disabled ||
          props.value == null
        )
      ) {
        error(
          "You provided a `value` prop to a form field without an " +
            "`onChange` handler. This will render a read-only field. If " +
            "the field should be mutable use `defaultValue`. Otherwise, " +
            "set either `onChange` or `readOnly`."
        );
      }

      if (
        !(
          props.onChange ||
          props.readOnly ||
          props.disabled ||
          props.checked == null
        )
      ) {
        error(
          "You provided a `checked` prop to a form field without an " +
            "`onChange` handler. This will render a read-only field. If " +
            "the field should be mutable use `defaultChecked`. Otherwise, " +
            "set either `onChange` or `readOnly`."
        );
      }
    }
  }

  function isCheckable(elem) {
    var type = elem.type;
    var nodeName = elem.nodeName;
    return (
      nodeName &&
      nodeName.toLowerCase() === "input" &&
      (type === "checkbox" || type === "radio")
    );
  }

  function getTracker(node) {
    return node._valueTracker;
  }

  function detachTracker(node) {
    node._valueTracker = null;
  }

  function getValueFromNode(node) {
    var value = "";

    if (!node) {
      return value;
    }

    if (isCheckable(node)) {
      value = node.checked ? "true" : "false";
    } else {
      value = node.value;
    }

    return value;
  }

  function trackValueOnNode(node) {
    var valueField = isCheckable(node) ? "checked" : "value";
    var descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    );
    var currentValue = "" + node[valueField]; // if someone has already defined a value or Safari, then bail
    // and don't track value will cause over reporting of changes,
    // but it's better then a hard failure
    // (needed for certain tests that spyOn input values and Safari)

    if (
      node.hasOwnProperty(valueField) ||
      typeof descriptor === "undefined" ||
      typeof descriptor.get !== "function" ||
      typeof descriptor.set !== "function"
    ) {
      return;
    }

    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: true,
      get: function () {
        return get.call(this);
      },
      set: function (value) {
        currentValue = "" + value;
        set.call(this, value);
      },
    }); // We could've passed this the first time
    // but it triggers a bug in IE11 and Edge 14/15.
    // Calling defineProperty() again should be equivalent.
    // https://github.com/facebook/react/issues/11768

    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable,
    });
    var tracker = {
      getValue: function () {
        return currentValue;
      },
      setValue: function (value) {
        currentValue = "" + value;
      },
      stopTracking: function () {
        detachTracker(node);
        delete node[valueField];
      },
    };
    return tracker;
  }

  function track(node) {
    if (getTracker(node)) {
      return;
    } // TODO: Once it's just Fiber we can move this to node._wrapperState

    node._valueTracker = trackValueOnNode(node);
  }
  function updateValueIfChanged(node) {
    if (!node) {
      return false;
    }

    var tracker = getTracker(node); // if there is no tracker at this point it's unlikely
    // that trying again will succeed

    if (!tracker) {
      return true;
    }

    var lastValue = tracker.getValue();
    var nextValue = getValueFromNode(node);

    if (nextValue !== lastValue) {
      tracker.setValue(nextValue);
      return true;
    }

    return false;
  }

  function getActiveElement(doc) {
    doc = doc || (typeof document !== "undefined" ? document : undefined);

    if (typeof doc === "undefined") {
      return null;
    }

    try {
      return doc.activeElement || doc.body;
    } catch (e) {
      return doc.body;
    }
  }

  var didWarnValueDefaultValue = false;
  var didWarnCheckedDefaultChecked = false;
  var didWarnControlledToUncontrolled = false;
  var didWarnUncontrolledToControlled = false;

  function isControlled(props) {
    var usesChecked = props.type === "checkbox" || props.type === "radio";
    return usesChecked ? props.checked != null : props.value != null;
  }
  /**
   * Implements an <input> host component that allows setting these optional
   * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
   *
   * If `checked` or `value` are not supplied (or null/undefined), user actions
   * that affect the checked state or value will trigger updates to the element.
   *
   * If they are supplied (and not null/undefined), the rendered element will not
   * trigger updates to the element. Instead, the props must change in order for
   * the rendered element to be updated.
   *
   * The rendered element will be initialized as unchecked (or `defaultChecked`)
   * with an empty value (or `defaultValue`).
   *
   * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
   */

  function getHostProps(element, props) {
    var node = element;
    var checked = props.checked;

    var hostProps = _assign({}, props, {
      defaultChecked: undefined,
      defaultValue: undefined,
      value: undefined,
      checked: checked != null ? checked : node._wrapperState.initialChecked,
    });

    return hostProps;
  }
  function initWrapperState(element, props) {
    {
      checkControlledValueProps("input", props);

      if (
        props.checked !== undefined &&
        props.defaultChecked !== undefined &&
        !didWarnCheckedDefaultChecked
      ) {
        error(
          "%s contains an input of type %s with both checked and defaultChecked props. " +
            "Input elements must be either controlled or uncontrolled " +
            "(specify either the checked prop, or the defaultChecked prop, but not " +
            "both). Decide between using a controlled or uncontrolled input " +
            "element and remove one of these props. More info: " +
            "https://reactjs.org/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component",
          props.type
        );

        didWarnCheckedDefaultChecked = true;
      }

      if (
        props.value !== undefined &&
        props.defaultValue !== undefined &&
        !didWarnValueDefaultValue
      ) {
        error(
          "%s contains an input of type %s with both value and defaultValue props. " +
            "Input elements must be either controlled or uncontrolled " +
            "(specify either the value prop, or the defaultValue prop, but not " +
            "both). Decide between using a controlled or uncontrolled input " +
            "element and remove one of these props. More info: " +
            "https://reactjs.org/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component",
          props.type
        );

        didWarnValueDefaultValue = true;
      }
    }

    var node = element;
    var defaultValue = props.defaultValue == null ? "" : props.defaultValue;
    node._wrapperState = {
      initialChecked:
        props.checked != null ? props.checked : props.defaultChecked,
      initialValue: getToStringValue(
        props.value != null ? props.value : defaultValue
      ),
      controlled: isControlled(props),
    };
  }
  function updateChecked(element, props) {
    var node = element;
    var checked = props.checked;

    if (checked != null) {
      setValueForProperty(node, "checked", checked, false);
    }
  }
  function updateWrapper(element, props) {
    var node = element;

    {
      var controlled = isControlled(props);

      if (
        !node._wrapperState.controlled &&
        controlled &&
        !didWarnUncontrolledToControlled
      ) {
        error(
          "A component is changing an uncontrolled input to be controlled. " +
            "This is likely caused by the value changing from undefined to " +
            "a defined value, which should not happen. " +
            "Decide between using a controlled or uncontrolled input " +
            "element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"
        );

        didWarnUncontrolledToControlled = true;
      }

      if (
        node._wrapperState.controlled &&
        !controlled &&
        !didWarnControlledToUncontrolled
      ) {
        error(
          "A component is changing a controlled input to be uncontrolled. " +
            "This is likely caused by the value changing from a defined to " +
            "undefined, which should not happen. " +
            "Decide between using a controlled or uncontrolled input " +
            "element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"
        );

        didWarnControlledToUncontrolled = true;
      }
    }

    updateChecked(element, props);
    var value = getToStringValue(props.value);
    var type = props.type;

    if (value != null) {
      if (type === "number") {
        if (
          (value === 0 && node.value === "") || // We explicitly want to coerce to number here if possible.
          // eslint-disable-next-line
          node.value != value
        ) {
          node.value = toString(value);
        }
      } else if (node.value !== toString(value)) {
        node.value = toString(value);
      }
    } else if (type === "submit" || type === "reset") {
      // Submit/reset inputs need the attribute removed completely to avoid
      // blank-text buttons.
      node.removeAttribute("value");
      return;
    }

    {
      // When syncing the value attribute, the value comes from a cascade of
      // properties:
      //  1. The value React property
      //  2. The defaultValue React property
      //  3. Otherwise there should be no change
      if (props.hasOwnProperty("value")) {
        setDefaultValue(node, props.type, value);
      } else if (props.hasOwnProperty("defaultValue")) {
        setDefaultValue(node, props.type, getToStringValue(props.defaultValue));
      }
    }

    {
      // When syncing the checked attribute, it only changes when it needs
      // to be removed, such as transitioning from a checkbox into a text input
      if (props.checked == null && props.defaultChecked != null) {
        node.defaultChecked = !!props.defaultChecked;
      }
    }
  }
  function postMountWrapper(element, props, isHydrating) {
    var node = element; // Do not assign value if it is already set. This prevents user text input
    // from being lost during SSR hydration.

    if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
      var type = props.type;
      var isButton = type === "submit" || type === "reset"; // Avoid setting value attribute on submit/reset inputs as it overrides the
      // default value provided by the browser. See: #12872

      if (isButton && (props.value === undefined || props.value === null)) {
        return;
      }

      var initialValue = toString(node._wrapperState.initialValue); // Do not assign value if it is already set. This prevents user text input
      // from being lost during SSR hydration.

      if (!isHydrating) {
        {
          // When syncing the value attribute, the value property should use
          // the wrapperState._initialValue property. This uses:
          //
          //   1. The value React property when present
          //   2. The defaultValue React property when present
          //   3. An empty string
          if (initialValue !== node.value) {
            node.value = initialValue;
          }
        }
      }

      {
        // Otherwise, the value attribute is synchronized to the property,
        // so we assign defaultValue to the same thing as the value property
        // assignment step above.
        node.defaultValue = initialValue;
      }
    } // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
    // this is needed to work around a chrome bug where setting defaultChecked
    // will sometimes influence the value of checked (even after detachment).
    // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
    // We need to temporarily unset name to avoid disrupting radio button groups.

    var name = node.name;

    if (name !== "") {
      node.name = "";
    }

    {
      // When syncing the checked attribute, both the checked property and
      // attribute are assigned at the same time using defaultChecked. This uses:
      //
      //   1. The checked React property when present
      //   2. The defaultChecked React property when present
      //   3. Otherwise, false
      node.defaultChecked = !node.defaultChecked;
      node.defaultChecked = !!node._wrapperState.initialChecked;
    }

    if (name !== "") {
      node.name = name;
    }
  }
  function restoreControlledState(element, props) {
    var node = element;
    updateWrapper(node, props);
    updateNamedCousins(node, props);
  }

  function updateNamedCousins(rootNode, props) {
    var name = props.name;

    if (props.type === "radio" && name != null) {
      var queryRoot = rootNode;

      while (queryRoot.parentNode) {
        queryRoot = queryRoot.parentNode;
      } // If `rootNode.form` was non-null, then we could try `form.elements`,
      // but that sometimes behaves strangely in IE8. We could also try using
      // `form.getElementsByName`, but that will only return direct children
      // and won't include inputs that use the HTML5 `form=` attribute. Since
      // the input might not even be in a form. It might not even be in the
      // document. Let's just use the local `querySelectorAll` to ensure we don't
      // miss anything.

      var group = queryRoot.querySelectorAll(
        "input[name=" + JSON.stringify("" + name) + '][type="radio"]'
      );

      for (var i = 0; i < group.length; i++) {
        var otherNode = group[i];

        if (otherNode === rootNode || otherNode.form !== rootNode.form) {
          continue;
        } // This will throw if radio buttons rendered by different copies of React
        // and the same name are rendered into the same form (same as #1939).
        // That's probably okay; we don't support it just as we don't support
        // mixing React radio buttons with non-React ones.

        var otherProps = getFiberCurrentPropsFromNode(otherNode);

        if (!otherProps) {
          {
            throw Error(
              "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
            );
          }
        } // We need update the tracked value on the named cousin since the value
        // was changed but the input saw no event or value set

        updateValueIfChanged(otherNode); // If this is a controlled radio button group, forcing the input that
        // was previously checked to update will cause it to be come re-checked
        // as appropriate.

        updateWrapper(otherNode, otherProps);
      }
    }
  } // In Chrome, assigning defaultValue to certain input types triggers input validation.
  // For number inputs, the display value loses trailing decimal points. For email inputs,
  // Chrome raises "The specified value <x> is not a valid email address".
  //
  // Here we check to see if the defaultValue has actually changed, avoiding these problems
  // when the user is inputting text
  //
  // https://github.com/facebook/react/issues/7253

  function setDefaultValue(node, type, value) {
    if (
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      type !== "number" ||
      getActiveElement(node.ownerDocument) !== node
    ) {
      if (value == null) {
        node.defaultValue = toString(node._wrapperState.initialValue);
      } else if (node.defaultValue !== toString(value)) {
        node.defaultValue = toString(value);
      }
    }
  }

  var didWarnSelectedSetOnOption = false;
  var didWarnInvalidChild = false;

  function flattenChildren(children) {
    var content = ""; // Flatten children. We'll warn if they are invalid
    // during validateProps() which runs for hydration too.
    // Note that this would throw on non-element objects.
    // Elements are stringified (which is normally irrelevant
    // but matters for <fbt>).

    React.Children.forEach(children, function (child) {
      if (child == null) {
        return;
      }

      content += child; // Note: we don't warn about invalid children here.
      // Instead, this is done separately below so that
      // it happens during the hydration code path too.
    });
    return content;
  }
  /**
   * Implements an <option> host component that warns when `selected` is set.
   */

  function validateProps(element, props) {
    {
      // This mirrors the code path above, but runs for hydration too.
      // Warn about invalid children here so that client and hydration are consistent.
      // TODO: this seems like it could cause a DEV-only throw for hydration
      // if children contains a non-element object. We should try to avoid that.
      if (typeof props.children === "object" && props.children !== null) {
        React.Children.forEach(props.children, function (child) {
          if (child == null) {
            return;
          }

          if (typeof child === "string" || typeof child === "number") {
            return;
          }

          if (typeof child.type !== "string") {
            return;
          }

          if (!didWarnInvalidChild) {
            didWarnInvalidChild = true;

            error(
              "Only strings and numbers are supported as <option> children."
            );
          }
        });
      } // TODO: Remove support for `selected` in <option>.

      if (props.selected != null && !didWarnSelectedSetOnOption) {
        error(
          "Use the `defaultValue` or `value` props on <select> instead of " +
            "setting `selected` on <option>."
        );

        didWarnSelectedSetOnOption = true;
      }
    }
  }
  function postMountWrapper$1(element, props) {
    // value="" should make a value attribute (#6219)
    if (props.value != null) {
      element.setAttribute("value", toString(getToStringValue(props.value)));
    }
  }
  function getHostProps$1(element, props) {
    var hostProps = _assign(
      {
        children: undefined,
      },
      props
    );

    var content = flattenChildren(props.children);

    if (content) {
      hostProps.children = content;
    }

    return hostProps;
  }

  var didWarnValueDefaultValue$1;

  {
    didWarnValueDefaultValue$1 = false;
  }

  function getDeclarationErrorAddendum() {
    var ownerName = getCurrentFiberOwnerNameInDevOrNull();

    if (ownerName) {
      return "\n\nCheck the render method of `" + ownerName + "`.";
    }

    return "";
  }

  var valuePropNames = ["value", "defaultValue"];
  /**
   * Validation function for `value` and `defaultValue`.
   */

  function checkSelectPropTypes(props) {
    {
      checkControlledValueProps("select", props);

      for (var i = 0; i < valuePropNames.length; i++) {
        var propName = valuePropNames[i];

        if (props[propName] == null) {
          continue;
        }

        var isArray = Array.isArray(props[propName]);

        if (props.multiple && !isArray) {
          error(
            "The `%s` prop supplied to <select> must be an array if " +
              "`multiple` is true.%s",
            propName,
            getDeclarationErrorAddendum()
          );
        } else if (!props.multiple && isArray) {
          error(
            "The `%s` prop supplied to <select> must be a scalar " +
              "value if `multiple` is false.%s",
            propName,
            getDeclarationErrorAddendum()
          );
        }
      }
    }
  }

  function updateOptions(node, multiple, propValue, setDefaultSelected) {
    var options = node.options;

    if (multiple) {
      var selectedValues = propValue;
      var selectedValue = {};

      for (var i = 0; i < selectedValues.length; i++) {
        // Prefix to avoid chaos with special keys.
        selectedValue["$" + selectedValues[i]] = true;
      }

      for (var _i = 0; _i < options.length; _i++) {
        var selected = selectedValue.hasOwnProperty("$" + options[_i].value);

        if (options[_i].selected !== selected) {
          options[_i].selected = selected;
        }

        if (selected && setDefaultSelected) {
          options[_i].defaultSelected = true;
        }
      }
    } else {
      // Do not set `select.value` as exact behavior isn't consistent across all
      // browsers for all cases.
      var _selectedValue = toString(getToStringValue(propValue));

      var defaultSelected = null;

      for (var _i2 = 0; _i2 < options.length; _i2++) {
        if (options[_i2].value === _selectedValue) {
          options[_i2].selected = true;

          if (setDefaultSelected) {
            options[_i2].defaultSelected = true;
          }

          return;
        }

        if (defaultSelected === null && !options[_i2].disabled) {
          defaultSelected = options[_i2];
        }
      }

      if (defaultSelected !== null) {
        defaultSelected.selected = true;
      }
    }
  }
  /**
   * Implements a <select> host component that allows optionally setting the
   * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
   * stringable. If `multiple` is true, the prop must be an array of stringables.
   *
   * If `value` is not supplied (or null/undefined), user actions that change the
   * selected option will trigger updates to the rendered options.
   *
   * If it is supplied (and not null/undefined), the rendered options will not
   * update in response to user actions. Instead, the `value` prop must change in
   * order for the rendered options to update.
   *
   * If `defaultValue` is provided, any options with the supplied values will be
   * selected.
   */

  function getHostProps$2(element, props) {
    return _assign({}, props, {
      value: undefined,
    });
  }
  function initWrapperState$1(element, props) {
    var node = element;

    {
      checkSelectPropTypes(props);
    }

    node._wrapperState = {
      wasMultiple: !!props.multiple,
    };

    {
      if (
        props.value !== undefined &&
        props.defaultValue !== undefined &&
        !didWarnValueDefaultValue$1
      ) {
        error(
          "Select elements must be either controlled or uncontrolled " +
            "(specify either the value prop, or the defaultValue prop, but not " +
            "both). Decide between using a controlled or uncontrolled select " +
            "element and remove one of these props. More info: " +
            "https://reactjs.org/link/controlled-components"
        );

        didWarnValueDefaultValue$1 = true;
      }
    }
  }
  function postMountWrapper$2(element, props) {
    var node = element;
    node.multiple = !!props.multiple;
    var value = props.value;

    if (value != null) {
      updateOptions(node, !!props.multiple, value, false);
    } else if (props.defaultValue != null) {
      updateOptions(node, !!props.multiple, props.defaultValue, true);
    }
  }
  function postUpdateWrapper(element, props) {
    var node = element;
    var wasMultiple = node._wrapperState.wasMultiple;
    node._wrapperState.wasMultiple = !!props.multiple;
    var value = props.value;

    if (value != null) {
      updateOptions(node, !!props.multiple, value, false);
    } else if (wasMultiple !== !!props.multiple) {
      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
      if (props.defaultValue != null) {
        updateOptions(node, !!props.multiple, props.defaultValue, true);
      } else {
        // Revert the select back to its default unselected state.
        updateOptions(node, !!props.multiple, props.multiple ? [] : "", false);
      }
    }
  }
  function restoreControlledState$1(element, props) {
    var node = element;
    var value = props.value;

    if (value != null) {
      updateOptions(node, !!props.multiple, value, false);
    }
  }

  var didWarnValDefaultVal = false;

  /**
   * Implements a <textarea> host component that allows setting `value`, and
   * `defaultValue`. This differs from the traditional DOM API because value is
   * usually set as PCDATA children.
   *
   * If `value` is not supplied (or null/undefined), user actions that affect the
   * value will trigger updates to the element.
   *
   * If `value` is supplied (and not null/undefined), the rendered element will
   * not trigger updates to the element. Instead, the `value` prop must change in
   * order for the rendered element to be updated.
   *
   * The rendered element will be initialized with an empty value, the prop
   * `defaultValue` if specified, or the children content (deprecated).
   */
  function getHostProps$3(element, props) {
    var node = element;

    if (!(props.dangerouslySetInnerHTML == null)) {
      {
        throw Error(
          "`dangerouslySetInnerHTML` does not make sense on <textarea>."
        );
      }
    } // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.  We could add a check in setTextContent
    // to only set the value if/when the value differs from the node value (which would
    // completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
    // solution. The value can be a boolean or object so that's why it's forced
    // to be a string.

    var hostProps = _assign({}, props, {
      value: undefined,
      defaultValue: undefined,
      children: toString(node._wrapperState.initialValue),
    });

    return hostProps;
  }
  function initWrapperState$2(element, props) {
    var node = element;

    {
      checkControlledValueProps("textarea", props);

      if (
        props.value !== undefined &&
        props.defaultValue !== undefined &&
        !didWarnValDefaultVal
      ) {
        error(
          "%s contains a textarea with both value and defaultValue props. " +
            "Textarea elements must be either controlled or uncontrolled " +
            "(specify either the value prop, or the defaultValue prop, but not " +
            "both). Decide between using a controlled or uncontrolled textarea " +
            "and remove one of these props. More info: " +
            "https://reactjs.org/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component"
        );

        didWarnValDefaultVal = true;
      }
    }

    var initialValue = props.value; // Only bother fetching default value if we're going to use it

    if (initialValue == null) {
      var children = props.children,
        defaultValue = props.defaultValue;

      if (children != null) {
        {
          error(
            "Use the `defaultValue` or `value` props instead of setting " +
              "children on <textarea>."
          );
        }

        {
          if (!(defaultValue == null)) {
            {
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            }
          }

          if (Array.isArray(children)) {
            if (!(children.length <= 1)) {
              {
                throw Error("<textarea> can only have at most one child.");
              }
            }

            children = children[0];
          }

          defaultValue = children;
        }
      }

      if (defaultValue == null) {
        defaultValue = "";
      }

      initialValue = defaultValue;
    }

    node._wrapperState = {
      initialValue: getToStringValue(initialValue),
    };
  }
  function updateWrapper$1(element, props) {
    var node = element;
    var value = getToStringValue(props.value);
    var defaultValue = getToStringValue(props.defaultValue);

    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      var newValue = toString(value); // To avoid side effects (such as losing text selection), only set value if changed

      if (newValue !== node.value) {
        node.value = newValue;
      }

      if (props.defaultValue == null && node.defaultValue !== newValue) {
        node.defaultValue = newValue;
      }
    }

    if (defaultValue != null) {
      node.defaultValue = toString(defaultValue);
    }
  }
  function postMountWrapper$3(element, props) {
    var node = element; // This is in postMount because we need access to the DOM node, which is not
    // available until after the component has mounted.

    var textContent = node.textContent; // Only set node.value if textContent is equal to the expected
    // initial value. In IE10/IE11 there is a bug where the placeholder attribute
    // will populate textContent as well.
    // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/

    if (textContent === node._wrapperState.initialValue) {
      if (textContent !== "" && textContent !== null) {
        node.value = textContent;
      }
    }
  }
  function restoreControlledState$2(element, props) {
    // DOM component is still mounted; update
    updateWrapper$1(element, props);
  }

  var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  var MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  var Namespaces = {
    html: HTML_NAMESPACE,
    mathml: MATH_NAMESPACE,
    svg: SVG_NAMESPACE,
  }; // Assumes there is no parent namespace.

  function getIntrinsicNamespace(type) {
    switch (type) {
      case "svg":
        return SVG_NAMESPACE;

      case "math":
        return MATH_NAMESPACE;

      default:
        return HTML_NAMESPACE;
    }
  }
  function getChildNamespace(parentNamespace, type) {
    if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
      // No (or default) parent namespace: potential entry point.
      return getIntrinsicNamespace(type);
    }

    if (parentNamespace === SVG_NAMESPACE && type === "foreignObject") {
      // We're leaving SVG.
      return HTML_NAMESPACE;
    } // By default, pass namespace below.

    return parentNamespace;
  }

  /* globals MSApp */

  /**
   * Create a function which has 'unsafe' privileges (required by windows8 apps)
   */
  var createMicrosoftUnsafeLocalFunction = function (func) {
    if (typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction) {
      return function (arg0, arg1, arg2, arg3) {
        MSApp.execUnsafeLocalFunction(function () {
          return func(arg0, arg1, arg2, arg3);
        });
      };
    } else {
      return func;
    }
  };

  var reusableSVGContainer;
  /**
   * Set the innerHTML property of a node
   *
   * @param {DOMElement} node
   * @param {string} html
   * @internal
   */

  var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
    if (node.namespaceURI === Namespaces.svg) {
      if (!("innerHTML" in node)) {
        // IE does not have innerHTML for SVG nodes, so instead we inject the
        // new markup in a temp node and then move the child nodes across into
        // the target node
        reusableSVGContainer =
          reusableSVGContainer || document.createElement("div");
        reusableSVGContainer.innerHTML =
          "<svg>" + html.valueOf().toString() + "</svg>";
        var svgNode = reusableSVGContainer.firstChild;

        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }

        while (svgNode.firstChild) {
          node.appendChild(svgNode.firstChild);
        }

        return;
      }
    }

    node.innerHTML = html;
  });

  /**
   * HTML nodeType values that represent the type of the node
   */
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  var DOCUMENT_NODE = 9;
  var DOCUMENT_FRAGMENT_NODE = 11;

  /**
   * Set the textContent property of a node. For text updates, it's faster
   * to set the `nodeValue` of the Text node directly instead of using
   * `.textContent` which will remove the existing node and create a new one.
   *
   * @param {DOMElement} node
   * @param {string} text
   * @internal
   */

  var setTextContent = function (node, text) {
    if (text) {
      var firstChild = node.firstChild;

      if (
        firstChild &&
        firstChild === node.lastChild &&
        firstChild.nodeType === TEXT_NODE
      ) {
        firstChild.nodeValue = text;
        return;
      }
    }

    node.textContent = text;
  };

  // List derived from Gecko source code:
  // https://github.com/mozilla/gecko-dev/blob/4e638efc71/layout/style/test/property_database.js
  var shorthandToLonghand = {
    animation: [
      "animationDelay",
      "animationDirection",
      "animationDuration",
      "animationFillMode",
      "animationIterationCount",
      "animationName",
      "animationPlayState",
      "animationTimingFunction",
    ],
    background: [
      "backgroundAttachment",
      "backgroundClip",
      "backgroundColor",
      "backgroundImage",
      "backgroundOrigin",
      "backgroundPositionX",
      "backgroundPositionY",
      "backgroundRepeat",
      "backgroundSize",
    ],
    backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
    border: [
      "borderBottomColor",
      "borderBottomStyle",
      "borderBottomWidth",
      "borderImageOutset",
      "borderImageRepeat",
      "borderImageSlice",
      "borderImageSource",
      "borderImageWidth",
      "borderLeftColor",
      "borderLeftStyle",
      "borderLeftWidth",
      "borderRightColor",
      "borderRightStyle",
      "borderRightWidth",
      "borderTopColor",
      "borderTopStyle",
      "borderTopWidth",
    ],
    borderBlockEnd: [
      "borderBlockEndColor",
      "borderBlockEndStyle",
      "borderBlockEndWidth",
    ],
    borderBlockStart: [
      "borderBlockStartColor",
      "borderBlockStartStyle",
      "borderBlockStartWidth",
    ],
    borderBottom: [
      "borderBottomColor",
      "borderBottomStyle",
      "borderBottomWidth",
    ],
    borderColor: [
      "borderBottomColor",
      "borderLeftColor",
      "borderRightColor",
      "borderTopColor",
    ],
    borderImage: [
      "borderImageOutset",
      "borderImageRepeat",
      "borderImageSlice",
      "borderImageSource",
      "borderImageWidth",
    ],
    borderInlineEnd: [
      "borderInlineEndColor",
      "borderInlineEndStyle",
      "borderInlineEndWidth",
    ],
    borderInlineStart: [
      "borderInlineStartColor",
      "borderInlineStartStyle",
      "borderInlineStartWidth",
    ],
    borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
    borderRadius: [
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
      "borderTopLeftRadius",
      "borderTopRightRadius",
    ],
    borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
    borderStyle: [
      "borderBottomStyle",
      "borderLeftStyle",
      "borderRightStyle",
      "borderTopStyle",
    ],
    borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
    borderWidth: [
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
    ],
    columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
    columns: ["columnCount", "columnWidth"],
    flex: ["flexBasis", "flexGrow", "flexShrink"],
    flexFlow: ["flexDirection", "flexWrap"],
    font: [
      "fontFamily",
      "fontFeatureSettings",
      "fontKerning",
      "fontLanguageOverride",
      "fontSize",
      "fontSizeAdjust",
      "fontStretch",
      "fontStyle",
      "fontVariant",
      "fontVariantAlternates",
      "fontVariantCaps",
      "fontVariantEastAsian",
      "fontVariantLigatures",
      "fontVariantNumeric",
      "fontVariantPosition",
      "fontWeight",
      "lineHeight",
    ],
    fontVariant: [
      "fontVariantAlternates",
      "fontVariantCaps",
      "fontVariantEastAsian",
      "fontVariantLigatures",
      "fontVariantNumeric",
      "fontVariantPosition",
    ],
    gap: ["columnGap", "rowGap"],
    grid: [
      "gridAutoColumns",
      "gridAutoFlow",
      "gridAutoRows",
      "gridTemplateAreas",
      "gridTemplateColumns",
      "gridTemplateRows",
    ],
    gridArea: [
      "gridColumnEnd",
      "gridColumnStart",
      "gridRowEnd",
      "gridRowStart",
    ],
    gridColumn: ["gridColumnEnd", "gridColumnStart"],
    gridColumnGap: ["columnGap"],
    gridGap: ["columnGap", "rowGap"],
    gridRow: ["gridRowEnd", "gridRowStart"],
    gridRowGap: ["rowGap"],
    gridTemplate: [
      "gridTemplateAreas",
      "gridTemplateColumns",
      "gridTemplateRows",
    ],
    listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
    margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    marker: ["markerEnd", "markerMid", "markerStart"],
    mask: [
      "maskClip",
      "maskComposite",
      "maskImage",
      "maskMode",
      "maskOrigin",
      "maskPositionX",
      "maskPositionY",
      "maskRepeat",
      "maskSize",
    ],
    maskPosition: ["maskPositionX", "maskPositionY"],
    outline: ["outlineColor", "outlineStyle", "outlineWidth"],
    overflow: ["overflowX", "overflowY"],
    padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    placeContent: ["alignContent", "justifyContent"],
    placeItems: ["alignItems", "justifyItems"],
    placeSelf: ["alignSelf", "justifySelf"],
    textDecoration: [
      "textDecorationColor",
      "textDecorationLine",
      "textDecorationStyle",
    ],
    textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
    transition: [
      "transitionDelay",
      "transitionDuration",
      "transitionProperty",
      "transitionTimingFunction",
    ],
    wordWrap: ["overflowWrap"],
  };

  /**
   * CSS properties which accept numbers but are not in units of "px".
   */
  var isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
  };
  /**
   * @param {string} prefix vendor-specific prefix, eg: Webkit
   * @param {string} key style name, eg: transitionDuration
   * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
   * WebkitTransitionDuration
   */

  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }
  /**
   * Support style names that may come passed in prefixed by adding permutations
   * of vendor prefixes.
   */

  var prefixes = ["Webkit", "ms", "Moz", "O"]; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
  // infinite loop, because it iterates over the newly added props too.

  Object.keys(isUnitlessNumber).forEach(function (prop) {
    prefixes.forEach(function (prefix) {
      isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
  });

  /**
   * Convert a value into the proper css writable value. The style name `name`
   * should be logical (no hyphens), as specified
   * in `CSSProperty.isUnitlessNumber`.
   *
   * @param {string} name CSS property name such as `topMargin`.
   * @param {*} value CSS property value such as `10px`.
   * @return {string} Normalized style value with dimensions applied.
   */

  function dangerousStyleValue(name, value, isCustomProperty) {
    // Note that we've removed escapeTextForBrowser() calls here since the
    // whole string will be escaped when the attribute is injected into
    // the markup. If you provide unsafe user data here they can inject
    // arbitrary CSS which may be problematic (I couldn't repro this):
    // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
    // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
    // This is not an XSS hole but instead a potential CSS injection issue
    // which has lead to a greater discussion about how we're going to
    // trust URLs moving forward. See #2115901
    var isEmpty = value == null || typeof value === "boolean" || value === "";

    if (isEmpty) {
      return "";
    }

    if (
      !isCustomProperty &&
      typeof value === "number" &&
      value !== 0 &&
      !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
    ) {
      return value + "px"; // Presumes implicit 'px' suffix for unitless numbers
    }

    return ("" + value).trim();
  }

  var uppercasePattern = /([A-Z])/g;
  var msPattern = /^ms-/;
  /**
   * Hyphenates a camelcased CSS property name, for example:
   *
   *   > hyphenateStyleName('backgroundColor')
   *   < "background-color"
   *   > hyphenateStyleName('MozTransition')
   *   < "-moz-transition"
   *   > hyphenateStyleName('msTransition')
   *   < "-ms-transition"
   *
   * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
   * is converted to `-ms-`.
   */

  function hyphenateStyleName(name) {
    return name
      .replace(uppercasePattern, "-$1")
      .toLowerCase()
      .replace(msPattern, "-ms-");
  }

  var warnValidStyle = function () {};

  {
    // 'msTransform' is correct, but the other prefixes should be capitalized
    var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
    var msPattern$1 = /^-ms-/;
    var hyphenPattern = /-(.)/g; // style values shouldn't contain a semicolon

    var badStyleValueWithSemicolonPattern = /;\s*$/;
    var warnedStyleNames = {};
    var warnedStyleValues = {};
    var warnedForNaNValue = false;
    var warnedForInfinityValue = false;

    var camelize = function (string) {
      return string.replace(hyphenPattern, function (_, character) {
        return character.toUpperCase();
      });
    };

    var warnHyphenatedStyleName = function (name) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;

      error(
        "Unsupported style property %s. Did you mean %s?",
        name, // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        camelize(name.replace(msPattern$1, "ms-"))
      );
    };

    var warnBadVendoredStyleName = function (name) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;

      error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        name,
        name.charAt(0).toUpperCase() + name.slice(1)
      );
    };

    var warnStyleValueWithSemicolon = function (name, value) {
      if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
        return;
      }

      warnedStyleValues[value] = true;

      error(
        "Style property values shouldn't contain a semicolon. " +
          'Try "%s: %s" instead.',
        name,
        value.replace(badStyleValueWithSemicolonPattern, "")
      );
    };

    var warnStyleValueIsNaN = function (name, value) {
      if (warnedForNaNValue) {
        return;
      }

      warnedForNaNValue = true;

      error("`NaN` is an invalid value for the `%s` css style property.", name);
    };

    var warnStyleValueIsInfinity = function (name, value) {
      if (warnedForInfinityValue) {
        return;
      }

      warnedForInfinityValue = true;

      error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        name
      );
    };

    warnValidStyle = function (name, value) {
      if (name.indexOf("-") > -1) {
        warnHyphenatedStyleName(name);
      } else if (badVendoredStyleNamePattern.test(name)) {
        warnBadVendoredStyleName(name);
      } else if (badStyleValueWithSemicolonPattern.test(value)) {
        warnStyleValueWithSemicolon(name, value);
      }

      if (typeof value === "number") {
        if (isNaN(value)) {
          warnStyleValueIsNaN(name, value);
        } else if (!isFinite(value)) {
          warnStyleValueIsInfinity(name, value);
        }
      }
    };
  }

  var warnValidStyle$1 = warnValidStyle;

  /**
   * Operations for dealing with CSS properties.
   */

  /**
   * This creates a string that is expected to be equivalent to the style
   * attribute generated by server-side rendering. It by-passes warnings and
   * security checks so it's not safe to use this value for anything other than
   * comparison. It is only used in DEV for SSR validation.
   */

  function createDangerousStringForStyles(styles) {
    {
      var serialized = "";
      var delimiter = "";

      for (var styleName in styles) {
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }

        var styleValue = styles[styleName];

        if (styleValue != null) {
          var isCustomProperty = styleName.indexOf("--") === 0;
          serialized +=
            delimiter +
            (isCustomProperty ? styleName : hyphenateStyleName(styleName)) +
            ":";
          serialized += dangerousStyleValue(
            styleName,
            styleValue,
            isCustomProperty
          );
          delimiter = ";";
        }
      }

      return serialized || null;
    }
  }
  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   */

  function setValueForStyles(node, styles) {
    var style = node.style;

    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }

      var isCustomProperty = styleName.indexOf("--") === 0;

      {
        if (!isCustomProperty) {
          warnValidStyle$1(styleName, styles[styleName]);
        }
      }

      var styleValue = dangerousStyleValue(
        styleName,
        styles[styleName],
        isCustomProperty
      );

      if (styleName === "float") {
        styleName = "cssFloat";
      }

      if (isCustomProperty) {
        style.setProperty(styleName, styleValue);
      } else {
        style[styleName] = styleValue;
      }
    }
  }

  function isValueEmpty(value) {
    return value == null || typeof value === "boolean" || value === "";
  }
  /**
   * Given {color: 'red', overflow: 'hidden'} returns {
   *   color: 'color',
   *   overflowX: 'overflow',
   *   overflowY: 'overflow',
   * }. This can be read as "the overflowY property was set by the overflow
   * shorthand". That is, the values are the property that each was derived from.
   */

  function expandShorthandMap(styles) {
    var expanded = {};

    for (var key in styles) {
      var longhands = shorthandToLonghand[key] || [key];

      for (var i = 0; i < longhands.length; i++) {
        expanded[longhands[i]] = key;
      }
    }

    return expanded;
  }
  /**
   * When mixing shorthand and longhand property names, we warn during updates if
   * we expect an incorrect result to occur. In particular, we warn for:
   *
   * Updating a shorthand property (longhand gets overwritten):
   *   {font: 'foo', fontVariant: 'bar'} -> {font: 'baz', fontVariant: 'bar'}
   *   becomes .style.font = 'baz'
   * Removing a shorthand property (longhand gets lost too):
   *   {font: 'foo', fontVariant: 'bar'} -> {fontVariant: 'bar'}
   *   becomes .style.font = ''
   * Removing a longhand property (should revert to shorthand; doesn't):
   *   {font: 'foo', fontVariant: 'bar'} -> {font: 'foo'}
   *   becomes .style.fontVariant = ''
   */

  function validateShorthandPropertyCollisionInDev(styleUpdates, nextStyles) {
    {
      if (!nextStyles) {
        return;
      }

      var expandedUpdates = expandShorthandMap(styleUpdates);
      var expandedStyles = expandShorthandMap(nextStyles);
      var warnedAbout = {};

      for (var key in expandedUpdates) {
        var originalKey = expandedUpdates[key];
        var correctOriginalKey = expandedStyles[key];

        if (correctOriginalKey && originalKey !== correctOriginalKey) {
          var warningKey = originalKey + "," + correctOriginalKey;

          if (warnedAbout[warningKey]) {
            continue;
          }

          warnedAbout[warningKey] = true;

          error(
            "%s a style property during rerender (%s) when a " +
              "conflicting property is set (%s) can lead to styling bugs. To " +
              "avoid this, don't mix shorthand and non-shorthand properties " +
              "for the same value; instead, replace the shorthand with " +
              "separate values.",
            isValueEmpty(styleUpdates[originalKey]) ? "Removing" : "Updating",
            originalKey,
            correctOriginalKey
          );
        }
      }
    }
  }

  // For HTML, certain tags should omit their close tag. We keep a list for
  // those special-case tags.
  var omittedCloseTags = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true, // NOTE: menuitem's close tag should be omitted, but that causes problems.
  };

  // `omittedCloseTags` except that `menuitem` should still have its closing tag.

  var voidElementTags = _assign(
    {
      menuitem: true,
    },
    omittedCloseTags
  );

  var HTML = "__html";

  function assertValidProps(tag, props) {
    if (!props) {
      return;
    } // Note the use of `==` which checks for null or undefined.

    if (voidElementTags[tag]) {
      if (!(props.children == null && props.dangerouslySetInnerHTML == null)) {
        {
          throw Error(
            tag +
              " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
          );
        }
      }
    }

    if (props.dangerouslySetInnerHTML != null) {
      if (!(props.children == null)) {
        {
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        }
      }

      if (
        !(
          typeof props.dangerouslySetInnerHTML === "object" &&
          HTML in props.dangerouslySetInnerHTML
        )
      ) {
        {
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information."
          );
        }
      }
    }

    {
      if (
        !props.suppressContentEditableWarning &&
        props.contentEditable &&
        props.children != null
      ) {
        error(
          "A component is `contentEditable` and contains `children` managed by " +
            "React. It is now your responsibility to guarantee that none of " +
            "those nodes are unexpectedly modified or duplicated. This is " +
            "probably not intentional."
        );
      }
    }

    if (!(props.style == null || typeof props.style === "object")) {
      {
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      }
    }
  }

  function isCustomComponent(tagName, props) {
    if (tagName.indexOf("-") === -1) {
      return typeof props.is === "string";
    }

    switch (tagName) {
      // These are reserved SVG and MathML elements.
      // We don't mind this list too much because we expect it to never grow.
      // The alternative is to track the namespace in a few places which is convoluted.
      // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;

      default:
        return true;
    }
  }

  // When adding attributes to the HTML or SVG allowed attribute list, be sure to
  // also add them to this module to ensure casing and incorrect name
  // warnings.
  var possibleStandardNames = {
    // HTML
    accept: "accept",
    acceptcharset: "acceptCharset",
    "accept-charset": "acceptCharset",
    accesskey: "accessKey",
    action: "action",
    allowfullscreen: "allowFullScreen",
    alt: "alt",
    as: "as",
    async: "async",
    autocapitalize: "autoCapitalize",
    autocomplete: "autoComplete",
    autocorrect: "autoCorrect",
    autofocus: "autoFocus",
    autoplay: "autoPlay",
    autosave: "autoSave",
    capture: "capture",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    challenge: "challenge",
    charset: "charSet",
    checked: "checked",
    children: "children",
    cite: "cite",
    class: "className",
    classid: "classID",
    classname: "className",
    cols: "cols",
    colspan: "colSpan",
    content: "content",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    controls: "controls",
    controlslist: "controlsList",
    coords: "coords",
    crossorigin: "crossOrigin",
    dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
    data: "data",
    datetime: "dateTime",
    default: "default",
    defaultchecked: "defaultChecked",
    defaultvalue: "defaultValue",
    defer: "defer",
    dir: "dir",
    disabled: "disabled",
    disablepictureinpicture: "disablePictureInPicture",
    disableremoteplayback: "disableRemotePlayback",
    download: "download",
    draggable: "draggable",
    enctype: "encType",
    enterkeyhint: "enterKeyHint",
    for: "htmlFor",
    form: "form",
    formmethod: "formMethod",
    formaction: "formAction",
    formenctype: "formEncType",
    formnovalidate: "formNoValidate",
    formtarget: "formTarget",
    frameborder: "frameBorder",
    headers: "headers",
    height: "height",
    hidden: "hidden",
    high: "high",
    href: "href",
    hreflang: "hrefLang",
    htmlfor: "htmlFor",
    httpequiv: "httpEquiv",
    "http-equiv": "httpEquiv",
    icon: "icon",
    id: "id",
    innerhtml: "innerHTML",
    inputmode: "inputMode",
    integrity: "integrity",
    is: "is",
    itemid: "itemID",
    itemprop: "itemProp",
    itemref: "itemRef",
    itemscope: "itemScope",
    itemtype: "itemType",
    keyparams: "keyParams",
    keytype: "keyType",
    kind: "kind",
    label: "label",
    lang: "lang",
    list: "list",
    loop: "loop",
    low: "low",
    manifest: "manifest",
    marginwidth: "marginWidth",
    marginheight: "marginHeight",
    max: "max",
    maxlength: "maxLength",
    media: "media",
    mediagroup: "mediaGroup",
    method: "method",
    min: "min",
    minlength: "minLength",
    multiple: "multiple",
    muted: "muted",
    name: "name",
    nomodule: "noModule",
    nonce: "nonce",
    novalidate: "noValidate",
    open: "open",
    optimum: "optimum",
    pattern: "pattern",
    placeholder: "placeholder",
    playsinline: "playsInline",
    poster: "poster",
    preload: "preload",
    profile: "profile",
    radiogroup: "radioGroup",
    readonly: "readOnly",
    referrerpolicy: "referrerPolicy",
    rel: "rel",
    required: "required",
    reversed: "reversed",
    role: "role",
    rows: "rows",
    rowspan: "rowSpan",
    sandbox: "sandbox",
    scope: "scope",
    scoped: "scoped",
    scrolling: "scrolling",
    seamless: "seamless",
    selected: "selected",
    shape: "shape",
    size: "size",
    sizes: "sizes",
    span: "span",
    spellcheck: "spellCheck",
    src: "src",
    srcdoc: "srcDoc",
    srclang: "srcLang",
    srcset: "srcSet",
    start: "start",
    step: "step",
    style: "style",
    summary: "summary",
    tabindex: "tabIndex",
    target: "target",
    title: "title",
    type: "type",
    usemap: "useMap",
    value: "value",
    width: "width",
    wmode: "wmode",
    wrap: "wrap",
    // SVG
    about: "about",
    accentheight: "accentHeight",
    "accent-height": "accentHeight",
    accumulate: "accumulate",
    additive: "additive",
    alignmentbaseline: "alignmentBaseline",
    "alignment-baseline": "alignmentBaseline",
    allowreorder: "allowReorder",
    alphabetic: "alphabetic",
    amplitude: "amplitude",
    arabicform: "arabicForm",
    "arabic-form": "arabicForm",
    ascent: "ascent",
    attributename: "attributeName",
    attributetype: "attributeType",
    autoreverse: "autoReverse",
    azimuth: "azimuth",
    basefrequency: "baseFrequency",
    baselineshift: "baselineShift",
    "baseline-shift": "baselineShift",
    baseprofile: "baseProfile",
    bbox: "bbox",
    begin: "begin",
    bias: "bias",
    by: "by",
    calcmode: "calcMode",
    capheight: "capHeight",
    "cap-height": "capHeight",
    clip: "clip",
    clippath: "clipPath",
    "clip-path": "clipPath",
    clippathunits: "clipPathUnits",
    cliprule: "clipRule",
    "clip-rule": "clipRule",
    color: "color",
    colorinterpolation: "colorInterpolation",
    "color-interpolation": "colorInterpolation",
    colorinterpolationfilters: "colorInterpolationFilters",
    "color-interpolation-filters": "colorInterpolationFilters",
    colorprofile: "colorProfile",
    "color-profile": "colorProfile",
    colorrendering: "colorRendering",
    "color-rendering": "colorRendering",
    contentscripttype: "contentScriptType",
    contentstyletype: "contentStyleType",
    cursor: "cursor",
    cx: "cx",
    cy: "cy",
    d: "d",
    datatype: "datatype",
    decelerate: "decelerate",
    descent: "descent",
    diffuseconstant: "diffuseConstant",
    direction: "direction",
    display: "display",
    divisor: "divisor",
    dominantbaseline: "dominantBaseline",
    "dominant-baseline": "dominantBaseline",
    dur: "dur",
    dx: "dx",
    dy: "dy",
    edgemode: "edgeMode",
    elevation: "elevation",
    enablebackground: "enableBackground",
    "enable-background": "enableBackground",
    end: "end",
    exponent: "exponent",
    externalresourcesrequired: "externalResourcesRequired",
    fill: "fill",
    fillopacity: "fillOpacity",
    "fill-opacity": "fillOpacity",
    fillrule: "fillRule",
    "fill-rule": "fillRule",
    filter: "filter",
    filterres: "filterRes",
    filterunits: "filterUnits",
    floodopacity: "floodOpacity",
    "flood-opacity": "floodOpacity",
    floodcolor: "floodColor",
    "flood-color": "floodColor",
    focusable: "focusable",
    fontfamily: "fontFamily",
    "font-family": "fontFamily",
    fontsize: "fontSize",
    "font-size": "fontSize",
    fontsizeadjust: "fontSizeAdjust",
    "font-size-adjust": "fontSizeAdjust",
    fontstretch: "fontStretch",
    "font-stretch": "fontStretch",
    fontstyle: "fontStyle",
    "font-style": "fontStyle",
    fontvariant: "fontVariant",
    "font-variant": "fontVariant",
    fontweight: "fontWeight",
    "font-weight": "fontWeight",
    format: "format",
    from: "from",
    fx: "fx",
    fy: "fy",
    g1: "g1",
    g2: "g2",
    glyphname: "glyphName",
    "glyph-name": "glyphName",
    glyphorientationhorizontal: "glyphOrientationHorizontal",
    "glyph-orientation-horizontal": "glyphOrientationHorizontal",
    glyphorientationvertical: "glyphOrientationVertical",
    "glyph-orientation-vertical": "glyphOrientationVertical",
    glyphref: "glyphRef",
    gradienttransform: "gradientTransform",
    gradientunits: "gradientUnits",
    hanging: "hanging",
    horizadvx: "horizAdvX",
    "horiz-adv-x": "horizAdvX",
    horizoriginx: "horizOriginX",
    "horiz-origin-x": "horizOriginX",
    ideographic: "ideographic",
    imagerendering: "imageRendering",
    "image-rendering": "imageRendering",
    in2: "in2",
    in: "in",
    inlist: "inlist",
    intercept: "intercept",
    k1: "k1",
    k2: "k2",
    k3: "k3",
    k4: "k4",
    k: "k",
    kernelmatrix: "kernelMatrix",
    kernelunitlength: "kernelUnitLength",
    kerning: "kerning",
    keypoints: "keyPoints",
    keysplines: "keySplines",
    keytimes: "keyTimes",
    lengthadjust: "lengthAdjust",
    letterspacing: "letterSpacing",
    "letter-spacing": "letterSpacing",
    lightingcolor: "lightingColor",
    "lighting-color": "lightingColor",
    limitingconeangle: "limitingConeAngle",
    local: "local",
    markerend: "markerEnd",
    "marker-end": "markerEnd",
    markerheight: "markerHeight",
    markermid: "markerMid",
    "marker-mid": "markerMid",
    markerstart: "markerStart",
    "marker-start": "markerStart",
    markerunits: "markerUnits",
    markerwidth: "markerWidth",
    mask: "mask",
    maskcontentunits: "maskContentUnits",
    maskunits: "maskUnits",
    mathematical: "mathematical",
    mode: "mode",
    numoctaves: "numOctaves",
    offset: "offset",
    opacity: "opacity",
    operator: "operator",
    order: "order",
    orient: "orient",
    orientation: "orientation",
    origin: "origin",
    overflow: "overflow",
    overlineposition: "overlinePosition",
    "overline-position": "overlinePosition",
    overlinethickness: "overlineThickness",
    "overline-thickness": "overlineThickness",
    paintorder: "paintOrder",
    "paint-order": "paintOrder",
    panose1: "panose1",
    "panose-1": "panose1",
    pathlength: "pathLength",
    patterncontentunits: "patternContentUnits",
    patterntransform: "patternTransform",
    patternunits: "patternUnits",
    pointerevents: "pointerEvents",
    "pointer-events": "pointerEvents",
    points: "points",
    pointsatx: "pointsAtX",
    pointsaty: "pointsAtY",
    pointsatz: "pointsAtZ",
    prefix: "prefix",
    preservealpha: "preserveAlpha",
    preserveaspectratio: "preserveAspectRatio",
    primitiveunits: "primitiveUnits",
    property: "property",
    r: "r",
    radius: "radius",
    refx: "refX",
    refy: "refY",
    renderingintent: "renderingIntent",
    "rendering-intent": "renderingIntent",
    repeatcount: "repeatCount",
    repeatdur: "repeatDur",
    requiredextensions: "requiredExtensions",
    requiredfeatures: "requiredFeatures",
    resource: "resource",
    restart: "restart",
    result: "result",
    results: "results",
    rotate: "rotate",
    rx: "rx",
    ry: "ry",
    scale: "scale",
    security: "security",
    seed: "seed",
    shaperendering: "shapeRendering",
    "shape-rendering": "shapeRendering",
    slope: "slope",
    spacing: "spacing",
    specularconstant: "specularConstant",
    specularexponent: "specularExponent",
    speed: "speed",
    spreadmethod: "spreadMethod",
    startoffset: "startOffset",
    stddeviation: "stdDeviation",
    stemh: "stemh",
    stemv: "stemv",
    stitchtiles: "stitchTiles",
    stopcolor: "stopColor",
    "stop-color": "stopColor",
    stopopacity: "stopOpacity",
    "stop-opacity": "stopOpacity",
    strikethroughposition: "strikethroughPosition",
    "strikethrough-position": "strikethroughPosition",
    strikethroughthickness: "strikethroughThickness",
    "strikethrough-thickness": "strikethroughThickness",
    string: "string",
    stroke: "stroke",
    strokedasharray: "strokeDasharray",
    "stroke-dasharray": "strokeDasharray",
    strokedashoffset: "strokeDashoffset",
    "stroke-dashoffset": "strokeDashoffset",
    strokelinecap: "strokeLinecap",
    "stroke-linecap": "strokeLinecap",
    strokelinejoin: "strokeLinejoin",
    "stroke-linejoin": "strokeLinejoin",
    strokemiterlimit: "strokeMiterlimit",
    "stroke-miterlimit": "strokeMiterlimit",
    strokewidth: "strokeWidth",
    "stroke-width": "strokeWidth",
    strokeopacity: "strokeOpacity",
    "stroke-opacity": "strokeOpacity",
    suppresscontenteditablewarning: "suppressContentEditableWarning",
    suppresshydrationwarning: "suppressHydrationWarning",
    surfacescale: "surfaceScale",
    systemlanguage: "systemLanguage",
    tablevalues: "tableValues",
    targetx: "targetX",
    targety: "targetY",
    textanchor: "textAnchor",
    "text-anchor": "textAnchor",
    textdecoration: "textDecoration",
    "text-decoration": "textDecoration",
    textlength: "textLength",
    textrendering: "textRendering",
    "text-rendering": "textRendering",
    to: "to",
    transform: "transform",
    typeof: "typeof",
    u1: "u1",
    u2: "u2",
    underlineposition: "underlinePosition",
    "underline-position": "underlinePosition",
    underlinethickness: "underlineThickness",
    "underline-thickness": "underlineThickness",
    unicode: "unicode",
    unicodebidi: "unicodeBidi",
    "unicode-bidi": "unicodeBidi",
    unicoderange: "unicodeRange",
    "unicode-range": "unicodeRange",
    unitsperem: "unitsPerEm",
    "units-per-em": "unitsPerEm",
    unselectable: "unselectable",
    valphabetic: "vAlphabetic",
    "v-alphabetic": "vAlphabetic",
    values: "values",
    vectoreffect: "vectorEffect",
    "vector-effect": "vectorEffect",
    version: "version",
    vertadvy: "vertAdvY",
    "vert-adv-y": "vertAdvY",
    vertoriginx: "vertOriginX",
    "vert-origin-x": "vertOriginX",
    vertoriginy: "vertOriginY",
    "vert-origin-y": "vertOriginY",
    vhanging: "vHanging",
    "v-hanging": "vHanging",
    videographic: "vIdeographic",
    "v-ideographic": "vIdeographic",
    viewbox: "viewBox",
    viewtarget: "viewTarget",
    visibility: "visibility",
    vmathematical: "vMathematical",
    "v-mathematical": "vMathematical",
    vocab: "vocab",
    widths: "widths",
    wordspacing: "wordSpacing",
    "word-spacing": "wordSpacing",
    writingmode: "writingMode",
    "writing-mode": "writingMode",
    x1: "x1",
    x2: "x2",
    x: "x",
    xchannelselector: "xChannelSelector",
    xheight: "xHeight",
    "x-height": "xHeight",
    xlinkactuate: "xlinkActuate",
    "xlink:actuate": "xlinkActuate",
    xlinkarcrole: "xlinkArcrole",
    "xlink:arcrole": "xlinkArcrole",
    xlinkhref: "xlinkHref",
    "xlink:href": "xlinkHref",
    xlinkrole: "xlinkRole",
    "xlink:role": "xlinkRole",
    xlinkshow: "xlinkShow",
    "xlink:show": "xlinkShow",
    xlinktitle: "xlinkTitle",
    "xlink:title": "xlinkTitle",
    xlinktype: "xlinkType",
    "xlink:type": "xlinkType",
    xmlbase: "xmlBase",
    "xml:base": "xmlBase",
    xmllang: "xmlLang",
    "xml:lang": "xmlLang",
    xmlns: "xmlns",
    "xml:space": "xmlSpace",
    xmlnsxlink: "xmlnsXlink",
    "xmlns:xlink": "xmlnsXlink",
    xmlspace: "xmlSpace",
    y1: "y1",
    y2: "y2",
    y: "y",
    ychannelselector: "yChannelSelector",
    z: "z",
    zoomandpan: "zoomAndPan",
  };

  var ariaProperties = {
    "aria-current": 0,
    // state
    "aria-details": 0,
    "aria-disabled": 0,
    // state
    "aria-hidden": 0,
    // state
    "aria-invalid": 0,
    // state
    "aria-keyshortcuts": 0,
    "aria-label": 0,
    "aria-roledescription": 0,
    // Widget Attributes
    "aria-autocomplete": 0,
    "aria-checked": 0,
    "aria-expanded": 0,
    "aria-haspopup": 0,
    "aria-level": 0,
    "aria-modal": 0,
    "aria-multiline": 0,
    "aria-multiselectable": 0,
    "aria-orientation": 0,
    "aria-placeholder": 0,
    "aria-pressed": 0,
    "aria-readonly": 0,
    "aria-required": 0,
    "aria-selected": 0,
    "aria-sort": 0,
    "aria-valuemax": 0,
    "aria-valuemin": 0,
    "aria-valuenow": 0,
    "aria-valuetext": 0,
    // Live Region Attributes
    "aria-atomic": 0,
    "aria-busy": 0,
    "aria-live": 0,
    "aria-relevant": 0,
    // Drag-and-Drop Attributes
    "aria-dropeffect": 0,
    "aria-grabbed": 0,
    // Relationship Attributes
    "aria-activedescendant": 0,
    "aria-colcount": 0,
    "aria-colindex": 0,
    "aria-colspan": 0,
    "aria-controls": 0,
    "aria-describedby": 0,
    "aria-errormessage": 0,
    "aria-flowto": 0,
    "aria-labelledby": 0,
    "aria-owns": 0,
    "aria-posinset": 0,
    "aria-rowcount": 0,
    "aria-rowindex": 0,
    "aria-rowspan": 0,
    "aria-setsize": 0,
  };

  var warnedProperties = {};
  var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
  var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  function validateProperty(tagName, name) {
    {
      if (
        hasOwnProperty$1.call(warnedProperties, name) &&
        warnedProperties[name]
      ) {
        return true;
      }

      if (rARIACamel.test(name)) {
        var ariaName = "aria-" + name.slice(4).toLowerCase();
        var correctName = ariaProperties.hasOwnProperty(ariaName)
          ? ariaName
          : null; // If this is an aria-* attribute, but is not listed in the known DOM
        // DOM properties, then it is an invalid aria-* attribute.

        if (correctName == null) {
          error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            name
          );

          warnedProperties[name] = true;
          return true;
        } // aria-* attributes should be lowercase; suggest the lowercase version.

        if (name !== correctName) {
          error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            name,
            correctName
          );

          warnedProperties[name] = true;
          return true;
        }
      }

      if (rARIA.test(name)) {
        var lowerCasedName = name.toLowerCase();
        var standardName = ariaProperties.hasOwnProperty(lowerCasedName)
          ? lowerCasedName
          : null; // If this is an aria-* attribute, but is not listed in the known DOM
        // DOM properties, then it is an invalid aria-* attribute.

        if (standardName == null) {
          warnedProperties[name] = true;
          return false;
        } // aria-* attributes should be lowercase; suggest the lowercase version.

        if (name !== standardName) {
          error(
            "Unknown ARIA attribute `%s`. Did you mean `%s`?",
            name,
            standardName
          );

          warnedProperties[name] = true;
          return true;
        }
      }
    }

    return true;
  }

  function warnInvalidARIAProps(type, props) {
    {
      var invalidProps = [];

      for (var key in props) {
        var isValid = validateProperty(type, key);

        if (!isValid) {
          invalidProps.push(key);
        }
      }

      var unknownPropString = invalidProps
        .map(function (prop) {
          return "`" + prop + "`";
        })
        .join(", ");

      if (invalidProps.length === 1) {
        error(
          "Invalid aria prop %s on <%s> tag. " +
            "For details, see https://reactjs.org/link/invalid-aria-props",
          unknownPropString,
          type
        );
      } else if (invalidProps.length > 1) {
        error(
          "Invalid aria props %s on <%s> tag. " +
            "For details, see https://reactjs.org/link/invalid-aria-props",
          unknownPropString,
          type
        );
      }
    }
  }

  function validateProperties(type, props) {
    if (isCustomComponent(type, props)) {
      return;
    }

    warnInvalidARIAProps(type, props);
  }

  var didWarnValueNull = false;
  function validateProperties$1(type, props) {
    {
      if (type !== "input" && type !== "textarea" && type !== "select") {
        return;
      }

      if (props != null && props.value === null && !didWarnValueNull) {
        didWarnValueNull = true;

        if (type === "select" && props.multiple) {
          error(
            "`value` prop on `%s` should not be null. " +
              "Consider using an empty array when `multiple` is set to `true` " +
              "to clear the component or `undefined` for uncontrolled components.",
            type
          );
        } else {
          error(
            "`value` prop on `%s` should not be null. " +
              "Consider using an empty string to clear the component or `undefined` " +
              "for uncontrolled components.",
            type
          );
        }
      }
    }
  }

  var validateProperty$1 = function () {};

  {
    var warnedProperties$1 = {};
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var EVENT_NAME_REGEX = /^on./;
    var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
    var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
    var rARIACamel$1 = new RegExp(
      "^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$"
    );

    validateProperty$1 = function (tagName, name, value, eventRegistry) {
      if (
        _hasOwnProperty.call(warnedProperties$1, name) &&
        warnedProperties$1[name]
      ) {
        return true;
      }

      var lowerCasedName = name.toLowerCase();

      if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
        error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. " +
            "All React events are normalized to bubble, so onFocusIn and onFocusOut " +
            "are not needed/supported by React."
        );

        warnedProperties$1[name] = true;
        return true;
      } // We can't rely on the event system being injected on the server.

      if (eventRegistry != null) {
        var registrationNameDependencies =
            eventRegistry.registrationNameDependencies,
          possibleRegistrationNames = eventRegistry.possibleRegistrationNames;

        if (registrationNameDependencies.hasOwnProperty(name)) {
          return true;
        }

        var registrationName = possibleRegistrationNames.hasOwnProperty(
          lowerCasedName
        )
          ? possibleRegistrationNames[lowerCasedName]
          : null;

        if (registrationName != null) {
          error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            name,
            registrationName
          );

          warnedProperties$1[name] = true;
          return true;
        }

        if (EVENT_NAME_REGEX.test(name)) {
          error(
            "Unknown event handler property `%s`. It will be ignored.",
            name
          );

          warnedProperties$1[name] = true;
          return true;
        }
      } else if (EVENT_NAME_REGEX.test(name)) {
        // If no event plugins have been injected, we are in a server environment.
        // So we can't tell if the event name is correct for sure, but we can filter
        // out known bad ones like `onclick`. We can't suggest a specific replacement though.
        if (INVALID_EVENT_NAME_REGEX.test(name)) {
          error(
            "Invalid event handler property `%s`. " +
              "React events use the camelCase naming convention, for example `onClick`.",
            name
          );
        }

        warnedProperties$1[name] = true;
        return true;
      } // Let the ARIA attribute hook validate ARIA attributes

      if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
        return true;
      }

      if (lowerCasedName === "innerhtml") {
        error(
          "Directly setting property `innerHTML` is not permitted. " +
            "For more information, lookup documentation on `dangerouslySetInnerHTML`."
        );

        warnedProperties$1[name] = true;
        return true;
      }

      if (lowerCasedName === "aria") {
        error(
          "The `aria` attribute is reserved for future use in React. " +
            "Pass individual `aria-` attributes instead."
        );

        warnedProperties$1[name] = true;
        return true;
      }

      if (
        lowerCasedName === "is" &&
        value !== null &&
        value !== undefined &&
        typeof value !== "string"
      ) {
        error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast " +
            "the value to a string.",
          typeof value
        );

        warnedProperties$1[name] = true;
        return true;
      }

      if (typeof value === "number" && isNaN(value)) {
        error(
          "Received NaN for the `%s` attribute. If this is expected, cast " +
            "the value to a string.",
          name
        );

        warnedProperties$1[name] = true;
        return true;
      }

      var propertyInfo = getPropertyInfo(name);
      var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED; // Known attributes should match the casing specified in the property config.

      if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
        var standardName = possibleStandardNames[lowerCasedName];

        if (standardName !== name) {
          error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            name,
            standardName
          );

          warnedProperties$1[name] = true;
          return true;
        }
      } else if (!isReserved && name !== lowerCasedName) {
        // Unknown attributes should have lowercase casing since that's how they
        // will be cased anyway with server rendering.
        error(
          "React does not recognize the `%s` prop on a DOM element. If you " +
            "intentionally want it to appear in the DOM as a custom " +
            "attribute, spell it as lowercase `%s` instead. " +
            "If you accidentally passed it from a parent component, remove " +
            "it from the DOM element.",
          name,
          lowerCasedName
        );

        warnedProperties$1[name] = true;
        return true;
      }

      if (
        typeof value === "boolean" &&
        shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)
      ) {
        if (value) {
          error(
            "Received `%s` for a non-boolean attribute `%s`.\n\n" +
              "If you want to write it to the DOM, pass a string instead: " +
              '%s="%s" or %s={value.toString()}.',
            value,
            name,
            name,
            value,
            name
          );
        } else {
          error(
            "Received `%s` for a non-boolean attribute `%s`.\n\n" +
              "If you want to write it to the DOM, pass a string instead: " +
              '%s="%s" or %s={value.toString()}.\n\n' +
              "If you used to conditionally omit it with %s={condition && value}, " +
              "pass %s={condition ? value : undefined} instead.",
            value,
            name,
            name,
            value,
            name,
            name,
            name
          );
        }

        warnedProperties$1[name] = true;
        return true;
      } // Now that we've validated casing, do not validate
      // data types for reserved props

      if (isReserved) {
        return true;
      } // Warn when a known attribute is a bad type

      if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
        warnedProperties$1[name] = true;
        return false;
      } // Warn when passing the strings 'false' or 'true' into a boolean prop

      if (
        (value === "false" || value === "true") &&
        propertyInfo !== null &&
        propertyInfo.type === BOOLEAN
      ) {
        error(
          "Received the string `%s` for the boolean attribute `%s`. " +
            "%s " +
            "Did you mean %s={%s}?",
          value,
          name,
          value === "false"
            ? "The browser will interpret it as a truthy value."
            : 'Although this works, it will not work as expected if you pass the string "false".',
          name,
          value
        );

        warnedProperties$1[name] = true;
        return true;
      }

      return true;
    };
  }

  var warnUnknownProperties = function (type, props, eventRegistry) {
    {
      var unknownProps = [];

      for (var key in props) {
        var isValid = validateProperty$1(type, key, props[key], eventRegistry);

        if (!isValid) {
          unknownProps.push(key);
        }
      }

      var unknownPropString = unknownProps
        .map(function (prop) {
          return "`" + prop + "`";
        })
        .join(", ");

      if (unknownProps.length === 1) {
        error(
          "Invalid value for prop %s on <%s> tag. Either remove it from the element, " +
            "or pass a string or number value to keep it in the DOM. " +
            "For details, see https://reactjs.org/link/attribute-behavior ",
          unknownPropString,
          type
        );
      } else if (unknownProps.length > 1) {
        error(
          "Invalid values for props %s on <%s> tag. Either remove them from the element, " +
            "or pass a string or number value to keep them in the DOM. " +
            "For details, see https://reactjs.org/link/attribute-behavior ",
          unknownPropString,
          type
        );
      }
    }
  };

  function validateProperties$2(type, props, eventRegistry) {
    if (isCustomComponent(type, props)) {
      return;
    }

    warnUnknownProperties(type, props, eventRegistry);
  }

  var IS_EVENT_HANDLE_NON_MANAGED_NODE = 1;
  var IS_NON_DELEGATED = 1 << 1;
  var IS_CAPTURE_PHASE = 1 << 2;
  var IS_REPLAYED = 1 << 4;
  // set to LEGACY_FB_SUPPORT. LEGACY_FB_SUPPORT only gets set when
  // we call willDeferLaterForLegacyFBSupport, thus not bailing out
  // will result in endless cycles like an infinite loop.
  // We also don't want to defer during event replaying.

  var SHOULD_NOT_PROCESS_POLYFILL_EVENT_PLUGINS =
    IS_EVENT_HANDLE_NON_MANAGED_NODE | IS_NON_DELEGATED | IS_CAPTURE_PHASE;

  /**
   * Gets the target node from a native browser event by accounting for
   * inconsistencies in browser DOM APIs.
   *
   * @param {object} nativeEvent Native browser event.
   * @return {DOMEventTarget} Target node.
   */

  function getEventTarget(nativeEvent) {
    // Fallback to nativeEvent.srcElement for IE9
    // https://github.com/facebook/react/issues/12506
    var target = nativeEvent.target || nativeEvent.srcElement || window; // Normalize SVG <use> element events #4963

    if (target.correspondingUseElement) {
      target = target.correspondingUseElement;
    } // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
    // @see http://www.quirksmode.org/js/events_properties.html

    return target.nodeType === TEXT_NODE ? target.parentNode : target;
  }

  var restoreImpl = null;
  var restoreTarget = null;
  var restoreQueue = null;

  function restoreStateOfTarget(target) {
    // We perform this translation at the end of the event loop so that we
    // always receive the correct fiber here
    var internalInstance = getInstanceFromNode(target);

    if (!internalInstance) {
      // Unmounted
      return;
    }

    if (!(typeof restoreImpl === "function")) {
      {
        throw Error(
          "setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue."
        );
      }
    }

    var stateNode = internalInstance.stateNode; // Guard against Fiber being unmounted.

    if (stateNode) {
      var _props = getFiberCurrentPropsFromNode(stateNode);

      restoreImpl(internalInstance.stateNode, internalInstance.type, _props);
    }
  }

  function setRestoreImplementation(impl) {
    restoreImpl = impl;
  }
  function enqueueStateRestore(target) {
    if (restoreTarget) {
      if (restoreQueue) {
        restoreQueue.push(target);
      } else {
        restoreQueue = [target];
      }
    } else {
      restoreTarget = target;
    }
  }
  function needsStateRestore() {
    return restoreTarget !== null || restoreQueue !== null;
  }
  function restoreStateIfNeeded() {
    if (!restoreTarget) {
      return;
    }

    var target = restoreTarget;
    var queuedTargets = restoreQueue;
    restoreTarget = null;
    restoreQueue = null;
    restoreStateOfTarget(target);

    if (queuedTargets) {
      for (var i = 0; i < queuedTargets.length; i++) {
        restoreStateOfTarget(queuedTargets[i]);
      }
    }
  }

  // the renderer. Such as when we're dispatching events or if third party
  // libraries need to call batchedUpdates. Eventually, this API will go away when
  // everything is batched by default. We'll then have a similar API to opt-out of
  // scheduled work and instead do synchronous work.
  // Defaults

  var batchedUpdatesImpl = function (fn, bookkeeping) {
    return fn(bookkeeping);
  };

  var discreteUpdatesImpl = function (fn, a, b, c, d) {
    return fn(a, b, c, d);
  };

  var flushDiscreteUpdatesImpl = function () {};

  var batchedEventUpdatesImpl = batchedUpdatesImpl;
  var isInsideEventHandler = false;
  var isBatchingEventUpdates = false;

  function finishEventHandler() {
    // Here we wait until all updates have propagated, which is important
    // when using controlled components within layers:
    // https://github.com/facebook/react/issues/1698
    // Then we restore state of any controlled component.
    var controlledComponentsHavePendingUpdates = needsStateRestore();

    if (controlledComponentsHavePendingUpdates) {
      // If a controlled event was fired, we may need to restore the state of
      // the DOM node back to the controlled value. This is necessary when React
      // bails out of the update without touching the DOM.
      flushDiscreteUpdatesImpl();
      restoreStateIfNeeded();
    }
  }

  function batchedUpdates(fn, bookkeeping) {
    if (isInsideEventHandler) {
      // If we are currently inside another batch, we need to wait until it
      // fully completes before restoring state.
      return fn(bookkeeping);
    }

    isInsideEventHandler = true;

    try {
      return batchedUpdatesImpl(fn, bookkeeping);
    } finally {
      isInsideEventHandler = false;
      finishEventHandler();
    }
  }
  function batchedEventUpdates(fn, a, b) {
    if (isBatchingEventUpdates) {
      // If we are currently inside another batch, we need to wait until it
      // fully completes before restoring state.
      return fn(a, b);
    }

    isBatchingEventUpdates = true;

    try {
      return batchedEventUpdatesImpl(fn, a, b);
    } finally {
      isBatchingEventUpdates = false;
      finishEventHandler();
    }
  }
  function discreteUpdates(fn, a, b, c, d) {
    var prevIsInsideEventHandler = isInsideEventHandler;
    isInsideEventHandler = true;

    try {
      return discreteUpdatesImpl(fn, a, b, c, d);
    } finally {
      isInsideEventHandler = prevIsInsideEventHandler;

      if (!isInsideEventHandler) {
        finishEventHandler();
      }
    }
  }
  function flushDiscreteUpdatesIfNeeded(timeStamp) {
    {
      if (!isInsideEventHandler) {
        flushDiscreteUpdatesImpl();
      }
    }
  }
  function setBatchingImplementation(
    _batchedUpdatesImpl,
    _discreteUpdatesImpl,
    _flushDiscreteUpdatesImpl,
    _batchedEventUpdatesImpl
  ) {
    batchedUpdatesImpl = _batchedUpdatesImpl;
    discreteUpdatesImpl = _discreteUpdatesImpl;
    flushDiscreteUpdatesImpl = _flushDiscreteUpdatesImpl;
    batchedEventUpdatesImpl = _batchedEventUpdatesImpl;
  }

  function isInteractive(tag) {
    return (
      tag === "button" ||
      tag === "input" ||
      tag === "select" ||
      tag === "textarea"
    );
  }

  function shouldPreventMouseEvent(name, type, props) {
    switch (name) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        return !!(props.disabled && isInteractive(type));

      default:
        return false;
    }
  }
  /**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */

  function getListener(inst, registrationName) {
    var stateNode = inst.stateNode;

    if (stateNode === null) {
      // Work in progress (ex: onload events in incremental mode).
      return null;
    }

    var props = getFiberCurrentPropsFromNode(stateNode);

    if (props === null) {
      // Work in progress.
      return null;
    }

    var listener = props[registrationName];

    if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
      return null;
    }

    if (!(!listener || typeof listener === "function")) {
      {
        throw Error(
          "Expected `" +
            registrationName +
            "` listener to be a function, instead got a value of `" +
            typeof listener +
            "` type."
        );
      }
    }

    return listener;
  }

  var passiveBrowserEventsSupported = false; // Check if browser support events with passive listeners
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support

  if (canUseDOM) {
    try {
      var options = {}; // $FlowFixMe: Ignore Flow complaining about needing a value

      Object.defineProperty(options, "passive", {
        get: function () {
          passiveBrowserEventsSupported = true;
        },
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (e) {
      passiveBrowserEventsSupported = false;
    }
  }

  function invokeGuardedCallbackProd(name, func, context, a, b, c, d, e, f) {
    var funcArgs = Array.prototype.slice.call(arguments, 3);

    try {
      func.apply(context, funcArgs);
    } catch (error) {
      this.onError(error);
    }
  }

  var invokeGuardedCallbackImpl = invokeGuardedCallbackProd;

  {
    // In DEV mode, we swap out invokeGuardedCallback for a special version
    // that plays more nicely with the browser's DevTools. The idea is to preserve
    // "Pause on exceptions" behavior. Because React wraps all user-provided
    // functions in invokeGuardedCallback, and the production version of
    // invokeGuardedCallback uses a try-catch, all user exceptions are treated
    // like caught exceptions, and the DevTools won't pause unless the developer
    // takes the extra step of enabling pause on caught exceptions. This is
    // unintuitive, though, because even though React has caught the error, from
    // the developer's perspective, the error is uncaught.
    //
    // To preserve the expected "Pause on exceptions" behavior, we don't use a
    // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
    // DOM node, and call the user-provided callback from inside an event handler
    // for that fake event. If the callback throws, the error is "captured" using
    // a global event handler. But because the error happens in a different
    // event loop context, it does not interrupt the normal program flow.
    // Effectively, this gives us try-catch behavior without actually using
    // try-catch. Neat!
    // Check that the browser supports the APIs we need to implement our special
    // DEV version of invokeGuardedCallback
    if (
      typeof window !== "undefined" &&
      typeof window.dispatchEvent === "function" &&
      typeof document !== "undefined" &&
      typeof document.createEvent === "function"
    ) {
      var fakeNode = document.createElement("react");

      invokeGuardedCallbackImpl = function invokeGuardedCallbackDev(
        name,
        func,
        context,
        a,
        b,
        c,
        d,
        e,
        f
      ) {
        // If document doesn't exist we know for sure we will crash in this method
        // when we call document.createEvent(). However this can cause confusing
        // errors: https://github.com/facebookincubator/create-react-app/issues/3482
        // So we preemptively throw with a better message instead.
        if (!(typeof document !== "undefined")) {
          {
            throw Error(
              "The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous."
            );
          }
        }

        var evt = document.createEvent("Event");
        var didCall = false; // Keeps track of whether the user-provided callback threw an error. We
        // set this to true at the beginning, then set it to false right after
        // calling the function. If the function errors, `didError` will never be
        // set to false. This strategy works even if the browser is flaky and
        // fails to call our global error handler, because it doesn't rely on
        // the error event at all.

        var didError = true; // Keeps track of the value of window.event so that we can reset it
        // during the callback to let user code access window.event in the
        // browsers that support it.

        var windowEvent = window.event; // Keeps track of the descriptor of window.event to restore it after event
        // dispatching: https://github.com/facebook/react/issues/13688

        var windowEventDescriptor = Object.getOwnPropertyDescriptor(
          window,
          "event"
        );

        function restoreAfterDispatch() {
          // We immediately remove the callback from event listeners so that
          // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
          // nested call would trigger the fake event handlers of any call higher
          // in the stack.
          fakeNode.removeEventListener(evtType, callCallback, false); // We check for window.hasOwnProperty('event') to prevent the
          // window.event assignment in both IE <= 10 as they throw an error
          // "Member not found" in strict mode, and in Firefox which does not
          // support window.event.

          if (
            typeof window.event !== "undefined" &&
            window.hasOwnProperty("event")
          ) {
            window.event = windowEvent;
          }
        } // Create an event handler for our fake event. We will synchronously
        // dispatch our fake event using `dispatchEvent`. Inside the handler, we
        // call the user-provided callback.

        var funcArgs = Array.prototype.slice.call(arguments, 3);

        function callCallback() {
          didCall = true;
          restoreAfterDispatch();
          func.apply(context, funcArgs);
          didError = false;
        } // Create a global error event handler. We use this to capture the value
        // that was thrown. It's possible that this error handler will fire more
        // than once; for example, if non-React code also calls `dispatchEvent`
        // and a handler for that event throws. We should be resilient to most of
        // those cases. Even if our error event handler fires more than once, the
        // last error event is always used. If the callback actually does error,
        // we know that the last error event is the correct one, because it's not
        // possible for anything else to have happened in between our callback
        // erroring and the code that follows the `dispatchEvent` call below. If
        // the callback doesn't error, but the error event was fired, we know to
        // ignore it because `didError` will be false, as described above.

        var error; // Use this to track whether the error event is ever called.

        var didSetError = false;
        var isCrossOriginError = false;

        function handleWindowError(event) {
          error = event.error;
          didSetError = true;

          if (error === null && event.colno === 0 && event.lineno === 0) {
            isCrossOriginError = true;
          }

          if (event.defaultPrevented) {
            // Some other error handler has prevented default.
            // Browsers silence the error report if this happens.
            // We'll remember this to later decide whether to log it or not.
            if (error != null && typeof error === "object") {
              try {
                error._suppressLogging = true;
              } catch (inner) {
                // Ignore.
              }
            }
          }
        } // Create a fake event type.

        var evtType = "react-" + (name ? name : "invokeguardedcallback"); // Attach our event handlers

        window.addEventListener("error", handleWindowError);
        fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function
        // errors, it will trigger our global error handler.

        evt.initEvent(evtType, false, false);
        fakeNode.dispatchEvent(evt);

        if (windowEventDescriptor) {
          Object.defineProperty(window, "event", windowEventDescriptor);
        }

        if (didCall && didError) {
          if (!didSetError) {
            // The callback errored, but the error event never fired.
            error = new Error(
              "An error was thrown inside one of your components, but React " +
                "doesn't know what it was. This is likely due to browser " +
                'flakiness. React does its best to preserve the "Pause on ' +
                'exceptions" behavior of the DevTools, which requires some ' +
                "DEV-mode only tricks. It's possible that these don't work in " +
                "your browser. Try triggering the error in production mode, " +
                "or switching to a modern browser. If you suspect that this is " +
                "actually an issue with React, please file an issue."
            );
          } else if (isCrossOriginError) {
            error = new Error(
              "A cross-origin error was thrown. React doesn't have access to " +
                "the actual error object in development. " +
                "See https://reactjs.org/link/crossorigin-error for more information."
            );
          }

          this.onError(error);
        } // Remove our event listeners

        window.removeEventListener("error", handleWindowError);

        if (!didCall) {
          // Something went really wrong, and our event was not dispatched.
          // https://github.com/facebook/react/issues/16734
          // https://github.com/facebook/react/issues/16585
          // Fall back to the production implementation.
          restoreAfterDispatch();
          return invokeGuardedCallbackProd.apply(this, arguments);
        }
      };
    }
  }

  var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;

  var hasError = false;
  var caughtError = null; // Used by event system to capture/rethrow the first error.

  var hasRethrowError = false;
  var rethrowError = null;
  var reporter = {
    onError: function (error) {
      hasError = true;
      caughtError = error;
    },
  };
  /**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * In production, this is implemented using a try-catch. The reason we don't
   * use a try-catch directly is so that we can swap out a different
   * implementation in DEV mode.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */

  function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
    hasError = false;
    caughtError = null;
    invokeGuardedCallbackImpl$1.apply(reporter, arguments);
  }
  /**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   * TODO: See if caughtError and rethrowError can be unified.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */

  function invokeGuardedCallbackAndCatchFirstError(
    name,
    func,
    context,
    a,
    b,
    c,
    d,
    e,
    f
  ) {
    invokeGuardedCallback.apply(this, arguments);

    if (hasError) {
      var error = clearCaughtError();

      if (!hasRethrowError) {
        hasRethrowError = true;
        rethrowError = error;
      }
    }
  }
  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */

  function rethrowCaughtError() {
    if (hasRethrowError) {
      var error = rethrowError;
      hasRethrowError = false;
      rethrowError = null;
      throw error;
    }
  }
  function hasCaughtError() {
    return hasError;
  }
  function clearCaughtError() {
    if (hasError) {
      var error = caughtError;
      hasError = false;
      caughtError = null;
      return error;
    } else {
      {
        {
          throw Error(
            "clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue."
          );
        }
      }
    }
  }

  var ReactInternals$1 =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var _ReactInternals$Sched = ReactInternals$1.Scheduler,
    unstable_cancelCallback = _ReactInternals$Sched.unstable_cancelCallback,
    unstable_now = _ReactInternals$Sched.unstable_now,
    unstable_scheduleCallback = _ReactInternals$Sched.unstable_scheduleCallback,
    unstable_shouldYield = _ReactInternals$Sched.unstable_shouldYield,
    unstable_requestPaint = _ReactInternals$Sched.unstable_requestPaint,
    unstable_getFirstCallbackNode =
      _ReactInternals$Sched.unstable_getFirstCallbackNode,
    unstable_runWithPriority = _ReactInternals$Sched.unstable_runWithPriority,
    unstable_next = _ReactInternals$Sched.unstable_next,
    unstable_continueExecution =
      _ReactInternals$Sched.unstable_continueExecution,
    unstable_pauseExecution = _ReactInternals$Sched.unstable_pauseExecution,
    unstable_getCurrentPriorityLevel =
      _ReactInternals$Sched.unstable_getCurrentPriorityLevel,
    unstable_ImmediatePriority =
      _ReactInternals$Sched.unstable_ImmediatePriority,
    unstable_UserBlockingPriority =
      _ReactInternals$Sched.unstable_UserBlockingPriority,
    unstable_NormalPriority = _ReactInternals$Sched.unstable_NormalPriority,
    unstable_LowPriority = _ReactInternals$Sched.unstable_LowPriority,
    unstable_IdlePriority = _ReactInternals$Sched.unstable_IdlePriority,
    unstable_forceFrameRate = _ReactInternals$Sched.unstable_forceFrameRate,
    unstable_flushAllWithoutAsserting =
      _ReactInternals$Sched.unstable_flushAllWithoutAsserting;

  /**
   * `ReactInstanceMap` maintains a mapping from a public facing stateful
   * instance (key) and the internal representation (value). This allows public
   * methods to accept the user facing instance as an argument and map them back
   * to internal methods.
   *
   * Note that this module is currently shared and assumed to be stateless.
   * If this becomes an actual Map, that will break.
   */
  function get(key) {
    return key._reactInternals;
  }
  function has(key) {
    return key._reactInternals !== undefined;
  }
  function set(key, value) {
    key._reactInternals = value;
  }

  // Don't change these two values. They're used by React Dev Tools.
  var NoFlags =
    /*                      */
    0;
  var PerformedWork =
    /*                */
    1; // You can change the rest (and add more).

  var Placement =
    /*                    */
    2;
  var Update =
    /*                       */
    4;
  var PlacementAndUpdate =
    /*           */
    6;
  var Deletion =
    /*                     */
    8;
  var ContentReset =
    /*                 */
    16;
  var Callback =
    /*                     */
    32;
  var DidCapture =
    /*                   */
    64;
  var Ref =
    /*                          */
    128;
  var Snapshot =
    /*                     */
    256;
  var Passive =
    /*                      */
    512; // TODO (effects) Remove this bit once the new reconciler is synced to the old.

  var PassiveUnmountPendingDev =
    /*     */
    8192;
  var Hydrating =
    /*                    */
    1024;
  var HydratingAndUpdate =
    /*           */
    1028; // Passive & Update & Callback & Ref & Snapshot

  var LifecycleEffectMask =
    /*          */
    932; // Union of all host effects

  var HostEffectMask =
    /*               */
    2047; // These are not really side effects, but we still reuse this field.

  var Incomplete =
    /*                   */
    2048;
  var ShouldCapture =
    /*                */
    4096;
  var ForceUpdateForLegacySuspense =
    /* */
    16384; // Static tags describe aspects of a fiber that are not specific to a render,

  var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
  function getNearestMountedFiber(fiber) {
    var node = fiber;
    var nearestMounted = fiber;

    if (!fiber.alternate) {
      // If there is no alternate, this might be a new tree that isn't inserted
      // yet. If it is, then it will have a pending insertion effect on it.
      var nextNode = node;

      do {
        node = nextNode;

        if ((node.flags & (Placement | Hydrating)) !== NoFlags) {
          // This is an insertion or in-progress hydration. The nearest possible
          // mounted fiber is the parent but we need to continue to figure out
          // if that one is still mounted.
          nearestMounted = node.return;
        }

        nextNode = node.return;
      } while (nextNode);
    } else {
      while (node.return) {
        node = node.return;
      }
    }

    if (node.tag === HostRoot) {
      // TODO: Check if this was a nested HostRoot when used with
      // renderContainerIntoSubtree.
      return nearestMounted;
    } // If we didn't hit the root, that means that we're in an disconnected tree
    // that has been unmounted.

    return null;
  }
  function getSuspenseInstanceFromFiber(fiber) {
    if (fiber.tag === SuspenseComponent) {
      var suspenseState = fiber.memoizedState;

      if (suspenseState === null) {
        var current = fiber.alternate;

        if (current !== null) {
          suspenseState = current.memoizedState;
        }
      }

      if (suspenseState !== null) {
        return suspenseState.dehydrated;
      }
    }

    return null;
  }
  function getContainerFromFiber(fiber) {
    return fiber.tag === HostRoot ? fiber.stateNode.containerInfo : null;
  }
  function isFiberMounted(fiber) {
    return getNearestMountedFiber(fiber) === fiber;
  }
  function isMounted(component) {
    {
      var owner = ReactCurrentOwner.current;

      if (owner !== null && owner.tag === ClassComponent) {
        var ownerFiber = owner;
        var instance = ownerFiber.stateNode;

        if (!instance._warnedAboutRefsInRender) {
          error(
            "%s is accessing isMounted inside its render() function. " +
              "render() should be a pure function of props and state. It should " +
              "never access something that requires stale data from the previous " +
              "render, such as refs. Move this logic to componentDidMount and " +
              "componentDidUpdate instead.",
            getComponentName(ownerFiber.type) || "A component"
          );
        }

        instance._warnedAboutRefsInRender = true;
      }
    }

    var fiber = get(component);

    if (!fiber) {
      return false;
    }

    return getNearestMountedFiber(fiber) === fiber;
  }

  function assertIsMounted(fiber) {
    if (!(getNearestMountedFiber(fiber) === fiber)) {
      {
        throw Error("Unable to find node on an unmounted component.");
      }
    }
  }

  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;

    if (!alternate) {
      // If there is no alternate, then we only need to check if it is mounted.
      var nearestMounted = getNearestMountedFiber(fiber);

      if (!(nearestMounted !== null)) {
        {
          throw Error("Unable to find node on an unmounted component.");
        }
      }

      if (nearestMounted !== fiber) {
        return null;
      }

      return fiber;
    } // If we have two possible branches, we'll walk backwards up to the root
    // to see what path the root points to. On the way we may hit one of the
    // special cases and we'll deal with them.

    var a = fiber;
    var b = alternate;

    while (true) {
      var parentA = a.return;

      if (parentA === null) {
        // We're at the root.
        break;
      }

      var parentB = parentA.alternate;

      if (parentB === null) {
        // There is no alternate. This is an unusual case. Currently, it only
        // happens when a Suspense component is hidden. An extra fragment fiber
        // is inserted in between the Suspense fiber and its children. Skip
        // over this extra fragment fiber and proceed to the next parent.
        var nextParent = parentA.return;

        if (nextParent !== null) {
          a = b = nextParent;
          continue;
        } // If there's no parent, we're at the root.

        break;
      } // If both copies of the parent fiber point to the same child, we can
      // assume that the child is current. This happens when we bailout on low
      // priority: the bailed out fiber's child reuses the current child.

      if (parentA.child === parentB.child) {
        var child = parentA.child;

        while (child) {
          if (child === a) {
            // We've determined that A is the current branch.
            assertIsMounted(parentA);
            return fiber;
          }

          if (child === b) {
            // We've determined that B is the current branch.
            assertIsMounted(parentA);
            return alternate;
          }

          child = child.sibling;
        } // We should never have an alternate for any mounting node. So the only
        // way this could possibly happen is if this was unmounted, if at all.

        {
          {
            throw Error("Unable to find node on an unmounted component.");
          }
        }
      }

      if (a.return !== b.return) {
        // The return pointer of A and the return pointer of B point to different
        // fibers. We assume that return pointers never criss-cross, so A must
        // belong to the child set of A.return, and B must belong to the child
        // set of B.return.
        a = parentA;
        b = parentB;
      } else {
        // The return pointers point to the same fiber. We'll have to use the
        // default, slow path: scan the child sets of each parent alternate to see
        // which child belongs to which set.
        //
        // Search parent A's child set
        var didFindChild = false;
        var _child = parentA.child;

        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }

          if (_child === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }

          _child = _child.sibling;
        }

        if (!didFindChild) {
          // Search parent B's child set
          _child = parentB.child;

          while (_child) {
            if (_child === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }

            if (_child === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }

            _child = _child.sibling;
          }

          if (!didFindChild) {
            {
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
            }
          }
        }
      }

      if (!(a.alternate === b)) {
        {
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
        }
      }
    } // If the root is not a host container, we're in a disconnected tree. I.e.
    // unmounted.

    if (!(a.tag === HostRoot)) {
      {
        throw Error("Unable to find node on an unmounted component.");
      }
    }

    if (a.stateNode.current === a) {
      // We've determined that A is the current branch.
      return fiber;
    } // Otherwise B has to be current branch.

    return alternate;
  }
  function findCurrentHostFiber(parent) {
    var currentParent = findCurrentFiberUsingSlowPath(parent);

    if (!currentParent) {
      return null;
    } // Next we'll drill down this component to find the first HostComponent/Text.

    var node = currentParent;

    while (true) {
      if (node.tag === HostComponent || node.tag === HostText) {
        return node;
      } else if (node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === currentParent) {
        return null;
      }

      while (!node.sibling) {
        if (!node.return || node.return === currentParent) {
          return null;
        }

        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    } // Flow needs the return null here, but ESLint complains about it.
    // eslint-disable-next-line no-unreachable

    return null;
  }
  function findCurrentHostFiberWithNoPortals(parent) {
    var currentParent = findCurrentFiberUsingSlowPath(parent);

    if (!currentParent) {
      return null;
    } // Next we'll drill down this component to find the first HostComponent/Text.

    var node = currentParent;

    while (true) {
      if (
        node.tag === HostComponent ||
        node.tag === HostText ||
        enableFundamentalAPI
      ) {
        return node;
      } else if (node.child && node.tag !== HostPortal) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === currentParent) {
        return null;
      }

      while (!node.sibling) {
        if (!node.return || node.return === currentParent) {
          return null;
        }

        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    } // Flow needs the return null here, but ESLint complains about it.
    // eslint-disable-next-line no-unreachable

    return null;
  }
  function doesFiberContain(parentFiber, childFiber) {
    var node = childFiber;
    var parentFiberAlternate = parentFiber.alternate;

    while (node !== null) {
      if (node === parentFiber || node === parentFiberAlternate) {
        return true;
      }

      node = node.return;
    }

    return false;
  }

  var attemptUserBlockingHydration;
  function setAttemptUserBlockingHydration(fn) {
    attemptUserBlockingHydration = fn;
  }
  var attemptContinuousHydration;
  function setAttemptContinuousHydration(fn) {
    attemptContinuousHydration = fn;
  }
  var attemptHydrationAtCurrentPriority;
  function setAttemptHydrationAtCurrentPriority(fn) {
    attemptHydrationAtCurrentPriority = fn;
  }
  var attemptHydrationAtPriority;
  function setAttemptHydrationAtPriority(fn) {
    attemptHydrationAtPriority = fn;
  } // TODO: Upgrade this definition once we're on a newer version of Flow that
  var hasScheduledReplayAttempt = false; // The queue of discrete events to be replayed.

  var queuedDiscreteEvents = []; // Indicates if any continuous event targets are non-null for early bailout.
  // if the last target was dehydrated.

  var queuedFocus = null;
  var queuedDrag = null;
  var queuedMouse = null; // For pointer events there can be one latest event per pointerId.

  var queuedPointers = new Map();
  var queuedPointerCaptures = new Map(); // We could consider replaying selectionchange and touchmoves too.

  var queuedExplicitHydrationTargets = [];
  function hasQueuedDiscreteEvents() {
    return queuedDiscreteEvents.length > 0;
  }
  var discreteReplayableEvents = [
    "mousedown",
    "mouseup",
    "touchcancel",
    "touchend",
    "touchstart",
    "auxclick",
    "dblclick",
    "pointercancel",
    "pointerdown",
    "pointerup",
    "dragend",
    "dragstart",
    "drop",
    "compositionend",
    "compositionstart",
    "keydown",
    "keypress",
    "keyup",
    "input",
    "textInput", // Intentionally camelCase
    "copy",
    "cut",
    "paste",
    "click",
    "change",
    "contextmenu",
    "reset",
    "submit",
  ];
  function isReplayableDiscreteEvent(eventType) {
    return discreteReplayableEvents.indexOf(eventType) > -1;
  }

  function createQueuedReplayableEvent(
    blockedOn,
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  ) {
    return {
      blockedOn: blockedOn,
      domEventName: domEventName,
      eventSystemFlags: eventSystemFlags | IS_REPLAYED,
      nativeEvent: nativeEvent,
      targetContainers: [targetContainer],
    };
  }

  function queueDiscreteEvent(
    blockedOn,
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  ) {
    var queuedEvent = createQueuedReplayableEvent(
      blockedOn,
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    );
    queuedDiscreteEvents.push(queuedEvent);
  } // Resets the replaying for this type of continuous event to no event.

  function clearIfContinuousEvent(domEventName, nativeEvent) {
    switch (domEventName) {
      case "focusin":
      case "focusout":
        queuedFocus = null;
        break;

      case "dragenter":
      case "dragleave":
        queuedDrag = null;
        break;

      case "mouseover":
      case "mouseout":
        queuedMouse = null;
        break;

      case "pointerover":
      case "pointerout": {
        var pointerId = nativeEvent.pointerId;
        queuedPointers.delete(pointerId);
        break;
      }

      case "gotpointercapture":
      case "lostpointercapture": {
        var _pointerId = nativeEvent.pointerId;
        queuedPointerCaptures.delete(_pointerId);
        break;
      }
    }
  }

  function accumulateOrCreateContinuousQueuedReplayableEvent(
    existingQueuedEvent,
    blockedOn,
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  ) {
    if (
      existingQueuedEvent === null ||
      existingQueuedEvent.nativeEvent !== nativeEvent
    ) {
      var queuedEvent = createQueuedReplayableEvent(
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      );

      if (blockedOn !== null) {
        var _fiber2 = getInstanceFromNode(blockedOn);

        if (_fiber2 !== null) {
          // Attempt to increase the priority of this target.
          attemptContinuousHydration(_fiber2);
        }
      }

      return queuedEvent;
    } // If we have already queued this exact event, then it's because
    // the different event systems have different DOM event listeners.
    // We can accumulate the flags, and the targetContainers, and
    // store a single event to be replayed.

    existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
    var targetContainers = existingQueuedEvent.targetContainers;

    if (
      targetContainer !== null &&
      targetContainers.indexOf(targetContainer) === -1
    ) {
      targetContainers.push(targetContainer);
    }

    return existingQueuedEvent;
  }

  function queueIfContinuousEvent(
    blockedOn,
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  ) {
    // These set relatedTarget to null because the replayed event will be treated as if we
    // moved from outside the window (no target) onto the target once it hydrates.
    // Instead of mutating we could clone the event.
    switch (domEventName) {
      case "focusin": {
        var focusEvent = nativeEvent;
        queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedFocus,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          focusEvent
        );
        return true;
      }

      case "dragenter": {
        var dragEvent = nativeEvent;
        queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedDrag,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          dragEvent
        );
        return true;
      }

      case "mouseover": {
        var mouseEvent = nativeEvent;
        queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedMouse,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          mouseEvent
        );
        return true;
      }

      case "pointerover": {
        var pointerEvent = nativeEvent;
        var pointerId = pointerEvent.pointerId;
        queuedPointers.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointers.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            pointerEvent
          )
        );
        return true;
      }

      case "gotpointercapture": {
        var _pointerEvent = nativeEvent;
        var _pointerId2 = _pointerEvent.pointerId;
        queuedPointerCaptures.set(
          _pointerId2,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointerCaptures.get(_pointerId2) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            _pointerEvent
          )
        );
        return true;
      }
    }

    return false;
  } // Check if this target is unblocked. Returns true if it's unblocked.

  function attemptExplicitHydrationTarget(queuedTarget) {
    // TODO: This function shares a lot of logic with attemptToDispatchEvent.
    // Try to unify them. It's a bit tricky since it would require two return
    // values.
    var targetInst = getClosestInstanceFromNode(queuedTarget.target);

    if (targetInst !== null) {
      var nearestMounted = getNearestMountedFiber(targetInst);

      if (nearestMounted !== null) {
        var tag = nearestMounted.tag;

        if (tag === SuspenseComponent) {
          var instance = getSuspenseInstanceFromFiber(nearestMounted);

          if (instance !== null) {
            // We're blocked on hydrating this boundary.
            // Increase its priority.
            queuedTarget.blockedOn = instance;
            attemptHydrationAtPriority(queuedTarget.lanePriority, function () {
              unstable_runWithPriority(queuedTarget.priority, function () {
                attemptHydrationAtCurrentPriority(nearestMounted);
              });
            });
            return;
          }
        } else if (tag === HostRoot) {
          var root = nearestMounted.stateNode;

          if (root.hydrate) {
            queuedTarget.blockedOn = getContainerFromFiber(nearestMounted); // We don't currently have a way to increase the priority of
            // a root other than sync.

            return;
          }
        }
      }
    }

    queuedTarget.blockedOn = null;
  }

  function attemptReplayContinuousQueuedEvent(queuedEvent) {
    if (queuedEvent.blockedOn !== null) {
      return false;
    }

    var targetContainers = queuedEvent.targetContainers;

    while (targetContainers.length > 0) {
      var targetContainer = targetContainers[0];
      var nextBlockedOn = attemptToDispatchEvent(
        queuedEvent.domEventName,
        queuedEvent.eventSystemFlags,
        targetContainer,
        queuedEvent.nativeEvent
      );

      if (nextBlockedOn !== null) {
        // We're still blocked. Try again later.
        var _fiber3 = getInstanceFromNode(nextBlockedOn);

        if (_fiber3 !== null) {
          attemptContinuousHydration(_fiber3);
        }

        queuedEvent.blockedOn = nextBlockedOn;
        return false;
      } // This target container was successfully dispatched. Try the next.

      targetContainers.shift();
    }

    return true;
  }

  function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
    if (attemptReplayContinuousQueuedEvent(queuedEvent)) {
      map.delete(key);
    }
  }

  function replayUnblockedEvents() {
    hasScheduledReplayAttempt = false; // First replay discrete events.

    while (queuedDiscreteEvents.length > 0) {
      var nextDiscreteEvent = queuedDiscreteEvents[0];

      if (nextDiscreteEvent.blockedOn !== null) {
        // We're still blocked.
        // Increase the priority of this boundary to unblock
        // the next discrete event.
        var _fiber4 = getInstanceFromNode(nextDiscreteEvent.blockedOn);

        if (_fiber4 !== null) {
          attemptUserBlockingHydration(_fiber4);
        }

        break;
      }

      var targetContainers = nextDiscreteEvent.targetContainers;

      while (targetContainers.length > 0) {
        var targetContainer = targetContainers[0];
        var nextBlockedOn = attemptToDispatchEvent(
          nextDiscreteEvent.domEventName,
          nextDiscreteEvent.eventSystemFlags,
          targetContainer,
          nextDiscreteEvent.nativeEvent
        );

        if (nextBlockedOn !== null) {
          // We're still blocked. Try again later.
          nextDiscreteEvent.blockedOn = nextBlockedOn;
          break;
        } // This target container was successfully dispatched. Try the next.

        targetContainers.shift();
      }

      if (nextDiscreteEvent.blockedOn === null) {
        // We've successfully replayed the first event. Let's try the next one.
        queuedDiscreteEvents.shift();
      }
    } // Next replay any continuous events.

    if (
      queuedFocus !== null &&
      attemptReplayContinuousQueuedEvent(queuedFocus)
    ) {
      queuedFocus = null;
    }

    if (queuedDrag !== null && attemptReplayContinuousQueuedEvent(queuedDrag)) {
      queuedDrag = null;
    }

    if (
      queuedMouse !== null &&
      attemptReplayContinuousQueuedEvent(queuedMouse)
    ) {
      queuedMouse = null;
    }

    queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
    queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
  }

  function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
    if (queuedEvent.blockedOn === unblocked) {
      queuedEvent.blockedOn = null;

      if (!hasScheduledReplayAttempt) {
        hasScheduledReplayAttempt = true; // Schedule a callback to attempt replaying as many events as are
        // now unblocked. This first might not actually be unblocked yet.
        // We could check it early to avoid scheduling an unnecessary callback.

        unstable_scheduleCallback(
          unstable_NormalPriority,
          replayUnblockedEvents
        );
      }
    }
  }

  function retryIfBlockedOn(unblocked) {
    // Mark anything that was blocked on this as no longer blocked
    // and eligible for a replay.
    if (queuedDiscreteEvents.length > 0) {
      scheduleCallbackIfUnblocked(queuedDiscreteEvents[0], unblocked); // This is a exponential search for each boundary that commits. I think it's
      // worth it because we expect very few discrete events to queue up and once
      // we are actually fully unblocked it will be fast to replay them.

      for (var i = 1; i < queuedDiscreteEvents.length; i++) {
        var queuedEvent = queuedDiscreteEvents[i];

        if (queuedEvent.blockedOn === unblocked) {
          queuedEvent.blockedOn = null;
        }
      }
    }

    if (queuedFocus !== null) {
      scheduleCallbackIfUnblocked(queuedFocus, unblocked);
    }

    if (queuedDrag !== null) {
      scheduleCallbackIfUnblocked(queuedDrag, unblocked);
    }

    if (queuedMouse !== null) {
      scheduleCallbackIfUnblocked(queuedMouse, unblocked);
    }

    var unblock = function (queuedEvent) {
      return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
    };

    queuedPointers.forEach(unblock);
    queuedPointerCaptures.forEach(unblock);

    for (var _i = 0; _i < queuedExplicitHydrationTargets.length; _i++) {
      var queuedTarget = queuedExplicitHydrationTargets[_i];

      if (queuedTarget.blockedOn === unblocked) {
        queuedTarget.blockedOn = null;
      }
    }

    while (queuedExplicitHydrationTargets.length > 0) {
      var nextExplicitTarget = queuedExplicitHydrationTargets[0];

      if (nextExplicitTarget.blockedOn !== null) {
        // We're still blocked.
        break;
      } else {
        attemptExplicitHydrationTarget(nextExplicitTarget);

        if (nextExplicitTarget.blockedOn === null) {
          // We're unblocked.
          queuedExplicitHydrationTargets.shift();
        }
      }
    }
  }

  var DiscreteEvent = 0;
  var UserBlockingEvent = 1;
  var ContinuousEvent = 2;

  /**
   * Generate a mapping of standard vendor prefixes using the defined style property and event name.
   *
   * @param {string} styleProp
   * @param {string} eventName
   * @returns {object}
   */

  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit" + styleProp] = "webkit" + eventName;
    prefixes["Moz" + styleProp] = "moz" + eventName;
    return prefixes;
  }
  /**
   * A list of event names to a configurable list of vendor prefixes.
   */

  var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionend: makePrefixMap("Transition", "TransitionEnd"),
  };
  /**
   * Event names that have already been detected and prefixed (if applicable).
   */

  var prefixedEventNames = {};
  /**
   * Element to check for prefixes on.
   */

  var style = {};
  /**
   * Bootstrap if a DOM exists.
   */

  if (canUseDOM) {
    style = document.createElement("div").style; // On some platforms, in particular some releases of Android 4.x,
    // the un-prefixed "animation" and "transition" properties are defined on the
    // style object but the events that fire will still be prefixed, so we need
    // to check if the un-prefixed events are usable, and if not remove them from the map.

    if (!("AnimationEvent" in window)) {
      delete vendorPrefixes.animationend.animation;
      delete vendorPrefixes.animationiteration.animation;
      delete vendorPrefixes.animationstart.animation;
    } // Same as above

    if (!("TransitionEvent" in window)) {
      delete vendorPrefixes.transitionend.transition;
    }
  }
  /**
   * Attempts to determine the correct vendor prefixed event name.
   *
   * @param {string} eventName
   * @returns {string}
   */

  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
      return prefixedEventNames[eventName];
    } else if (!vendorPrefixes[eventName]) {
      return eventName;
    }

    var prefixMap = vendorPrefixes[eventName];

    for (var styleProp in prefixMap) {
      if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
        return (prefixedEventNames[eventName] = prefixMap[styleProp]);
      }
    }

    return eventName;
  }

  var ANIMATION_END = getVendorPrefixedEventName("animationend");
  var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
  var ANIMATION_START = getVendorPrefixedEventName("animationstart");
  var TRANSITION_END = getVendorPrefixedEventName("transitionend");

  var topLevelEventsToReactNames = new Map();
  var eventPriorities = new Map(); // We store most of the events in this module in pairs of two strings so we can re-use
  // the code required to apply the same logic for event prioritization and that of the
  // SimpleEventPlugin. This complicates things slightly, but the aim is to reduce code
  // duplication (for which there would be quite a bit). For the events that are not needed
  // for the SimpleEventPlugin (otherDiscreteEvents) we process them separately as an
  // array of top level events.
  // Lastly, we ignore prettier so we can keep the formatting sane.
  // prettier-ignore

  var discreteEventPairsForSimpleEventPlugin = ['cancel', 'cancel', 'click', 'click', 'close', 'close', 'contextmenu', 'contextMenu', 'copy', 'copy', 'cut', 'cut', 'auxclick', 'auxClick', 'dblclick', 'doubleClick', // Careful!
  'dragend', 'dragEnd', 'dragstart', 'dragStart', 'drop', 'drop', 'focusin', 'focus', // Careful!
  'focusout', 'blur', // Careful!
  'input', 'input', 'invalid', 'invalid', 'keydown', 'keyDown', 'keypress', 'keyPress', 'keyup', 'keyUp', 'mousedown', 'mouseDown', 'mouseup', 'mouseUp', 'paste', 'paste', 'pause', 'pause', 'play', 'play', 'pointercancel', 'pointerCancel', 'pointerdown', 'pointerDown', 'pointerup', 'pointerUp', 'ratechange', 'rateChange', 'reset', 'reset', 'seeked', 'seeked', 'submit', 'submit', 'touchcancel', 'touchCancel', 'touchend', 'touchEnd', 'touchstart', 'touchStart', 'volumechange', 'volumeChange'];
  var otherDiscreteEvents = [
    "change",
    "selectionchange",
    "textInput",
    "compositionstart",
    "compositionend",
    "compositionupdate",
  ];

  var userBlockingPairsForSimpleEventPlugin = ['drag', 'drag', 'dragenter', 'dragEnter', 'dragexit', 'dragExit', 'dragleave', 'dragLeave', 'dragover', 'dragOver', 'mousemove', 'mouseMove', 'mouseout', 'mouseOut', 'mouseover', 'mouseOver', 'pointermove', 'pointerMove', 'pointerout', 'pointerOut', 'pointerover', 'pointerOver', 'scroll', 'scroll', 'toggle', 'toggle', 'touchmove', 'touchMove', 'wheel', 'wheel']; // prettier-ignore

  var continuousPairsForSimpleEventPlugin = [
    "abort",
    "abort",
    ANIMATION_END,
    "animationEnd",
    ANIMATION_ITERATION,
    "animationIteration",
    ANIMATION_START,
    "animationStart",
    "canplay",
    "canPlay",
    "canplaythrough",
    "canPlayThrough",
    "durationchange",
    "durationChange",
    "emptied",
    "emptied",
    "encrypted",
    "encrypted",
    "ended",
    "ended",
    "error",
    "error",
    "gotpointercapture",
    "gotPointerCapture",
    "load",
    "load",
    "loadeddata",
    "loadedData",
    "loadedmetadata",
    "loadedMetadata",
    "loadstart",
    "loadStart",
    "lostpointercapture",
    "lostPointerCapture",
    "playing",
    "playing",
    "progress",
    "progress",
    "seeking",
    "seeking",
    "stalled",
    "stalled",
    "suspend",
    "suspend",
    "timeupdate",
    "timeUpdate",
    TRANSITION_END,
    "transitionEnd",
    "waiting",
    "waiting",
  ];
  /**
   * Turns
   * ['abort', ...]
   *
   * into
   *
   * topLevelEventsToReactNames = new Map([
   *   ['abort', 'onAbort'],
   * ]);
   *
   * and registers them.
   */

  function registerSimplePluginEventsAndSetTheirPriorities(
    eventTypes,
    priority
  ) {
    // As the event types are in pairs of two, we need to iterate
    // through in twos. The events are in pairs of two to save code
    // and improve init perf of processing this array, as it will
    // result in far fewer object allocations and property accesses
    // if we only use three arrays to process all the categories of
    // instead of tuples.
    for (var i = 0; i < eventTypes.length; i += 2) {
      var topEvent = eventTypes[i];
      var event = eventTypes[i + 1];
      var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
      var reactName = "on" + capitalizedEvent;
      eventPriorities.set(topEvent, priority);
      topLevelEventsToReactNames.set(topEvent, reactName);
      registerTwoPhaseEvent(reactName, [topEvent]);
    }
  }

  function setEventPriorities(eventTypes, priority) {
    for (var i = 0; i < eventTypes.length; i++) {
      eventPriorities.set(eventTypes[i], priority);
    }
  }

  function getEventPriorityForPluginSystem(domEventName) {
    var priority = eventPriorities.get(domEventName); // Default to a ContinuousEvent. Note: we might
    // want to warn if we can't detect the priority
    // for the event.

    return priority === undefined ? ContinuousEvent : priority;
  }
  function registerSimpleEvents() {
    registerSimplePluginEventsAndSetTheirPriorities(
      discreteEventPairsForSimpleEventPlugin,
      DiscreteEvent
    );
    registerSimplePluginEventsAndSetTheirPriorities(
      userBlockingPairsForSimpleEventPlugin,
      UserBlockingEvent
    );
    registerSimplePluginEventsAndSetTheirPriorities(
      continuousPairsForSimpleEventPlugin,
      ContinuousEvent
    );
    setEventPriorities(otherDiscreteEvents, DiscreteEvent);
  }

  var ReactInternals$2 =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var _ReactInternals$Sched$1 = ReactInternals$2.SchedulerTracing,
    __interactionsRef = _ReactInternals$Sched$1.__interactionsRef,
    __subscriberRef = _ReactInternals$Sched$1.__subscriberRef,
    unstable_clear = _ReactInternals$Sched$1.unstable_clear,
    unstable_getCurrent = _ReactInternals$Sched$1.unstable_getCurrent,
    unstable_getThreadID = _ReactInternals$Sched$1.unstable_getThreadID,
    unstable_subscribe = _ReactInternals$Sched$1.unstable_subscribe,
    unstable_trace = _ReactInternals$Sched$1.unstable_trace,
    unstable_unsubscribe = _ReactInternals$Sched$1.unstable_unsubscribe,
    unstable_wrap = _ReactInternals$Sched$1.unstable_wrap;

  var Scheduler_now = unstable_now;

  {
    // Provide explicit error message when production+profiling bundle of e.g.
    // react-dom is used with production (non-profiling) bundle of
    // scheduler/tracing
    if (!(__interactionsRef != null && __interactionsRef.current != null)) {
      {
        throw Error(
          "It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `scheduler/tracing` module with `scheduler/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at https://reactjs.org/link/profiling"
        );
      }
    }
  }
  // ascending numbers so we can compare them like numbers. They start at 90 to
  // avoid clashing with Scheduler's priorities.

  var ImmediatePriority = 99;
  var UserBlockingPriority = 98;
  var NormalPriority = 97;
  var LowPriority = 96;
  var IdlePriority = 95; // NoPriority is the absence of priority. Also React-only.

  var NoPriority = 90;
  var initialTimeMs = Scheduler_now(); // If the initial timestamp is reasonably small, use Scheduler's `now` directly.

  var SyncLanePriority = 15;
  var SyncBatchedLanePriority = 14;
  var InputDiscreteHydrationLanePriority = 13;
  var InputDiscreteLanePriority = 12;
  var InputContinuousHydrationLanePriority = 11;
  var InputContinuousLanePriority = 10;
  var DefaultHydrationLanePriority = 9;
  var DefaultLanePriority = 8;
  var TransitionHydrationPriority = 7;
  var TransitionPriority = 6;
  var RetryLanePriority = 5;
  var SelectiveHydrationLanePriority = 4;
  var IdleHydrationLanePriority = 3;
  var IdleLanePriority = 2;
  var OffscreenLanePriority = 1;
  var NoLanePriority = 0;
  var TotalLanes = 31;
  var NoLanes =
    /*                        */
    0;
  var NoLane =
    /*                          */
    0;
  var SyncLane =
    /*                        */
    1;
  var SyncBatchedLane =
    /*                 */
    2;
  var InputDiscreteHydrationLane =
    /*      */
    4;
  var InputDiscreteLanes =
    /*                    */
    24;
  var InputContinuousHydrationLane =
    /*           */
    32;
  var InputContinuousLanes =
    /*                  */
    192;
  var DefaultHydrationLane =
    /*            */
    256;
  var DefaultLanes =
    /*                   */
    3584;
  var TransitionHydrationLane =
    /*                */
    4096;
  var TransitionLanes =
    /*                       */
    4186112;
  var RetryLanes =
    /*                            */
    62914560;
  var SomeRetryLane =
    /*                  */
    33554432;
  var SelectiveHydrationLane =
    /*          */
    67108864;
  var NonIdleLanes =
    /*                                 */
    134217727;
  var IdleHydrationLane =
    /*               */
    134217728;
  var IdleLanes =
    /*                             */
    805306368;
  var OffscreenLane =
    /*                   */
    1073741824;
  var NoTimestamp = -1;
  function setCurrentUpdateLanePriority(newLanePriority) {} // "Registers" used to "return" multiple values
  // Used by getHighestPriorityLanes and getNextLanes:

  var return_highestLanePriority = DefaultLanePriority;

  function getHighestPriorityLanes(lanes) {
    if ((SyncLane & lanes) !== NoLanes) {
      return_highestLanePriority = SyncLanePriority;
      return SyncLane;
    }

    if ((SyncBatchedLane & lanes) !== NoLanes) {
      return_highestLanePriority = SyncBatchedLanePriority;
      return SyncBatchedLane;
    }

    if ((InputDiscreteHydrationLane & lanes) !== NoLanes) {
      return_highestLanePriority = InputDiscreteHydrationLanePriority;
      return InputDiscreteHydrationLane;
    }

    var inputDiscreteLanes = InputDiscreteLanes & lanes;

    if (inputDiscreteLanes !== NoLanes) {
      return_highestLanePriority = InputDiscreteLanePriority;
      return inputDiscreteLanes;
    }

    if ((lanes & InputContinuousHydrationLane) !== NoLanes) {
      return_highestLanePriority = InputContinuousHydrationLanePriority;
      return InputContinuousHydrationLane;
    }

    var inputContinuousLanes = InputContinuousLanes & lanes;

    if (inputContinuousLanes !== NoLanes) {
      return_highestLanePriority = InputContinuousLanePriority;
      return inputContinuousLanes;
    }

    if ((lanes & DefaultHydrationLane) !== NoLanes) {
      return_highestLanePriority = DefaultHydrationLanePriority;
      return DefaultHydrationLane;
    }

    var defaultLanes = DefaultLanes & lanes;

    if (defaultLanes !== NoLanes) {
      return_highestLanePriority = DefaultLanePriority;
      return defaultLanes;
    }

    if ((lanes & TransitionHydrationLane) !== NoLanes) {
      return_highestLanePriority = TransitionHydrationPriority;
      return TransitionHydrationLane;
    }

    var transitionLanes = TransitionLanes & lanes;

    if (transitionLanes !== NoLanes) {
      return_highestLanePriority = TransitionPriority;
      return transitionLanes;
    }

    var retryLanes = RetryLanes & lanes;

    if (retryLanes !== NoLanes) {
      return_highestLanePriority = RetryLanePriority;
      return retryLanes;
    }

    if (lanes & SelectiveHydrationLane) {
      return_highestLanePriority = SelectiveHydrationLanePriority;
      return SelectiveHydrationLane;
    }

    if ((lanes & IdleHydrationLane) !== NoLanes) {
      return_highestLanePriority = IdleHydrationLanePriority;
      return IdleHydrationLane;
    }

    var idleLanes = IdleLanes & lanes;

    if (idleLanes !== NoLanes) {
      return_highestLanePriority = IdleLanePriority;
      return idleLanes;
    }

    if ((OffscreenLane & lanes) !== NoLanes) {
      return_highestLanePriority = OffscreenLanePriority;
      return OffscreenLane;
    }

    {
      error("Should have found matching lanes. This is a bug in React.");
    } // This shouldn't be reachable, but as a fallback, return the entire bitmask.

    return_highestLanePriority = DefaultLanePriority;
    return lanes;
  }

  function schedulerPriorityToLanePriority(schedulerPriorityLevel) {
    switch (schedulerPriorityLevel) {
      case ImmediatePriority:
        return SyncLanePriority;

      case UserBlockingPriority:
        return InputContinuousLanePriority;

      case NormalPriority:
      case LowPriority:
        // TODO: Handle LowSchedulerPriority, somehow. Maybe the same lane as hydration.
        return DefaultLanePriority;

      case IdlePriority:
        return IdleLanePriority;

      default:
        return NoLanePriority;
    }
  }
  function lanePriorityToSchedulerPriority(lanePriority) {
    switch (lanePriority) {
      case SyncLanePriority:
      case SyncBatchedLanePriority:
        return ImmediatePriority;

      case InputDiscreteHydrationLanePriority:
      case InputDiscreteLanePriority:
      case InputContinuousHydrationLanePriority:
      case InputContinuousLanePriority:
        return UserBlockingPriority;

      case DefaultHydrationLanePriority:
      case DefaultLanePriority:
      case TransitionHydrationPriority:
      case TransitionPriority:
      case SelectiveHydrationLanePriority:
      case RetryLanePriority:
        return NormalPriority;

      case IdleHydrationLanePriority:
      case IdleLanePriority:
      case OffscreenLanePriority:
        return IdlePriority;

      case NoLanePriority:
        return NoPriority;

      default: {
        {
          throw Error(
            "Invalid update priority: " +
              lanePriority +
              ". This is a bug in React."
          );
        }
      }
    }
  }
  function getNextLanes(root, wipLanes) {
    // Early bailout if there's no pending work left.
    var pendingLanes = root.pendingLanes;

    if (pendingLanes === NoLanes) {
      return_highestLanePriority = NoLanePriority;
      return NoLanes;
    }

    var nextLanes = NoLanes;
    var nextLanePriority = NoLanePriority;
    var expiredLanes = root.expiredLanes;
    var suspendedLanes = root.suspendedLanes;
    var pingedLanes = root.pingedLanes; // Check if any work has expired.

    if (expiredLanes !== NoLanes) {
      nextLanes = expiredLanes;
      nextLanePriority = return_highestLanePriority = SyncLanePriority;
    } else {
      // Do not work on any idle work until all the non-idle work has finished,
      // even if the work is suspended.
      var nonIdlePendingLanes = pendingLanes & NonIdleLanes;

      if (nonIdlePendingLanes !== NoLanes) {
        var nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;

        if (nonIdleUnblockedLanes !== NoLanes) {
          nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes);
          nextLanePriority = return_highestLanePriority;
        } else {
          var nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes;

          if (nonIdlePingedLanes !== NoLanes) {
            nextLanes = getHighestPriorityLanes(nonIdlePingedLanes);
            nextLanePriority = return_highestLanePriority;
          }
        }
      } else {
        // The only remaining work is Idle.
        var unblockedLanes = pendingLanes & ~suspendedLanes;

        if (unblockedLanes !== NoLanes) {
          nextLanes = getHighestPriorityLanes(unblockedLanes);
          nextLanePriority = return_highestLanePriority;
        } else {
          if (pingedLanes !== NoLanes) {
            nextLanes = getHighestPriorityLanes(pingedLanes);
            nextLanePriority = return_highestLanePriority;
          }
        }
      }
    }

    if (nextLanes === NoLanes) {
      // This should only be reachable if we're suspended
      // TODO: Consider warning in this path if a fallback timer is not scheduled.
      return NoLanes;
    } // If there are higher priority lanes, we'll include them even if they
    // are suspended.

    nextLanes = pendingLanes & getEqualOrHigherPriorityLanes(nextLanes); // If we're already in the middle of a render, switching lanes will interrupt
    // it and we'll lose our progress. We should only do this if the new lanes are
    // higher priority.

    if (
      wipLanes !== NoLanes &&
      wipLanes !== nextLanes && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (wipLanes & suspendedLanes) === NoLanes
    ) {
      getHighestPriorityLanes(wipLanes);
      var wipLanePriority = return_highestLanePriority;

      if (nextLanePriority <= wipLanePriority) {
        return wipLanes;
      } else {
        return_highestLanePriority = nextLanePriority;
      }
    } // Check for entangled lanes and add them to the batch.
    //
    // A lane is said to be entangled with another when it's not allowed to render
    // in a batch that does not also include the other lane. Typically we do this
    // when multiple updates have the same source, and we only want to respond to
    // the most recent event from that source.
    //
    // Note that we apply entanglements *after* checking for partial work above.
    // This means that if a lane is entangled during an interleaved event while
    // it's already rendering, we won't interrupt it. This is intentional, since
    // entanglement is usually "best effort": we'll try our best to render the
    // lanes in the same batch, but it's not worth throwing out partially
    // completed work in order to do it.
    //
    // For those exceptions where entanglement is semantically important, like
    // useMutableSource, we should ensure that there is no partial work at the
    // time we apply the entanglement.

    var entangledLanes = root.entangledLanes;

    if (entangledLanes !== NoLanes) {
      var entanglements = root.entanglements;
      var lanes = nextLanes & entangledLanes;

      while (lanes > 0) {
        var index = pickArbitraryLaneIndex(lanes);
        var lane = 1 << index;
        nextLanes |= entanglements[index];
        lanes &= ~lane;
      }
    }

    return nextLanes;
  }
  function getMostRecentEventTime(root, lanes) {
    var eventTimes = root.eventTimes;
    var mostRecentEventTime = NoTimestamp;

    while (lanes > 0) {
      var index = pickArbitraryLaneIndex(lanes);
      var lane = 1 << index;
      var eventTime = eventTimes[index];

      if (eventTime > mostRecentEventTime) {
        mostRecentEventTime = eventTime;
      }

      lanes &= ~lane;
    }

    return mostRecentEventTime;
  }

  function computeExpirationTime(lane, currentTime) {
    // TODO: Expiration heuristic is constant per lane, so could use a map.
    getHighestPriorityLanes(lane);
    var priority = return_highestLanePriority;

    if (priority >= InputContinuousLanePriority) {
      // User interactions should expire slightly more quickly.
      //
      // NOTE: This is set to the corresponding constant as in Scheduler.js. When
      // we made it larger, a product metric in www regressed, suggesting there's
      // a user interaction that's being starved by a series of synchronous
      // updates. If that theory is correct, the proper solution is to fix the
      // starvation. However, this scenario supports the idea that expiration
      // times are an important safeguard when starvation does happen.
      //
      // Also note that, in the case of user input specifically, this will soon no
      // longer be an issue because we plan to make user input synchronous by
      // default (until you enter `startTransition`, of course.)
      //
      // If weren't planning to make these updates synchronous soon anyway, I
      // would probably make this number a configurable parameter.
      return currentTime + 250;
    } else if (priority >= TransitionPriority) {
      return currentTime + 5000;
    } else {
      // Anything idle priority or lower should never expire.
      return NoTimestamp;
    }
  }

  function markStarvedLanesAsExpired(root, currentTime) {
    // TODO: This gets called every time we yield. We can optimize by storing
    // the earliest expiration time on the root. Then use that to quickly bail out
    // of this function.
    var pendingLanes = root.pendingLanes;
    var suspendedLanes = root.suspendedLanes;
    var pingedLanes = root.pingedLanes;
    var expirationTimes = root.expirationTimes; // Iterate through the pending lanes and check if we've reached their
    // expiration time. If so, we'll assume the update is being starved and mark
    // it as expired to force it to finish.

    var lanes = pendingLanes;

    while (lanes > 0) {
      var index = pickArbitraryLaneIndex(lanes);
      var lane = 1 << index;
      var expirationTime = expirationTimes[index];

      if (expirationTime === NoTimestamp) {
        // Found a pending lane with no expiration time. If it's not suspended, or
        // if it's pinged, assume it's CPU-bound. Compute a new expiration time
        // using the current time.
        if (
          (lane & suspendedLanes) === NoLanes ||
          (lane & pingedLanes) !== NoLanes
        ) {
          // Assumes timestamps are monotonically increasing.
          expirationTimes[index] = computeExpirationTime(lane, currentTime);
        }
      } else if (expirationTime <= currentTime) {
        // This lane expired
        root.expiredLanes |= lane;
      }

      lanes &= ~lane;
    }
  } // This returns the highest priority pending lanes regardless of whether they
  function getLanesToRetrySynchronouslyOnError(root) {
    var everythingButOffscreen = root.pendingLanes & ~OffscreenLane;

    if (everythingButOffscreen !== NoLanes) {
      return everythingButOffscreen;
    }

    if (everythingButOffscreen & OffscreenLane) {
      return OffscreenLane;
    }

    return NoLanes;
  }
  function returnNextLanesPriority() {
    return return_highestLanePriority;
  }
  function includesNonIdleWork(lanes) {
    return (lanes & NonIdleLanes) !== NoLanes;
  }
  function includesOnlyRetries(lanes) {
    return (lanes & RetryLanes) === lanes;
  }
  function includesOnlyTransitions(lanes) {
    return (lanes & TransitionLanes) === lanes;
  } // To ensure consistency across multiple updates in the same event, this should
  // be a pure function, so that it always returns the same lane for given inputs.

  function findUpdateLane(lanePriority, wipLanes) {
    switch (lanePriority) {
      case NoLanePriority:
        break;

      case SyncLanePriority:
        return SyncLane;

      case SyncBatchedLanePriority:
        return SyncBatchedLane;

      case InputDiscreteLanePriority: {
        var _lane = pickArbitraryLane(InputDiscreteLanes & ~wipLanes);

        if (_lane === NoLane) {
          // Shift to the next priority level
          return findUpdateLane(InputContinuousLanePriority, wipLanes);
        }

        return _lane;
      }

      case InputContinuousLanePriority: {
        var _lane2 = pickArbitraryLane(InputContinuousLanes & ~wipLanes);

        if (_lane2 === NoLane) {
          // Shift to the next priority level
          return findUpdateLane(DefaultLanePriority, wipLanes);
        }

        return _lane2;
      }

      case DefaultLanePriority: {
        var _lane3 = pickArbitraryLane(DefaultLanes & ~wipLanes);

        if (_lane3 === NoLane) {
          // If all the default lanes are already being worked on, look for a
          // lane in the transition range.
          _lane3 = pickArbitraryLane(TransitionLanes & ~wipLanes);

          if (_lane3 === NoLane) {
            // All the transition lanes are taken, too. This should be very
            // rare, but as a last resort, pick a default lane. This will have
            // the effect of interrupting the current work-in-progress render.
            _lane3 = pickArbitraryLane(DefaultLanes);
          }
        }

        return _lane3;
      }

      case TransitionPriority: // Should be handled by findTransitionLane instead

      case RetryLanePriority:
        // Should be handled by findRetryLane instead
        break;

      case IdleLanePriority:
        var lane = pickArbitraryLane(IdleLanes & ~wipLanes);

        if (lane === NoLane) {
          lane = pickArbitraryLane(IdleLanes);
        }

        return lane;
    }

    {
      {
        throw Error(
          "Invalid update priority: " +
            lanePriority +
            ". This is a bug in React."
        );
      }
    }
  } // To ensure consistency across multiple updates in the same event, this should
  // be pure function, so that it always returns the same lane for given inputs.

  function findTransitionLane(wipLanes, pendingLanes) {
    // First look for lanes that are completely unclaimed, i.e. have no
    // pending work.
    var lane = pickArbitraryLane(TransitionLanes & ~pendingLanes);

    if (lane === NoLane) {
      // If all lanes have pending work, look for a lane that isn't currently
      // being worked on.
      lane = pickArbitraryLane(TransitionLanes & ~wipLanes);

      if (lane === NoLane) {
        // If everything is being worked on, pick any lane. This has the
        // effect of interrupting the current work-in-progress.
        lane = pickArbitraryLane(TransitionLanes);
      }
    }

    return lane;
  } // To ensure consistency across multiple updates in the same event, this should
  // be pure function, so that it always returns the same lane for given inputs.

  function findRetryLane(wipLanes) {
    // This is a fork of `findUpdateLane` designed specifically for Suspense
    // "retries" — a special update that attempts to flip a Suspense boundary
    // from its placeholder state to its primary/resolved state.
    var lane = pickArbitraryLane(RetryLanes & ~wipLanes);

    if (lane === NoLane) {
      lane = pickArbitraryLane(RetryLanes);
    }

    return lane;
  }

  function getHighestPriorityLane(lanes) {
    return lanes & -lanes;
  }

  function getLowestPriorityLane(lanes) {
    // This finds the most significant non-zero bit.
    var index = 31 - clz32(lanes);
    return index < 0 ? NoLanes : 1 << index;
  }

  function getEqualOrHigherPriorityLanes(lanes) {
    return (getLowestPriorityLane(lanes) << 1) - 1;
  }

  function pickArbitraryLane(lanes) {
    // This wrapper function gets inlined. Only exists so to communicate that it
    // doesn't matter which bit is selected; you can pick any bit without
    // affecting the algorithms where its used. Here I'm using
    // getHighestPriorityLane because it requires the fewest operations.
    return getHighestPriorityLane(lanes);
  }

  function pickArbitraryLaneIndex(lanes) {
    return 31 - clz32(lanes);
  }

  function laneToIndex(lane) {
    return pickArbitraryLaneIndex(lane);
  }

  function includesSomeLane(a, b) {
    return (a & b) !== NoLanes;
  }
  function isSubsetOfLanes(set, subset) {
    return (set & subset) === subset;
  }
  function mergeLanes(a, b) {
    return a | b;
  }
  function removeLanes(set, subset) {
    return set & ~subset;
  } // Seems redundant, but it changes the type from a single lane (used for
  // updates) to a group of lanes (used for flushing work).

  function laneToLanes(lane) {
    return lane;
  }
  function higherPriorityLane(a, b) {
    // This works because the bit ranges decrease in priority as you go left.
    return a !== NoLane && a < b ? a : b;
  }
  function createLaneMap(initial) {
    // Intentionally pushing one by one.
    // https://v8.dev/blog/elements-kinds#avoid-creating-holes
    var laneMap = [];

    for (var i = 0; i < TotalLanes; i++) {
      laneMap.push(initial);
    }

    return laneMap;
  }
  function markRootUpdated(root, updateLane, eventTime) {
    root.pendingLanes |= updateLane; // TODO: Theoretically, any update to any lane can unblock any other lane. But
    // it's not practical to try every single possible combination. We need a
    // heuristic to decide which lanes to attempt to render, and in which batches.
    // For now, we use the same heuristic as in the old ExpirationTimes model:
    // retry any lane at equal or lower priority, but don't try updates at higher
    // priority without also including the lower priority updates. This works well
    // when considering updates across different priority levels, but isn't
    // sufficient for updates within the same priority, since we want to treat
    // those updates as parallel.
    // Unsuspend any update at equal or lower priority.

    var higherPriorityLanes = updateLane - 1; // Turns 0b1000 into 0b0111

    root.suspendedLanes &= higherPriorityLanes;
    root.pingedLanes &= higherPriorityLanes;
    var eventTimes = root.eventTimes;
    var index = laneToIndex(updateLane); // We can always overwrite an existing timestamp because we prefer the most
    // recent event, and we assume time is monotonically increasing.

    eventTimes[index] = eventTime;
  }
  function markRootSuspended(root, suspendedLanes) {
    root.suspendedLanes |= suspendedLanes;
    root.pingedLanes &= ~suspendedLanes; // The suspended lanes are no longer CPU-bound. Clear their expiration times.

    var expirationTimes = root.expirationTimes;
    var lanes = suspendedLanes;

    while (lanes > 0) {
      var index = pickArbitraryLaneIndex(lanes);
      var lane = 1 << index;
      expirationTimes[index] = NoTimestamp;
      lanes &= ~lane;
    }
  }
  function markRootPinged(root, pingedLanes, eventTime) {
    root.pingedLanes |= root.suspendedLanes & pingedLanes;
  }
  function markDiscreteUpdatesExpired(root) {
    root.expiredLanes |= InputDiscreteLanes & root.pendingLanes;
  }
  function hasDiscreteLanes(lanes) {
    return (lanes & InputDiscreteLanes) !== NoLanes;
  }
  function markRootMutableRead(root, updateLane) {
    root.mutableReadLanes |= updateLane & root.pendingLanes;
  }
  function markRootFinished(root, remainingLanes) {
    var noLongerPendingLanes = root.pendingLanes & ~remainingLanes;
    root.pendingLanes = remainingLanes; // Let's try everything again

    root.suspendedLanes = 0;
    root.pingedLanes = 0;
    root.expiredLanes &= remainingLanes;
    root.mutableReadLanes &= remainingLanes;
    root.entangledLanes &= remainingLanes;
    var entanglements = root.entanglements;
    var eventTimes = root.eventTimes;
    var expirationTimes = root.expirationTimes; // Clear the lanes that no longer have pending work

    var lanes = noLongerPendingLanes;

    while (lanes > 0) {
      var index = pickArbitraryLaneIndex(lanes);
      var lane = 1 << index;
      entanglements[index] = NoLanes;
      eventTimes[index] = NoTimestamp;
      expirationTimes[index] = NoTimestamp;
      lanes &= ~lane;
    }
  }
  function markRootEntangled(root, entangledLanes) {
    root.entangledLanes |= entangledLanes;
    var entanglements = root.entanglements;
    var lanes = entangledLanes;

    while (lanes > 0) {
      var index = pickArbitraryLaneIndex(lanes);
      var lane = 1 << index;
      entanglements[index] |= entangledLanes;
      lanes &= ~lane;
    }
  }
  var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback; // Count leading zeros. Only used on lanes, so assume input is an integer.
  // Based on:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

  var log = Math.log;
  var LN2 = Math.LN2;

  function clz32Fallback(lanes) {
    if (lanes === 0) {
      return 32;
    }

    return (31 - ((log(lanes) / LN2) | 0)) | 0;
  }

  // Intentionally not named imports because Rollup would use dynamic dispatch for
  var UserBlockingPriority$1 = unstable_UserBlockingPriority,
    runWithPriority = unstable_runWithPriority; // TODO: can we stop exporting these?

  var _enabled = true; // This is exported in FB builds for use by legacy FB layer infra.
  // We'd like to remove this but it's not clear if this is safe.

  function setEnabled(enabled) {
    _enabled = !!enabled;
  }
  function isEnabled() {
    return _enabled;
  }
  function createEventListenerWrapperWithPriority(
    targetContainer,
    domEventName,
    eventSystemFlags
  ) {
    var eventPriority = getEventPriorityForPluginSystem(domEventName);
    var listenerWrapper;

    switch (eventPriority) {
      case DiscreteEvent:
        listenerWrapper = dispatchDiscreteEvent;
        break;

      case UserBlockingEvent:
        listenerWrapper = dispatchUserBlockingUpdate;
        break;

      case ContinuousEvent:
      default:
        listenerWrapper = dispatchEvent;
        break;
    }

    return listenerWrapper.bind(
      null,
      domEventName,
      eventSystemFlags,
      targetContainer
    );
  }

  function dispatchDiscreteEvent(
    domEventName,
    eventSystemFlags,
    container,
    nativeEvent
  ) {
    {
      flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);
    }

    discreteUpdates(
      dispatchEvent,
      domEventName,
      eventSystemFlags,
      container,
      nativeEvent
    );
  }

  function dispatchUserBlockingUpdate(
    domEventName,
    eventSystemFlags,
    container,
    nativeEvent
  ) {
    {
      runWithPriority(
        UserBlockingPriority$1,
        dispatchEvent.bind(
          null,
          domEventName,
          eventSystemFlags,
          container,
          nativeEvent
        )
      );
    }
  }

  function dispatchEvent(
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  ) {
    if (!_enabled) {
      return;
    }

    var allowReplay = true;

    {
      // TODO: replaying capture phase events is currently broken
      // because we used to do it during top-level native bubble handlers
      // but now we use different bubble and capture handlers.
      // In eager mode, we attach capture listeners early, so we need
      // to filter them out until we fix the logic to handle them correctly.
      // This could've been outside the flag but I put it inside to reduce risk.
      allowReplay = (eventSystemFlags & IS_CAPTURE_PHASE) === 0;
    }

    if (
      allowReplay &&
      hasQueuedDiscreteEvents() &&
      isReplayableDiscreteEvent(domEventName)
    ) {
      // If we already have a queue of discrete events, and this is another discrete
      // event, then we can't dispatch it regardless of its target, since they
      // need to dispatch in order.
      queueDiscreteEvent(
        null, // Flags that we're not actually blocked on anything as far as we know.
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      );
      return;
    }

    var blockedOn = attemptToDispatchEvent(
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    );

    if (blockedOn === null) {
      // We successfully dispatched this event.
      if (allowReplay) {
        clearIfContinuousEvent(domEventName, nativeEvent);
      }

      return;
    }

    if (allowReplay) {
      if (isReplayableDiscreteEvent(domEventName)) {
        // This this to be replayed later once the target is available.
        queueDiscreteEvent(
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        );
        return;
      }

      if (
        queueIfContinuousEvent(
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )
      ) {
        return;
      } // We need to clear only if we didn't queue because
      // queueing is accummulative.

      clearIfContinuousEvent(domEventName, nativeEvent);
    } // This is not replayable so we'll invoke it but without a target,
    // in case the event system needs to trace it.

    dispatchEventForPluginEventSystem(
      domEventName,
      eventSystemFlags,
      nativeEvent,
      null,
      targetContainer
    );
  } // Attempt dispatching an event. Returns a SuspenseInstance or Container if it's blocked.

  function attemptToDispatchEvent(
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  ) {
    // TODO: Warn if _enabled is false.
    var nativeEventTarget = getEventTarget(nativeEvent);
    var targetInst = getClosestInstanceFromNode(nativeEventTarget);

    if (targetInst !== null) {
      var nearestMounted = getNearestMountedFiber(targetInst);

      if (nearestMounted === null) {
        // This tree has been unmounted already. Dispatch without a target.
        targetInst = null;
      } else {
        var tag = nearestMounted.tag;

        if (tag === SuspenseComponent) {
          var instance = getSuspenseInstanceFromFiber(nearestMounted);

          if (instance !== null) {
            // Queue the event to be replayed later. Abort dispatching since we
            // don't want this event dispatched twice through the event system.
            // TODO: If this is the first discrete event in the queue. Schedule an increased
            // priority for this boundary.
            return instance;
          } // This shouldn't happen, something went wrong but to avoid blocking
          // the whole system, dispatch the event without a target.
          // TODO: Warn.

          targetInst = null;
        } else if (tag === HostRoot) {
          var root = nearestMounted.stateNode;

          if (root.hydrate) {
            // If this happens during a replay something went wrong and it might block
            // the whole system.
            return getContainerFromFiber(nearestMounted);
          }

          targetInst = null;
        } else if (nearestMounted !== targetInst) {
          // If we get an event (ex: img onload) before committing that
          // component's mount, ignore it for now (that is, treat it as if it was an
          // event on a non-React tree). We might also consider queueing events and
          // dispatching them after the mount.
          targetInst = null;
        }
      }
    }

    dispatchEventForPluginEventSystem(
      domEventName,
      eventSystemFlags,
      nativeEvent,
      targetInst,
      targetContainer
    ); // We're not blocked on anything.

    return null;
  }

  function addEventBubbleListener(target, eventType, listener) {
    target.addEventListener(eventType, listener, false);
    return listener;
  }
  function addEventCaptureListener(target, eventType, listener) {
    target.addEventListener(eventType, listener, true);
    return listener;
  }
  function addEventCaptureListenerWithPassiveFlag(
    target,
    eventType,
    listener,
    passive
  ) {
    target.addEventListener(eventType, listener, {
      capture: true,
      passive: passive,
    });
    return listener;
  }
  function addEventBubbleListenerWithPassiveFlag(
    target,
    eventType,
    listener,
    passive
  ) {
    target.addEventListener(eventType, listener, {
      passive: passive,
    });
    return listener;
  }

  /**
   * These variables store information about text content of a target node,
   * allowing comparison of content before and after a given event.
   *
   * Identify the node where selection currently begins, then observe
   * both its text content and its current position in the DOM. Since the
   * browser may natively replace the target node during composition, we can
   * use its position to find its replacement.
   *
   *
   */
  var root = null;
  var startText = null;
  var fallbackText = null;
  function initialize(nativeEventTarget) {
    root = nativeEventTarget;
    startText = getText();
    return true;
  }
  function reset() {
    root = null;
    startText = null;
    fallbackText = null;
  }
  function getData() {
    if (fallbackText) {
      return fallbackText;
    }

    var start;
    var startValue = startText;
    var startLength = startValue.length;
    var end;
    var endValue = getText();
    var endLength = endValue.length;

    for (start = 0; start < startLength; start++) {
      if (startValue[start] !== endValue[start]) {
        break;
      }
    }

    var minEnd = startLength - start;

    for (end = 1; end <= minEnd; end++) {
      if (startValue[startLength - end] !== endValue[endLength - end]) {
        break;
      }
    }

    var sliceTail = end > 1 ? 1 - end : undefined;
    fallbackText = endValue.slice(start, sliceTail);
    return fallbackText;
  }
  function getText() {
    if ("value" in root) {
      return root.value;
    }

    return root.textContent;
  }

  /**
   * `charCode` represents the actual "character code" and is safe to use with
   * `String.fromCharCode`. As such, only keys that correspond to printable
   * characters produce a valid `charCode`, the only exception to this is Enter.
   * The Tab-key is considered non-printable and does not have a `charCode`,
   * presumably because it does not produce a tab-character in browsers.
   *
   * @param {object} nativeEvent Native browser event.
   * @return {number} Normalized `charCode` property.
   */
  function getEventCharCode(nativeEvent) {
    var charCode;
    var keyCode = nativeEvent.keyCode;

    if ("charCode" in nativeEvent) {
      charCode = nativeEvent.charCode; // FF does not set `charCode` for the Enter-key, check against `keyCode`.

      if (charCode === 0 && keyCode === 13) {
        charCode = 13;
      }
    } else {
      // IE8 does not implement `charCode`, but `keyCode` has the correct value.
      charCode = keyCode;
    } // IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
    // report Enter as charCode 10 when ctrl is pressed.

    if (charCode === 10) {
      charCode = 13;
    } // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
    // Must not discard the (non-)printable Enter-key.

    if (charCode >= 32 || charCode === 13) {
      return charCode;
    }

    return 0;
  }

  function functionThatReturnsTrue() {
    return true;
  }

  function functionThatReturnsFalse() {
    return false;
  } // This is intentionally a factory so that we have different returned constructors.
  // If we had a single constructor, it would be megamorphic and engines would deopt.

  function createSyntheticEvent(Interface) {
    /**
     * Synthetic events are dispatched by event plugins, typically in response to a
     * top-level event delegation handler.
     *
     * These systems should generally use pooling to reduce the frequency of garbage
     * collection. The system should check `isPersistent` to determine whether the
     * event should be released into the pool after being dispatched. Users that
     * need a persisted event should invoke `persist`.
     *
     * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
     * normalizing browser quirks. Subclasses do not necessarily have to implement a
     * DOM interface; custom application-specific events can also subclass this.
     */
    function SyntheticBaseEvent(
      reactName,
      reactEventType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      this._reactName = reactName;
      this._targetInst = targetInst;
      this.type = reactEventType;
      this.nativeEvent = nativeEvent;
      this.target = nativeEventTarget;
      this.currentTarget = null;

      for (var _propName in Interface) {
        if (!Interface.hasOwnProperty(_propName)) {
          continue;
        }

        var normalize = Interface[_propName];

        if (normalize) {
          this[_propName] = normalize(nativeEvent);
        } else {
          this[_propName] = nativeEvent[_propName];
        }
      }

      var defaultPrevented =
        nativeEvent.defaultPrevented != null
          ? nativeEvent.defaultPrevented
          : nativeEvent.returnValue === false;

      if (defaultPrevented) {
        this.isDefaultPrevented = functionThatReturnsTrue;
      } else {
        this.isDefaultPrevented = functionThatReturnsFalse;
      }

      this.isPropagationStopped = functionThatReturnsFalse;
      return this;
    }

    _assign(SyntheticBaseEvent.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var event = this.nativeEvent;

        if (!event) {
          return;
        }

        if (event.preventDefault) {
          event.preventDefault(); // $FlowFixMe - flow is not aware of `unknown` in IE
        } else if (typeof event.returnValue !== "unknown") {
          event.returnValue = false;
        }

        this.isDefaultPrevented = functionThatReturnsTrue;
      },
      stopPropagation: function () {
        var event = this.nativeEvent;

        if (!event) {
          return;
        }

        if (event.stopPropagation) {
          event.stopPropagation(); // $FlowFixMe - flow is not aware of `unknown` in IE
        } else if (typeof event.cancelBubble !== "unknown") {
          // The ChangeEventPlugin registers a "propertychange" event for
          // IE. This event does not support bubbling or cancelling, and
          // any references to cancelBubble throw "Member not found".  A
          // typeof check of "unknown" circumvents this issue (and is also
          // IE specific).
          event.cancelBubble = true;
        }

        this.isPropagationStopped = functionThatReturnsTrue;
      },

      /**
       * We release all dispatched `SyntheticEvent`s after each event loop, adding
       * them back into the pool. This allows a way to hold onto a reference that
       * won't be added back into the pool.
       */
      persist: function () {
        // Modern event system doesn't use pooling.
      },

      /**
       * Checks if this event should be released back into the pool.
       *
       * @return {boolean} True if this should not be released, false otherwise.
       */
      isPersistent: functionThatReturnsTrue,
    });

    return SyntheticBaseEvent;
  }
  /**
   * @interface Event
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */

  var EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  };
  var SyntheticEvent = createSyntheticEvent(EventInterface);

  var UIEventInterface = _assign({}, EventInterface, {
    view: 0,
    detail: 0,
  });

  var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
  var lastMovementX;
  var lastMovementY;
  var lastMouseEvent;

  function updateMouseMovementPolyfillState(event) {
    if (event !== lastMouseEvent) {
      if (lastMouseEvent && event.type === "mousemove") {
        lastMovementX = event.screenX - lastMouseEvent.screenX;
        lastMovementY = event.screenY - lastMouseEvent.screenY;
      } else {
        lastMovementX = 0;
        lastMovementY = 0;
      }

      lastMouseEvent = event;
    }
  }
  /**
   * @interface MouseEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */

  var MouseEventInterface = _assign({}, UIEventInterface, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function (event) {
      if (event.relatedTarget === undefined)
        return event.fromElement === event.srcElement
          ? event.toElement
          : event.fromElement;
      return event.relatedTarget;
    },
    movementX: function (event) {
      if ("movementX" in event) {
        return event.movementX;
      }

      updateMouseMovementPolyfillState(event);
      return lastMovementX;
    },
    movementY: function (event) {
      if ("movementY" in event) {
        return event.movementY;
      } // Don't need to call updateMouseMovementPolyfillState() here
      // because it's guaranteed to have already run when movementX
      // was copied.

      return lastMovementY;
    },
  });

  var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
  /**
   * @interface DragEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */

  var DragEventInterface = _assign({}, MouseEventInterface, {
    dataTransfer: 0,
  });

  var SyntheticDragEvent = createSyntheticEvent(DragEventInterface);
  /**
   * @interface FocusEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */

  var FocusEventInterface = _assign({}, UIEventInterface, {
    relatedTarget: 0,
  });

  var SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface);
  /**
   * @interface Event
   * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
   */

  var AnimationEventInterface = _assign({}, EventInterface, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0,
  });

  var SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface);
  /**
   * @interface Event
   * @see http://www.w3.org/TR/clipboard-apis/
   */

  var ClipboardEventInterface = _assign({}, EventInterface, {
    clipboardData: function (event) {
      return "clipboardData" in event
        ? event.clipboardData
        : window.clipboardData;
    },
  });

  var SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface);
  /**
   * @interface Event
   * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
   */

  var CompositionEventInterface = _assign({}, EventInterface, {
    data: 0,
  });

  var SyntheticCompositionEvent = createSyntheticEvent(
    CompositionEventInterface
  );
  /**
   * @interface Event
   * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
   *      /#events-inputevents
   */
  // Happens to share the same list for now.

  var SyntheticInputEvent = SyntheticCompositionEvent;
  /**
   * Normalization of deprecated HTML5 `key` values
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
   */

  var normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  };
  /**
   * Translation from legacy `keyCode` to HTML5 `key`
   * Only special keys supported, all others depend on keyboard layout or browser
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
   */

  var translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  };
  /**
   * @param {object} nativeEvent Native browser event.
   * @return {string} Normalized `key` property.
   */

  function getEventKey(nativeEvent) {
    if (nativeEvent.key) {
      // Normalize inconsistent values reported by browsers due to
      // implementations of a working draft specification.
      // FireFox implements `key` but returns `MozPrintableKey` for all
      // printable characters (normalized to `Unidentified`), ignore it.
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;

      if (key !== "Unidentified") {
        return key;
      }
    } // Browser does not implement `key`, polyfill as much of it as we can.

    if (nativeEvent.type === "keypress") {
      var charCode = getEventCharCode(nativeEvent); // The enter-key is technically both printable and non-printable and can
      // thus be captured by `keypress`, no other non-printable key should.

      return charCode === 13 ? "Enter" : String.fromCharCode(charCode);
    }

    if (nativeEvent.type === "keydown" || nativeEvent.type === "keyup") {
      // While user keyboard layout determines the actual meaning of each
      // `keyCode` value, almost all function keys have a universal value.
      return translateToKey[nativeEvent.keyCode] || "Unidentified";
    }

    return "";
  }
  /**
   * Translation from modifier key to the associated property in the event.
   * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
   */

  var modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  }; // Older browsers (Safari <= 10, iOS Safari <= 10.2) do not support
  // getModifierState. If getModifierState is not supported, we map it to a set of
  // modifier keys exposed by the event. In this case, Lock-keys are not supported.

  function modifierStateGetter(keyArg) {
    var syntheticEvent = this;
    var nativeEvent = syntheticEvent.nativeEvent;

    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyArg);
    }

    var keyProp = modifierKeyToProp[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
  }

  function getEventModifierState(nativeEvent) {
    return modifierStateGetter;
  }
  /**
   * @interface KeyboardEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */

  var KeyboardEventInterface = _assign({}, UIEventInterface, {
    key: getEventKey,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: getEventModifierState,
    // Legacy Interface
    charCode: function (event) {
      // `charCode` is the result of a KeyPress event and represents the value of
      // the actual printable character.
      // KeyPress is deprecated, but its replacement is not yet final and not
      // implemented in any major browser. Only KeyPress has charCode.
      if (event.type === "keypress") {
        return getEventCharCode(event);
      }

      return 0;
    },
    keyCode: function (event) {
      // `keyCode` is the result of a KeyDown/Up event and represents the value of
      // physical keyboard key.
      // The actual meaning of the value depends on the users' keyboard layout
      // which cannot be detected. Assuming that it is a US keyboard layout
      // provides a surprisingly accurate mapping for US and European users.
      // Due to this, it is left to the user to implement at this time.
      if (event.type === "keydown" || event.type === "keyup") {
        return event.keyCode;
      }

      return 0;
    },
    which: function (event) {
      // `which` is an alias for either `keyCode` or `charCode` depending on the
      // type of the event.
      if (event.type === "keypress") {
        return getEventCharCode(event);
      }

      if (event.type === "keydown" || event.type === "keyup") {
        return event.keyCode;
      }

      return 0;
    },
  });

  var SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface);
  /**
   * @interface PointerEvent
   * @see http://www.w3.org/TR/pointerevents/
   */

  var PointerEventInterface = _assign({}, MouseEventInterface, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  });

  var SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface);
  /**
   * @interface TouchEvent
   * @see http://www.w3.org/TR/touch-events/
   */

  var TouchEventInterface = _assign({}, UIEventInterface, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: getEventModifierState,
  });

  var SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface);
  /**
   * @interface Event
   * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
   * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
   */

  var TransitionEventInterface = _assign({}, EventInterface, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0,
  });

  var SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface);
  /**
   * @interface WheelEvent
   * @see http://www.w3.org/TR/DOM-Level-3-Events/
   */

  var WheelEventInterface = _assign({}, MouseEventInterface, {
    deltaX: function (event) {
      return "deltaX" in event
        ? event.deltaX // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
        : "wheelDeltaX" in event
        ? -event.wheelDeltaX
        : 0;
    },
    deltaY: function (event) {
      return "deltaY" in event
        ? event.deltaY // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
        : "wheelDeltaY" in event
        ? -event.wheelDeltaY // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
        : "wheelDelta" in event
        ? -event.wheelDelta
        : 0;
    },
    deltaZ: 0,
    // Browsers without "deltaMode" is reporting in raw wheel delta where one
    // notch on the scroll is always +/- 120, roughly equivalent to pixels.
    // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
    // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
    deltaMode: 0,
  });

  var SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface);

  var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space

  var START_KEYCODE = 229;
  var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
  var documentMode = null;

  if (canUseDOM && "documentMode" in document) {
    documentMode = document.documentMode;
  } // Webkit offers a very useful `textInput` event that can be used to
  // directly represent `beforeInput`. The IE `textinput` event is not as
  // useful, so we don't use it.

  var canUseTextInputEvent =
    canUseDOM && "TextEvent" in window && !documentMode; // In IE9+, we have access to composition events, but the data supplied
  // by the native compositionend event may be incorrect. Japanese ideographic
  // spaces, for instance (\u3000) are not recorded correctly.

  var useFallbackCompositionData =
    canUseDOM &&
    (!canUseCompositionEvent ||
      (documentMode && documentMode > 8 && documentMode <= 11));
  var SPACEBAR_CODE = 32;
  var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

  function registerEvents() {
    registerTwoPhaseEvent("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste",
    ]);
    registerTwoPhaseEvent("onCompositionEnd", [
      "compositionend",
      "focusout",
      "keydown",
      "keypress",
      "keyup",
      "mousedown",
    ]);
    registerTwoPhaseEvent("onCompositionStart", [
      "compositionstart",
      "focusout",
      "keydown",
      "keypress",
      "keyup",
      "mousedown",
    ]);
    registerTwoPhaseEvent("onCompositionUpdate", [
      "compositionupdate",
      "focusout",
      "keydown",
      "keypress",
      "keyup",
      "mousedown",
    ]);
  } // Track whether we've ever handled a keypress on the space key.

  var hasSpaceKeypress = false;
  /**
   * Return whether a native keypress event is assumed to be a command.
   * This is required because Firefox fires `keypress` events for key commands
   * (cut, copy, select-all, etc.) even though no character is inserted.
   */

  function isKeypressCommand(nativeEvent) {
    return (
      (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(nativeEvent.ctrlKey && nativeEvent.altKey)
    );
  }
  /**
   * Translate native top level events into event types.
   */

  function getCompositionEventType(domEventName) {
    switch (domEventName) {
      case "compositionstart":
        return "onCompositionStart";

      case "compositionend":
        return "onCompositionEnd";

      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  /**
   * Does our fallback best-guess model think this event signifies that
   * composition has begun?
   */

  function isFallbackCompositionStart(domEventName, nativeEvent) {
    return domEventName === "keydown" && nativeEvent.keyCode === START_KEYCODE;
  }
  /**
   * Does our fallback mode think that this event is the end of composition?
   */

  function isFallbackCompositionEnd(domEventName, nativeEvent) {
    switch (domEventName) {
      case "keyup":
        // Command keys insert or clear IME input.
        return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;

      case "keydown":
        // Expect IME keyCode on each keydown. If we get any other
        // code we must have exited earlier.
        return nativeEvent.keyCode !== START_KEYCODE;

      case "keypress":
      case "mousedown":
      case "focusout":
        // Events are not possible without cancelling IME.
        return true;

      default:
        return false;
    }
  }
  /**
   * Google Input Tools provides composition data via a CustomEvent,
   * with the `data` property populated in the `detail` object. If this
   * is available on the event object, use it. If not, this is a plain
   * composition event and we have nothing special to extract.
   *
   * @param {object} nativeEvent
   * @return {?string}
   */

  function getDataFromCustomEvent(nativeEvent) {
    var detail = nativeEvent.detail;

    if (typeof detail === "object" && "data" in detail) {
      return detail.data;
    }

    return null;
  }
  /**
   * Check if a composition event was triggered by Korean IME.
   * Our fallback mode does not work well with IE's Korean IME,
   * so just use native composition events when Korean IME is used.
   * Although CompositionEvent.locale property is deprecated,
   * it is available in IE, where our fallback mode is enabled.
   *
   * @param {object} nativeEvent
   * @return {boolean}
   */

  function isUsingKoreanIME(nativeEvent) {
    return nativeEvent.locale === "ko";
  } // Track the current IME composition status, if any.

  var isComposing = false;
  /**
   * @return {?object} A SyntheticCompositionEvent.
   */

  function extractCompositionEvent(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    var eventType;
    var fallbackData;

    if (canUseCompositionEvent) {
      eventType = getCompositionEventType(domEventName);
    } else if (!isComposing) {
      if (isFallbackCompositionStart(domEventName, nativeEvent)) {
        eventType = "onCompositionStart";
      }
    } else if (isFallbackCompositionEnd(domEventName, nativeEvent)) {
      eventType = "onCompositionEnd";
    }

    if (!eventType) {
      return null;
    }

    if (useFallbackCompositionData && !isUsingKoreanIME(nativeEvent)) {
      // The current composition is stored statically and must not be
      // overwritten while composition continues.
      if (!isComposing && eventType === "onCompositionStart") {
        isComposing = initialize(nativeEventTarget);
      } else if (eventType === "onCompositionEnd") {
        if (isComposing) {
          fallbackData = getData();
        }
      }
    }

    var listeners = accumulateTwoPhaseListeners(targetInst, eventType);

    if (listeners.length > 0) {
      var event = new SyntheticCompositionEvent(
        eventType,
        domEventName,
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({
        event: event,
        listeners: listeners,
      });

      if (fallbackData) {
        // Inject data generated from fallback path into the synthetic event.
        // This matches the property of native CompositionEventInterface.
        event.data = fallbackData;
      } else {
        var customData = getDataFromCustomEvent(nativeEvent);

        if (customData !== null) {
          event.data = customData;
        }
      }
    }
  }

  function getNativeBeforeInputChars(domEventName, nativeEvent) {
    switch (domEventName) {
      case "compositionend":
        return getDataFromCustomEvent(nativeEvent);

      case "keypress":
        /**
         * If native `textInput` events are available, our goal is to make
         * use of them. However, there is a special case: the spacebar key.
         * In Webkit, preventing default on a spacebar `textInput` event
         * cancels character insertion, but it *also* causes the browser
         * to fall back to its default spacebar behavior of scrolling the
         * page.
         *
         * Tracking at:
         * https://code.google.com/p/chromium/issues/detail?id=355103
         *
         * To avoid this issue, use the keypress event as if no `textInput`
         * event is available.
         */
        var which = nativeEvent.which;

        if (which !== SPACEBAR_CODE) {
          return null;
        }

        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;

      case "textInput":
        // Record the characters to be added to the DOM.
        var chars = nativeEvent.data; // If it's a spacebar character, assume that we have already handled
        // it at the keypress level and bail immediately. Android Chrome
        // doesn't give us keycodes, so we need to ignore it.

        if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
          return null;
        }

        return chars;

      default:
        // For other native event types, do nothing.
        return null;
    }
  }
  /**
   * For browsers that do not provide the `textInput` event, extract the
   * appropriate string to use for SyntheticInputEvent.
   */

  function getFallbackBeforeInputChars(domEventName, nativeEvent) {
    // If we are currently composing (IME) and using a fallback to do so,
    // try to extract the composed characters from the fallback object.
    // If composition event is available, we extract a string only at
    // compositionevent, otherwise extract it at fallback events.
    if (isComposing) {
      if (
        domEventName === "compositionend" ||
        (!canUseCompositionEvent &&
          isFallbackCompositionEnd(domEventName, nativeEvent))
      ) {
        var chars = getData();
        reset();
        isComposing = false;
        return chars;
      }

      return null;
    }

    switch (domEventName) {
      case "paste":
        // If a paste event occurs after a keypress, throw out the input
        // chars. Paste events should not lead to BeforeInput events.
        return null;

      case "keypress":
        /**
         * As of v27, Firefox may fire keypress events even when no character
         * will be inserted. A few possibilities:
         *
         * - `which` is `0`. Arrow keys, Esc key, etc.
         *
         * - `which` is the pressed key code, but no char is available.
         *   Ex: 'AltGr + d` in Polish. There is no modified character for
         *   this key combination and no character is inserted into the
         *   document, but FF fires the keypress for char code `100` anyway.
         *   No `input` event will occur.
         *
         * - `which` is the pressed key code, but a command combination is
         *   being used. Ex: `Cmd+C`. No character is inserted, and no
         *   `input` event will occur.
         */
        if (!isKeypressCommand(nativeEvent)) {
          // IE fires the `keypress` event when a user types an emoji via
          // Touch keyboard of Windows.  In such a case, the `char` property
          // holds an emoji character like `\uD83D\uDE0A`.  Because its length
          // is 2, the property `which` does not represent an emoji correctly.
          // In such a case, we directly return the `char` property instead of
          // using `which`.
          if (nativeEvent.char && nativeEvent.char.length > 1) {
            return nativeEvent.char;
          } else if (nativeEvent.which) {
            return String.fromCharCode(nativeEvent.which);
          }
        }

        return null;

      case "compositionend":
        return useFallbackCompositionData && !isUsingKoreanIME(nativeEvent)
          ? null
          : nativeEvent.data;

      default:
        return null;
    }
  }
  /**
   * Extract a SyntheticInputEvent for `beforeInput`, based on either native
   * `textInput` or fallback behavior.
   *
   * @return {?object} A SyntheticInputEvent.
   */

  function extractBeforeInputEvent(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    var chars;

    if (canUseTextInputEvent) {
      chars = getNativeBeforeInputChars(domEventName, nativeEvent);
    } else {
      chars = getFallbackBeforeInputChars(domEventName, nativeEvent);
    } // If no characters are being inserted, no BeforeInput event should
    // be fired.

    if (!chars) {
      return null;
    }

    var listeners = accumulateTwoPhaseListeners(targetInst, "onBeforeInput");

    if (listeners.length > 0) {
      var event = new SyntheticInputEvent(
        "onBeforeInput",
        "beforeinput",
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({
        event: event,
        listeners: listeners,
      });
      event.data = chars;
    }
  }
  /**
   * Create an `onBeforeInput` event to match
   * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
   *
   * This event plugin is based on the native `textInput` event
   * available in Chrome, Safari, Opera, and IE. This event fires after
   * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
   *
   * `beforeInput` is spec'd but not implemented in any browsers, and
   * the `input` event does not provide any useful information about what has
   * actually been added, contrary to the spec. Thus, `textInput` is the best
   * available event to identify the characters that have actually been inserted
   * into the target node.
   *
   * This plugin is also responsible for emitting `composition` events, thus
   * allowing us to share composition fallback code for both `beforeInput` and
   * `composition` event types.
   */

  function extractEvents(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  ) {
    extractCompositionEvent(
      dispatchQueue,
      domEventName,
      targetInst,
      nativeEvent,
      nativeEventTarget
    );
    extractBeforeInputEvent(
      dispatchQueue,
      domEventName,
      targetInst,
      nativeEvent,
      nativeEventTarget
    );
  }

  /**
   * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
   */
  var supportedInputTypes = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
  };

  function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

    if (nodeName === "input") {
      return !!supportedInputTypes[elem.type];
    }

    if (nodeName === "textarea") {
      return true;
    }

    return false;
  }

  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */

  function isEventSupported(eventNameSuffix) {
    if (!canUseDOM) {
      return false;
    }

    var eventName = "on" + eventNameSuffix;
    var isSupported = eventName in document;

    if (!isSupported) {
      var element = document.createElement("div");
      element.setAttribute(eventName, "return;");
      isSupported = typeof element[eventName] === "function";
    }

    return isSupported;
  }

  function registerEvents$1() {
    registerTwoPhaseEvent("onChange", [
      "change",
      "click",
      "focusin",
      "focusout",
      "input",
      "keydown",
      "keyup",
      "selectionchange",
    ]);
  }

  function createAndAccumulateChangeEvent(
    dispatchQueue,
    inst,
    nativeEvent,
    target
  ) {
    // Flag this event loop as needing state restore.
    enqueueStateRestore(target);
    var listeners = accumulateTwoPhaseListeners(inst, "onChange");

    if (listeners.length > 0) {
      var event = new SyntheticEvent(
        "onChange",
        "change",
        null,
        nativeEvent,
        target
      );
      dispatchQueue.push({
        event: event,
        listeners: listeners,
      });
    }
  }
  /**
   * For IE shims
   */

  var activeElement = null;
  var activeElementInst = null;
  /**
   * SECTION: handle `change` event
   */

  function shouldUseChangeEvent(elem) {
    var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
    return (
      nodeName === "select" || (nodeName === "input" && elem.type === "file")
    );
  }

  function manualDispatchChangeEvent(nativeEvent) {
    var dispatchQueue = [];
    createAndAccumulateChangeEvent(
      dispatchQueue,
      activeElementInst,
      nativeEvent,
      getEventTarget(nativeEvent)
    ); // If change and propertychange bubbled, we'd just bind to it like all the
    // other events and have it go through ReactBrowserEventEmitter. Since it
    // doesn't, we manually listen for the events and so we have to enqueue and
    // process the abstract event manually.
    //
    // Batching is necessary here in order to ensure that all event handlers run
    // before the next rerender (including event handlers attached to ancestor
    // elements instead of directly on the input). Without this, controlled
    // components don't work properly in conjunction with event bubbling because
    // the component is rerendered and the value reverted before all the event
    // handlers can run. See https://github.com/facebook/react/issues/708.

    batchedUpdates(runEventInBatch, dispatchQueue);
  }

  function runEventInBatch(dispatchQueue) {
    processDispatchQueue(dispatchQueue, 0);
  }

  function getInstIfValueChanged(targetInst) {
    var targetNode = getNodeFromInstance(targetInst);

    if (updateValueIfChanged(targetNode)) {
      return targetInst;
    }
  }

  function getTargetInstForChangeEvent(domEventName, targetInst) {
    if (domEventName === "change") {
      return targetInst;
    }
  }
  /**
   * SECTION: handle `input` event
   */

  var isInputEventSupported = false;

  if (canUseDOM) {
    // IE9 claims to support the input event but fails to trigger it when
    // deleting text, so we ignore its input events.
    isInputEventSupported =
      isEventSupported("input") &&
      (!document.documentMode || document.documentMode > 9);
  }
  /**
   * (For IE <=9) Starts tracking propertychange events on the passed-in element
   * and override the value property so that we can distinguish user events from
   * value changes in JS.
   */

  function startWatchingForValueChange(target, targetInst) {
    activeElement = target;
    activeElementInst = targetInst;
    activeElement.attachEvent("onpropertychange", handlePropertyChange);
  }
  /**
   * (For IE <=9) Removes the event listeners from the currently-tracked element,
   * if any exists.
   */

  function stopWatchingForValueChange() {
    if (!activeElement) {
      return;
    }

    activeElement.detachEvent("onpropertychange", handlePropertyChange);
    activeElement = null;
    activeElementInst = null;
  }
  /**
   * (For IE <=9) Handles a propertychange event, sending a `change` event if
   * the value of the active element has changed.
   */

  function handlePropertyChange(nativeEvent) {
    if (nativeEvent.propertyName !== "value") {
      return;
    }

    if (getInstIfValueChanged(activeElementInst)) {
      manualDispatchChangeEvent(nativeEvent);
    }
  }

  function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
    if (domEventName === "focusin") {
      // In IE9, propertychange fires for most input events but is buggy and
      // doesn't fire when text is deleted, but conveniently, selectionchange
      // appears to fire in all of the remaining cases so we catch those and
      // forward the event if the value has changed
      // In either case, we don't want to call the event handler if the value
      // is changed from JS so we redefine a setter for `.value` that updates
      // our activeElementValue variable, allowing us to ignore those changes
      //
      // stopWatching() should be a noop here but we call it just in case we
      // missed a blur event somehow.
      stopWatchingForValueChange();
      startWatchingForValueChange(target, targetInst);
    } else if (domEventName === "focusout") {
      stopWatchingForValueChange();
    }
  } // For IE8 and IE9.

  function getTargetInstForInputEventPolyfill(domEventName, targetInst) {
    if (
      domEventName === "selectionchange" ||
      domEventName === "keyup" ||
      domEventName === "keydown"
    ) {
      // On the selectionchange event, the target is just document which isn't
      // helpful for us so just check activeElement instead.
      //
      // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
      // propertychange on the first input event after setting `value` from a
      // script and fires only keydown, keypress, keyup. Catching keyup usually
      // gets it and catching keydown lets us fire an event for the first
      // keystroke if user does a key repeat (it'll be a little delayed: right
      // before the second keystroke). Other input methods (e.g., paste) seem to
      // fire selectionchange normally.
      return getInstIfValueChanged(activeElementInst);
    }
  }
  /**
   * SECTION: handle `click` event
   */

  function shouldUseClickEvent(elem) {
    // Use the `click` event to detect changes to checkbox and radio inputs.
    // This approach works across all browsers, whereas `change` does not fire
    // until `blur` in IE8.
    var nodeName = elem.nodeName;
    return (
      nodeName &&
      nodeName.toLowerCase() === "input" &&
      (elem.type === "checkbox" || elem.type === "radio")
    );
  }

  function getTargetInstForClickEvent(domEventName, targetInst) {
    if (domEventName === "click") {
      return getInstIfValueChanged(targetInst);
    }
  }

  function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
    if (domEventName === "input" || domEventName === "change") {
      return getInstIfValueChanged(targetInst);
    }
  }

  function handleControlledInputBlur(node) {
    var state = node._wrapperState;

    if (!state || !state.controlled || node.type !== "number") {
      return;
    }

    {
      // If controlled, assign the value attribute to the current value on blur
      setDefaultValue(node, "number", node.value);
    }
  }
  /**
   * This plugin creates an `onChange` event that normalizes change events
   * across form elements. This event fires at a time when it's possible to
   * change the element's value without seeing a flicker.
   *
   * Supported elements are:
   * - input (see `isTextInputElement`)
   * - textarea
   * - select
   */

  function extractEvents$1(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  ) {
    var targetNode = targetInst ? getNodeFromInstance(targetInst) : window;
    var getTargetInstFunc, handleEventFunc;

    if (shouldUseChangeEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForChangeEvent;
    } else if (isTextInputElement(targetNode)) {
      if (isInputEventSupported) {
        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
      } else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        handleEventFunc = handleEventsForInputEventPolyfill;
      }
    } else if (shouldUseClickEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForClickEvent;
    }

    if (getTargetInstFunc) {
      var inst = getTargetInstFunc(domEventName, targetInst);

      if (inst) {
        createAndAccumulateChangeEvent(
          dispatchQueue,
          inst,
          nativeEvent,
          nativeEventTarget
        );
        return;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(domEventName, targetNode, targetInst);
    } // When blurring, set the value attribute for number inputs

    if (domEventName === "focusout") {
      handleControlledInputBlur(targetNode);
    }
  }

  function registerEvents$2() {
    registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
    registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
    registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
    registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
  }
  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */

  function extractEvents$2(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  ) {
    var isOverEvent =
      domEventName === "mouseover" || domEventName === "pointerover";
    var isOutEvent =
      domEventName === "mouseout" || domEventName === "pointerout";

    if (isOverEvent && (eventSystemFlags & IS_REPLAYED) === 0) {
      // If this is an over event with a target, we might have already dispatched
      // the event in the out event of the other target. If this is replayed,
      // then it's because we couldn't dispatch against this target previously
      // so we have to do it now instead.
      var related = nativeEvent.relatedTarget || nativeEvent.fromElement;

      if (related) {
        // If the related node is managed by React, we can assume that we have
        // already dispatched the corresponding events during its mouseout.
        if (
          getClosestInstanceFromNode(related) ||
          isContainerMarkedAsRoot(related)
        ) {
          return;
        }
      }
    }

    if (!isOutEvent && !isOverEvent) {
      // Must not be a mouse or pointer in or out - ignoring.
      return;
    }

    var win; // TODO: why is this nullable in the types but we read from it?

    if (nativeEventTarget.window === nativeEventTarget) {
      // `nativeEventTarget` is probably a window object.
      win = nativeEventTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = nativeEventTarget.ownerDocument;

      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;

    if (isOutEvent) {
      var _related = nativeEvent.relatedTarget || nativeEvent.toElement;

      from = targetInst;
      to = _related ? getClosestInstanceFromNode(_related) : null;

      if (to !== null) {
        var nearestMounted = getNearestMountedFiber(to);

        if (
          to !== nearestMounted ||
          (to.tag !== HostComponent && to.tag !== HostText)
        ) {
          to = null;
        }
      }
    } else {
      // Moving to a node from outside the window.
      from = null;
      to = targetInst;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return;
    }

    var SyntheticEventCtor = SyntheticMouseEvent;
    var leaveEventType = "onMouseLeave";
    var enterEventType = "onMouseEnter";
    var eventTypePrefix = "mouse";

    if (domEventName === "pointerout" || domEventName === "pointerover") {
      SyntheticEventCtor = SyntheticPointerEvent;
      leaveEventType = "onPointerLeave";
      enterEventType = "onPointerEnter";
      eventTypePrefix = "pointer";
    }

    var fromNode = from == null ? win : getNodeFromInstance(from);
    var toNode = to == null ? win : getNodeFromInstance(to);
    var leave = new SyntheticEventCtor(
      leaveEventType,
      eventTypePrefix + "leave",
      from,
      nativeEvent,
      nativeEventTarget
    );
    leave.target = fromNode;
    leave.relatedTarget = toNode;
    var enter = null; // We should only process this nativeEvent if we are processing
    // the first ancestor. Next time, we will ignore the event.

    var nativeTargetInst = getClosestInstanceFromNode(nativeEventTarget);

    if (nativeTargetInst === targetInst) {
      var enterEvent = new SyntheticEventCtor(
        enterEventType,
        eventTypePrefix + "enter",
        to,
        nativeEvent,
        nativeEventTarget
      );
      enterEvent.target = toNode;
      enterEvent.relatedTarget = fromNode;
      enter = enterEvent;
    }

    accumulateEnterLeaveTwoPhaseListeners(
      dispatchQueue,
      leave,
      enter,
      from,
      to
    );
  }

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  function is(x, y) {
    return (
      (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
    );
  }

  var objectIs = typeof Object.is === "function" ? Object.is : is;

  var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  /**
   * Performs equality by iterating through keys on an object and returning false
   * when any key has values which are not strictly equal between the arguments.
   * Returns true when the values of all keys are strictly equal.
   */

  function shallowEqual(objA, objB) {
    if (objectIs(objA, objB)) {
      return true;
    }

    if (
      typeof objA !== "object" ||
      objA === null ||
      typeof objB !== "object" ||
      objB === null
    ) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    } // Test for A's keys different from B.

    for (var i = 0; i < keysA.length; i++) {
      if (
        !hasOwnProperty$2.call(objB, keysA[i]) ||
        !objectIs(objA[keysA[i]], objB[keysA[i]])
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * Given any node return the first leaf node without children.
   *
   * @param {DOMElement|DOMTextNode} node
   * @return {DOMElement|DOMTextNode}
   */

  function getLeafNode(node) {
    while (node && node.firstChild) {
      node = node.firstChild;
    }

    return node;
  }
  /**
   * Get the next sibling within a container. This will walk up the
   * DOM if a node's siblings have been exhausted.
   *
   * @param {DOMElement|DOMTextNode} node
   * @return {?DOMElement|DOMTextNode}
   */

  function getSiblingNode(node) {
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }

      node = node.parentNode;
    }
  }
  /**
   * Get object describing the nodes which contain characters at offset.
   *
   * @param {DOMElement|DOMTextNode} root
   * @param {number} offset
   * @return {?object}
   */

  function getNodeForCharacterOffset(root, offset) {
    var node = getLeafNode(root);
    var nodeStart = 0;
    var nodeEnd = 0;

    while (node) {
      if (node.nodeType === TEXT_NODE) {
        nodeEnd = nodeStart + node.textContent.length;

        if (nodeStart <= offset && nodeEnd >= offset) {
          return {
            node: node,
            offset: offset - nodeStart,
          };
        }

        nodeStart = nodeEnd;
      }

      node = getLeafNode(getSiblingNode(node));
    }
  }

  /**
   * @param {DOMElement} outerNode
   * @return {?object}
   */

  function getOffsets(outerNode) {
    var ownerDocument = outerNode.ownerDocument;
    var win = (ownerDocument && ownerDocument.defaultView) || window;
    var selection = win.getSelection && win.getSelection();

    if (!selection || selection.rangeCount === 0) {
      return null;
    }

    var anchorNode = selection.anchorNode,
      anchorOffset = selection.anchorOffset,
      focusNode = selection.focusNode,
      focusOffset = selection.focusOffset; // In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
    // up/down buttons on an <input type="number">. Anonymous divs do not seem to
    // expose properties, triggering a "Permission denied error" if any of its
    // properties are accessed. The only seemingly possible way to avoid erroring
    // is to access a property that typically works for non-anonymous divs and
    // catch any error that may otherwise arise. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=208427

    try {
      /* eslint-disable no-unused-expressions */
      anchorNode.nodeType;
      focusNode.nodeType;
      /* eslint-enable no-unused-expressions */
    } catch (e) {
      return null;
    }

    return getModernOffsetsFromPoints(
      outerNode,
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset
    );
  }
  /**
   * Returns {start, end} where `start` is the character/codepoint index of
   * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
   * `end` is the index of (focusNode, focusOffset).
   *
   * Returns null if you pass in garbage input but we should probably just crash.
   *
   * Exported only for testing.
   */

  function getModernOffsetsFromPoints(
    outerNode,
    anchorNode,
    anchorOffset,
    focusNode,
    focusOffset
  ) {
    var length = 0;
    var start = -1;
    var end = -1;
    var indexWithinAnchor = 0;
    var indexWithinFocus = 0;
    var node = outerNode;
    var parentNode = null;

    outer: while (true) {
      var next = null;

      while (true) {
        if (
          node === anchorNode &&
          (anchorOffset === 0 || node.nodeType === TEXT_NODE)
        ) {
          start = length + anchorOffset;
        }

        if (
          node === focusNode &&
          (focusOffset === 0 || node.nodeType === TEXT_NODE)
        ) {
          end = length + focusOffset;
        }

        if (node.nodeType === TEXT_NODE) {
          length += node.nodeValue.length;
        }

        if ((next = node.firstChild) === null) {
          break;
        } // Moving from `node` to its first child `next`.

        parentNode = node;
        node = next;
      }

      while (true) {
        if (node === outerNode) {
          // If `outerNode` has children, this is always the second time visiting
          // it. If it has no children, this is still the first loop, and the only
          // valid selection is anchorNode and focusNode both equal to this node
          // and both offsets 0, in which case we will have handled above.
          break outer;
        }

        if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset) {
          start = length;
        }

        if (parentNode === focusNode && ++indexWithinFocus === focusOffset) {
          end = length;
        }

        if ((next = node.nextSibling) !== null) {
          break;
        }

        node = parentNode;
        parentNode = node.parentNode;
      } // Moving from `node` to its next sibling `next`.

      node = next;
    }

    if (start === -1 || end === -1) {
      // This should never happen. (Would happen if the anchor/focus nodes aren't
      // actually inside the passed-in node.)
      return null;
    }

    return {
      start: start,
      end: end,
    };
  }
  /**
   * In modern non-IE browsers, we can support both forward and backward
   * selections.
   *
   * Note: IE10+ supports the Selection object, but it does not support
   * the `extend` method, which means that even in modern IE, it's not possible
   * to programmatically create a backward selection. Thus, for all IE
   * versions, we use the old IE API to create our selections.
   *
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */

  function setOffsets(node, offsets) {
    var doc = node.ownerDocument || document;
    var win = (doc && doc.defaultView) || window; // Edge fails with "Object expected" in some scenarios.
    // (For instance: TinyMCE editor used in a list component that supports pasting to add more,
    // fails when pasting 100+ items)

    if (!win.getSelection) {
      return;
    }

    var selection = win.getSelection();
    var length = node.textContent.length;
    var start = Math.min(offsets.start, length);
    var end = offsets.end === undefined ? start : Math.min(offsets.end, length); // IE 11 uses modern selection, but doesn't support the extend method.
    // Flip backward selections, so we can set with a single range.

    if (!selection.extend && start > end) {
      var temp = end;
      end = start;
      start = temp;
    }

    var startMarker = getNodeForCharacterOffset(node, start);
    var endMarker = getNodeForCharacterOffset(node, end);

    if (startMarker && endMarker) {
      if (
        selection.rangeCount === 1 &&
        selection.anchorNode === startMarker.node &&
        selection.anchorOffset === startMarker.offset &&
        selection.focusNode === endMarker.node &&
        selection.focusOffset === endMarker.offset
      ) {
        return;
      }

      var range = doc.createRange();
      range.setStart(startMarker.node, startMarker.offset);
      selection.removeAllRanges();

      if (start > end) {
        selection.addRange(range);
        selection.extend(endMarker.node, endMarker.offset);
      } else {
        range.setEnd(endMarker.node, endMarker.offset);
        selection.addRange(range);
      }
    }
  }

  function isTextNode(node) {
    return node && node.nodeType === TEXT_NODE;
  }

  function containsNode(outerNode, innerNode) {
    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (isTextNode(outerNode)) {
      return false;
    } else if (isTextNode(innerNode)) {
      return containsNode(outerNode, innerNode.parentNode);
    } else if ("contains" in outerNode) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  }

  function isInDocument(node) {
    return (
      node &&
      node.ownerDocument &&
      containsNode(node.ownerDocument.documentElement, node)
    );
  }

  function isSameOriginFrame(iframe) {
    try {
      // Accessing the contentDocument of a HTMLIframeElement can cause the browser
      // to throw, e.g. if it has a cross-origin src attribute.
      // Safari will show an error in the console when the access results in "Blocked a frame with origin". e.g:
      // iframe.contentDocument.defaultView;
      // A safety way is to access one of the cross origin properties: Window or Location
      // Which might result in "SecurityError" DOM Exception and it is compatible to Safari.
      // https://html.spec.whatwg.org/multipage/browsers.html#integration-with-idl
      return typeof iframe.contentWindow.location.href === "string";
    } catch (err) {
      return false;
    }
  }

  function getActiveElementDeep() {
    var win = window;
    var element = getActiveElement();

    while (element instanceof win.HTMLIFrameElement) {
      if (isSameOriginFrame(element)) {
        win = element.contentWindow;
      } else {
        return element;
      }

      element = getActiveElement(win.document);
    }

    return element;
  }
  /**
   * @ReactInputSelection: React input selection module. Based on Selection.js,
   * but modified to be suitable for react and has a couple of bug fixes (doesn't
   * assume buttons have range selections allowed).
   * Input selection module for React.
   */

  /**
   * @hasSelectionCapabilities: we get the element types that support selection
   * from https://html.spec.whatwg.org/#do-not-apply, looking at `selectionStart`
   * and `selectionEnd` rows.
   */

  function hasSelectionCapabilities(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return (
      nodeName &&
      ((nodeName === "input" &&
        (elem.type === "text" ||
          elem.type === "search" ||
          elem.type === "tel" ||
          elem.type === "url" ||
          elem.type === "password")) ||
        nodeName === "textarea" ||
        elem.contentEditable === "true")
    );
  }
  function getSelectionInformation() {
    var focusedElem = getActiveElementDeep();
    return {
      focusedElem: focusedElem,
      selectionRange: hasSelectionCapabilities(focusedElem)
        ? getSelection(focusedElem)
        : null,
    };
  }
  /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */

  function restoreSelection(priorSelectionInformation) {
    var curFocusedElem = getActiveElementDeep();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;

    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
      if (
        priorSelectionRange !== null &&
        hasSelectionCapabilities(priorFocusedElem)
      ) {
        setSelection(priorFocusedElem, priorSelectionRange);
      } // Focusing a node can change the scroll position, which is undesirable

      var ancestors = [];
      var ancestor = priorFocusedElem;

      while ((ancestor = ancestor.parentNode)) {
        if (ancestor.nodeType === ELEMENT_NODE) {
          ancestors.push({
            element: ancestor,
            left: ancestor.scrollLeft,
            top: ancestor.scrollTop,
          });
        }
      }

      if (typeof priorFocusedElem.focus === "function") {
        priorFocusedElem.focus();
      }

      for (var i = 0; i < ancestors.length; i++) {
        var info = ancestors[i];
        info.element.scrollLeft = info.left;
        info.element.scrollTop = info.top;
      }
    }
  }
  /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */

  function getSelection(input) {
    var selection;

    if ("selectionStart" in input) {
      // Modern browser with input or textarea.
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd,
      };
    } else {
      // Content editable or old IE textarea.
      selection = getOffsets(input);
    }

    return (
      selection || {
        start: 0,
        end: 0,
      }
    );
  }
  /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */

  function setSelection(input, offsets) {
    var start = offsets.start;
    var end = offsets.end;

    if (end === undefined) {
      end = start;
    }

    if ("selectionStart" in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else {
      setOffsets(input, offsets);
    }
  }

  var skipSelectionChangeEvent =
    canUseDOM && "documentMode" in document && document.documentMode <= 11;

  function registerEvents$3() {
    registerTwoPhaseEvent("onSelect", [
      "focusout",
      "contextmenu",
      "dragend",
      "focusin",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "selectionchange",
    ]);
  }

  var activeElement$1 = null;
  var activeElementInst$1 = null;
  var lastSelection = null;
  var mouseDown = false;
  /**
   * Get an object which is a unique representation of the current selection.
   *
   * The return value will not be consistent across nodes or browsers, but
   * two identical selections on the same node will return identical objects.
   */

  function getSelection$1(node) {
    if ("selectionStart" in node && hasSelectionCapabilities(node)) {
      return {
        start: node.selectionStart,
        end: node.selectionEnd,
      };
    } else {
      var win =
        (node.ownerDocument && node.ownerDocument.defaultView) || window;
      var selection = win.getSelection();
      return {
        anchorNode: selection.anchorNode,
        anchorOffset: selection.anchorOffset,
        focusNode: selection.focusNode,
        focusOffset: selection.focusOffset,
      };
    }
  }
  /**
   * Get document associated with the event target.
   */

  function getEventTargetDocument(eventTarget) {
    return eventTarget.window === eventTarget
      ? eventTarget.document
      : eventTarget.nodeType === DOCUMENT_NODE
      ? eventTarget
      : eventTarget.ownerDocument;
  }
  /**
   * Poll selection to see whether it's changed.
   *
   * @param {object} nativeEvent
   * @param {object} nativeEventTarget
   * @return {?SyntheticEvent}
   */

  function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
    // Ensure we have the right element, and that the user is not dragging a
    // selection (this matches native `select` event behavior). In HTML5, select
    // fires only on input and textarea thus if there's no focused element we
    // won't dispatch.
    var doc = getEventTargetDocument(nativeEventTarget);

    if (
      mouseDown ||
      activeElement$1 == null ||
      activeElement$1 !== getActiveElement(doc)
    ) {
      return;
    } // Only fire when selection has actually changed.

    var currentSelection = getSelection$1(activeElement$1);

    if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
      lastSelection = currentSelection;
      var listeners = accumulateTwoPhaseListeners(
        activeElementInst$1,
        "onSelect"
      );

      if (listeners.length > 0) {
        var event = new SyntheticEvent(
          "onSelect",
          "select",
          null,
          nativeEvent,
          nativeEventTarget
        );
        dispatchQueue.push({
          event: event,
          listeners: listeners,
        });
        event.target = activeElement$1;
      }
    }
  }
  /**
   * This plugin creates an `onSelect` event that normalizes select events
   * across form elements.
   *
   * Supported elements are:
   * - input (see `isTextInputElement`)
   * - textarea
   * - contentEditable
   *
   * This differs from native browser implementations in the following ways:
   * - Fires on contentEditable fields as well as inputs.
   * - Fires for collapsed selection.
   * - Fires after user input.
   */

  function extractEvents$3(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  ) {
    var targetNode = targetInst ? getNodeFromInstance(targetInst) : window;

    switch (domEventName) {
      // Track the input node that has focus.
      case "focusin":
        if (
          isTextInputElement(targetNode) ||
          targetNode.contentEditable === "true"
        ) {
          activeElement$1 = targetNode;
          activeElementInst$1 = targetInst;
          lastSelection = null;
        }

        break;

      case "focusout":
        activeElement$1 = null;
        activeElementInst$1 = null;
        lastSelection = null;
        break;
      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.

      case "mousedown":
        mouseDown = true;
        break;

      case "contextmenu":
      case "mouseup":
      case "dragend":
        mouseDown = false;
        constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
        break;
      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.

      case "selectionchange":
        if (skipSelectionChangeEvent) {
          break;
        }

      // falls through

      case "keydown":
      case "keyup":
        constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
    }
  }

  function extractEvents$4(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  ) {
    var reactName = topLevelEventsToReactNames.get(domEventName);

    if (reactName === undefined) {
      return;
    }

    var SyntheticEventCtor = SyntheticEvent;
    var reactEventType = domEventName;

    switch (domEventName) {
      case "keypress":
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode(nativeEvent) === 0) {
          return;
        }

      /* falls through */

      case "keydown":
      case "keyup":
        SyntheticEventCtor = SyntheticKeyboardEvent;
        break;

      case "focusin":
        reactEventType = "focus";
        SyntheticEventCtor = SyntheticFocusEvent;
        break;

      case "focusout":
        reactEventType = "blur";
        SyntheticEventCtor = SyntheticFocusEvent;
        break;

      case "beforeblur":
      case "afterblur":
        SyntheticEventCtor = SyntheticFocusEvent;
        break;

      case "click":
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return;
        }

      /* falls through */

      case "auxclick":
      case "dblclick":
      case "mousedown":
      case "mousemove":
      case "mouseup": // TODO: Disabled elements should not respond to mouse events

      /* falls through */

      case "mouseout":
      case "mouseover":
      case "contextmenu":
        SyntheticEventCtor = SyntheticMouseEvent;
        break;

      case "drag":
      case "dragend":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "dragstart":
      case "drop":
        SyntheticEventCtor = SyntheticDragEvent;
        break;

      case "touchcancel":
      case "touchend":
      case "touchmove":
      case "touchstart":
        SyntheticEventCtor = SyntheticTouchEvent;
        break;

      case ANIMATION_END:
      case ANIMATION_ITERATION:
      case ANIMATION_START:
        SyntheticEventCtor = SyntheticAnimationEvent;
        break;

      case TRANSITION_END:
        SyntheticEventCtor = SyntheticTransitionEvent;
        break;

      case "scroll":
        SyntheticEventCtor = SyntheticUIEvent;
        break;

      case "wheel":
        SyntheticEventCtor = SyntheticWheelEvent;
        break;

      case "copy":
      case "cut":
      case "paste":
        SyntheticEventCtor = SyntheticClipboardEvent;
        break;

      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
        SyntheticEventCtor = SyntheticPointerEvent;
        break;
    }

    var inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;

    {
      // Some events don't bubble in the browser.
      // In the past, React has always bubbled them, but this can be surprising.
      // We're going to try aligning closer to the browser behavior by not bubbling
      // them in React either. We'll start by not bubbling onScroll, and then expand.
      var accumulateTargetOnly =
        !inCapturePhase && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        domEventName === "scroll";

      var _listeners = accumulateSinglePhaseListeners(
        targetInst,
        reactName,
        nativeEvent.type,
        inCapturePhase,
        accumulateTargetOnly
      );

      if (_listeners.length > 0) {
        // Intentionally create event lazily.
        var _event = new SyntheticEventCtor(
          reactName,
          reactEventType,
          null,
          nativeEvent,
          nativeEventTarget
        );

        dispatchQueue.push({
          event: _event,
          listeners: _listeners,
        });
      }
    }
  }

  // TODO: remove top-level side effect.
  registerSimpleEvents();
  registerEvents$2();
  registerEvents$1();
  registerEvents$3();
  registerEvents();

  function extractEvents$5(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  ) {
    // TODO: we should remove the concept of a "SimpleEventPlugin".
    // This is the basic functionality of the event system. All
    // the other plugins are essentially polyfills. So the plugin
    // should probably be inlined somewhere and have its logic
    // be core the to event system. This would potentially allow
    // us to ship builds of React without the polyfilled plugins below.
    extractEvents$4(
      dispatchQueue,
      domEventName,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags
    );
    var shouldProcessPolyfillPlugins =
      (eventSystemFlags & SHOULD_NOT_PROCESS_POLYFILL_EVENT_PLUGINS) === 0; // We don't process these events unless we are in the
    // event's native "bubble" phase, which means that we're
    // not in the capture phase. That's because we emulate
    // the capture phase here still. This is a trade-off,
    // because in an ideal world we would not emulate and use
    // the phases properly, like we do with the SimpleEvent
    // plugin. However, the plugins below either expect
    // emulation (EnterLeave) or use state localized to that
    // plugin (BeforeInput, Change, Select). The state in
    // these modules complicates things, as you'll essentially
    // get the case where the capture phase event might change
    // state, only for the following bubble event to come in
    // later and not trigger anything as the state now
    // invalidates the heuristics of the event plugin. We
    // could alter all these plugins to work in such ways, but
    // that might cause other unknown side-effects that we
    // can't forsee right now.

    if (shouldProcessPolyfillPlugins) {
      extractEvents$2(
        dispatchQueue,
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget,
        eventSystemFlags
      );
      extractEvents$1(
        dispatchQueue,
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      extractEvents$3(
        dispatchQueue,
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      extractEvents(
        dispatchQueue,
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
    }
  } // List of events that need to be individually attached to media elements.

  var mediaEventTypes = [
    "abort",
    "canplay",
    "canplaythrough",
    "durationchange",
    "emptied",
    "encrypted",
    "ended",
    "error",
    "loadeddata",
    "loadedmetadata",
    "loadstart",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "seeked",
    "seeking",
    "stalled",
    "suspend",
    "timeupdate",
    "volumechange",
    "waiting",
  ]; // We should not delegate these events to the container, but rather
  // set them on the actual target element itself. This is primarily
  // because these events do not consistently bubble in the DOM.

  var nonDelegatedEvents = new Set(
    ["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(
      mediaEventTypes
    )
  );

  function executeDispatch(event, listener, currentTarget) {
    var type = event.type || "unknown-event";
    event.currentTarget = currentTarget;
    invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
    event.currentTarget = null;
  }

  function processDispatchQueueItemsInOrder(
    event,
    dispatchListeners,
    inCapturePhase
  ) {
    var previousInstance;

    if (inCapturePhase) {
      for (var i = dispatchListeners.length - 1; i >= 0; i--) {
        var _dispatchListeners$i = dispatchListeners[i],
          instance = _dispatchListeners$i.instance,
          currentTarget = _dispatchListeners$i.currentTarget,
          listener = _dispatchListeners$i.listener;

        if (instance !== previousInstance && event.isPropagationStopped()) {
          return;
        }

        executeDispatch(event, listener, currentTarget);
        previousInstance = instance;
      }
    } else {
      for (var _i = 0; _i < dispatchListeners.length; _i++) {
        var _dispatchListeners$_i = dispatchListeners[_i],
          _instance = _dispatchListeners$_i.instance,
          _currentTarget = _dispatchListeners$_i.currentTarget,
          _listener = _dispatchListeners$_i.listener;

        if (_instance !== previousInstance && event.isPropagationStopped()) {
          return;
        }

        executeDispatch(event, _listener, _currentTarget);
        previousInstance = _instance;
      }
    }
  }

  function processDispatchQueue(dispatchQueue, eventSystemFlags) {
    var inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;

    for (var i = 0; i < dispatchQueue.length; i++) {
      var _dispatchQueue$i = dispatchQueue[i],
        event = _dispatchQueue$i.event,
        listeners = _dispatchQueue$i.listeners;
      processDispatchQueueItemsInOrder(event, listeners, inCapturePhase); //  event system doesn't use pooling.
    } // This would be a good time to rethrow if any of the event handlers threw.

    rethrowCaughtError();
  }

  function dispatchEventsForPlugins(
    domEventName,
    eventSystemFlags,
    nativeEvent,
    targetInst,
    targetContainer
  ) {
    var nativeEventTarget = getEventTarget(nativeEvent);
    var dispatchQueue = [];
    extractEvents$5(
      dispatchQueue,
      domEventName,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags
    );
    processDispatchQueue(dispatchQueue, eventSystemFlags);
  }

  function listenToNonDelegatedEvent(domEventName, targetElement) {
    var isCapturePhaseListener = false;
    var listenerSet = getEventListenerSet(targetElement);
    var listenerSetKey = getListenerSetKey(
      domEventName,
      isCapturePhaseListener
    );

    if (!listenerSet.has(listenerSetKey)) {
      addTrappedEventListener(
        targetElement,
        domEventName,
        IS_NON_DELEGATED,
        isCapturePhaseListener
      );
      listenerSet.add(listenerSetKey);
    }
  }
  var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
  function listenToAllSupportedEvents(rootContainerElement) {
    {
      if (rootContainerElement[listeningMarker]) {
        // Performance optimization: don't iterate through events
        // for the same portal container or root node more than once.
        // TODO: once we remove the flag, we may be able to also
        // remove some of the bookkeeping maps used for laziness.
        return;
      }

      rootContainerElement[listeningMarker] = true;
      allNativeEvents.forEach(function (domEventName) {
        if (!nonDelegatedEvents.has(domEventName)) {
          listenToNativeEvent(domEventName, false, rootContainerElement, null);
        }

        listenToNativeEvent(domEventName, true, rootContainerElement, null);
      });
    }
  }
  function listenToNativeEvent(
    domEventName,
    isCapturePhaseListener,
    rootContainerElement,
    targetElement
  ) {
    var eventSystemFlags =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var target = rootContainerElement; // selectionchange needs to be attached to the document
    // otherwise it won't capture incoming events that are only
    // triggered on the document directly.

    if (
      domEventName === "selectionchange" &&
      rootContainerElement.nodeType !== DOCUMENT_NODE
    ) {
      target = rootContainerElement.ownerDocument;
    } // If the event can be delegated (or is capture phase), we can
    // register it to the root container. Otherwise, we should
    // register the event to the target element and mark it as
    // a non-delegated event.

    if (
      targetElement !== null &&
      !isCapturePhaseListener &&
      nonDelegatedEvents.has(domEventName)
    ) {
      // For all non-delegated events, apart from scroll, we attach
      // their event listeners to the respective elements that their
      // events fire on. That means we can skip this step, as event
      // listener has already been added previously. However, we
      // special case the scroll event because the reality is that any
      // element can scroll.
      // TODO: ideally, we'd eventually apply the same logic to all
      // events from the nonDelegatedEvents list. Then we can remove
      // this special case and use the same logic for all events.
      if (domEventName !== "scroll") {
        return;
      }

      eventSystemFlags |= IS_NON_DELEGATED;
      target = targetElement;
    }

    var listenerSet = getEventListenerSet(target);
    var listenerSetKey = getListenerSetKey(
      domEventName,
      isCapturePhaseListener
    ); // If the listener entry is empty or we should upgrade, then
    // we need to trap an event listener onto the target.

    if (!listenerSet.has(listenerSetKey)) {
      if (isCapturePhaseListener) {
        eventSystemFlags |= IS_CAPTURE_PHASE;
      }

      addTrappedEventListener(
        target,
        domEventName,
        eventSystemFlags,
        isCapturePhaseListener
      );
      listenerSet.add(listenerSetKey);
    }
  }

  function addTrappedEventListener(
    targetContainer,
    domEventName,
    eventSystemFlags,
    isCapturePhaseListener,
    isDeferredListenerForLegacyFBSupport
  ) {
    var listener = createEventListenerWrapperWithPriority(
      targetContainer,
      domEventName,
      eventSystemFlags
    ); // If passive option is not supported, then the event will be
    // active and not passive.

    var isPassiveListener = undefined;

    if (passiveBrowserEventsSupported) {
      // Browsers introduced an intervention, making these events
      // passive by default on document. React doesn't bind them
      // to document anymore, but changing this now would undo
      // the performance wins from the change. So we emulate
      // the existing behavior manually on the roots now.
      // https://github.com/facebook/react/issues/19651
      if (
        domEventName === "touchstart" ||
        domEventName === "touchmove" ||
        domEventName === "wheel"
      ) {
        isPassiveListener = true;
      }
    }

    targetContainer = targetContainer;
    var unsubscribeListener; // When legacyFBSupport is enabled, it's for when we

    if (isCapturePhaseListener) {
      if (isPassiveListener !== undefined) {
        unsubscribeListener = addEventCaptureListenerWithPassiveFlag(
          targetContainer,
          domEventName,
          listener,
          isPassiveListener
        );
      } else {
        unsubscribeListener = addEventCaptureListener(
          targetContainer,
          domEventName,
          listener
        );
      }
    } else {
      if (isPassiveListener !== undefined) {
        unsubscribeListener = addEventBubbleListenerWithPassiveFlag(
          targetContainer,
          domEventName,
          listener,
          isPassiveListener
        );
      } else {
        unsubscribeListener = addEventBubbleListener(
          targetContainer,
          domEventName,
          listener
        );
      }
    }
  }

  function isMatchingRootContainer(grandContainer, targetContainer) {
    return (
      grandContainer === targetContainer ||
      (grandContainer.nodeType === COMMENT_NODE &&
        grandContainer.parentNode === targetContainer)
    );
  }

  function dispatchEventForPluginEventSystem(
    domEventName,
    eventSystemFlags,
    nativeEvent,
    targetInst,
    targetContainer
  ) {
    var ancestorInst = targetInst;

    if (
      (eventSystemFlags & IS_EVENT_HANDLE_NON_MANAGED_NODE) === 0 &&
      (eventSystemFlags & IS_NON_DELEGATED) === 0
    ) {
      var targetContainerNode = targetContainer; // If we are using the legacy FB support flag, we

      if (targetInst !== null) {
        // The below logic attempts to work out if we need to change
        // the target fiber to a different ancestor. We had similar logic
        // in the legacy event system, except the big difference between
        // systems is that the modern event system now has an event listener
        // attached to each React Root and React Portal Root. Together,
        // the DOM nodes representing these roots are the "rootContainer".
        // To figure out which ancestor instance we should use, we traverse
        // up the fiber tree from the target instance and attempt to find
        // root boundaries that match that of our current "rootContainer".
        // If we find that "rootContainer", we find the parent fiber
        // sub-tree for that root and make that our ancestor instance.
        var node = targetInst;

        mainLoop: while (true) {
          if (node === null) {
            return;
          }

          var nodeTag = node.tag;

          if (nodeTag === HostRoot || nodeTag === HostPortal) {
            var container = node.stateNode.containerInfo;

            if (isMatchingRootContainer(container, targetContainerNode)) {
              break;
            }

            if (nodeTag === HostPortal) {
              // The target is a portal, but it's not the rootContainer we're looking for.
              // Normally portals handle their own events all the way down to the root.
              // So we should be able to stop now. However, we don't know if this portal
              // was part of *our* root.
              var grandNode = node.return;

              while (grandNode !== null) {
                var grandTag = grandNode.tag;

                if (grandTag === HostRoot || grandTag === HostPortal) {
                  var grandContainer = grandNode.stateNode.containerInfo;

                  if (
                    isMatchingRootContainer(grandContainer, targetContainerNode)
                  ) {
                    // This is the rootContainer we're looking for and we found it as
                    // a parent of the Portal. That means we can ignore it because the
                    // Portal will bubble through to us.
                    return;
                  }
                }

                grandNode = grandNode.return;
              }
            } // Now we need to find it's corresponding host fiber in the other
            // tree. To do this we can use getClosestInstanceFromNode, but we
            // need to validate that the fiber is a host instance, otherwise
            // we need to traverse up through the DOM till we find the correct
            // node that is from the other tree.

            while (container !== null) {
              var parentNode = getClosestInstanceFromNode(container);

              if (parentNode === null) {
                return;
              }

              var parentTag = parentNode.tag;

              if (parentTag === HostComponent || parentTag === HostText) {
                node = ancestorInst = parentNode;
                continue mainLoop;
              }

              container = container.parentNode;
            }
          }

          node = node.return;
        }
      }
    }

    batchedEventUpdates(function () {
      return dispatchEventsForPlugins(
        domEventName,
        eventSystemFlags,
        nativeEvent,
        ancestorInst
      );
    });
  }

  function createDispatchListener(instance, listener, currentTarget) {
    return {
      instance: instance,
      listener: listener,
      currentTarget: currentTarget,
    };
  }

  function accumulateSinglePhaseListeners(
    targetFiber,
    reactName,
    nativeEventType,
    inCapturePhase,
    accumulateTargetOnly
  ) {
    var captureName = reactName !== null ? reactName + "Capture" : null;
    var reactEventName = inCapturePhase ? captureName : reactName;
    var listeners = [];
    var instance = targetFiber;
    var lastHostComponent = null; // Accumulate all instances and listeners via the target -> root path.

    while (instance !== null) {
      var _instance2 = instance,
        stateNode = _instance2.stateNode,
        tag = _instance2.tag; // Handle listeners that are on HostComponents (i.e. <div>)

      if (tag === HostComponent && stateNode !== null) {
        lastHostComponent = stateNode; // createEventHandle listeners

        if (reactEventName !== null) {
          var listener = getListener(instance, reactEventName);

          if (listener != null) {
            listeners.push(
              createDispatchListener(instance, listener, lastHostComponent)
            );
          }
        }
      } // If we are only accumulating events for the target, then we don't
      // continue to propagate through the React fiber tree to find other
      // listeners.

      if (accumulateTargetOnly) {
        break;
      }

      instance = instance.return;
    }

    return listeners;
  } // We should only use this function for:
  // - BeforeInputEventPlugin
  // - ChangeEventPlugin
  // - SelectEventPlugin
  // This is because we only process these plugins
  // in the bubble phase, so we need to accumulate two
  // phase event listeners (via emulation).

  function accumulateTwoPhaseListeners(targetFiber, reactName) {
    var captureName = reactName + "Capture";
    var listeners = [];
    var instance = targetFiber; // Accumulate all instances and listeners via the target -> root path.

    while (instance !== null) {
      var _instance3 = instance,
        stateNode = _instance3.stateNode,
        tag = _instance3.tag; // Handle listeners that are on HostComponents (i.e. <div>)

      if (tag === HostComponent && stateNode !== null) {
        var currentTarget = stateNode;
        var captureListener = getListener(instance, captureName);

        if (captureListener != null) {
          listeners.unshift(
            createDispatchListener(instance, captureListener, currentTarget)
          );
        }

        var bubbleListener = getListener(instance, reactName);

        if (bubbleListener != null) {
          listeners.push(
            createDispatchListener(instance, bubbleListener, currentTarget)
          );
        }
      }

      instance = instance.return;
    }

    return listeners;
  }

  function getParent(inst) {
    if (inst === null) {
      return null;
    }

    do {
      inst = inst.return; // TODO: If this is a HostRoot we might want to bail out.
      // That is depending on if we want nested subtrees (layers) to bubble
      // events to their parent. We could also go through parentNode on the
      // host node but that wouldn't work for React Native and doesn't let us
      // do the portal feature.
    } while (inst && inst.tag !== HostComponent);

    if (inst) {
      return inst;
    }

    return null;
  }
  /**
   * Return the lowest common ancestor of A and B, or null if they are in
   * different trees.
   */

  function getLowestCommonAncestor(instA, instB) {
    var nodeA = instA;
    var nodeB = instB;
    var depthA = 0;

    for (var tempA = nodeA; tempA; tempA = getParent(tempA)) {
      depthA++;
    }

    var depthB = 0;

    for (var tempB = nodeB; tempB; tempB = getParent(tempB)) {
      depthB++;
    } // If A is deeper, crawl up.

    while (depthA - depthB > 0) {
      nodeA = getParent(nodeA);
      depthA--;
    } // If B is deeper, crawl up.

    while (depthB - depthA > 0) {
      nodeB = getParent(nodeB);
      depthB--;
    } // Walk in lockstep until we find a match.

    var depth = depthA;

    while (depth--) {
      if (nodeA === nodeB || (nodeB !== null && nodeA === nodeB.alternate)) {
        return nodeA;
      }

      nodeA = getParent(nodeA);
      nodeB = getParent(nodeB);
    }

    return null;
  }

  function accumulateEnterLeaveListenersForEvent(
    dispatchQueue,
    event,
    target,
    common,
    inCapturePhase
  ) {
    var registrationName = event._reactName;
    var listeners = [];
    var instance = target;

    while (instance !== null) {
      if (instance === common) {
        break;
      }

      var _instance4 = instance,
        alternate = _instance4.alternate,
        stateNode = _instance4.stateNode,
        tag = _instance4.tag;

      if (alternate !== null && alternate === common) {
        break;
      }

      if (tag === HostComponent && stateNode !== null) {
        var currentTarget = stateNode;

        if (inCapturePhase) {
          var captureListener = getListener(instance, registrationName);

          if (captureListener != null) {
            listeners.unshift(
              createDispatchListener(instance, captureListener, currentTarget)
            );
          }
        } else if (!inCapturePhase) {
          var bubbleListener = getListener(instance, registrationName);

          if (bubbleListener != null) {
            listeners.push(
              createDispatchListener(instance, bubbleListener, currentTarget)
            );
          }
        }
      }

      instance = instance.return;
    }

    if (listeners.length !== 0) {
      dispatchQueue.push({
        event: event,
        listeners: listeners,
      });
    }
  } // We should only use this function for:
  // - EnterLeaveEventPlugin
  // This is because we only process this plugin
  // in the bubble phase, so we need to accumulate two
  // phase event listeners.

  function accumulateEnterLeaveTwoPhaseListeners(
    dispatchQueue,
    leaveEvent,
    enterEvent,
    from,
    to
  ) {
    var common = from && to ? getLowestCommonAncestor(from, to) : null;

    if (from !== null) {
      accumulateEnterLeaveListenersForEvent(
        dispatchQueue,
        leaveEvent,
        from,
        common,
        false
      );
    }

    if (to !== null && enterEvent !== null) {
      accumulateEnterLeaveListenersForEvent(
        dispatchQueue,
        enterEvent,
        to,
        common,
        true
      );
    }
  }
  function getListenerSetKey(domEventName, capture) {
    return domEventName + "__" + (capture ? "capture" : "bubble");
  }

  var didWarnInvalidHydration = false;
  var DANGEROUSLY_SET_INNER_HTML = "dangerouslySetInnerHTML";
  var SUPPRESS_CONTENT_EDITABLE_WARNING = "suppressContentEditableWarning";
  var SUPPRESS_HYDRATION_WARNING = "suppressHydrationWarning";
  var AUTOFOCUS = "autoFocus";
  var CHILDREN = "children";
  var STYLE = "style";
  var HTML$1 = "__html";
  var HTML_NAMESPACE$1 = Namespaces.html;
  var warnedUnknownTags;
  var suppressHydrationWarning;
  var validatePropertiesInDevelopment;
  var warnForTextDifference;
  var warnForPropDifference;
  var warnForExtraAttributes;
  var warnForInvalidEventListener;
  var canDiffStyleForHydrationWarning;
  var normalizeMarkupForTextOrAttribute;
  var normalizeHTML;

  {
    warnedUnknownTags = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: true,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: true,
    };

    validatePropertiesInDevelopment = function (type, props) {
      validateProperties(type, props);
      validateProperties$1(type, props);
      validateProperties$2(type, props, {
        registrationNameDependencies: registrationNameDependencies,
        possibleRegistrationNames: possibleRegistrationNames,
      });
    }; // IE 11 parses & normalizes the style attribute as opposed to other
    // browsers. It adds spaces and sorts the properties in some
    // non-alphabetical order. Handling that would require sorting CSS
    // properties in the client & server versions or applying
    // `expectedStyle` to a temporary DOM node to read its `style` attribute
    // normalized. Since it only affects IE, we're skipping style warnings
    // in that browser completely in favor of doing all that work.
    // See https://github.com/facebook/react/issues/11807

    canDiffStyleForHydrationWarning = canUseDOM && !document.documentMode; // HTML parsing normalizes CR and CRLF to LF.
    // It also can turn \u0000 into \uFFFD inside attributes.
    // https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
    // If we have a mismatch, it might be caused by that.
    // We will still patch up in this case but not fire the warning.

    var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
    var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;

    normalizeMarkupForTextOrAttribute = function (markup) {
      var markupString = typeof markup === "string" ? markup : "" + markup;
      return markupString
        .replace(NORMALIZE_NEWLINES_REGEX, "\n")
        .replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
    };

    warnForTextDifference = function (serverText, clientText) {
      if (didWarnInvalidHydration) {
        return;
      }

      var normalizedClientText = normalizeMarkupForTextOrAttribute(clientText);
      var normalizedServerText = normalizeMarkupForTextOrAttribute(serverText);

      if (normalizedServerText === normalizedClientText) {
        return;
      }

      didWarnInvalidHydration = true;

      error(
        'Text content did not match. Server: "%s" Client: "%s"',
        normalizedServerText,
        normalizedClientText
      );
    };

    warnForPropDifference = function (propName, serverValue, clientValue) {
      if (didWarnInvalidHydration) {
        return;
      }

      var normalizedClientValue =
        normalizeMarkupForTextOrAttribute(clientValue);
      var normalizedServerValue =
        normalizeMarkupForTextOrAttribute(serverValue);

      if (normalizedServerValue === normalizedClientValue) {
        return;
      }

      didWarnInvalidHydration = true;

      error(
        "Prop `%s` did not match. Server: %s Client: %s",
        propName,
        JSON.stringify(normalizedServerValue),
        JSON.stringify(normalizedClientValue)
      );
    };

    warnForExtraAttributes = function (attributeNames) {
      if (didWarnInvalidHydration) {
        return;
      }

      didWarnInvalidHydration = true;
      var names = [];
      attributeNames.forEach(function (name) {
        names.push(name);
      });

      error("Extra attributes from the server: %s", names);
    };

    warnForInvalidEventListener = function (registrationName, listener) {
      if (listener === false) {
        error(
          "Expected `%s` listener to be a function, instead got `false`.\n\n" +
            "If you used to conditionally omit it with %s={condition && value}, " +
            "pass %s={condition ? value : undefined} instead.",
          registrationName,
          registrationName,
          registrationName
        );
      } else {
        error(
          "Expected `%s` listener to be a function, instead got a value of `%s` type.",
          registrationName,
          typeof listener
        );
      }
    }; // Parse the HTML and read it back to normalize the HTML string so that it
    // can be used for comparison.

    normalizeHTML = function (parent, html) {
      // We could have created a separate document here to avoid
      // re-initializing custom elements if they exist. But this breaks
      // how <noscript> is being handled. So we use the same document.
      // See the discussion in https://github.com/facebook/react/pull/11157.
      var testElement =
        parent.namespaceURI === HTML_NAMESPACE$1
          ? parent.ownerDocument.createElement(parent.tagName)
          : parent.ownerDocument.createElementNS(
              parent.namespaceURI,
              parent.tagName
            );
      testElement.innerHTML = html;
      return testElement.innerHTML;
    };
  }

  function getOwnerDocumentFromRootContainer(rootContainerElement) {
    return rootContainerElement.nodeType === DOCUMENT_NODE
      ? rootContainerElement
      : rootContainerElement.ownerDocument;
  }

  function noop() {}

  function trapClickOnNonInteractiveElement(node) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    node.onclick = noop;
  }

  function setInitialDOMProperties(
    tag,
    domElement,
    rootContainerElement,
    nextProps,
    isCustomComponentTag
  ) {
    for (var propKey in nextProps) {
      if (!nextProps.hasOwnProperty(propKey)) {
        continue;
      }

      var nextProp = nextProps[propKey];

      if (propKey === STYLE) {
        {
          if (nextProp) {
            // Freeze the next style object so that we can assume it won't be
            // mutated. We have already warned for this in the past.
            Object.freeze(nextProp);
          }
        } // Relies on `updateStylesByID` not mutating `styleUpdates`.

        setValueForStyles(domElement, nextProp);
      } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
        var nextHtml = nextProp ? nextProp[HTML$1] : undefined;

        if (nextHtml != null) {
          setInnerHTML(domElement, nextHtml);
        }
      } else if (propKey === CHILDREN) {
        if (typeof nextProp === "string") {
          // Avoid setting initial textContent when the text is empty. In IE11 setting
          // textContent on a <textarea> will cause the placeholder to not
          // show within the <textarea> until it has been focused and blurred again.
          // https://github.com/facebook/react/issues/6731#issuecomment-254874553
          var canSetTextContent = tag !== "textarea" || nextProp !== "";

          if (canSetTextContent) {
            setTextContent(domElement, nextProp);
          }
        } else if (typeof nextProp === "number") {
          setTextContent(domElement, "" + nextProp);
        }
      } else if (
        propKey === SUPPRESS_CONTENT_EDITABLE_WARNING ||
        propKey === SUPPRESS_HYDRATION_WARNING
      );
      else if (propKey === AUTOFOCUS);
      else if (registrationNameDependencies.hasOwnProperty(propKey)) {
        if (nextProp != null) {
          if (typeof nextProp !== "function") {
            warnForInvalidEventListener(propKey, nextProp);
          }

          if (propKey === "onScroll") {
            listenToNonDelegatedEvent("scroll", domElement);
          }
        }
      } else if (nextProp != null) {
        setValueForProperty(
          domElement,
          propKey,
          nextProp,
          isCustomComponentTag
        );
      }
    }
  }

  function updateDOMProperties(
    domElement,
    updatePayload,
    wasCustomComponentTag,
    isCustomComponentTag
  ) {
    // TODO: Handle wasCustomComponentTag
    for (var i = 0; i < updatePayload.length; i += 2) {
      var propKey = updatePayload[i];
      var propValue = updatePayload[i + 1];

      if (propKey === STYLE) {
        setValueForStyles(domElement, propValue);
      } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
        setInnerHTML(domElement, propValue);
      } else if (propKey === CHILDREN) {
        setTextContent(domElement, propValue);
      } else {
        setValueForProperty(
          domElement,
          propKey,
          propValue,
          isCustomComponentTag
        );
      }
    }
  }
});
