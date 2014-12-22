(function () {
  var movieHaven = angular.module('movieHaven', []); //create module called "movieHaven"  

  movieHaven.controller('MovieDetailsController', function ($scope, $http, $sce) {  //create controller called "MovieDetailsController" in "movieHaven" module  

    $scope.enableSearch = function () { //enable search function
      $scope.hideIntro = true; //hide intro
      $scope.hideLoading = false;  //show loading bar
      $scope.hideMovieNotFound = true;   //hide movie not found message
    };

    $scope.disableSearch = function () { //disable search function
      $scope.hideLoading = true; // hide loading bar
      $scope.hideMovieInfo = true; //hide Movie Information
      $scope.hideMovieNotFound = true; //hide movie not found message
    };
    $scope.disableSearch(); //call on default    
    $scope.findMovie = function () { //function that searches for movie typed by user, user input becomes $scope.movieName
      $scope.enableSearch(); //Enable search function called

      if ($scope.movieName === undefined) { // If user doesn't input anything
        $scope.movieName = " ";
      }

      $scope.url = 'http://www.myapifilms.com/imdb?callback=JSON_CALLBACK&title=' + $scope.movieName + '&format=JSONP&actors=S&trailer=1'; // url of API
      $http.jsonp($scope.url).success(function (data) { //http call with jsonp method
        $scope.movieInfo = data;

        if ($scope.movieInfo.message === "Movie not found" || $scope.movieInfo.message === "IMDB Id and Title can not be empty") { // If Movie User seeks isn't available
          $scope.hideLoading = true; //hide loading bar
          $scope.hideMovieNotFound = false; //show movie not found 
          $scope.hideMovieInfo = true;  // hide Movie information

        } else {

          if (Object.keys($scope.movieInfo[0].trailer).length === 0) { //If movie trailer isn't available
            $scope.video = "image/noMedia.jpg"; // fixed image that displays if trailer is not available

          } else { //when trailer is available

            $scope.video = $scope.movieInfo[0].trailer.videoURL + "/imdb/embed?autoplay=false&width=480"; //trailer url
            $scope.video = $sce.trustAsResourceUrl($scope.video); //adding trailer url to trusted resource url
          }

          $scope.movieName = ""; //making input box blank after search
          $scope.disableSearch(); //call disable search function
          $scope.hideMovieInfo = false;  //show movie information
        }   
      })
      .error( function () { // in time of error while loading page i.e. no internet connection
        $scope.hideLoading = true; //hide loading bar
        $scope.hideMovieNotFound = false; // show movie not found page
        $scope.hideMovieInfo = true; // hide Movie information
      });
    };  
  });
}());