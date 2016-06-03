Template.ingredientCreateModal.events({
  'click #save': function(e) {
    e.preventDefault();
    var ingredientName = $('form').find('[name=ingredientName]');
    var ingredientGroup = $('form').find('[name=ingredientGroup]');
    var ingredientUnit = $('form').find('[name=ingredientUnit]');
    var ingredientAveragePrice = $('form').find('[name=ingredientAveragePrice]');
    var ingredient = {
      name: ingredientName.val(),
      groupName: ingredientGroup.val(),
      unit: ingredientUnit.val(),
      averagePrice: ingredientAveragePrice.val()
    }
    Meteor.call('createIngredient', ingredient, function(error, result) {
      if(error) {
        console.log("Could not create", error);
      } else {
        ingredientName.val('');
        ingredientGroup.val('');
        ingredientUnit.val('');
        ingredientAveragePrice.val('');
        Modal.hide('ingredientCreateModal');
      }
    });
  }
});

Template.ingredientCreateModal.helpers({
    ingredientGroups: function() {
        return IngredientGroups.find();
    }
});