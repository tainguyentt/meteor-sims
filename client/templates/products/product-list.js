Template.productList.events({
  'click #create-product': function(e) {
    e.preventDefault();
    Modal.show('productCreateModal');
  },
  'click .delete-product': function(e) {
    e.preventDefault();
    var productId = e.target.name;
    Products.remove(productId);
  }
});