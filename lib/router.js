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
            products: Products.find()
        };
    }
});

Router.route('/sale', {
    name: 'sale',
    data: function() {
        return {
            products: Products.find(),
            tables: Tables.find()
        }
    }
});
