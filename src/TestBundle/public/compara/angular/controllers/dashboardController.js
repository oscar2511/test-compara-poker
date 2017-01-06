
(function() {

    'use strict';

    var dashboardController = function($scope) {

        //grafico productividad
        $scope.labels = ["","Los Algarrobos","Agua Blanca"];
        $scope.data   = [0,4304,7921];


        $scope.labelsNucleo = ["","Los Algarrobos","Agua Blanca"];
        $scope.dataNucleo   = [0,210,351];

        //grafico alta/baja colmenas
        $scope.labelsColmenas = ["","Los Algarrobos","Agua Blanca"];
        $scope.dataColmenas   = ['',120, 150];



        $scope.labelsEstado = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.dataEstado = [300, 500, 100];

      ////////////// grafico gastos

      $scope.labelsGastos = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
      $scope.dataGastos = [
        [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56],
        [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56]
      ];
      $scope.seriesGastos = ['Los Algarrobos', 'Agua Blanca'];

      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverrideGastos = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      $scope.optionsGastos = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };

      ///////////////////////////////

    };

    angular.module('colmenapp.Controllers')
        .controller('dashboardController', [
            '$scope',
            dashboardController
        ]);

})();