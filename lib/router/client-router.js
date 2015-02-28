var BaseRouter = require('./base-router')
var GlobalState = require('../global-state')
var client = require('../client')

/**
 * @class ClientRouter
 */
function ClientRouter(options) {
  BaseRouter.call(this, options)
}

ClientRouter.prototype = Object.create(BaseRouter.prototype)

ClientRouter.prototype.navigate = navigate
function navigate(path, state, title) {
  if (!this.started)
    return this._navigate(path, state, title)
  
  client.navigate(path, state, title)
}

ClientRouter.prototype.run = function run(callback) {
  if (this.started) return
  this._run(callback)

  client.listen(this._dispatchRoute)

  if (this.dispatch && GlobalState.currentState !== null) {
    var { path, state, title } = GlobalState.currentState
    this._dispatchRoute(path, state, title)
  }
}

ClientRouter.prototype.dispatch = function (path, state, title, cb) {
  switch (arguments.length) {
    case 3:
      cb = title
      title = null
      break

    case 2:
      cb = state
      state = null
      title = null
      break
  }
  
  this._dispatch(path, state, title, cb)
}

ClientRouter.prototype.stop = function stop() {
  if (!this.started) return
  this._stop()
  client.remove(this._dispatchRoute)
}

module.exports = ClientRouter
