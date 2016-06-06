Template.order.events({
    'click .remove-product': function(e) {
        e.preventDefault();
        var removedProduct = this;

        var order = Template.currentData();
        var products = order.products;
        products.pop(removedProduct);
        Orders.update(order._id, { $set: { products: products } });
    },
    'click .edit-discount': function(e) {
        e.preventDefault();
        Session.set('edit-discount', true);
    },
    'click .save-discount': function(e) {
        e.preventDefault();
        Session.set('edit-discount', false);
        var discountAmount = $("[name='discountAmount']").val();
        Orders.update(this._id, { $set: { discountAmount: discountAmount } });
    }
});

Template.order.helpers({
    totalPrice: function() {
        var totalPrice = 0;
        var order = Template.currentData();
        if (order) {
            order.products.forEach(function(product) {
                var price = commaToNumberFormat(product.price);
                if (!isNaN(price))
                    totalPrice += price;
            });
        }
        var discountAmount;
        if(order.discountAmount) {
            discountAmount = commaToNumberFormat(order.discountAmount);
        }
        if (!isNaN(discountAmount))
            totalPrice -= discountAmount;
        return numberToCommaFormat(totalPrice);
    },
    editDiscount: function() {
        return Session.equals('edit-discount', true);
    }
});