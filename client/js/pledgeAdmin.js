Template.pledgeAdmin.helpers({
	pledge:function(){
		return Pledges.find();
	},
	name:function(){
		var user = Meteor.users.findOne({_id:this.userId});
		if (user.profile){
			return user.profile.name;
		} else {
			return user.username;
		}
	},
	email:function(){
		var user = Meteor.users.findOne({_id:this.userId});
		if (user.services){
			if (user.services.facebook){
				return user.services.facebook.email;
			} else if (user.services.google) {
				return user.services.google.email;
			}
		} else if (user.emails) {
			return user.emails[0].address;
		}
	},
	prizeName:function(){
		var prize = Prizes.findOne({_id:this._id});
		if (prize){
			return prize.name;
		}
	}
})