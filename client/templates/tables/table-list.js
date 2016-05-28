Template.tableList.events({
  'click #create-table': function(e) {
    e.preventDefault();
    Modal.show('tableCreateModal');
  },
  'click .delete-table': function(e) {
    e.preventDefault();
    var tableId = e.target.name;
    Tables.remove(tableId);
  }
});