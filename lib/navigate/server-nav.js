module.exports = navigate

var GlobalState = require('../global-state')

function navigate(path, state, title) {
  GlobalState.currentState = { path, state, title }
  for (var i = 0, l = GlobalState.routers.length; i < l; i += 1)
    GlobalState.routers[i].navigate(path, state, title)
}
