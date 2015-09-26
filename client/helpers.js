//HELPERS TO MANAGE NAVIGATION
Meteor.startup(function () {
  Session.setDefault("templateName", "index");
});

Template.body.helpers({
  template_name: function(){
    return Session.get("templateName");
  }
});

Template.body.events({
  "click .user_list": function() {
    Session.set("templateName", "user_list");
  },
  "click .edit_profile": function() {
     Session.set("templateName", "edit_profile");
  }
});




//HELPERS FOR ALL OTHER TEMPLATES
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

