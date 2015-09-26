s_movies = new Mongo.Collection("s_movies");
MovieLikes = new Mongo.Collection("MovieLikes");
Movies = new Mongo.Collection("Movies");


function findMovies(keyword, cbk) {
  var api_key = "8a81dcc0952c978757d303abc0341fe0";
  var url = "https://api.themoviedb.org/3/search/movie?api_key="
  var lang = "&language=en"
  var final_url = url + api_key + "&query=" + keyword + lang;

  HTTP.get(final_url, cbk);

};

Template.movie_search.helpers({
  results: function () {
    if (s_movies){
      return s_movies.find()
    }
  }
});

Template.movie_search.onRendered(function(){
  if (s_movies.find().fetch().length) {
    s_movies.remove(s_movies.find().fetch()[0]._id)      
  }     
});

Template.movie_search.onDestroyed(function(){
  if (s_movies.find().fetch().length) {
    s_movies.remove(s_movies.find().fetch()[0]._id)      
  }
});


  
Template.movie_search.events({
  "keyup .textSearch": function (evt, template) {
    var keyword = evt.target.value;
    if (keyword.length >= 3) {
      findMovies(keyword,
        function (err, resp) {
          if (resp) {
            window.movies = JSON.parse(resp.content).results;

            if (s_movies.find().fetch().length) {
              s_movies.remove(s_movies.find().fetch()[0]._id)
            }
            s_movies.insert({'items':movies});

            // if (window.s_movies) {delete window.s_movies};
          
            // window.s_movies = new Mongo.Collection("s_movies");

            // for (var i in movies) {
            //   window.s_movies.insert(movies[i]);
            // }
          }
        });
    }
    else {
      if (s_movies.find().fetch().length) {
        s_movies.remove(s_movies.find().fetch()[0]._id)      
      }
    }
  },
  "click .searchItem": function (evt, template) {
    var movie_index = evt.target.getAttribute("movieind");
    for (var i in window.movies) {
      var movie = window.movies[i]
      if (movie_index == movie.id){
        var movie_record = Movies.find({"title": movie.title}).fetch();
        console.log(movie_record);
        if (!movie_record.length){
          // insert new movie into movies collection
          var movie_record_id = Movies.insert(movie);
        }
        else {
          movie_record_id = movie_record._id;
        }
        console.log(movie_record_id);


        if (MovieLikes.find({"movie_id": movie_record_id}).fetch().length){
          console.log("already added");
        }
        else {
          // insert new movie liked
          var movie_like = MovieLikes.insert({
            "user_id": Meteor.userId(),
            "movie_id": movie_record_id
          });
          console.log(movie_like);
        }
      }
    }
    console.log(template)
  }
});

window.findMovies = findMovies;
