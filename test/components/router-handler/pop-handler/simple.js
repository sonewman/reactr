var React = require('react')
var Router = require('../../../../')
var Route = Router.Route
var RouteHandler = Router.RouteHandler

var testUtils = require('../../../../test-utils')
require('should')

var TestHandle = React.createClass({
  displayName: 'Test McTesterson',
  render: function () {
    return <h1>hey</h1>
  }
})

describe('Router - regular route', function () {
  beforeEach(function () {
    Router.navigate('/preset')

    this.router = new Router(
      <Route path='/' handler={TestHandle} />
    )
  })

  afterEach(function () {
    this.router.stop()
    Router.navigate('/')
  })

  it('should render route handler', function (done) {
    this.router.run(function (Handler, state) {
      var $ = testUtils.render(<Handler />)
      $('h1').text().should.equal('hey')
      done()
    })

    Router.navigate('/')
  })
})
