var keystone = require('keystone')

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res)
  var locals = res.locals

	// Set locals
  locals.section = 'campaigns'
  locals.filters = {
    key: req.params.key
  }

  var q = keystone.list('Campaign').model.findOne({
    slug: locals.filters.key
  })

  view.on('init', function (next) {
    q.exec(function (err, result) {
      locals.campaign = result
    }).then(function (err, result) {
      keystone.list('Event').model.find()
        .where('campaign', locals.campaign._id)
        .exec(function (err, result) {
          locals.events = result
          next(err, result)
        })
    })
  })

	// Render the view
  view.render('singleCampaign')
}
