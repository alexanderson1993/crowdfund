Meteor.startup(function() {
	return SEO.config({
		title: 'Crowdfund',
		meta: {
			'description': 'A fancy dynamic crowdfunding website built with Meteor'
		}
	});
});