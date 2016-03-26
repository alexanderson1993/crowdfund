Meteor.startup(function () {
	if (typeof Meteor.users.findOne({username:'admin'}) === 'undefined'){
		var id = Accounts.createUser({
			username: 'admin',
			email: 'websiteAdmin@gmail.com',
			password: 'defaultPassword1'
		});
		Roles.addUsersToRoles(id, ['admin']);
	}
});