var React = require('react')
var Router = require('../../../../')
var Route = Router.Route
var RouteHandler = Router.RouteHandler

var testUtils = require('../../../../test-utils')
require('should')
    
var TestHandle2 = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler />
      </div>
    )
  }
})

var ChildHandle = React.createClass({
  render: function () {
    return <h1>hello</h1>
  }
})

describe('Router - nested route', function () {
  beforeEach(function () {
    Router.navigate('/')

    this.router = new Router(
      <Route path='/' handler={TestHandle2}>
        <Route path='/test' handler={ChildHandle} />
      </Route>
    )
  })

  afterEach(function () {
    this.router.stop()
    Router.navigate('/')
  })

  it('should render route handler nested 2 levels deep', function (done) {
    this.router.run(function (Handler, state) {
      var $ = testUtils.render(<Handler />)
      $('h1').text().should.equal('hello')
      done()
    })

    Router.navigate('/test')
  })
})
