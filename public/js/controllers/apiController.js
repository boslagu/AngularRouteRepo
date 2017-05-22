'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: '/api/name'
  }).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!';
  });

}).

controller('QuizCtrl', function($scope) {
  //
});



var responseCode
var messageDisplay
var score = 0
var token = 0
var diff = 1

function AppCtrl($scope) {
  $scope.currentNavItem = 'Quiz';
}

angular.module('MyApps', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .controller("MyApiCtrl", function($scope, $mdDialog, $http) {

    $scope.$watch("category", function() {
      returnSearch();
    });

    function returnSearch() {
      $http.get("https://opentdb.com/api.php?amount=15&category=" + $scope.category + "&difficulty=easy").then(function(p) {
        console.log(p.data);
        responseCode = p.data.response_code
        let array = p.data.results;
        array.forEach(function(item) {
          item.question = item.question.replace(/\&.{4}\;/g, "'");
          item.question = item.question.replace(/\&.{5}\;/g, '"');
          item.question = item.question.replace(`&#039;/g`, '');
        });
        $scope.trivias = array;
        checkQuestions();
      });
      console.log($scope.difficulty)
    }


    $scope.hideContents = function() {
      if (responseCode === 0) {
        $scope.contents = true
      }
    }


    function checkQuestions() {
      if (responseCode === 0) {
        messageDisplay = "Ready?"
      } else if (responseCode === 1) {
        messageDisplay = "No Questions available."
      } else if (responseCode === 2) {
        messageDisplay = "No Questions available."
      }
    }

    $scope.showAlert = function(ev) {
      if (responseCode === 0) {
        $scope.open = true
        console.log("true")
      } else if (responseCode === 1 || responseCode === 2) {
        $scope.open = false
        console.log("false")
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('There is no question available.')
          .ok('Got it!')
          .targetEvent(ev)
        );
      }
    }
    $scope.rightAnswer = function() {
      score = score + 1
      console.log(score)
    }

    $scope.showScore = function(ev) {
      var diffi
      //dialog
      if (score > 2) {
        $scope.open = true
        $scope.open1 = false
                            token = 0
                            diff++;
                            if (diff === 2) {
                              diffi = "Medium"
                            } else if (diff === 3) {
                              diffi = "Hard"
                            }
                            //request api if score > 2
                            if (diff === 2) {
                              $mdDialog.show(
                                $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title("Your score is " + score + " Difficulty Level: " + diffi)
                                .ok('Got it!')
                                .targetEvent(ev)
                              );
                              console.log("difficulty = medium")
                              $http.get("https://opentdb.com/api.php?amount=15&category=" + $scope.category + "&difficulty=medium").then(function(p) {
                                console.log(p.data);
                                responseCode = p.data.response_code
                                let array = p.data.results;
                                array.forEach(function(item) {
                                  item.question = item.question.replace(/\&.{4}\;/g, "'");
                                  item.question = item.question.replace(/\&.{5}\;/g, '"');
                                  item.question = item.question.replace(`&#039;/g`, '');
                                });
                                $scope.trivias = array;
                                checkQuestions();
                              });
                            } else if (diff === 3) {
                              $mdDialog.show(
                                $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title("Your score is " + score + " Difficulty Level: " + diffi)
                                .ok('Got it!')
                                .targetEvent(ev)
                              );
                              console.log("difficulty = hard")
                              $http.get("https://opentdb.com/api.php?amount=15&category=" + $scope.category + "&difficulty=hard").then(function(p) {
                                console.log(p.data);
                                responseCode = p.data.response_code
                                let array = p.data.results;
                                array.forEach(function(item) {
                                  item.question = item.question.replace(/\&.{4}\;/g, "'");
                                  item.question = item.question.replace(/\&.{5}\;/g, '"');
                                  item.question = item.question.replace(`&#039;/g`, '');
                                });
                                $scope.trivias = array;
                                checkQuestions();
                              });
                            } else if (diff === 4) {
                              // diff = 1
                              $mdDialog.show(
                                $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title("Quiz Finished")
                                .ok('Got it!')
                                .targetEvent(ev)
                              );
                              $scope.open = false
                              $scope.open1 = false
                              $scope.contents = false
                            }
                            console.log("true")

      } else if (score < 3) {
        token++;
        console.log("false")
        console.log(token)
        $scope.open = false
        $scope.open1 = true
        if (token === 2) {
          $scope.open1 = false
          $scope.contents = false
        } {
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title("Your score " + score)
            .ok('Got it!')
            .targetEvent(ev)
          );
        }
      }



      //end of dialog
      //token condition
      if (token === 2) {
        console.log(token)
        console.log("stop the quiz")
      } else {
        console.log("continue the quiz")
      }
      //end of token condition

      score = 0
    }
  })
