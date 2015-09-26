s_movies = new Mongo.Collection("s_movies");

function findMovies(keyword, cbk) {
  var api_key = "8a81dcc0952c978757d303abc0341fe0";
  var url = "https://api.themoviedb.org/3/search/movie?api_key="
  var lang = "&language=en"
  var final_url = url + api_key + "&query=" + keyword + lang;

  HTTP.get(final_url, cbk);

};

Template.MovieSearch.helpers({
  results: function () {
    if (s_movies){
      return s_movies.find()
    }
  }
});

Template.MovieSearch.onRendered(function(){
  if (s_movies.find().fetch().length) {
    s_movies.remove(s_movies.find().fetch()[0]._id)      
  }     
});

Template.MovieSearch.onDestroyed(function(){
  if (s_movies.find().fetch().length) {
    s_movies.remove(s_movies.find().fetch()[0]._id)      
  }
});



Template.MovieSearch.events({
  "keyup .textSearch": function (evt, template) {
    var keyword = evt.target.value;
    if (keyword.length >= 3) {
      findMovies(keyword,
        function (err, resp) {
          console.log(err);
          console.log(resp);
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
      s_movies.remove(s_movies.find().fetch()[0]._id)      
    }
  }
});

window.findMovies = findMovies;
