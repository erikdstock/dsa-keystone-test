var keystone = require('keystone')
var Types = keystone.Field.Types
var moment = require('moment')

/**
 * Event Model
 * ==========
 */

var Event = new keystone.List('Event', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
})

Event.add({
  title: { type: String, required: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  start: { type: Types.Datetime, default: Date.now },
  end: { type: Types.Datetime, default: Date.now },
  image: { type: Types.CloudinaryImage },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
  workingGroup: { type: Types.Relationship, ref: 'WorkingGroup', many: true },
  campaign: { type: Types.Relationship, ref: 'Campaign', many: true }
})

Event.schema.virtual('prettyDate').get(function () {
  return moment(this.start).format('dddd, MMMM D, YYYY')
})

Event.schema.virtual('prettyTime').get(function () {
  var start = moment(this.start).format('H:mm A')
  var end = moment(this.end).format('H:mm A')
  return `${start} to ${end}`
})

// Event.schema.methods.isPublished = function() {
    // return this.state == 'published';
// }

Event.defaultColumns = 'title, start|20%, author|20%'
Event.register()
