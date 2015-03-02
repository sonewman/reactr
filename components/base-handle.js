var React = require('react')
var RouteHandler = require('./route-handler')

var baseHandleChildContexTypes = {
  getRouteNode: React.PropTypes.func,
  rootNode: React.PropTypes.object
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
        getRouteNode: function () { return node },
        rootNode: node
      }
    }
  })
}

module.exports = newBaseHandle
