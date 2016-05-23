    var getCurrentSprint = function(project, callback) {
        var fetch = "name.ObjectID,startDate,endDate,PlanEstimate";
        var query = '(((Project.ObjectID = "' + project + '") and (StartDate <= "' + getDateStrRally(today) + 
                        '")) and (EndDate >= "' + getDateStrRally(today) + '"))';
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": encodeURI(rallyURL + "iteration?fetch=" + fetch + "&query=" + query),
          "method": "GET",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
          },
          "processData": false,
          "data": {}
        }

        $.ajax(settings).done(function (response) {
          callback(response.QueryResult.Results[0]);
        });
    };

    var getStoryList = function(iteration, callback) {
        var query = '(Iteration.ObjectID = "' + iteration + '")';
        var fetch = "blocked,planEstimate,taskActualTotal,taskEstimateTotal,taskRemainingTotal,scheduleState,formattedID";

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": encodeURI(rallyURL + "hierarchicalrequirement?query=" + query + 
                "&pagesize=100" + 
                "&start=1"+ 
                "&fetch=" + fetch),

          "method": "GET",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": {}
        }

        $.ajax(settings).done(function (response) {
          callback(response.QueryResult.Results);
        });        
    }


    var getBurndownData = function(workspace, iteration, startDate, endDate) {
        var result = [];
        var carryOver = 1;
        var isFirst = true;
        var totalHours = 0;

        var totalDays = workingDaysBetweenDates(startDate, endDate);
        var idealPerDay = 0;

        for(i = 0; i < totalDays; i++) {
            var newDate = new Date(startDate.valueOf());
            newDate.setDate(newDate.getDate() + carryOver);
            if (newDate > today) break;

            carryOver++;
            if (newDate.getDay() === 1) {
                carryOver++;
                newDate.setDate(newDate.getDate() + 1);
            } else if (newDate.getDay() === 0) {
                carryOver += 2;
                newDate.setDate(newDate.getDate() + 2);
            }


            var validDate = new Date(newDate.valueOf());
            validDate.setDate(validDate.getDate() - 1);

            var resultEntry = {
                date: getDateStrMin(validDate),
                taskTotal: 0,
                acceptedTotal: 0, 
                totalEstimate: 0
            };

            var dayEntries = getDailyUS(workspace, iteration, newDate);
            var stories = dayEntries.Results;
            if (stories) { 
                for (j=0; j < stories.length; j++) {
                    resultEntry.taskTotal += stories[j].TaskRemainingTotal;
                    resultEntry.totalEstimate += stories[j].TaskEstimateTotal;
                    if (stories[j].ScheduleState === 'Accepted' || stories[j].ScheduleState === 'Released') {
                        resultEntry.acceptedTotal += stories[j].PlanEstimate;
                    }
                }
            }

            if (resultEntry.totalEstimate > totalHours){
                totalHours = resultEntry.totalEstimate;
            }

            result.push(resultEntry);
        }

        idealPerDay = totalHours / totalDays;
        for (k = 0; k < result.length; k++) {
            result[k].ideal = totalHours - (idealPerDay * k);
        }


        console.log(result);

    }
