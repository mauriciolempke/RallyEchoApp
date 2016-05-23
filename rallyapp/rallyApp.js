    var rallyURL = "https://rally1.rallydev.com/slm/webservice/v2.0/";

    var today = new Date();
        today.setDate(6);
        today.setMonth(4);
        today.setYear(2016);




    /*   Rally.onReady(function () {
               var app = Ext.define("CustomApp",
                   {
                       extend:"Rally.app.App",
                       height:15,
                       maxHeight: 15,
                       launch:function(){
                           $("#releaseSelector").show();
                           $("#navApp").show();
                       }

                   }
               );

               console.log("AA" + app.getContext());

           Rally.launchApp('CustomApp', {
               name:"Random App Name18293",
               parentRepos:""
           });

       });*/

    angular.module('rallyApp', []).controller('myController', ['$scope', function($scope) {
        $scope.page = {};

        var projectId = 30031352890;

       getCurrentSprint(projectId, function(iteration){
            $scope.page.currentSprint = iteration;

            var iterationId = iteration.ObjectID;
            var startDate = new Date(iteration.StartDate);
            var endDate = new Date(iteration.EndDate);

            $scope.page.currentSprint.totalSprintDays = workingDaysBetweenDates(startDate, endDate);
            $scope.page.currentSprint.daysLeft = workingDaysBetweenDates(today, endDate);
            $scope.page.currentSprint.sprintStart = getDateStr(startDate);
            $scope.page.currentSprint.sprintEnd = getDateStr(endDate);            

           //getStoryList(iterationId, function(data) {

           //})

            $scope.$apply();
           // getBurndownData(23240039805, 52560574310, startDate, endDate);

        });

       // Get List of stories


 /*       $scope.page.usList = getStoryList();
        $scope.page.defectList = getDefectList();
        $scope.page.taskList = getTaskList();
        $scope.page.defectList = getDefectList();
        $scope.page.hideChart = true;
        $scope.page.iterationMetrics = true;
        $scope.page.basicCommands = true;
        $scope.page.chartCommands = false;


        $scope.page.usTotals = getUSTotals($scope.page.usList);
        $scope.page.taskTotals = getTaskTotals($scope.page.taskList);
        $scope.page.defectTotals = getDefectTotals($scope.page.defectList);


        var chartData = {
            title: {
                text: "Burndown Chart"
            },
            xAxis: {
                categories: ["05/04", "05/05", "05/06", "05/09", "05/10",
                    "05/11", "05/12", "05/13", "05/16", "05/17"
                ]
            },
            yAxis: [{
                title: {
                    text: 'Hours'
                },
                max: 100
            }, {
                title: {
                    text: 'Story Points'
                },
                opposite: true,
                max: 10
            }],
            series: [{
                type: 'column',
                name: 'To Do',
                data: [100, 85, 85, 70, 55, 55, 55, 10, 10, 10],
                color: 'blue',
                yAxis: 0
            }, {
                type: 'column',
                name: 'Accepted',
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                color: 'green',
                yAxis: 1
            }, {
                type: 'line',
                name: 'Ideal',
                data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
                color: '#333'
            }]
        };
        Highcharts.chart('chart-place', chartData);

        $scope.page.burndown = function() {
            page.hideChart = false;
            page.basicCommands = false;
            page.chartCommands = true;
        };

        $scope.page.closeBurndown = function() {
            page.hideChart = true;
            page.basicCommands = true;
            page.chartCommands = false;
        };*/



    }]);