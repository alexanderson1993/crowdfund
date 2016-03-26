Router.configure({
	layoutTemplate: 'layout',
});
/*Router.plugin('seo', {});*/


Router.route('/',{
	waitOn:function(){
		return Meteor.subscribe('campaigns');
	},
	action: function(){
		if (Campaigns.find({enabled:true}).count() > 1){
			this.render('front');

		} else {
			if (Campaigns.findOne({enabled:true}))
				location.href = 'https://spaceedventures.org/campaign/' + Campaigns.findOne({enabled:true})._id;
		}
	}
});


Router.route('/campaign/:campaign',{
	template:'main',
	data:function(){
		return Campaigns.findOne({_id:this.params.campaign})
	},
	action: function(){
		var campaign = Campaigns.findOne({_id:this.params.campaign});
		GAnalytics.pageview();
		this.render('main');
	},
	waitOn:function(){
		return Meteor.subscribe('campaigns');
	},
	onAfterAction: function() {
		var post;
      	// The SEO object is only available on the client.
     	// Return if you define your routes on the server, too.
     	if (!Meteor.isClient) {
     		return;
     	}
     	campaign = this.data();
     	if (campaign){
     		SEO.set({
     			title: campaign.name,
     			meta: {
     				'description': campaign.subhead,
     				'twitter:card': 'summary',
     				'twitter:site': '@Spacecamputah',
     				'twitter:title' : campaign.name,
     				'twitter:description': campaign.subhead,
     				'twitter:image': campaign.fbimage
     			},
     			og: {
     				'title': campaign.name,
     				'description': campaign.subhead,
     				'image': campaign.fbimage
     			},
     		});
     	}
     }
	/*seo: {
		title:function(){
			return this.data().name;
		},
		description:function(){
			return this.data().subhead;
		},
		image:function(){
			return this.data().fbimage;
		},
		twitter: {
			card: 'summary',
			creator: '@Spacecamputah'
		}
	}*/
})

Router.route('/campaign/:campaign/prizes',{
	waitOn:function(){
		return Meteor.subscribe('campaigns');
	},
	action: function(){
		if (Meteor.userId()){
			this.render('prizes');
			GAnalytics.pageview();
		} else {
			Session.set('redirectURL','/campaign/' + this.params.campaign + '/prizes');
			Router.go('/sign-in');
		}
	},
	data:function(){
		console.log(this.params.campaign);
		return Campaigns.findOne({_id:this.params.campaign})
	}
})

Router.route('/privacy',{
	action: function(){
		this.render('privacy');
	}
})
Router.route('/payment',{
	action:function(){
		this.render('payment');
	}
})

Router.route('/payment/:txn/paid',{
	template:'paid',
	data: function(){
		return Transactions.findOne({_id:this.params.txn});
	}
})
Router.route('/dashboard',{
	action:function(){
		Router.go('/admin');
	}
})
Router.route('/pledgeAdmin',{
	onBeforeAction:function(){
		Meteor.subscribe('users',Meteor.userId());
		Meteor.subscribe('pledges',Meteor.userId());
		Meteor.subscribe('prizes');
		this.next();
	},
	action:function(){
		if (Roles.userIsInRole(Meteor.userId(),['admin'])){
			this.layout('AdminLayout');
			this.render('pledgeAdmin');
		} else {
			Router.go('/');
		}
	}
})



