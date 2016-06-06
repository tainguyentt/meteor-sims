Template.discount.helpers({
  discountBy: function(type) {
    return Session.equals('discountType', type);
  }
});

Template.discount.events({
  'change select#discount-type-selection': function(e) {
    e.preventDefault();
    var discountType = $('select#discount-type-selection').val();
  }
});