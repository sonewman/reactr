# Reactr

Routing for React JS

## v0.2.0

It's worth mentioning that this project is very much in it's infant stages, please come back soon for more documentation and features :)


## Router
```javascript
var Router = require('reactr')

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

var router = new Router(
  <Route path='/' handler={Root}>
    <Route name='parent1' handler={Parent1}>
      <Route name='child1' handler={Child1} />
    </Route>
    <Route name='parent2' handler={Parent2}>
      <Route name='child2' handler={Child2} />
    </Route>
  </Route>
)

router.run(function (Handler, state) {
  React.render(<Handler />, document.body)
  // or
  React.renderToString(<Handler />)
})
```
