Template.productGroupCreateModal.events({
  'click #save': function(e) {
    e.preventDefault();
    var productGroupName = $('form.product-form').find('[name=productGroupName]');
    var productGroup = {
      name: productGroupName.val(),
    }
    Meteor.call('createProductGroup', productGroup, function(error, result) {
      if(error) {
        console.log("Could not create", error);
      } else {
        productGroupName.val('');
        Modal.hide('productGroupCreateModal');
      }
    });
  }
});