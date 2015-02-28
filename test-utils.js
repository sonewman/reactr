var React = require('react')
var cheerio = require('cheerio')

exports.render = 'undefined' !== typeof window
  ? clientRender
  : serverRender

function clientRender(component) {
  var el = document.createElement('div')
  React.render(component, el)
  return cheerio.load(el.innerHTML)
}

function serverRender(component) {
  var html = React.renderToString(component)
  return cheerio.load(html)
}

