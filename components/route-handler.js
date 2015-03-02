var React = require('react')
var debug = require('debug')('reactr')
var ParentalMixin = require('./mixins/parental-mixin')

/**
 * @class Router.RouteHandler
 */
var RouteHandler = React.createClass({
  displayName: 'RouteHandler',
  mixins: [ParentalMixin],

  _resolveNode(node) {
    if (node) {
      if (node.handler) return node

      var children = node.children
      var l = children.length

      for (var i = 0; i < l; i += 1) {
        node = this._resolveNode(children[i].getNext())
        if (node) return node
      }
    }

    return null
  },

  render() {
    debug('RouteHandler:render')
    var name = this.props.name

    var node = this.context.getRouteNode()
    if (!node) return null

    var childNode
    if (name) {
      childNode = node
      name = name.split('.')

      var l = name.length
      for (var i = 0; i < l; i += 1) {
        childNode = childNode.getNamed(name[i])
        debug('RouteHandler:render', name[i], childNode)
      }

    } else {
      childNode = node.getNext()
    }

    childNode = this._resolveNode(childNode)
    if (!childNode) return null

    this.currentNode = childNode

    return React.createElement(
      childNode.handler,
      this.props
    )
  }
})

module.exports = RouteHandler
