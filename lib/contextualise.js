var qs = require('qs')

var plus = /\+/g
function decode(val) {
  return decodeURIComponent(val.replace(plus, ' '))
}

function getParams(match, keys) {
  var params = {}
  for (var i = 1, l = keys.length; i < l; i += 1)
    params[keys.name] = match[i]

  return params
}

module.exports = function createContext(path) {
  var canonical = (path = path || '/')
  var i = path.indexOf('?')
  
  var search = ~i ? decode(path.slice(i + 1)) : ''
  path = ~i ? decode(path.slice(0, i)) : path
  
  var hash = ''
  if (~path.indexOf('#')) {
    var parts = path.split('#')
    path = parts[0]
    hash = decodeURL(parts[1]) || ''
    search = search.split('#')[0]
  }

  var query = qs.parse(search)
  return new Context(canonical, path, {}, search, query, hash)
}

function Context(canonical, path, params, search, query, hash) {
  this.canonical = canonical
  this.pathname = path
  this.params = params
  this.search = search
  this.query = query
  this.hash = hash
}

Context.prototype.match = function (regexp, keys) {
  var match = regexp.exec(this.pathname)
  if (!match) return null

  return new Context(
    this.canonical,
    this.pathname,
    getParams(match, keys),
    this.search,
    this.query,
    this.hash
  )
}
