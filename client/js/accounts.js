AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
// Options
AccountsTemplates.configure({
    //defaultLayout: 'emptyLayout',
    showForgotPasswordLink: true,
    overrideLoginErrors: false,
    enablePasswordChange: true,
    sendVerificationEmail: false,

    //enforceEmailVerification: true,
    confirmPassword: true,
    continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: false,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    showAddRemoveServices: true,
    //showPlaceholders: true,

    negativeValidation: true,
    positiveValidation:true,
    negativeFeedback: false,
    positiveFeedback:true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
    onSubmitHook: function(error, state){
    	if (!error) {
    		if (Session.get('redirectURL')){
                GAnalytics.event("account","Sign In");
                Router.go(Session.get('redirectURL'));
                Session.set('redirectURL',null);
            } else {
             Router.go('/')
         }
     }
 }
});

AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
{
	_id: "username",
	type: "text",
	displayName: "username",
	required: true,
	minLength: 3,
},
{
	_id: 'email',
	type: 'email',
	required: true,
	displayName: "email",
	re: /.+@(.+){2,}\.(.+){2,}/,
	errStr: 'Invalid email',
}
]);
AccountsTemplates.removeField('password');
AccountsTemplates.addField({
	_id: 'password',
	type: 'password',
	required: true,
	minLength: 6,
});