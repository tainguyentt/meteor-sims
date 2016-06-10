Template.orderList.helpers({
    totalPrice: function() {
        var totalPrice = calculateTotalPrice(this);
        return numberToCommaFormat(totalPrice);
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
        return numberToCommaFormat(totalRevenue);
    },
    yesterdayRevenue: function() {
        var totalRevenue = 0;
        this.yesterdayOrders.forEach(function(order) {
            totalRevenue += calculateTotalPrice(order);
        });
        return numberToCommaFormat(totalRevenue);
    },
    dailyReports: function() {
        var groupedData = _.groupBy(this.allOrders.fetch(), function(doc) {
            doc.checkInTime.setMilliseconds(0);
            doc.checkInTime.setSeconds(0);
            doc.checkInTime.setMinutes(0);
            doc.checkInTime.setHours(0);
            return doc.checkInTime;
        });
        var result = [];
        for (var dayKey in groupedData) {
            var dayRecords = groupedData[dayKey];
            var totalPrice = 0;
            dayRecords.forEach(function(order) {
                totalPrice += calculateTotalPrice(order);
            });
            result.push({day: dayKey, cost: totalPrice});
        }
        return result;
    },
    monthlyReports: function() {
        var groupedData = _.groupBy(this.allOrders.fetch(), function(doc) {
            doc.checkInTime.setMilliseconds(0);
            doc.checkInTime.setSeconds(0);
            doc.checkInTime.setMinutes(0);
            doc.checkInTime.setHours(0);
            doc.checkInTime.setDate(15);
            return doc.checkInTime;
        });
        var result = [];
        for (var monthKey in groupedData) {
            var monthRecords = groupedData[monthKey];
            var totalPrice = 0;
            monthRecords.forEach(function(order) {
                totalPrice += calculateTotalPrice(order);
            });
            result.push({month: monthKey, cost: totalPrice});
        }
        return result;
    }
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
        var price = commaToNumberFormat(product.price);
        if (!isNaN(price))
            totalPrice += price;
    });
    var discount;
    if(order.discountAmount)  {
        discount = commaToNumberFormat(order.discountAmount);
        if (!isNaN(discount))
        totalPrice -= discount;
    }
    return totalPrice;
}