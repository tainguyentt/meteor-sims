Template.invoiceList.events({
  'click #create-invoice': function(e) {
    e.preventDefault();
    Modal.show('invoiceCreateModal');
  },
  'click #create-invoice-group': function(e) {
    e.preventDefault();
    Modal.show('invoiceGroupCreateModal');
  },
  'click .delete-invoice': function(e) {
    e.preventDefault();
    if(confirm("Xóa hóa đơn, OK?")) {
      var invoiceId = this._id;
      Invoices.remove(invoiceId);
    }
  }
});