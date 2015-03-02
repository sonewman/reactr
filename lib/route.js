module.exports = Route

var React = require('react')
var Children = React.Children
var pathToRegexp = require('path-to-regexp')
var debug = require('debug')('reactr')

function isRel(path) { return path[0] !== '/' }

var multiSlashes = /\/{2,}/g
function prunePath(str) { return str.replace(multiSlashes, '/') }

/**
 * @class Route
 */
function Route(options, parent) {
  var path = options.path || ''
  var parentPath = parent && parent.path

  if (parentPath) {
    if (isRel(path) || path.indexOf(parentPath) !== 0)
      // TODO (@Sam) resolve ../'s
      path = parentPath + '/' + path
    else if (!path)
      path = parentPath

  } else if (!path) {
    path = '/'

  } else if (isRel(path)) {
    path = '/' + path
  }

  if (options.basePath)
    path = options.basePath + path

  path = prunePath(path)

  this.children = []
  this.keys = []
  this.path = path
  this.name = options.name
  this.isParent = false

  debug('Route:add', 'path:', path, 'name:', options.name)

  var end = options.end === false ? false : true

  if (options.children) {
    end = false
    this.add(options.children)
  }

  this.setRegExp(this.path, this.keys, end)

  // handler is React component
  this.handler = options.handler || null
}

Route.prototype.setRegExp = function setRegExp(path, keys, end) {
  this.regexp = pathToRegexp(path, keys, { end })
}

Route.prototype._resetKeys = function () {
  return (this.keys = [])
}

Route.prototype.add = function addNewRoutes(newRoutes) {
  Children.forEach(newRoutes, route => {
    var props = route && route.props
    if (!props) return

    var r = new Route(props, this)

    // if we have child routes with a `path` we need to
    // make sure the base route has a sufficient regexp, to
    // match just the start of the route
    if (r.path && !this.isParent) {
      this.isParent = true
      this.setRegExp(this.path, this._resetKeys(), false)
    }

    this.children.push(r)
  })
}
