var sentenceBuilderApp = angular.module("sentenceBuilderApp", ["ngRoute", "ngAnimate", "mgcrea.ngStrap"])
.config( function($routeProvider, $httpProvider, $locationProvider ){
    console.log("preparing to initialize app...");
    //AppRoutes sets up the app routes before app is initialized
    $locationProvider.hashPrefix("");
    AppRoutes($routeProvider);
    $routeProvider.otherwise("/"), { templateUrl: "app/html/views/splash.html" };

    //Reset Http Headers
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


})
.run(function($location){
    console.log("sentence builder app initialized!");
    // $location.path("/login");
});

//TODO: Test CORS on localhost, & after app deployed