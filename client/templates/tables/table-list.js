Template.tableList.events({
  'click #create-table': function(e) {
    e.preventDefault();
    Modal.show('tableCreateModal');
  }
});