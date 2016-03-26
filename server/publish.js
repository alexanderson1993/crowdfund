Posts.allow({
  insert: function(userId, doc) {
    return userId === doc.owner;
  },
  update: function(userId, doc, fields, modifier) {
    return userId === doc.owner;
  },
  remove: function(userId, doc) {
    return userId === doc.owner;
  }
});

Faqs.allow({
  insert: function(userId, doc) {
    return userId === doc.owner;
  },
  update: function(userId, doc, fields, modifier) {
    return userId === doc.owner;
  },
  remove: function(userId, doc) {
    return userId === doc.owner;
  }
});

Prizes.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: function(userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  }
});

Campaigns.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: function(userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  }
});

Pledges.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  }
});

Attachments.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  download: function(userId) {
    return true;
  }
});

Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('faqs', function() {
  return Faqs.find();
});

Meteor.publish('prizes', function() {
  return Prizes.find();
});

Meteor.publish('campaigns', function() {
  return Campaigns.find();
});

Meteor.publish('pledges', function(userId) {
    return Pledges.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});

Meteor.publish('users', function(userId){
  if (Roles.userIsInRole(userId,['admin'])){
    return Meteor.users.find();
  }
})