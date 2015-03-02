var React = require('react')
var debug = require('debug')('reactr')
var ParentalMixin = require('./mixins/parental-mixin')
var pathToHref = require('../lib/path-to-href')
var {stringify} = require('qs')

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
    var props = this.props
    var to = props.to

    var nodePath = to.split('.')
    var node = this.context.getRouteNode()
    if (!node) return null

    var l = nodePath.length
    for (var i = 0; i < l; i += 1)
      node = node.getRouteNamed(nodePath[i])

    var href = (node && node.path) || ''
    var params = props.params || {}

    if (node && node.keys.length)
      href = pathToHref(href, params)

    var query = props.query
    if (query && 'object' === typeof query) {
      var queryString = stringify(query)
      href += queryString ? '?' + queryString : ''
    }

    var attrs = { href }
    return React.DOM.a(attrs, props.children)
  }
})

module.exports = Link
