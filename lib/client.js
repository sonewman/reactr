module.exports = exports = new Client()
exports.Client = Client

function noop() {}

class Client {
  constructor() {
    this.started = false
    this._onchanges = []
  }

  listen(options, cb) {
    if ('function' === typeof options) {
      cb = options
      options = {}
    }

    if ('function' !== typeof cb)
      cb = noop

    if (!this.started && options.start !== false)
      this.start(options, cb)

    this._onchanges.push(cb)
  }

  remove(options, cb) {
    if ('function' === typeof options) {
      cb = options
      options = {}
    }

    if ('function' !== typeof cb) return

    var i = this._onchanges.indexOf(cb)
    if (~i) this._onchanges.splice(i, 1)
  }

  start(options) {
    options = options || {}

    var dispatch
    if (false === options.dispatch)
      dispatch = false

    // probably move this into listen and remove on remove
    // so if there are no listeners we aren't listening to
    // this event
    if (false !== options.popstate) {
      this._onpopstate = createPopstateCallback(this)
      window.addEventListener('popstate', this._onpopstate, false)
    }

    if (false !== options.click) {
      this._onclick = createOnclick(this)
      window.addEventListener('click', this._onclick, false)
    }

    this.started = true

    if (!dispatch) return
    this.navigate(getCurrentPath())
  }

  stop(options) {
    options = options || {}

    if (this._onpopstate)
      removeEventListener('popstate', this._onpopstate, false)

    if (this._onclick)
      removeEventListener('click', this._onclick, false)
  }

  push(path, state, title) {
    if (!state) state = null
    if (!title) title = document.title

    history.pushState(state, title, path || '/');
  }

  navigate(path, state, title) {
    this.push(path, state, title)
    var l = this._onchanges.length

    for (var i = 0; i < l; i += 1)
      this._onchanges[i](path, state, title)
  }

}

function getCurrentPath() {
  return location.pathname + location.search + location.hashurl
}

/**
* Handle "populate" events.
*/
function createPopstateCallback(client) {
  return function onpopstate(e) {
    if (e.state) {
      var path = e.state.path
      client.change(path, e.state)
    } else {
      client.change(getCurrentPath())
    }
  }
}

/**
* Handle "click" events.
*/
function shouldIgnore(el) {
  if (!el || 'A' !== el.nodeName) return true

  // Ignore if tag has
  // 1. "download" attribute
  // 2. rel="external" attribute
  if (el.getAttribute('download') || el.getAttribute('rel') === 'external')
    return true

  var link = el.getAttribute('href')

  // anchor on current page
  if (el.pathname === location.pathname && (el.hash || '#' === link))
      return true

  // Check for mailto: in the href
  if (link && link.indexOf('mailto:') > -1) return true

  // check target
  if (el.target) return true

  // x-origin
  if (!sameOrigin(el.href)) return true
}

function createOnclick(client) {
  return function onclick(e) {
    if (1 !== which(e)) return

    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    if (e.defaultPrevented) return

    var el = e.target

    // iterate up the tree to find link
    while (el && 'A' !== el.nodeName) el = el.parentNode

    // should we ignore this click?
    if (shouldIgnore(el)) return

    // rebuild path
    var path = el.pathname + el.search + (el.hash || '')

    if (getCurrentPath() === path) return
    e.preventDefault()

    client.navigate(path)
  }
}

/**
* Event button.
*/

function which(e) {
  e = e || window.event
  return null === e.which ? e.button : e.which
}

/**
* Check if `href` is the same origin.
*/
function sameOrigin(href) {
  var origin = location.protocol + '//' + location.hostname
  if (location.port) origin += ':' + location.port
  return (href && (0 === href.indexOf(origin)))
}
