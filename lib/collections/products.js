Products = new Mongo.Collection('products');
ProductGroups = new Mongo.Collection('productGroups');

Meteor.methods({
    createProduct: function(productAttr) {
        var user = Meteor.user();
        var product = _.extend(productAttr, {
            createdBy: user._id,
            createdAt: new Date()
        });
        var productId = Products.insert(product);
        return {
            _id: productId
        };
    },
    createProductGroup: function(productGroup) {
        var productGroupId = ProductGroups.insert(productGroup);
        return {
            _id: productGroupId
        };
    },
})
