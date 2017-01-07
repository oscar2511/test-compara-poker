
(function() {

    'use strict';

    var pokerController = function($scope, $http, $q) {

        var url = 'http://dealer.internal.comparaonline.com:8080/deck';

        $scope.isCardsP1 = false;
        $scope.isCardsP2 = false;

        /**
         *
         */
        $scope.getToken = function() {
            $scope.token = '';
            $http.post(url)
                .then(function(data){
                    if(data && data.status === 200) {
                        $scope.token = data.data;
                        console.log(data);
                    }
                }).catch(function(err) {
                    console.log(err);
                    $scope.shouldShowErrorToken = true;
                }) ;
        };


        $scope.failData = [
            {'number': '5',
             'suit': 'hearts'},
            {'number': '5',
                'suit': 'spade'},
            {'number': 'A',
                'suit': 'hearts'},
            {'number': '10',
                'suit': 'spade'},
            {'number': 'J',
                'suit': 'hearts'}
        ];


    $scope.shuffle1 = function(token) {
        if(token && token != 'undefined') {
            $scope.getCards(token).then(function(response){
                if(!angular.isUndefined(response)){
                    console.log(response);
                    $scope.isCardsP1 = true;
                    $scope.cardsP1   = response;
                }
            });
        }
    };

    $scope.shuffle2 = function(token) {
        if(token && token != 'undefined') {
            $scope.getCards(token).then(function(response){
                if(!angular.isUndefined(response)){
                    console.log(response);
                    $scope.isCardsP2 = true;
                    $scope.cardsP2   = response;
                }
            });
        }
    };

    /**
     *
     */
    $scope.reset = function () {
        $scope.isCardsP1 = false;
        $scope.cardsP1   = [];
        $scope.isCardsP2 = false;
        $scope.cardsP2   = [];
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
                            //$scope.cards = data.data;
                            $scope.cards = $scope.failData;
                            //console.log($scope.failData);
                            return $scope.cards;
                        }
                    }).catch(function(err) {
                        console.log(err);
                        $scope.shouldShowErrorToken = true;
                        alert('error obteniendo cartas');
                    }) ;
            }
        };


        /**
         *
         * @param cards
         */
        $scope.checkWinner = function(cards) {
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

            var url = 'http://app.compara.dev/app_dev.php/check-winner';
            $http.post(url, cards, config)
                .then(function(data){
                    if(data && data.status === 200) {
                        $scope.token = data.data;
                        console.log(data);
                    }
                }).catch(function(err) {
                    console.log(err);
                    $scope.shouldShowErrorToken = true;
                    alert('error checkeando ganador');
                }) ;
        };


    };



    angular.module('compara.Controllers')
        .controller('pokerController', [
            '$scope',
            '$http',
            '$q',
            pokerController
        ]);

})();