function AppRoutes($routeProvider) {
    $routeProvider.when("/", { templateUrl: "app/html/views/splash.html"});
    $routeProvider.when("/splash", { templateUrl: "app/html/views/splash.html"});
    $routeProvider.when("/sentence", { templateUrl: "app/html/views/sentence.html", controller: "SentenceCtrl" });
}