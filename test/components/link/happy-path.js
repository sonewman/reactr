var React = require('react')
var {
  Router,
  Route,
  RouteHandler,
  Link
} = require('../../../')

var testUtils = require('../../../test-utils')
require('should')

var Root = React.createClass({
  render() {
    return (
      <div>
        <nav>
          <Link to='child1'>Child One</Link>
          <Link to='child2'>Child Two</Link>
        </nav>
        <section>
          <RouteHandler />
        </section>
      </div>
    )
  }
})

var Child1 = React.createClass({
  render() {
    return <h1>Child1</h1>
  }
})

var Child2 = React.createClass({
  render() {
    return <h1>Child2</h1>
  }
})

describe('Router.Link happy path, matching links', function () {
  beforeEach(function () {
    Router.navigate('/preset')

    this.router = new Router(
      <Route path='/' handler={Root}>
        <Route path='/page1' name='child1' handler={Child1} />
        <Route path='/page2' name='parent2'>
          <Route path='/page2/child' name='child2' handler={Child2} />
        </Route>
      </Route>
    )
  })

  afterEach(function () {
    this.router.stop()
    Router.navigate('/')
  })

  it('should render routes', function (done) {
    this.router.run(function (Handler) {
      var $ = testUtils.render(<Handler />)

      var firstLink = $('nav a:first-child')
      firstLink.text().should.equal('Child One')
      firstLink.attr('href').should.equal('/page1')

      var secondLink = $('nav a:nth-child(2)')
      secondLink.text().should.equal('Child Two')
      secondLink.attr('href').should.equal('/page2')

      done()
    })

    Router.navigate('/')
  })
})
