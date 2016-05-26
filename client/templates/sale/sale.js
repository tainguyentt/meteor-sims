Template.sale.events({
    'click .sale-table': function(e) {
        var tableElement = e.target;
        tableElement.className = tableElement.className + ' selected-table';
        Session.set('serving-table', { id: tableElement.id, name: tableElement.textContent });
        $("a[href='#sale-products-tab']").tab('show');
    },
    'click .sale-product': function(e) {
        var productElement = e.target;
        var servingProducts = Session.get('serving-products') || [];
        var productId = productElement.id;
        if (!servingProducts.includes(productId)) {
          servingProducts.push(productId);
          productElement.className = productElement.className + ' selected-product';
        }
        else {
          servingProducts.pop(productId);
          productElement.className = productElement.className.replace('selected-product', '');
        }
        Session.set('serving-products', servingProducts);
    }
});

Template.sale.helpers({
    servingProducts: function() {
        var products = Session.get('serving-products');
        return products;
    },
    servingTable: function() {
      return Session.get('serving-table').name;
    }
});
