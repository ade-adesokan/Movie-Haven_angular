(function () {
  var movieHaven = angular.module('movieHaven', []);
  movieHaven.controller('MovieDetailsController', function($scope, $http, $sce) {  

    $scope.enableSearch = function() {
      $scope.hideIntro = true;
      $scope.hideLoading = false;  
      $scope.hideMovieNotFound = true;    
    };

    ($scope.disableSearch = function() {
      $scope.hideLoading = true;
      $scope.hideMovieInfo = true;
      $scope.hideMovieNotFound = true;
    })();
    
    
    $scope.findMovie = function(){
      $scope.enableSearch();

      if($scope.movieName == undefined) {
        $scope.movieName = " ";
      }

      var url = 'http://www.myapifilms.com/imdb?callback=JSON_CALLBACK&title=' + $scope.movieName + '&format=JSONP&actors=S&trailer=1'; 
      $http.jsonp(url).success(function (data) {
        $scope.movieInfo = data;

        if( $scope.movieInfo.message === "Movie not found" || $scope.movieInfo.message === "IMDB Id and Title can not be empty" ) {
          $scope.hideLoading = true;
          $scope.hideMovieNotFound = false;

        } else {

          if(Object.keys($scope.movieInfo[0].trailer).length === 0) {
            $scope.video = "image/noMedia.jpg";

          } else {

            $scope.video = $scope.movieInfo[0].trailer.videoURL + "/imdb/embed?autoplay=false&width=480";
            $scope.video = $sce.trustAsResourceUrl($scope.video);
          }

        $scope.movieName = "";
        $scope.disableSearch();
        $scope.hideMovieInfo = false;
        }        
      }).error(function(data, status, headers, config) {
        $scope.hideLoading = true;
        $scope.hideMovieNotFound = false;
        $scope.hideMovieInfo = true;
      });
    };  
  });
})();