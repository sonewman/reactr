var React = require('react')
var isValidElement = React.isValidElement
var debug = require('debug')('reactr')

var Route = require('../route')
var Match = require('../match')
var contextualise = require('../contextualise')
var GlobalState = require('../global-state')
var newBaseHandle = require('../../components/base-handle')

function noop() {}

/**
 * @class BaseRouter
 */
function BaseRouter(options) {
  options = options || {}

  var children
  var basePath

  if (isValidElement(options) || Array.isArray(options)) {
    children = options
  } else {
    children = options.routes
    basePath = options.basePath
  }

  var self = this
  self.started = false
  self.callback = noop
  self._awaitingState = null
  self._initialDispatch = options.dispatch || false

  // set top heirachy route
  self.baseRoute = new Route({ basePath, children })

  self._dispatchRoute = function (path, state, title) {
    if ('function' === typeof self._runCallback)
      dispatch_(self, path, state, title, self._runCallback)
  }
}

BaseRouter.prototype._dispatch = function (path, state, title, cb) {
  if (!path || 'string' !== typeof path)
    throw new Error('Dispatch path must be a string')

  if ('function' !== typeof cb)
    throw new Error('Dispatch callback must be defined')

  dispatch_(this, path, state, title, cb)
}

function dispatch_(router, path, state, title, cb) {
  debug('Router:dispatch', path, state, title)

  var ctx = contextualise(path, state)
  var rootNode = new Match(router.baseRoute, ctx)

  cb.call(router, newBaseHandle(rootNode), state, title)
}

BaseRouter.prototype.add = function (routes) {
  this.baseRoute.add(routes)
}

BaseRouter.prototype._navigate = function (path, state, title) {
  this._awaitingState = { path, state, title }
}

BaseRouter.prototype._run = function run(callback) {
  this.started = true
  this._runCallback = callback
  GlobalState.routers.push(this)
}

BaseRouter.prototype._stop = function stop() {
  this.started = false
  var i = GlobalState.routers.indexOf(this)
  if (~i) GlobalState.routers.splice(i, 1)
}

module.exports = BaseRouter
