
(function() {

    'use strict';

    var pokerController = function($scope, $http, $q) {

        var url = 'http://dealer.internal.comparaonline.com:8080/deck';

        $scope.isCardsP1 = false;
        $scope.isCardsP2 = false;
        $scope.moveP1    = {};
        $scope.moveP2    = {};
        $scope.winnerP1  = false;
        $scope.winnerP2  = false;

        var init = function (){
            $scope.getToken();
        };

        /**
         *
         */
        $scope.getToken = function() {
            $scope.token = '';
            $http.post(url)
                .then(function(data){
                    if(data && data.status === 200) {
                        $scope.token = data.data;
                        $scope.shouldShowErrorToken = false;
                        console.log(data);
                    }
                }).catch(function(err) {
                    console.log(err);
                    $scope.shouldShowErrorToken = true;
                }) ;
        };


       /* $scope.failData = [
            {'number': '5',
             'suit': 'hearts'},
            {'number': '7',
                'suit': 'spade'},
            {'number': 'Q',
                'suit': 'hearts'},
            {'number': '1',
                'suit': 'spade'},
            {'number': 'A',
                'suit': 'hearts'}
        ];

        $scope.failData2 = [
            {'number': '4',
                'suit': 'hearts'},
            {'number': '2',
                'suit': 'spade'},
            {'number': 'J',
                'suit': 'hearts'},
            {'number': '7',
                'suit': 'spade'},
            {'number': 'A',
                'suit': 'hearts'}
        ];*/


    $scope.shuffle1 = function(token) {
        if(token && token != 'undefined') {
            $scope.getCards(token).then(function(response){
                if(!angular.isUndefined(response)){
                    $scope.isCardsP1 = true;
                    $scope.cardsP1   = response;
                    $scope.shouldShowErrorCardsP1 = false;
                }
            }).catch(function(){
                $scope.shouldShowErrorCardsP1 = true;
            });
        }
    };

    $scope.shuffle2 = function(token) {
        if(token && token != 'undefined') {
            $scope.getCards(token).then(function(response){
                if(!angular.isUndefined(response)){
                    $scope.isCardsP2 = true;
                    $scope.cardsP2   = response;
                    $scope.shouldShowErrorCardsP2 = false;
                }
            }).catch(function(){
                $scope.shouldShowErrorCardsP2 = true;
            });
        }
    };

    /**
     * Reset default values
     */
    $scope.reset = function () {
        $scope.getToken();
        $scope.cardsP1   = false;
        $scope.cardsP2   = [];
        $scope.isCardsP1 = false;
        $scope.isCardsP2 = false;
        $scope.moveP1    = {};
        $scope.moveP2    = {};
        $scope.winnerP1  = false;
        $scope.winnerP2  = false;

    };

        /**
         *
         * @param token string
         */
        $scope.getCards = function(token){
            if(!token && token == 'undefined')
                alert('token expirado o erroneo');

            else {
                var url = 'http://dealer.internal.comparaonline.com:8080/deck/'+token+'/deal/5';
               return $http.get(url)
                    .then(function(data) {
                        if(data && data.status === 200) {
                            $scope.cards = data.data;
                            $scope.shouldShowErrorCards = false;
                            return $scope.cards;
                        }
                    });
            }
        };


        /**
         *
         */
        $scope.calculateWinner = function() {
            if($scope.isCardsP1) {
                $scope.checkMove($scope.cardsP1)
                    .then(function (move) {
                        $scope.moveP1 = move;

                        if ($scope.isCardsP2) {
                            $scope.checkMove($scope.cardsP2)
                                .then(function (move) {
                                    $scope.moveP2 = move;
                                    checkWinner($scope.moveP1, $scope.moveP2);
                                });
                        }
                    });
            }
        };


        /**
         *
         * @param move1
         * @param move2
         */
        var checkWinner = function(move1, move2) {
            if(move1.hierarchy > move2.hierarchy)
                $scope.winnerP1 = true;
            if (move1.hierarchy < move2.hierarchy)
                $scope.winnerP2 = true;
            if (move1.hierarchy == move2.hierarchy) {

                switch (move1.name) {
                    case 'Pair':
                        checkPair(move1, move2);
                        break;
                    case 'Two pairs':
                        checkPairsTwo(move1, move2);
                        break;
                    case 'Three':
                        checkThree(move1, move2);
                        break;
                    case 'Straight':
                        checkStraight(move1, move2);
                        break;
                    case 'Full house':
                        checkFullHouse(move1, move2);
                        break;
                    case 'Four of a kind':
                        checkThree(move1, move2);
                        break;
                    case 'Straight flush':
                        checkPairsTwo(move1, move2);
                        break;
                    case 'High card':
                        checkHighCard(move1, move2);
                        break;
                }
            }
        };

        /**
         *
         * @param move1
         * @param move2
         */
        var checkHighCard = function(move1, move2) {
              for (var i = 0; i < move1.data.refValues.length; i++) {
                  if(move1.data.refValues[i] > move2.data.refValues[i]) {
                      $scope.winnerP1 = true;
                      break;
                  }
                  if(move1.data.refValues[i] < move2.data.refValues[i]) {
                      $scope.winnerP2 = true;
                      break;
                  }
              }
        };

        /**
         *
         * @param move1
         * @param move2
         */
        var checkPair = function(move1, move2) {
            if(move1.data.cardsPair.refValue > move2.data.cardsPair.refValue)
                $scope.winnerP1 = true;
            if(move1.data.cardsPair.refValue < move2.data.cardsPair.refValue)
                $scope.winnerP2 = true;
            if(move1.data.cardsPair.refValue == move2.data.cardsPair.refValue) {
                if(move1.data.valMax > move2.data.valMax)
                    $scope.winnerP1 = true;
                else $scope.winnerP2 = true;
            }
        };

        /**
         *
         * @param move1
         * @param move2
         */
        var checkPairsTwo = function(move1, move2) {
            if(move1.data.valMax > move2.data.valMax)
                $scope.winnerP1 = true;
            if(move1.data.valMax < move2.data.valMax)
                $scope.winnerP2 = true;
            if(move1.data.valMax == move2.data.valMax)
                $scope.draw = true;
        };


        /**
         * @param move1
         * @param move2
         */
        var checkFullHouse = function(move1, move2) {
            if(move1.data.valMax.refValue > move2.data.valMax.refValue)
                $scope.winnerP1 = true;
            if(move1.data.valMax.refValue < move2.data.valMax.refValue)
                $scope.winnerP2 = true;
            if(move1.data.valMax.refValue == move2.data.valMax.refValue) {
                if (move1.data.secondValMax.refValue > move2.data.secondValMax.refValue) {
                    $scope.winnerP1 = true;
                } else $scope.winnerP2 = true;

            }

        };

        /**
         *
         * @param move1
         * @param move2
         */
        var checkStraight = function(move1, move2) {
            if(move1.data.valMax > move2.data.valMax)
                $scope.winnerP1 = true;
            if(move1.data.valMax < move2.data.valMax)
                $scope.winnerP2 = true;
        };

        /**
         * @param move1
         * @param move2
         */
        var checkThree = function(move1, move2) {
            if(move1.data.valMax.refValue > move2.data.valMax.refValue)
                $scope.winnerP1 = true;
            if(move1.data.valMax.refValue < move2.data.valMax.refValue)
                $scope.winnerP2 = true;
        };

        /**
         *
         * @param cards
         */
        $scope.checkMove = function(cards) {
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

            var url = 'http://localhost/app_dev.php/check-winner';
            return $http.post(url, cards, config)
                .then(function(data){
                    if(data && data.status === 200) {
                        $scope.token = data.data;
                        return data.data.data;
                    }
                }).catch(function(err) {
                    console.log(err);
                    $scope.shouldShowErrorToken = true;
                    alert('error checkeando ganador');
                }) ;
        };

    init();
    };



    angular.module('compara.Controllers')
        .controller('pokerController', [
            '$scope',
            '$http',
            '$q',
            pokerController
        ]);

})();