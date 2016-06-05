Template.noteList.events({
  'click #new-note-command': function(e) {
    e.preventDefault();
    var note = {
      content: $('#new-note-content').val()
    };
    console.log(note);
    Meteor.call('createNote', note, function(error, result) {
      if(error) {
        console.log("Could not create note", error);
      } else {
        $('#new-note-content').val('');
      }
    })
  }
})