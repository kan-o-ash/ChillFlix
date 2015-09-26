Template.user_list.onRendered(function () {
    $( "#but-yes" ).click(function() {
      $( ".panel" ).animate({
        'left': "200%"
      }, 500);
    });
    $( "#but-nope" ).click(function() {
      $( ".panel" ).animate({
        'right': "200%"
      }, 500);
    });
})

Template.user_list.helpers({  
    users: function() {
        var users = Meteor.users.find({'services.facebook.id': {$ne : Meteor.user().services.facebook.id}}).map(function(doc, index, cursor) {
            var i = _.extend(doc, {index: index});
            return i;
        });
        return users
    },
    
   
    current_person: function() {

    }
});

Template.movie_list.helpers({
    user_likes: function() {
        console.log(this); 
        return MovieLikes.find({"user_id": this._id});        
    }
});

Template.movie_title.helpers({

    movieTitle: function() {
        return Movies.find(this.movie_id).fetch()[0].title;
    }

});



