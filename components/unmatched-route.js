var React = require('react')

module.exports = React.createClass({
  displayName: 'UnmatchedRoute',
  propTypes: {
    handler: React.PropTypes.func.isRequired
  },
  render: function () {
    return <p>404</p>
  }
})
