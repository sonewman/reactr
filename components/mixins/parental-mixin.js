var React = require('react')
var debug = require('debug')('reactr')

function createGetNode(handler) {
  return function getNode() {
    return handler.currentNode
  }
}

module.exports = {
  contextTypes: {
    getRouteNode: React.PropTypes.func,
    rootNode: React.PropTypes.object
  },

  childContextTypes: {
    getRouteNode: React.PropTypes.func,
    rootNode: React.PropTypes.object
  },

  getChildContext() {
    debug('RouteHandler:getChildContext')
    return { getRouteNode: createGetNode(this) }
  }
}
