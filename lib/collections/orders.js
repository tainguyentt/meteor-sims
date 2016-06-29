Orders = new Mongo.Collection('orders');

Meteor.methods({
  insertOrder: function(orderAttr) {
    var order = _.extend(orderAttr, {
      checkInTime: new Date()
    });
    Orders.insert(order);
  }
})