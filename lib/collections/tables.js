Tables = new Mongo.Collection('tables');

Meteor.methods({
  createTable: function(tableAttr) {
    var user = Meteor.user();
    var table = _.extend(tableAttr, {
      createdBy: user._id,
      createdAt: new Date()
    });
    var tableId = Tables.insert(table);
    return {
      _id: tableId
    };
  }
})