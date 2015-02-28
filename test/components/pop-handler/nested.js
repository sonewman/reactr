var React = require('react')
var Router = require('../../../')
var Route = Router.Route
var RouteHandler = Router.RouteHandler

var testUtils = require('../../../test-utils')
require('should')

var Grandparent = React.createClass({
  displayName: 'Grandparent',
  render: function () {
    return (
      <section>
        <RouteHandler />
      </section>
    )
  }
})

var Parent = React.createClass({
  displayName: 'Parent',
  render: function () {
    return (
      <header>
        <RouteHandler />
      </header>
    )
  }
})

var Child = React.createClass({
  displayName: 'Child',
  render: function () {
    return <h1>hello</h1>
  }
})

describe('Router - deeper nested route', function () {
  beforeEach(function () {
    Router.navigate('/')

    this.router = new Router(
      <Route path='/' handler={Grandparent}>
        <Route path='/test' handler={Parent}>
          <Route path='/test/123' handler={Child} />
        </Route>
      </Route>
    )
  })

  afterEach(function () {
    this.router.stop()
    Router.navigate('/')
  })

  it('should render route handlers nested 3 deep', function (done) {
    this.router.run(function (Handler, state) {
      var $ = testUtils.render(<Handler />)
      $('section header h1').text().should.equal('hello')
      done()
    })

    Router.navigate('/test/123')
  })
})
