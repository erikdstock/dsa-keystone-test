var keystone = require('keystone')

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res)
  var locals = res.locals

	// Set locals
  locals.section = 'workingGroups'

	// Load the galleries by sortOrder
  // view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'))
  view.query('workingGroups',
    keystone.list('WorkingGroup').model
      .find()
      .sort('sortOrder')
  )

	// Render the view
  view.render('allWorkingGroups')
}
