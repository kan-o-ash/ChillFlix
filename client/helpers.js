Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

Template.user_list.helpers({  
    users: function() {
        return Meteor.users.find({'services.facebook.id': {$ne : Meteor.user().services.facebook.id}});  
    }   
});

