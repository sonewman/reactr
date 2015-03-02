var React = require('react')
var {
  Router,
  Route,
  RouteHandler
} = require('../../../../')

var testUtils = require('../../../../test-utils')
require('should')

var Child1 = React.createClass({
  displayName: 'Child1',
  render: function () {
    return <h1>Child1</h1>
  }
})

var Child2 = React.createClass({
  displayName: 'Child2',
  render: function () {
    return <h1>Child2</h1>
  }
})

var Root = React.createClass({
  displayName: 'Root',
  render: function () {
    return (
      <div>
        <RouteHandler name='child2' />
      </div>
    )
  }
})

describe('Router - named handler routes', function () {
  beforeEach(function () {
    Router.navigate('/')

    this.router = new Router(
      <Route path='/home' handler={Root}>
        <Route name='child1' handler={Child1} />
        <Route name='child2' handler={Child2} />
      </Route>
    )
  })

  afterEach(function () {
    this.router.stop()
    Router.navigate('/')
  })

  it('should render shallow nested components', function (done) {
    this.router.run(function (Handler, state) {
      var $ = testUtils.render(<Handler />)
      $('h1').text().should.equal('Child2')
      done()
    })

    Router.navigate('/home')
  })
})
