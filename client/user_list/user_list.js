Template.user_list.helpers({  
    users: function() {
        return Meteor.users.find({'services.facebook.id': {$ne : Meteor.user().services.facebook.id}});  
    },
    
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



