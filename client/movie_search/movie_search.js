

function findMovies(keyword, cbk) {
  var api_key = "8a81dcc0952c978757d303abc0341fe0";
  var url = "https://api.themoviedb.org/3/search/movie?api_key="
  var lang = "&language=en"
  var final_url = url + api_key + "&query=" + keyword + lang;

  HTTP.get(final_url, cbk);
};

function dropSearchResults () {
  if (s_movies.find().fetch().length) {
    s_movies.remove(s_movies.find().fetch()[0]._id)      
  }     
};

function showMovies (err, resp) {
  if (resp) {
    window.movies = JSON.parse(resp.content).results;

    if (s_movies.find().fetch().length) {
      s_movies.remove(s_movies.find().fetch()[0]._id)
    }
    s_movies.insert({'items':movies});
  }
}

function insertMovieLike (movie) {
  // Find outif we've already stored movie
  var movie_record = Movies.findOne({"title": movie.title});
    console.log(0);
  if (!movie_record){
    // insert new movie into movies collection
    console.log(1);
    var movie_record_id = Movies.insert(movie);
  }
  else {
    console.log(2);
    movie_record_id = movie_record._id;
  }

  if (!MovieLikes.findOne({"user_id": Meteor.userId(),"movie_id": movie_record_id})){
    console.log(3);
    // insert new movie liked
    var movie_like = MovieLikes.insert({
      "user_id": Meteor.userId(),
      "movie_id": movie_record_id
    });
  }
}

Template.movie_search.helpers({
  results: function () {
    if (s_movies){
      return s_movies.find()
    }
  }
});

Template.movie_search.onRendered(function(){
  dropSearchResults();
});

Template.movie_search.onDestroyed(function(){
  dropSearchResults();
});
  
Template.movie_search.events({
  "keyup .textSearch": function (evt, template) {
    var keyword = evt.target.value;
    if (keyword.length >= 3) {
      findMovies(keyword, showMovies);
    }
    else {
      dropSearchResults();
    }
  },

  "click .searchItem": function (evt, template) {
    var movie_index = evt.target.getAttribute("movieind");
    for (var i in window.movies) {
      var movie = window.movies[i]
      if (movie_index == movie.id){
        insertMovieLike(movie);
      }
    }
  }
});

window.findMovies = findMovies;
