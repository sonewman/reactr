var React = require('react')

module.exports = React.createClass({
  displayName: 'DefaultErrorRoute',
  propTypes: {
    handler: React.PropTypes.func.isRequired
  },
  render: function () {
    return <p>Error 404</p>
  }
})
