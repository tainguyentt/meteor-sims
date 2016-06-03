Ingredients = new Mongo.Collection('ingredients');

Meteor.methods({
    createIngredient: function(ingredientAttr) {
        var user = Meteor.user();
        var ingredient = _.extend(ingredientAttr, {
            createdBy: user._id,
            createdAt: new Date(),
            averagePrice: 0,
            usedQuantity: 0,
            availableQuantity: 0,
            inNeedQuantity: 0
        });
        var ingredientId = Ingredients.insert(ingredient);
        return {
            _id: ingredientId
        };
    }
})