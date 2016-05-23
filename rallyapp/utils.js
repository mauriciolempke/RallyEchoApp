    var workingDaysBetweenDates = function(startDate, endDate) {

        // Validate input
        if (endDate < startDate)
            return 0;

        // Calculate days between dates
        var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0, 0, 0, 1); // Start just after midnight
        endDate.setHours(23, 59, 59, 999); // End just before midnight
        var diff = endDate - startDate; // Milliseconds between datetime objects    
        var days = Math.ceil(diff / millisecondsPerDay);

        // Subtract two weekend days for every week in between
        var weeks = Math.floor(days / 7);
        days = days - (weeks * 2);

        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();

        // Remove weekend not previously removed.   
        if (startDay - endDay > 1)
            days = days - 2;

        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6)
            days = days - 1

        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0)
            days = days - 1

        return days;
    };

    var getDateStr = function(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    };

    var getDateStrMin = function(date) {
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day;
    };

    var getDateStrRally = function(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + "-" + month + '-' + day;
    };

    var getUSTotals = function(storyList) {
        var totals = {};

        totals.totalItems = storyList.QueryResult.TotalResultCount;
        totals.totalPoints = 0;
        totals.acceptedPoints = 0;

        for (i = 0; i < storyList.QueryResult.Results.length; i++) {
            var estimate = storyList.QueryResult.Results[i].PlanEstimate;
            var state = storyList.QueryResult.Results[i].ScheduleState;

            totals.totalPoints += estimate;
            if (state === 'Accepted' || state === 'Completed' || state === 'Released') {
                totals.acceptedPoints += estimate;
            }
        }

        return totals;
    };

    var getTaskTotals = function(taskList) {
        var totals = {};

        totals.totalTasks = taskList.QueryResult.TotalResultCount;
        totals.totalCompleteTasks = 0;
        for (i = 0; i < taskList.QueryResult.Results.length; i++) {
            var state = taskList.QueryResult.Results[i].State;

            if (state === 'Completed') {
                totals.totalCompleteTasks += 1;
            }
        }
        return totals;
    };

    var getDefectTotals = function(defectList) {
        var totals = {};
        totals.totalDefects = defectList.QueryResult.TotalResultCount;
        totals.totalCompleteDefects = 0;
        for (i = 0; i < defectList.QueryResult.Results.length; i++) {
            var state = defectList.QueryResult.Results[i].State;

            if (state === 'Completed') {
                totals.totalCompleteDefects += 1;
            }
        }


        return totals;
    };
