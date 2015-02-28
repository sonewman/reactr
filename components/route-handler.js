var React = require('react')
var debug = require('debug')('reactr')

function createGetNode(handler) {
  return function getNode() {
    return handler.currentNode
  }
}

/**
 * @class Router.RouteHandler
 */
var RouteHandler = React.createClass({
  displayName: 'RouteHandler',

  contextTypes: {
    getRouteNode: React.PropTypes.func
  },

  childContextTypes: {
    getRouteNode: React.PropTypes.func
  },

  getChildContext: function () {
    debug('RouteHandler:getChildContext')
    return { getRouteNode: createGetNode(this) }
  },

  render: function () {
    debug('RouteHandler:render')
    var name = this.props.name

    var node = this.context.getRouteNode()
    if (!node) return null

    var childNode = name
      ? node.getNamed(name)
      : node.getNext()
    
    if (!childNode) return null

    this.currentNode = childNode
    return React.createElement(
      childNode.handler,
      this.props
    )
  }
})

module.exports = RouteHandler
