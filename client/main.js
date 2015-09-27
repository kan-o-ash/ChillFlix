//HELPERS TO MANAGE NAVIGATION
Meteor.startup(function () {
  Session.setDefault("templateName", "user_list");
});

Template.body.helpers({
  template_name: function(){
    return Session.get("templateName");
  }
});

Template.body.events({
  "click #logo": function() {
    Session.set("templateName", "user_list");
  },
  "click .user_list": function() {
    Session.set("templateName", "user_list");
  },
  "click .edit_profile": function() {
     Session.set("templateName", "edit_profile");
  },
  "click .movie_search": function() {
     Session.set("templateName", "movie_search");
  },
  "click .match_list": function() {
     Session.set("templateName", "match_list");
  }
});
