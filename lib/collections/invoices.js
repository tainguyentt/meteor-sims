Invoices = new Mongo.Collection('invoices');
InvoiceGroups = new Mongo.Collection('invoiceGroups');

Meteor.methods({
    createInvoice: function(invoiceAttr) {
        var user = Meteor.user();
        var invoice = _.extend(invoiceAttr, {
            createdBy: user._id,
            createdAt: new Date()
        });
        var invoiceId = Invoices.insert(invoice);
        return {
            _id: invoiceId
        };
    },
    createInvoiceGroup: function(invoiceGroup) {
        var invoiceGroupId = InvoiceGroups.insert(invoiceGroup);
        return {
            _id: invoiceGroupId
        };
    },
});