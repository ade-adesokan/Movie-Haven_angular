describe('MovieDetailsController', function () {
  var scope, movieInfoController, httpBackend;
  beforeEach( function() {
    module('movieHaven');
    inject( function ($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      
      movieInfoController = $controller('MovieDetailsController', {$scope:scope});

      httpBackend = $httpBackend;
      scope.findMovie();
      httpBackend.expectJSONP(scope.url).
      respond([{countries: ["USA", "UK"], genres: ["Action", "Mystery", "Sci-Fi", "Thriller"], trailer: {}}]);

      
    });
  });

  //Test that search input exists
  it('should check if the "movieName" property exists', function () {
    expect(scope.movieName).toBeDefined();
  });
  //Test that search input is a string
  it('should check if the "movieName" property is a string', function () {
    expect(typeof(scope.movieName)).toEqual('string');
  });
  //Test for HTTP response
  it('should create "movieInfo" model with 2 properties fetched from xhr', function () {
    expect(scope.movieInfo).toBeUndefined();
    httpBackend.flush();
    expect(scope.movieInfo).toEqual([{countries: ["USA", "UK"], genres: ["Action", "Mystery", "Sci-Fi", "Thriller"], trailer: {}}]);
  });
});