Template.order.events({
    'click .remove-product': function(e) {
        e.preventDefault();
        var removedProduct = this;

        var order = Template.currentData();
        var products = order.products;
        products.pop(removedProduct);
        Orders.update(order._id, { $set: { products: products } });
    }
});

Template.order.helpers({
    totalPrice: function() {
        var totalPrice = 0;
        var order = Template.currentData();
        if (order) {
            order.products.forEach(function(product) {
                var price = parseInt(product.price.replace(',', ''));
                if (!isNaN(price))
                    totalPrice += price;
            });
        }
        return totalPrice;
    }
});
