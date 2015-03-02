var React = require('react')
var debug = require('debug')('reactr')
var ParentalMixin = require('./mixins/parental-mixin')

/**
 * @class Router.Link
 */
var Link = React.createClass({
  displayName: 'Link',
  mixins: [ParentalMixin],

  shouldComponentUpdate(nextProps) {
    return Object.keys(nextProps)
      .some(key => nextProps[key] !== this.props[key])
  },

  render() {
    debug('Link:render')
    var to = this.props.to

    var nodePath = to.split('.')
    var node = this.context.getRouteNode()
    if (!node) return null

    var l = nodePath.length
    for (var i = 0; i < l; i += 1)
      node = node.getRouteNamed(nodePath[i])

    var attrs = {
      href: (node && node.path) || ''
    }

    return React.DOM.a(attrs, this.props.children)
  }
})

module.exports = Link
