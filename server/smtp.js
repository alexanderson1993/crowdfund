Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.email.smtp.username,   // eg: server@gentlenode.com
    password: Meteor.settings.email.smtp.password,   // eg: 3eeP1gtizk5eziohfervU
    server:   Meteor.settings.email.smtp.server,  // eg: mail.gandi.net
    port: 587
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});