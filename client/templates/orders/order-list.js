Template.orderList.helpers({
    totalPrice: function() {
        var totalPrice = calculateTotalPrice(this);
        return totalPrice.toString().split(/(?=(?:\d{3})+$)/).join(",");
    },
    lengthOfStay: function() {
        var start = moment(this.checkInTime);
        var end = moment(this.checkOutTime);
        return end.diff(start, 'minutes');
    },
    todayRevenue: function() {
        var totalRevenue = 0;
        this.todayOrders.forEach(function(order) {
            totalRevenue += calculateTotalPrice(order);
        });
        return totalRevenue.toString().split(/(?=(?:\d{3})+$)/).join(",");
    },

});

Template.orderList.events({
    'click .delete-order': function(e) {
        e.preventDefault();
        if (confirm("Xóa đơn bán hàng này?")) {
            var orderId = this._id;
            Orders.update(orderId, { $set: { status: "deleted" } });
        }
    }
});

function calculateTotalPrice(order) {
    var totalPrice = 0;
    order.products.forEach(function(product) {
        var price = parseInt(product.price.replace(',', ''));
        if (!isNaN(price))
            totalPrice += price;
    });
    return totalPrice;
}
