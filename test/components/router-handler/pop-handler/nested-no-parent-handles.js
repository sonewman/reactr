var React = require('react')
var Router = require('../../../../')
var Route = Router.Route
var RouteHandler = Router.RouteHandler

var testUtils = require('../../../../test-utils')
require('should')

var Child = React.createClass({
  displayName: 'Child',
  render() {
    return <h1>hello</h1>
  }
})

describe('Router - nested route with no parent handles', function () {
  beforeEach(function () {
    Router.navigate('/')

    this.router = new Router(
      <Route path='/test'>
        <Route path='/test/123'>
          <Route path='/test/123/abc' handler={Child} />
        </Route>
      </Route>
    )
  })

  afterEach(function () {
    this.router.stop()
    Router.navigate('/')
  })

  it('should render route', function (done) {
    this.router.run(function (Handler, state) {
      var $ = testUtils.render(<Handler />)
      $('h1').text().should.equal('hello')
      done()
    })

    Router.navigate('/test/123/abc')
  })
})
