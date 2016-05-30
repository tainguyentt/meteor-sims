Template.orderList.helpers({
    totalPrice: function() {
        var totalPrice = 0;
        this.products.forEach(function(product) {
            var price = parseInt(product.price.replace(',', ''));
            if (!isNaN(price))
                totalPrice += price;
        });
        return totalPrice.toString().split(/(?=(?:\d{3})+$)/).join(",");
    }
});

Template.orderList.events({
    'click .delete-order': function(e) {
        e.preventDefault();
        if (confirm("Xóa đơn bán hàng này?")) {
            var orderId = this._id;
            Orders.remove(orderId);
        }
    }
});
