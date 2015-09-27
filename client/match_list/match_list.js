function findMatches() {
  return Matches.find( {
    $where: function() {
      var expr1 = (this.user1_id == Meteor.userId());
      var expr2 = (this.user2_id == Meteor.userId());
      return expr1 || expr2;
    }
  });
}

Template.match_list.helpers({
    matches: function(){
      return findMatches();
    },
    no_matches: function (){ 
      return findMatches().fetch().length == 0;
    },
    match_name: function (ctx){
      if (ctx != Meteor.userId()) {
        return Meteor.users.findOne(ctx).profile.name
      }
    }
});

Template.match_info.helpers({
    //query for match information

});