Template.sale.events({
    'click .sale-table': function(e, template) {
        var tableElement = $(e.target);
        $('.sale-table').removeClass('selected-table');
        tableElement.addClass('selected-table');
        Session.set('serving-table', { id: this._id, name: tableElement.text() });
        $("a[href='#sale-products-tab']").tab('show');

        //reset selected productGroup
        Session.set('selected-product-group-id', ProductGroups.findOne()._id);
        $('li.sale-product-group').removeClass('active');
        $('li.sale-product-group:first').addClass('active');
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
        var orderNote = $("[name='orderNote']").val();
        var order = Orders.findOne({ tableId: tableId, status: 'inprogress' });
        Orders.update(order._id, { $set: { status: 'done', checkOutTime: new Date(), note: orderNote } });
    },
    'click #printBill': function() {
        var newWindow = window.open();
        newWindow.document.write(document.getElementById("bill").innerHTML);
        newWindow.print();
    },
    'click li.sale-product-group>a': function() {
        if (this) {
            Session.set('selected-product-group-id', this._id);
        }
    }
});

Template.sale.helpers({
    servingTable: function() {
        return Session.get('serving-table');
    },
    tableClass: function() {
        var order = Orders.findOne({ tableId: this._id, status: 'inprogress' });
        if (order)
            return 'serving-table';
        return '';
    },
    enableProductsTab: function() {
        return Session.get('serving-table') ? 'tab' : '';
    },
    currentOrder: function() {
        return getCurrentOrder();
    },
    productsOfSelectedGroup: function() {
        var selectedProductGroupId = getSelectedProductGroupId();
        if (getSelectedProductGroupId())
            return Products.find({ groupId: selectedProductGroupId });
        return Products.find();
    }
});

function findOrCreateCurrentOrder() {
    var tableId = getServingTable().id;
    var order = findCurrentOrderOf(tableId);
    if (!order) {
        var orderId = Orders.insert({ tableId: tableId, status: 'inprogress', checkInTime: new Date(), discountAmount: 0, products: [] });
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

function getSelectedProductGroupId() {
    return Session.get('selected-product-group-id');
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
