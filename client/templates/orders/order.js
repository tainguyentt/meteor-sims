Template.order.events({
	'click .remove-product': function (e) {
		e.preventDefault();
		var removedProduct = this;

		var order = Template.currentData();
		var products = order.products;
		products.pop(removedProduct);
		Orders.update(order._id, {
			$set: {
				products: products
			}
		});
	},
	'click .edit-discount': function (e) {
		e.preventDefault();
		Session.set('edit-discount', true);
	},
	'click .save-discount': function (e) {
		e.preventDefault();
		Session.set('edit-discount', false);
		var discountAmount = $("[name='discountAmount']").val();
		Orders.update(this._id, {
			$set: {
				discountAmount: discountAmount
			}
		});
	},
	'click .edit-payment': function (e) {
		e.preventDefault();
		Session.set('edit-payment', true);
	},
	'click .save-payment': function (e) {
		e.preventDefault();
		Session.set('edit-payment', false);
		var payment = $("[name='payment']").val();
		Orders.update(this._id, {
			$set: {
				payment: payment
			}
		});
	}
});

Template.order.helpers({
	totalPrice: function () {
		var order = Template.currentData();
		return numberToCommaFormat(countTotalPrice(order));
	},
	moneyChange: function () {
		var order = Template.currentData();
		var totalPrice = countTotalPrice(order);
		var payment = order.payment;
		if(!Number.isInteger(payment)) {
			payment = commaToNumberFormat(payment);
		}
		var change = payment - totalPrice;
		return numberToCommaFormat(change);
	},
	editDiscount: function () {
		return Session.equals('edit-discount', true);
	},
	editPayment: function () {
		return Session.equals('edit-payment', true);
	}
});

function countTotalPrice(order) {
	var totalPrice = 0;
	if (order) {
		order.products.forEach(function (product) {
			var price = commaToNumberFormat(product.price);
			if (!isNaN(price))
				totalPrice += price;
		});
	}
	var discountAmount;
	if (order.discountAmount) {
		discountAmount = commaToNumberFormat(order.discountAmount);
	}
	if (!isNaN(discountAmount))
		totalPrice -= discountAmount;
	return totalPrice;
}
