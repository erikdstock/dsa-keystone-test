var keystone = require('keystone')

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res)
  var locals = res.locals

	// Set locals
  locals.section = 'workingGroups'
  locals.filters = {
    key: req.params.groupKey
  }

	// Load the galleries by sortOrder
  // view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'))
  // view.query('workingGroup',
    // keystone.list('WorkingGroup').model
      // .find()
      // .sort('sortOrder')
  // )

  var q = keystone.list('WorkingGroup').model.findOne({
    key: locals.filters.key
  })

  view.on('init', function (next) {
    q.exec(function (err, result) {
      locals.workingGroup = result
    }).then(function (err, result) {
      var q1 = keystone.list('Event').model.find()
        .where('workingGroup', locals.workingGroup._id)
        .exec(function (err, result) {
          locals.events = result
        })

      var q2 = keystone.list('Campaign').model.find()
        .where('workingGroup', locals.workingGroup._id)
        .exec(function (err, result) {
          locals.campaigns = result
        })

      Promise.all([q1, q2])
      .then(function (err, result) {
        next(err, result)
      })
    })
  })

	// Render the view
  view.render('singleWorkingGroup')
}
