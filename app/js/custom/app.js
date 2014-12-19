(function () {
  var movieHaven = angular.module('movieHaven', []);
  movieHaven.controller('MovieDetailsController', function($scope, $http) {  

    
    $scope.findMovie = function(){
      var url = 'http://www.myapifilms.com/imdb?callback=JSON_CALLBACK&title=' + $scope.movieName + '&format=JSONP'; 
      $http.jsonp(url).success(function (data) {
        $scope.movieInfo = data;
        console.log($scope.movieInfo[0].countries);
      });
    };   


  });
})();