var React = require('react')

module.exports = React.createClass({
  displayName: 'Route',
  propTypes: {
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    handler: React.PropTypes.func.isRequired
  },
  render: function () {}
})
