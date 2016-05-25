Template.tableCreateModal.events({
  'click #save': function(e) {
    e.preventDefault();
    var tableName = $('form').find('[name=tableName]');
    var tableGroup = $('form').find('[name=tableGroup]');
    var table = {
      name: tableName.val(),
      group: tableGroup.val()
    }
    Meteor.call('createTable', table, function(error, result) {
      if(error) {
        console.log("Could not create", error);
      } else {
        tableName.val('');
        tableGroup.val('');
        Modal.hide('tableCreateModal');
      }
    });
  }
});