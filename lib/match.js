module.exports = Match

/**
 * @class Match
 */
function Match(route, ctx) {
  this.handler = route.handler
  this.path = route.path
  this.name = route.name
  this.context = ctx

  this.children = []
  this.map = {}

  var children = route.children
  var child
  var match
  var newCtx
  
  for (var i = 0, l = children.length; i < l; i += 1) {
    child = children[i]
    newCtx = ctx.match(child.regexp, child.keys)
    
    if (newCtx) {
      match = new Match(child, newCtx)

      // add to match list
      this.children.push(match)
      if (match.name)
        this.map[match.name] = match
    }
  }
}

Match.prototype.index = 0

Match.prototype.getNamed = function getNamed(name) {
  return this.map[name] || null
}

Match.prototype.getNext = function getNext() {
  var comp = this.children[this.index] || null
  if (comp) this.index += 1
  return comp
}
