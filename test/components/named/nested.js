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
        <RouteHandler name='parent1' />
        <RouteHandler name='parent2' />
      </div>
    )
  }
})

var Child1 = React.createClass({
  render: function () {
    return <h1>Child1</h1>
  }
})

var Child2 = React.createClass({
  render: function () {
    return <h2>Child2</h2>
  }
})

var Parent1 = React.createClass({
  displayName: 'Parent1',
  render: function () {
    return (
      <header>
        <RouteHandler name='child1' />
      </header>
    )
  }
})

var Parent2 = React.createClass({
  displayName: 'Parent2',
  render: function () {
    return (
      <section>
        <RouteHandler name='child2' />
      </section>
    )
  }
})

describe('Router - named handler routes', function () {
  beforeEach(function () {
    Router.navigate('/preset')

    this.router = new Router(
      <Route path='/' handler={Root}>
        <Route name='parent1' handler={Parent1}>
          <Route name='child1' handler={Child1} />
        </Route>
        <Route name='parent2' handler={Parent2}>
          <Route name='child2' handler={Child2} />
        </Route>
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

      $('header h1').text().should.equal('Child1')
      $('section h2').text().should.equal('Child2')
      done()
    })

    Router.navigate('/')
  })
})
