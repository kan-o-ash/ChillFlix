
function showNext(){
    ind = Session.get("cur_swipe_i") + 1;
    if (card_users[ind]) {
        Session.set("cur_swipe_i", ind);
        Session.set("cur_swipe_user", card_users[ind]);
        if ($(".panel")[0].style.left[0] == "-") {
            $(".panel")[0].style.left = "200%";
        }
        else {
            $(".panel")[0].style.left = "-300%";
        }

        $(".panel").animate({
          'left': "10%"
        }, 500);
    }
    else {
        $(".panel")[0].style.display="none";
    }
};

Tracker.autorun(function(){

    var users = Meteor.users.find({'_id': {$ne : Meteor.userId()}})
    window.card_users = users.fetch()
    Session.set("cur_swipe_user", card_users[0]);
    Session.set("cur_swipe_i", 0);
})

Template.user_list.onRendered( function () {
    var users = Meteor.users.find({'_id': {$ne : Meteor.userId()}})
    window.card_users = users.fetch()
    Session.set("cur_swipe_user", card_users[0]);
    Session.set("cur_swipe_i", 0);
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

        user_id = Session.get("cur_swipe_user")._id;
        console.log(user_id);

        $(".panel").animate({
          'left': "-300%"
        }, 500, showNext);
    },
    "click #but-yes": function (evt, templ) {
        // user_id = Session.get("cur_swipe_user");

        user_id = Session.get("cur_swipe_user")._id;

        PersonLikes.insert({
            "user_id": Meteor.userId(),
            "liked_user_id": user_id
        });
        match = PersonLikes.find({
            "user_id": user_id,
            "liked_user_id": Meteor.userId()
        }).fetch().length;

        
        if (match) {
            Session.set("match", true);
            Matches.insert({
                "user1_id": user_id,
                "user2_id": Meteor.userId()
            });
        }
        
        // check if it's a match

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
