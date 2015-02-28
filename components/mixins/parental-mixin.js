var React = require('react')

module.exports = {
  contextTypes: {
    childRouteHandlers: React.PropTypes.array.isRequired
  },
  getHandle: function () {
    console.log(this.context.childRouteHandlers)
    return <h1>hey</h1>
  }
}
