var keystone = require('keystone')

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res)
  var locals = res.locals

	// Set locals
  locals.section = 'campaigns'

	// Load the galleries by sortOrder
  // view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'))
  view.query('campaigns',
    keystone.list('Campaign').model
      .find()
      .sort('sortOrder')
  )

	// Render the view
  view.render('allCampaigns')
}
