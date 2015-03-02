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

describe('Router.Link no matched link', function () {
  beforeEach(function () {
    Router.navigate('/preset')

    this.router = new Router(
      <Route path='/' handler={Root}>
        <Route path='/page1' name='child1' handler={Child1} />
      </Route>
    )
  })

  afterEach(function () {
    this.router.stop()
    Router.navigate('/')
  })

  it('should render link with empty href', function (done) {
    this.router.run(function (Handler) {
      var $ = testUtils.render(<Handler />)

      var link = $('nav a:first-child')
      link.text().should.equal('Child Two')
      link.attr('href').should.equal('')

      done()
    })

    Router.navigate('/')
  })
})
