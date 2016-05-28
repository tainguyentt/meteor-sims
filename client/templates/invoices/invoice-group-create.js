Template.invoiceGroupCreateModal.events({
  'click #save': function(e) {
    e.preventDefault();
    var invoiceGroupName = $('form.invoice-form').find('[name=invoiceGroupName]');
    var invoiceGroup = {
      name: invoiceGroupName.val(),
    }
    Meteor.call('createInvoiceGroup', invoiceGroup, function(error, result) {
      if(error) {
        console.log("Could not create", error);
      } else {
        invoiceGroupName.val('');
        Modal.hide('invoiceGroupCreateModal');
      }
    });
  }
});