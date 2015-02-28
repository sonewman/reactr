
var React = require('react')
var Router = require('../../')
var Route = Router.Route
var RouteHandler = Router.RouteHandler

var testUtils = require('../../test-utils')
require('should')

var Wrapper = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler />
      </div>
    )
  }
})

var Header1 = React.createClass({
  render: function () {
    return <h1>hello!</h1>
  }
})

var Header2 = React.createClass({
  render: function () {
    return <h1>howdy!</h1>
  }
})

describe('Router - dual routers', function () {
  beforeEach(function () {
    Router.navigate('/')

    this.router1 = new Router(
      <Route path='/' handler={Wrapper}>
        <Route path='/test' handler={Header1} />
      </Route>
    )

    this.router2 = new Router(
      <Route path='/' handler={Wrapper}>
        <Route path='/new-route' handler={Header2} />
      </Route>
    )
  })

  afterEach(function () {
    this.router1.stop()
    this.router2.stop()
    Router.navigate('/')
  })

  it('should allow two routers to exist and respond accordingly', function (done) {
    var router1Count = 0
    this.router1.run(function (Handler) {
      if (++router1Count === 1) {
        var $ = testUtils.render(<Handler />)
        $('h1').text().should.equal('hello!')
      }
    })

    var router2Count = 0
    this.router2.run(function (Handler) {
      if (++router2Count === 2) {
        var $ = testUtils.render(<Handler />)
        $('h1').text().should.equal('howdy!')
        done()
      }
    })

    Router.navigate('/test')
    Router.navigate('/new-route')
  })
})
