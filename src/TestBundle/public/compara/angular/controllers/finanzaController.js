
(function() {

    'use strict';

    var finanzaController = function($scope) {

        $scope.mostrarModalAltaMovimiento = false;

        $scope.altaMovimiento = function () {
            $scope.mostrarModalAltaMovimiento = true;
        };

        //grafico productividad
        $scope.labels = ["","Los Algarrobos","Agua Blanca"];
        $scope.data   = [0,4304,7921];


        //grafico Ingresos
        $scope.labelsIngresos = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        $scope.dataIngresos   = ['',120, 150, 155, 155,156, 158, 160, 150,120, 123, 127, 130];


        //grafico Egresos
        $scope.labelsEgresos = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        $scope.dataEgresos   = ['',20, 50, 10, 100,120, 120, 140, 150,120, 173, 127, 100];


    };

    angular.module('colmenapp.Controllers')
        .controller('finanzaController', [
            '$scope',
            finanzaController
        ]);

})();