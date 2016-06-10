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
        var groupedOrders = _.groupBy(this.allOrders.fetch(), function(doc) {
            truncateToDay(doc.checkInTime);
            return doc.checkInTime;
        });

        var groupedInvoices = _.groupBy(this.allInvoices.fetch(), function(invoice) {
            truncateToDay(invoice.createdAt);
            return invoice.createdAt;
        });

        var invoiceReports = new Map();
        for (var dayKey in groupedInvoices) {
            var dayRecords = groupedInvoices[dayKey];
            var totalPrice = 0;
            dayRecords.forEach(function(invoice) {
                var expense = commaToNumberFormat(invoice.cost);
                if(!isNaN(expense))
                    totalPrice += expense;
            });
            invoiceReports.set(dayKey, totalPrice);
        }

        var result = [];
        for (var dayKey in groupedOrders) {
            var dayRecords = groupedOrders[dayKey];
            var totalRevenue = 0;
            dayRecords.forEach(function(order) {
                totalRevenue += calculateTotalPrice(order);
            });
            var expense = invoiceReports.get(dayKey);
            if(!expense)
                expense = 0;
            var totalProfit = totalRevenue - expense;
            result.push({ day: dayKey, revenue: totalRevenue, expense: expense, profit: totalProfit });
        }
        return result;
    },
    monthlyReports: function() {
        var groupedOrders = _.groupBy(this.allOrders.fetch(), function(order) {
            truncateToMonth(order.checkInTime);
            return order.checkInTime;
        });

        var groupedInvoices = _.groupBy(this.allInvoices.fetch(), function(invoice) {
            truncateToMonth(invoice.createdAt);
            return invoice.createdAt;
        });
        var invoiceReports = new Map();
        for (var monthKey in groupedInvoices) {
            var monthRecords = groupedInvoices[monthKey];
            var totalPrice = 0;
            monthRecords.forEach(function(invoice) {
                var expense = commaToNumberFormat(invoice.cost);
                if(!isNaN(expense))
                    totalPrice += expense;
            });
            invoiceReports.set(monthKey, totalPrice);
        }

        var result = [];
        for (var monthKey in groupedOrders) {
            var monthRecords = groupedOrders[monthKey];
            var totalRevenue = 0;
            monthRecords.forEach(function(order) {
                totalRevenue += calculateTotalPrice(order);
            });
            var expense = invoiceReports.get(monthKey);
            if(!expense)
                expense = 0;
            var totalProfit = totalRevenue - expense;
            result.push({ month: monthKey, revenue: totalRevenue, expense: expense, profit: totalProfit });
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
    if (order.discountAmount) {
        discount = commaToNumberFormat(order.discountAmount);
        if (!isNaN(discount))
            totalPrice -= discount;
    }
    return totalPrice;
}

function truncateToMonth(time) {
    time.setMilliseconds(0);
    time.setSeconds(0);
    time.setMinutes(0);
    time.setHours(0);
    time.setDate(15);
}

function truncateToDay(time){
    time.setMilliseconds(0);
    time.setSeconds(0);
    time.setMinutes(0);
    time.setHours(0);
}