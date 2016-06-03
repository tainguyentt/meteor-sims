Template.ingredientList.events({
  'click #create-ingredient': function(e) {
    e.preventDefault();
    Modal.show('ingredientCreateModal');
  }
});