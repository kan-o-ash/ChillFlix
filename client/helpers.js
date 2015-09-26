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

Template.user_info.helpers({
    user_image: function() {
        
                 try{
    if(Meteor.user().services.facebook){
        // this is the line of interest                //http://graph.facebook.com/10207998308618263/picture/type=large
                    return "http://graph.facebook.com/" + 
                        Meteor.user().services.facebook.id + 
                        "/picture/?width=100&height=100";

                }else if(Meteor.user().profile){
                    return $.trim(Meteor.user().profile.avatar);
                }else{
                    return "/images/placeholder-240x240.gif";
                }
            }
            catch(err){
                console.log(err);
            }   
    }   
})

