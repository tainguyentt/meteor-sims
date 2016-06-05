Notes = new Mongo.Collection('notes');

Meteor.methods({
    createNote: function(noteAttr) {
        var user = Meteor.user();
        var note = _.extend(noteAttr, {
            author: user.emails[0].address,
            createdAt: new Date()
        });
        var noteId = Notes.insert(note);
        return {
            _id: noteId
        };
    },
})
