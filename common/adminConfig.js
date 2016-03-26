this.AdminConfig = {
  collections: {
    Campaigns: {
      color: 'yellow',
      icon: 'flag',
      tableColumns: [
      {
        label: 'Name',
        name: 'name'
      }
      ]
    },
    Prizes: {
      color: 'green',
      icon: 'gift',
      tableColumns: [
      {
        label: 'Name',
        name: 'name'
      }, {
        label: 'Price',
        name: 'price'
      }
      ]
    },
    Pledges: {
      color: 'blue',
      icon: 'cart-plus',
      tableColumns: [
      {
        label: 'UserId',
        name: 'userId'
      }
      ]
    },
    Posts: {
      color: 'red',
      icon: 'pencil',
      auxCollections: ['Attachments'],
      tableColumns: [
      {
        label: 'Title',
        name: 'title'
      }, {
        label: 'User',
        name: 'owner',
        collection: 'Users'
      }
      ]
    },
    Faqs: {
      color: 'purple',
      icon: 'question',
      tableColumns: [
      {
        label: 'Summary',
        name: 'summary'
      }, {
        label: 'User',
        name: 'owner',
        collection: 'Users'
      }
      ]
    },
    Transactions: {
      color: 'hotpink',
      icon: 'question',
      tableColumns: [
      
      ]
    },
    
  }
}
