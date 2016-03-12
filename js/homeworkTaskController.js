/**
 * Created by WebEngineer on 3/12/16.
 */
var app = angular.module('app', []);

app.controller('Listr', function Listr($scope) {
    //Set vars
    $scope.collections = [];
    $scope.studentName = "StudentName";
    // Create: MM/DD/YYYY
    var dueDate = new Date();
    var month = dueDate.getMonth();
    var day = dueDate.getDay() + 1;
    var fullyear = dueDate.getFullYear();
    $scope.dateResult = month + "-" + day + "-" + fullyear;

    //Get data from localStorage database, and check to see if any data is there
    $scope.getDataStore = localStorage.getItem("dataStore");
    $scope.myTasks = JSON.parse($scope.getDataStore);
    if ($scope.myTasks !== null)
        for (var i = 0; i < $scope.myTasks.length; i++) {
            $scope.collections.push($scope.myTasks[i]);
        }

    //Delete Homework Task Function and store new collection into localStorage
    $scope.removeItem = function($index) {
        $scope.collections.splice($index, 1);
        var dataStore = JSON.parse(localStorage.dataStore);
        for (var i = 0; i < dataStore.length; i++) {
            if (dataStore[i]) {
                dataStore.splice($index, 1);
            }
            // insert the new stringified array into LocalStorage
            localStorage.dataStore = JSON.stringify(dataStore);
        }
    };
    //Add a homework item function and add into $scope.collections var, then set into local database storage for later use, the alert is a user workflow exception to prevent empty tasks to be added to local database and user interface list
    $scope.addItem = function() {
        if ($scope.newTitle !== undefined || $scope.newSubject !== undefined) {
            $scope.collections.push({
                type: $scope.newSubject,
                listTitle: $scope.newTitle,
                dueDate: $scope.dateResult
            });
            localStorage.setItem("dataStore", JSON.stringify($scope.collections));

            $scope.newTitle = '';
            $scope.newSubject = '';

        } else {
            alert("Please add a task, it is required");
        }
    };

});