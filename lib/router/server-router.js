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

  if (this.dispatch && this._awaitingState) {
    var awaiting = this._awaitingState
    this._awaitingState = null

    this._dispatchRoute(
      awaiting.path,
      awaiting.state,
      awaiting.title
    )
  }
}

ServerRouter.prototype.stop = function stop() {
  if (this.started) this._stop()
}

module.exports = ServerRouter
