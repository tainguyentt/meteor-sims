Template.tableList.events({
  'click #create-table': function(e) {
    e.preventDefault();
    Modal.show('tableCreateModal');
  },
  'click .delete-table': function(e) {
    e.preventDefault();
    var tableId = this._id;
    Tables.remove(tableId);
  }
});