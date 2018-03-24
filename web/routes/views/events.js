var keystone = require('keystone')

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res)
  var locals = res.locals

	// Set locals
  locals.section = 'calendar'

	// Load the galleries by sortOrder
  // view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'))
  view.query('events',
    keystone.list('Event').model
      .find().sort('sortOrder')
      .populate('campaign workingGroup')
  )

	// Render the view
  view.render('events')
}
