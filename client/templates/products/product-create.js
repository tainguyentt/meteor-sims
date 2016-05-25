Template.productCreateModal.events({
  'click #save': function(e) {
    e.preventDefault();
    var productName = $('form').find('[name=productName]');
    var productGroup = $('form').find('[name=productGroup]');
    var productCost = $('form').find('[name=productCost]');
    var productPrice = $('form').find('[name=productPrice]');
    var product = {
      name: productName.val(),
      group: productGroup.val(),
      cost: productCost.val(),
      price: productPrice.val()
    }
    Meteor.call('createProduct', product, function(error, result) {
      if(error) {
        console.log("Could not create", error);
      } else {
        productName.val('');
        productGroup.val('');
        productCost.val('');
        productPrice.val('');
        Modal.hide('productCreateModal');
      }
    });
  }
});