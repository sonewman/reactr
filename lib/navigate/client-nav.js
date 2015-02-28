module.exports = navigate

var GlobalState = require('../global-state')
var client = require('../client')

function navigate(path, state, title) {
  GlobalState.currentState = { path, state, title }
  client.navigate(path, state, title)
}
