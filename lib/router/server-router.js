var BaseRouter = require('./base-router')

/**
 * @class ServerRouter
 */
function ServerRouter(options) {
  BaseRouter.call(this, options)
}

ServerRouter.prototype = Object.create(BaseRouter.prototype)

ServerRouter.prototype.navigate = navigate
function navigate(path, state, title) {
  if (!this.started)
    return this._navigate(path, state, title)

  this._dispatchRoute(path, state)
}

ServerRouter.prototype.run = function run(callback) {
  if (this.started) return
  this._run(callback)

  if (this._initialDispatch && this._awaitingState) {
    var { path, state, title } = this._awaitingState
    this._awaitingState = null

    this._dispatchRoute(path, state, title)
  }
}

ServerRouter.prototype.dispatch = function (path, state, title, cb) {
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

ServerRouter.prototype.stop = function stop() {
  if (this.started) this._stop()
}

module.exports = ServerRouter
