function showNext(){
    ind = Session.get("cur_swipe_i") + 1;
    if (card_users[ind]) {
        Session.set("cur_swipe_i", ind);
        Session.set("cur_swipe_user", card_users[ind]);
        $(".panel")[0].style.left = "-" + $(".panel")[0].style.left
        $(".panel").animate({
          'left': "10%"
        }, 500);
    }
    else {
        $(".panel")[0].style.display="none";
    }
};

Template.user_list.onRendered( function () {

    var users = Meteor.users.find({'services.facebook.id': {$ne : Meteor.user().services.facebook.id}})

    window.card_users = users.fetch()
    // console.log (users);
    Session.set("cur_swipe_user", card_users[0]);
    Session.set("cur_swipe_i", 0);

});

Template.user_list.helpers({  
    // users: function() {
    //     var users = Meteor.users.find({'services.facebook.id': {$ne : Meteor.user().services.facebook.id}}).map(function(doc, index, cursor) {
    //         var i = _.extend(doc, {index: index});
    //         return i;
    //     });
    //     return users
    // },
    
    // current_person: function() {

    // }
});

Template.user_card.helpers({
    user: function () {
        user_id = Session.get('cur_swipe_user');
        ind = Session.get('cur_swipe_i');
        return window.card_users[ind]
    }
});

Template.user_list.events({
    "click #but-nope": function (evt, templ) {
        // user_id = Session.get("cur_swipe_user");

        // TO DO: insert into person_likes


        $(".panel").animate({
        'right': "200%"
        }, 500, showNext);
    },
    "click #but-yes": function (evt, templ) {
        // user_id = Session.get("cur_swipe_user");

        

        $(".panel").animate({
          'left': "200%"
        }, 500, showNext);
    }
})

Template.movie_list.helpers({
    user_likes: function() {
        return MovieLikes.find({"user_id": this._id});        
    }
});

Template.movie_title.helpers({

    movieTitle: function() {
        return Movies.find(this.movie_id).fetch()[0].title;
    }

});



