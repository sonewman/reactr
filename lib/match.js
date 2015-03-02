module.exports = Match

function matchChildren(parent, children, ctx) {
  var child
  var match
  var newCtx

  for (var i = 0, l = children.length; i < l; i += 1) {
    child = children[i]
    newCtx = ctx.match(child.regexp, child.keys)

    if (newCtx) {
      match = new Match(child, newCtx)

      // add to match list
      parent.children.push(match)
      if (match.name)
        parent.map[match.name] = match
    }
  }
}

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

  var children = route.children || []

  this.allChildren = children
  matchChildren(this, children, ctx)
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

Match.prototype.getNamedFromAll = function (name) {
  var l = this.allChildren.length
  for (var i = 0; i < l; i += 1) {
    var child = this.allChildren[i]
    if (child.name === name) return child
  }

  return null
}
