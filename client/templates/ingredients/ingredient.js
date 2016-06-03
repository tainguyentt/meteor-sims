Template.ingredient.events({
    'click a.delete-ingredient': function(e) {
        e.preventDefault();
        if (confirm("Xóa nguyên liệu này?")) {
            var ingredientId = this._id;
            Ingredients.remove(ingredientId);
        }
    },
    'click a.edit-ingredient-quantity': function(e) {
        e.preventDefault();
        Session.set('quantity-ingredient-id', this._id);
    },
    'click a.save-ingredient-quantity': function(e) {
        e.preventDefault();
        var newAvailableQuantityElement = $('[name=newAvailableQuantity]');
        var oldAvailableQuantity = parseFloat(this.availableQuantity);
        var newAvailableQuantity = parseFloat(newAvailableQuantityElement.val());
        var newUsedQuantity = parseFloat(this.usedQuantity);
        if (!isNaN(oldAvailableQuantity) && !isNaN(newAvailableQuantity)) {
          if(oldAvailableQuantity > newAvailableQuantity) {
            newUsedQuantity += oldAvailableQuantity - newAvailableQuantity;
          }
        }

        var newInNeedQuantity = $('[name=newInNeedQuantity]');
        Ingredients.update(this._id, { $set: { availableQuantity: newAvailableQuantityElement.val(), inNeedQuantity: newInNeedQuantity.val(), usedQuantity: newUsedQuantity } });
        Session.set('quantity-ingredient-id', null);
    }
})

Template.ingredient.helpers({
    isQuantityEditing: function() {
        return Session.equals('quantity-ingredient-id', this._id);
    }
});
