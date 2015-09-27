  s_movies = new Mongo.Collection("s_movies");
  MovieLikes = new Mongo.Collection("MovieLikes");
  Movies = new Mongo.Collection("Movies");
  PersonLikes = new Mongo.Collection("PersonLikes");
  Matches = new Mongo.Collection("Matches");
  
  function intersect(a, b)
  {
    var ai=0, bi=0;
    var result = new Array();

    while( ai < a.length && bi < b.length )
    {
       if      (a[ai] < b[bi] ){ ai++; }
       else if (a[ai] > b[bi] ){ bi++; }
       else /* they're equal */
       {
         result.push(a[ai]);
         ai++;
         bi++;
       }
    }

    return result;
  }

  Meteor.methods({
    swipable: function () {
      var id = this.userId;
      var likes = MovieLikes.find({'user_id': id}).fetch();
      var result = new Array();

      likes.map(function (like){
        var l = MovieLikes.find({'movie_id':like.movie_id,'user_id': {$ne : id}}).fetch();
        l.map(function (other_like){
          if (result.indexOf(other_like) < 0) {
            result.push(other_like.user_id);
          }
            
        });
      });
      return result;
    }
  });