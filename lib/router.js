Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {
    name: 'homePage',
    data: function() {
        return { notes: Notes.find({}, { sort: { createdAt: -1 } }) };
    }
});

Router.route('/tables', {
    name: 'tableList',
    data: function() {
        return {
            tables: Tables.find()
        };
    }
});

Router.route('/products', {
    name: 'productList',
    data: function() {
        return {
            products: Products.find(),
            productGroups: ProductGroups.find()
        };
    }
});

Router.route('/ingredients', {
    name: 'ingredientList',
    data: function() {
        return {
            ingredients: Ingredients.find({}, { sort: { inNeedQuantity: -1, availableQuantity: 1 } })
        };
    }
});

Router.route('/orders', {
    name: 'orderList',
    data: function() {
        var currentDate = new Date();
        return {
            todayOrders: Orders.find({
                status: 'done',
                $where: function() {
                    return this.checkInTime.getDate() === currentDate.getDate() && this.checkInTime.getMonth() === currentDate.getMonth() && this.checkInTime.getYear() === currentDate.getYear();
                }
            }),
            yesterdayOrders: Orders.find({
                status: 'done',
                $where: function() {
                    return this.checkInTime.getDate() === (currentDate.getDate() -1) && this.checkInTime.getMonth() === currentDate.getMonth() && this.checkInTime.getYear() === currentDate.getYear();
                }
            }),
            allOrders: Orders.find({ status: 'done' }, { sort: { checkInTime: -1 } }),
            allInvoices: Invoices.find({}, {sort: {createdAt: -1}})
        };
    }
});

Router.route('/sale', {
    name: 'sale',
    data: function() {
        return {
            products: Products.find(),
            tables: Tables.find(),
            productGroups: ProductGroups.find()
        }
    }
});

Router.route('/expenses', {
    name: 'invoiceList',
    data: function() {
        return {
            invoices: Invoices.find({}, {sort: {createdAt: -1}}),
            invoiceGroups: InvoiceGroups.find()
        }
    }
});

var requireLogin = function() {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.render('homePage');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, { except: ['homePage'] });