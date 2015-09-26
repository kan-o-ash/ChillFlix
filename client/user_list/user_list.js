Template.user_list.helpers({  
    users: function() {
        return Meteor.users.find({'services.facebook.id': {$ne : Meteor.user().services.facebook.id}});  
    }   
});

