var Router = require('./lib/router')
module.exports = exports = Router
exports.Router = Router

exports.navigate = require('./lib/navigate')

exports.RouteHandler = require('./components/route-handler')
exports.Route = require('./components/route')
exports.Link = require('./components/link')
