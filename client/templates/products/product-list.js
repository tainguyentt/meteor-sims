Template.productList.events({
  'click #create-product': function(e) {
    e.preventDefault();
    Modal.show('productCreateModal');
  },
  'click #create-product-group': function(e) {
    e.preventDefault();
    Modal.show('productGroupCreateModal');
  },
  'click a.delete-product': function(e) {
    e.preventDefault();
    var productId = this._id;
    Products.remove(productId);
  }
});