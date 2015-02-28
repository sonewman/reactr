var React = require('react')
var isValidElement = React.isValidElement
var debug = require('debug')('reactr')

var Route = require('../route')
var Match = require('../match')
var contextualise = require('../contextualise')
var GlobalState = require('../global-state')
var RouteHandler = require('../../components/route-handler')

function noop() {}

var baseHandleChildContexTypes = {
  getRouteNode: React.PropTypes.func
}

function baseHandleRender() {
  return React.createElement(RouteHandler, this.props)
}

function newBaseHandle(node) {
  return React.createClass({
    render: baseHandleRender,
    childContextTypes: baseHandleChildContexTypes,
    getChildContext: function () {
      return {
        getRouteNode: function () { return node }
      }
    }
  })
}

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
  self.dispatch = options.dispatch || false

  // set top heirachy route
  self._baseRoute = new Route({
    basePath,
    children
  })

  self._dispatchRoute = function (path, state, title) {
    debug('Router:dispatch', path, state, title)

    if ('function' !== typeof self._runCallback) return

    var ctx = contextualise(path, state)
    var rootNode = new Match(self._baseRoute, ctx)

    self._runCallback(
      newBaseHandle(rootNode),
      state,
      title
    )
  }
}

BaseRouter.prototype.add = function (routes) {
  this._baseRoute.add(routes)
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
