var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Campaign Model
 * ==========
 */

var Campaign = new keystone.List('Campaign', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Campaign.add({
	title: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	description: { type: Types.Html, wysiwyg: true, height: 150 },
	workingGroup: { type: Types.Relationship, ref: 'WorkingGroup', many: true },
});

/* Campaign.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
}); */

Campaign.relationship({ ref: 'Event', path: 'events', refPath: 'campaign' });

Campaign.defaultColumns = 'title, description|20%, workingGroup|20%';
Campaign.register();
