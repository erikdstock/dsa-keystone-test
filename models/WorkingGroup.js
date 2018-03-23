var keystone = require('keystone')
var Types = keystone.Field.Types

/**
 * WorkingGroup Model
 * ==================
 */

var WorkingGroup = new keystone.List('WorkingGroup', {
  autokey: { from: 'name', path: 'key', unique: true }
})

WorkingGroup.add({
  name: { type: String, required: true },
  description: { type: Types.Textarea, height: 180, required: false },
  contact: { type: Types.Email, required: false },
  extended: { type: Types.Html, wysiwyg: true, height: 400 }
})

WorkingGroup.relationship({ ref: 'Event', path: 'events', refPath: 'workingGroup' })
WorkingGroup.relationship({ ref: 'Campaign', path: 'campaigns', refPath: 'workingGroup' })

WorkingGroup.register()
