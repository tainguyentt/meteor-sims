Template.sale.events({
    'click .sale-table': function(e, template) {
        var tableElement = $(e.target);
        $('.sale-table').removeClass('selected-table');
        tableElement.addClass('selected-table');
        Session.set('serving-table', { id: tableElement.attr('id'), name: tableElement.text() });
        $("a[href='#sale-products-tab']").tab('show');
    },
    'click .sale-product': function(e) {
        var productElement = e.target;
        var servingProducts = Session.get('serving-products') || [];
        var productId = productElement.id;
        var product = Products.findOne(productId);

        var tableId = Session.get('serving-table').id;
        var order = Orders.findOne({tableId: tableId, status: 'inprogress'});
        
        if(!order) {
          var orderId = Orders.insert({tableId: tableId, status: 'inprogress', checkInTime: new Date(), products: []});
          order = Orders.findOne(orderId);
        }

        var servingProduct = {name: product.name, id: product._id, price: product.price};
        order.products.push(servingProduct);
        
        Orders.update(order._id, {$set: {products: order.products}});
    },
    'click #checkOut': function() {
        var tableId = Session.get('serving-table').id;
        var order = Orders.findOne({tableId: tableId, status: 'inprogress'});
        Orders.update(order._id, {$set: {status: 'done'}});
    },
    'click #printBill': function() {
      var newWindow = window.open();
      newWindow.document.write(document.getElementById("bill").innerHTML);
      newWindow.print();
      newWindow.close();
    },
    'click .remove-product': function(e) {
      e.preventDefault();
      var removedProductId = e.target.name;
      var currentOrder = getCurrentOrder();
      var products = currentOrder.products;
      var removedProduct;
      products.forEach(function(product) {
        if(product.id === removedProductId) {
          removedProduct = product;
        }
      });
      products.pop(removedProduct);
       Orders.update(currentOrder._id, {$set: {products: products}});
    }
});

Template.sale.helpers({
    servingProducts: function() {
      var currentOrder = getCurrentOrder();
      return currentOrder.products;
    },
    servingTable: function() {
      return Session.get('serving-table');
    },
    tableClass: function(table) {
      return Session.get('serving-table').id === table._id ? 'selected-table' : '';
    },
    enableProductsTab: function() {
      return Session.get('serving-table') ? 'tab': '';
    }, 
    countTotalPrice: function() {
      var products = getCurrentOrder().products;
      var totalPrice = 0;
      products.forEach(function(product) {
        var price = parseInt(product.price.replace(',',''));
        if(!isNaN(price))
          totalPrice += price;
      });
      return totalPrice;
    }
});

function getCurrentOrder() {
  var currentTableId = getServingTable().id;
  return Orders.findOne({tableId: currentTableId, status: 'inprogress'});
}

function getServingTable() {
   return Session.get('serving-table');
}

function getServingProduct(productId) {
  return Products.findOne(productId);
}


function printElement(el) {
  var csslinks = document.getElementsByTagName('link');
  var css = '';
  for (var link, i = 0; i < csslinks.length; i++) {
    link = csslinks[i];
    if (link.rel !== 'stylesheet') continue;
    css += link.outerHTML;
  }

  var html = [
    '<html>'
  , '<head>'
  ,   '<title>' + document.title + '</title>'
  ,   css
  , '</head>'
  , '<body>'
  ,   el.outerHTML
  , '</body>'
  , '</html>'
  ].join('');

  var iframe = document.createElement('iframe');
  iframe.name           = 'printElement-' + (new Date).getTime();
  iframe.style.width    = '1px';
  iframe.style.height   = '1px';
  iframe.style.position = 'absolute';
  iframe.style.left     = '-9999px';
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