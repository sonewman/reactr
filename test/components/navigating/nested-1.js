var React = require('react')
var Router = require('../../../')
var Route = Router.Route
var RouteHandler = Router.RouteHandler

var testUtils = require('../../../test-utils')
require('should')

var Root = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    )
  }
})

var Title1 = React.createClass({
  render: function () {
    return <h1>Page 1</h1>
  }
})

var Title2 = React.createClass({
  render: function () {
    return <h1>Page 2</h1>
  }
})

var Page1 = React.createClass({
  render: function () {
    return (
      <header id='header-1'>
        <RouteHandler name='title1' />
      </header>
    )
  }
})

var Page2 = React.createClass({
  render: function () {
    return (
      <header id='header-2'>
        <RouteHandler name='title2' />
      </header>
    )
  }
})


describe('Router - Navigating between nested routes', function () {
  beforeEach(function () {
    Router.navigate('/')

    this.router = new Router(
      <Route path='/' handler={Root}>
        <Route path='/a' name='page1' handler={Page1}>
          <Route name='title1' handler={Title1} />
        </Route>
        <Route path='/b' name='page2' handler={Page2}>
          <Route name='title2' handler={Title2} />
        </Route>
      </Route>
    )

  })

  afterEach(function () {
    Router.navigate('/')
  })

  it('should render route handler nested 2 levels deep', function (done) {

    var count = 0
    this.router.run(function (Handler, state) {
      var $ = testUtils.render(<Handler />)

      if (++count === 1) {

        $('header#header-1 h1').text().should.equal('Page 1')
        $('header#header-2 h1').length.should.equal(0)

        // navigate on to next route
        Router.navigate('/b')

      } else if (count === 2) {

        $('header#header-2 h1').text().should.equal('Page 2')
        $('header#header-1 h1').length.should.equal(0)

        // navigate on to final route
        Router.navigate('/a')

      } else if (count === 3) {

        $('header#header-1 h1').text().should.equal('Page 1')
        $('header#header-2 h1').length.should.equal(0)

        done()
      }
    })

    Router.navigate('/a')
  })
})
