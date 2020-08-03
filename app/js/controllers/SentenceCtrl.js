sentenceBuilderApp.controller("SentenceCtrl", ['$scope', '$http', '$alert', '$modal', function($scope,$http, $alert, $modal) {
    $scope.sentences =[];
    $scope.sentence = null
    $scope.Types = [];
    $scope.wordTypesList = [];
    $scope.selectedWordTypeObj = null;
    $scope.selectedWordType = null;
    $scope.typeIsSelected = false;
    $scope.sentenceToPost = "";

    const URL ="https://sentencebuilder-api.herokuapp.com/api/";
    
    $scope.typeChanged = function(){
        console.log($scope.selectedWordTypeObj);
        $scope.typeIsSelected = true;
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
    
    $scope.addWord = function(){
        $scope.sentenceToPost += ! $scope.sentenceToPost ? $scope.selectedWordType.word : " " + $scope.selectedWordType.word;
        $scope.sentence = "";
    }

    $scope.postSentence = function(){
        if(!$scope.sentenceToPost) {
            return
        }
        var sentence = {"sentence": $scope.sentenceToPost}
        var url = URL + "post/sentence";
        $http.post(url, JSON.stringify(sentence)).then(function(resp){
            $alert( {content: 'sentence saved successfully',duration: 5, placement: 'top', type: 'success', keyboard: false, show: true})
            $scope.sentenceToPost = "";
            $scope.selectedWordTypeObj = "";
            $scope.selectedWordType = "";
            getSentences();
        },function(error) {
            $alert({title: 'Error saving sentence : ',duration: 5, content: error, type: 'danger'});
            console.log(error)
        });
    }

    function constructor() {
        getTypes();
    }
    constructor();
}]);