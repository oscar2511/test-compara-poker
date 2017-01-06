
(function() {

    'use strict';

    var colmenaController = function($scope, $http) {

        //grafico mortandad
        $scope.labels = ["",1,2,3,4,5,6,7,8,9,10,11,12];
        $scope.data   = ["",450, 400, 390, 415, 300,320,400, 430, 433, 309, 480, 460];


        //grafico alta/baja colmenas
        $scope.labelsColmenas = ['',1,2,3,4,5,6,7,8,9,10,11,12];
        $scope.dataColmenas   = ['',120, 150, 155, 155,156, 158, 160, 150,120, 123, 127, 130];



        $scope.labelsAgresividad = ["Baja", "Alta"];
        $scope.dataAgresividad = [500, 300];

    };

    angular.module('colmenapp.Controllers')
        .controller('colmenaController', [
            '$scope',
            '$http',
            colmenaController
        ]);

})();