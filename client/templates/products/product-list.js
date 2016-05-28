Template.productList.events({
  'click #create-product': function(e) {
    e.preventDefault();
    Modal.show('productCreateModal');
  },
  'click a.delete-product': function(e) {
    e.preventDefault();
    var productId = e.currentTarget.name;
    Products.remove(productId);
  }
});