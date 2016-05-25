Template.productList.events({
  'click #create-product': function(e) {
    e.preventDefault();
    Modal.show('productCreateModal');
  }
});