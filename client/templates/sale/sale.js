Template.sale.events({
    'click .sale-table': function(e, template) {
        var tableElement = $(e.target);
        $('.sale-table').removeClass('selected-table');
        tableElement.addClass('selected-table');
        Session.set('serving-table', { id: this._id, name: tableElement.text() });
        $("a[href='#sale-products-tab']").tab('show');
    },
    'click .sale-product': function(e) {
        var product = this;
        var saleProduct = { name: product.name, id: product._id, price: product.price };
        var order = findOrCreateCurrentOrder();
        order.products.push(saleProduct);     
        Orders.update(order._id, { $set: { products: order.products } });
    },
    'click #checkOut': function() {
        var tableId = getServingTable().id;
        var order = Orders.findOne({ tableId: tableId, status: 'inprogress' });
        Orders.update(order._id, { $set: { status: 'done' } });
    },
    'click #printBill': function() {
        var newWindow = window.open();
        newWindow.document.write(document.getElementById("bill").innerHTML);
        newWindow.print();
    }
});

Template.sale.helpers({
    servingTable: function() {
        return Session.get('serving-table');
    },
    tableClass: function(table) {
        if (Session.get('serving-table') && Session.get('serving-table').id === table._id)
            return 'selected-table';
        return '';
    },
    enableProductsTab: function() {
        return Session.get('serving-table') ? 'tab' : '';
    },
    currentOrder: function() {
        return getCurrentOrder();
    }
});

function findOrCreateCurrentOrder() {
    var tableId = getServingTable().id;
    var order = findCurrentOrderOf(tableId);
    if (!order) {
        var orderId = Orders.insert({ tableId: tableId, status: 'inprogress', checkInTime: new Date(), products: [] });
        order = findCurrentOrderOf(tableId);
    }
    return order;
}

function findCurrentOrderOf(tableId) {
    return Orders.findOne({ tableId: tableId, status: 'inprogress' });
}

function getCurrentOrder() {
    var currentTableId = getServingTable().id;
    return findCurrentOrderOf(currentTableId);
}

function getServingTable() {
    return Session.get('serving-table');
}

function getServingProduct(productId) {
    return Products.findOne(productId);
}


function printElement(el) {
    var csslinks = document.getElementsByTagName('link');
    var css = '@media print {}';
    for (var link, i = 0; i < csslinks.length; i++) {
        link = csslinks[i];
        if (link.rel !== 'stylesheet') continue;
        css += link.outerHTML;
    }

    var html = [
        '<html>', '<head>', '<title>' + document.title + '</title>', css, '</head>', '<body>', el.outerHTML, '</body>', '</html>'
    ].join('');

    var iframe = document.createElement('iframe');
    iframe.name = 'printElement-' + (new Date).getTime();
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    document.body.appendChild(iframe);

    var doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    doc.body.focus();
    iframe.contentWindow.print();

    setTimeout(function() {
        if (iframe) document.body.removeChild(iframe);
    }, 60 * 1000);
};
