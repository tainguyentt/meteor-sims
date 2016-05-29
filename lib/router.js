Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', { name: 'homePage' });

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
            invoices: Invoices.find(),
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
