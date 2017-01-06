
(function() {

    'use strict';

    var pokerController = function($scope, $http, $q) {

        var url = 'http://dealer.internal.comparaonline.com:8080/deck';

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
                    alert('error obteniendo el token');
                }) ;
        };


        $scope.checkWinner = function(cards){

            $http.post(url)
                .then(function(data){
                    if(data && data.status === 200) {
                        $scope.token = data.data;
                        console.log(data);
                    }
                }).catch(function(err) {
                    console.log(err);
                    $scope.shouldShowErrorToken = true;
                    alert('error obteniendo el token');
                }) ;
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
                $http.get(url)
                    .then(function(data){
                        if(data && data.status === 200) {
                            $scope.cards = data.data;
                            console.log(data);
                        }
                    }).catch(function(err) {
                        console.log(err);
                        $scope.shouldShowErrorToken = true;
                        alert('error obteniendo cartas');
                    }) ;
            }
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