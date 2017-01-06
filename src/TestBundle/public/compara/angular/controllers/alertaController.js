
(function() {

    'use strict';

    var alertaController = function($scope) {


        $scope.labelsEstado = ["Pendientes", "Enviadas", "Fallidas"];
        $scope.dataEstado   = [300, 500, 100];
        $scope.colors       = ['#FDB45C','00a65a','#F70106'];

    };

    angular.module('colmenapp.Controllers')
        .controller('alertaController', [
            '$scope',
            alertaController
        ]);

})();