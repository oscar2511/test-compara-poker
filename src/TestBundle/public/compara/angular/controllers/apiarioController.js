
(function() {

    'use strict';

    var apiarioController = function($scope, $http) {

        //grafico productividad
        $scope.labels = ["","12/13","13/14", "14/15","15/16"];
        $scope.data   = [0,1080, 921, 1366, 1527];


        //grafico alta/baja colmenas
        $scope.labelsColmenas = ['',1,2,3,4,5,6,7,8,9,10,11,12];
        $scope.dataColmenas   = ['',120, 150, 155, 155,156, 158, 160, 150,120, 123, 127, 130];



        $scope.labelsEstado = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.dataEstado = [300, 500, 100];

    };

    angular.module('colmenapp.Controllers')
        .controller('apiarioController', [
            '$scope',
            '$http',
            apiarioController
        ]);

})();