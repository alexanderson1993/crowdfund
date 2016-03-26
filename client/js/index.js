Template.front.helpers({
	campaign:function(){
		return Campaigns.find({enabled:true});
	}
})

Template.main.created = function(){

}
Template.main.rendered = function(){
	$('.nav-tabs a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	})
}
Template.main.helpers({
	faq: function(){
		return Faqs.find({campaign:this._id});
	},
	post: function(){
		return Posts.find({campaign:this._id});
	},
	prize: function(){
		return Prizes.find({campaign:this._id},{sort:{price:1}});
	},
	deadline: function(){
		return moment(this.deadline).format('MMMM DD, YYYY');
	},
	daysRemaining: function(){
		if (moment().diff(moment(this.deadline))<0){
			return Math.ceil(Math.abs(moment().diff(moment(this.deadline))/1000/60/60/24));
		} else {
			return 0;
		}
	},
	campaignRunning: function(){
		if (moment.duration(moment().diff(moment(this.deadline))).days()<0){
			return true;
		}
	},
	backers: function(){
		return Pledges.find({campaign:this._id}).count();
	},
	prizeBackers: function(campaign){
		var total = 0;
		var self = this;
		Pledges.find({campaign:campaign}).forEach(function(e){
			e.prizes.forEach(function(f){
				if (f._id == self._id){
					total += f.quantity;
				}
			})
		})
		return total;
	},
	funds: function(){
		var total = 0; 
		Pledges.find({campaign:this._id}).forEach(function(e){
			e.prizes.forEach(function(f){
				var price = Prizes.findOne({_id:f._id}).price
				total += price*f.quantity;
			})
		}); 
		return total;
	},
	percentBacked: function(){
		var total = 0; 
		Pledges.find({campaign:this._id}).forEach(function(e){
			e.prizes.forEach(function(f){
				var price = Prizes.findOne({_id:f._id}).price
				total += price*f.quantity;
			})
		}); 
		return Math.round(total/this.goal*100);
	}
})

this.subscription = Deps.autorun(function() {
	Meteor.subscribe('faqs');
	Meteor.subscribe('posts');
	Meteor.subscribe('prizes');
	Meteor.subscribe('pledges');
});

Template.prizes.created = function(){
	Session.setDefault('prizeQuantity',{});
}
Template.prizes.helpers({
	prize: function(){
		console.log(this._id)
		return Prizes.find({campaign:this._id},{sort:{price:1}});
	},
	pledgeAmount: function(){
		var prizeQuantities = Session.get('prizeQuantity');
		var totalAmount = 0;
		var prizes = Prizes.find({campaign:this._id}).forEach(function(e){
			if (prizeQuantities[e._id])
				totalAmount += (parseFloat(e.price) * prizeQuantities[e._id]);
		})
		return totalAmount;
	},
	prizeFull: function(campaign){
		if (this.quantity){
			var total = 0;
			var self = this;
			Pledges.find({campaign:campaign}).forEach(function(e){
				e.prizes.forEach(function(f){
					if (f._id == self._id){
						total += f.quantity;
					}
				})
			})
			if (total < this.quantity)
				return false;
			else
				return true;
		}
	},
	maxPrize:function(campaign){
		if (this.quantity){
			var total = 0;
			var self = this;
			Pledges.find({campaign:campaign}).forEach(function(e){
				e.prizes.forEach(function(f){
					if (f._id == self._id){
						total += f.quantity;
					}
				})
			})
			return this.quantity - total;
		}
	},
	prizeBackers: function(campaign){
		var total = 0;
		var self = this;
		Pledges.find({campaign:campaign}).forEach(function(e){
			e.prizes.forEach(function(f){
				if (f._id == self._id){
					total += f.quantity;
				}
			})
		})
		return total;
	},
	buttonDisabled: function(){
		var prizeQuantities = Session.get('prizeQuantity');
		var totalAmount = 0;
		var prizes = Prizes.find({campaign:this._id}).forEach(function(e){
			if (prizeQuantities[e._id])
				totalAmount += (parseFloat(e.price) * prizeQuantities[e._id]);
		})
		return totalAmount == 0;
	}
})

Template.prizes.events({
	'change .prizeQuantity':function(e,t){
		var prizeQuantities = Session.get('prizeQuantity');
		prizeQuantities[this._id] = e.target.value;
		Session.set('prizeQuantity', prizeQuantities);
	},
	'click .claim':function(e,t){
		var prizeQuantities = Session.get('prizeQuantity');
		if (e.target.checked)
			prizeQuantities[this._id] = 1;
		else
			prizeQuantities[this._id] = 0;
		Session.set('prizeQuantity', prizeQuantities);
	},
	'click .make-pledge':function(){
		var prizeQuantities = Session.get('prizeQuantity');
		var totalAmount = 0;
		var prizes = Prizes.find({campaign:this._id}).forEach(function(e){
			if (prizeQuantities[e._id])
				totalAmount += (parseFloat(e.price) * prizeQuantities[e._id]);
		})
		GAnalytics.event("pledge","Pledge Modal");
		Session.set('totalPayment', totalAmount);
		$('.modal').modal();
	}
})