Template.invoiceCreateModal.events({
    'click #save': function(e) {
        e.preventDefault();
        var invoiceName = $('form').find('[name=invoiceName]');
        var invoiceGroup = $('form').find('[name=invoiceGroup]');
        var invoiceCost = $('form').find('[name=invoiceCost]');
        var invoiceNote = $('form').find('[name=invoiceNote]');
        var invoice = {
            name: invoiceName.val(),
            groupId: invoiceGroup.val(),
            groupName: $("select[name='invoiceGroup'] option:selected").text(),
            cost: invoiceCost.val(),
            note: invoiceNote.val()
        }
        Meteor.call('createInvoice', invoice, function(error, result) {
            if (error) {
                console.log("Could not create", error);
            } else {
                invoiceName.val('');
                invoiceGroup.val('');
                invoiceCost.val('');
                invoiceNote.val('');
                Modal.hide('invoiceCreateModal');
            }
        });
    }
});

Template.invoiceCreateModal.helpers({
    invoiceGroups: function() {
        return InvoiceGroups.find();
    }
});
