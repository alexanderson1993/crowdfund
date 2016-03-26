
Router.route('/admin/campaign/current',{
	action: function(){
		this.layout('AdminLayout');
		this.render('currentCampaign');
	}
});