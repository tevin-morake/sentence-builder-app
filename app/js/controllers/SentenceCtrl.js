sentenceBuilderApp.controller("SentenceCtrl", function($scope,$http, $modal) {
    $scope.sentences =[];
    $scope.Types = [];
    $scope.wordTypesList = [];
    $scope.selectedWordTypeObj = null;
    const URL = "https://sentencebuilder-api.herokuapp.com/api/"
    
    $scope.typeChanged = function(type){
        console.log($scope.selectedWordTypeObj);
        // $scope.selectedWordTypeObj = type;
        getEnglishWordTypes();
    }
    function getEnglishWordTypes() {
        if(!$scope.selectedWordTypeObj) return;
        var url = URL + "get/wordtypes/" + $scope.selectedWordTypeObj.type;
        $http.get(url).then(function(resp){
            $scope.wordTypesList = resp.data;
        },function(error) {
            console.log(error)
        });
    }

    function getTypes() {
        var url = URL + "get/types";
        $http.get(url).then(function(resp){
            $scope.Types = resp.data;
            getSentences();
        },function(error) {
            console.log(error)
        });
    }
    
    function getSentences() {
        var url = URL + "get/sentences";
        $http.get(url).then(function(resp){
            $scope.sentences = resp.data;
            console.log($scope.Types);
        },function(error) {
            console.log(error)
        });
    }

    function constructor() {
        getTypes();
    }
    constructor();
});