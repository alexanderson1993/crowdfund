this.Schemas = {}


this.Posts = new Meteor.Collection('posts');

Schemas.Posts = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  content: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  picture: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
      }
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  campaign: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Campaigns.find().fetch(), function(campaign) {
          return {
            label: campaign.name,
            value: campaign._id
          };
        });
      }
    }
  }
});

Posts.attachSchema(Schemas.Posts);

this.Faqs = new Meteor.Collection('faqs');

Schemas.Faqs = new SimpleSchema({
  summary: {
    type: String,
    max: 60
  },
  content: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  campaign: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Campaigns.find().fetch(), function(campaign) {
          return {
            label: campaign.name,
            value: campaign._id
          };
        });
      }
    }
  }
});

Faqs.attachSchema(Schemas.Faqs);

this.Prizes = new Meteor.Collection('prizes');

Schemas.Prizes = new SimpleSchema({
  name: {
    type: String,
    max: 60
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  price: {
    type: Number,
    min: 1
  },
  delivery: {
    type: String
  },
  quantity: {
    type: Number,
    optional: true
  },
  picture: {
    type: String,
    optional: true
  },
  campaign: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Campaigns.find().fetch(), function(campaign) {
          return {
            label: campaign.name,
            value: campaign._id
          };
        });
      }
    }
  }
});

Prizes.attachSchema(Schemas.Prizes);

this.Attachments = new FS.Collection("Attachments", {
  stores: [
  new FS.Store.GridFS("attachments", {
    transformWrite: function(fileObj, readStream, writeStream) {
      if (gm.isAvailable) {
        if (fileObj.original.type.substr(0, 5) === 'image') {
          return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
        } else {
          return readStream.pipe(writeStream);
        }
      } else {
        return readStream.pipe(writeStream);
      }
    }
  })
  ]
});

this.Campaigns = new Meteor.Collection('campaigns');

Schemas.Campaigns = new SimpleSchema({
  name: {
    type: String,
    max: 60
  },
  sponsor: {
    type: String,
  },
  subhead: {
    type: String
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  copyright: {
    type: String
  },
  goal: {
    type: Number,
    min: 1
  },
  deadline: {
    type: Date
  },
  enabled: {
    type: Boolean
  },
  hero:{
    type: String
  },
  fbimage:{
    type: String
  }
});

Campaigns.attachSchema(Schemas.Campaigns);

this.Pledges = new Meteor.Collection('pledges');

Schemas.Pledges = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  
  prizes: {
    type: Array,
    optional: true,
    minCount: 0,
  },
  "prizes.$": {
    type: Object
  },
  "prizes.$._id": {
    type: String
  },
  "prizes.$.quantity": {
    type: Number
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  campaign: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Campaigns.find().fetch(), function(campaign) {
          return {
            label: campaign.name,
            value: campaign._id
          };
        });
      }
    }
  }

});

Pledges.attachSchema(Schemas.Pledges);

this.Transactions = new Meteor.Collection('transactions');

Schemas.Transactions = new SimpleSchema({
  entity_id: {
    type: String
  },
  stripe_obj: {
    type: Object
  },
  charge_id: {
    type: String
  }

});

Transactions.attachSchema(Schemas.Transactions);


