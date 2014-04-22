/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("indexController", ["$scope", "$location", "$routeParams", "groupData", "employeeData", function ($scope, $location, $routeParams, groupData, employeeData) {
  "use strict";
  // If route parameters are present, set the group and employee variables.
  if ($routeParams.group_id) {
    $scope.group = groupData.find($routeParams.group_id);
  } else if ($routeParams.employee_id) {
    $scope.employee = employeeData.find($routeParams.employee_id);
    $scope.group = groupData.find($scope.employee.group_id);
  }

  // Change the url when the group changes.
  $scope.$watch("group", function (newValue, oldValue) {
    if (newValue === oldValue) {
      return;
    }
    var path = (newValue) ? ("/groups/" + newValue.id) : "";
    // The second parameter we send here to `$location.path` is a non-standard
    // one that we've added. When set to false, it causes the app to NOT reload
    // the views/controllers when the route changes.
    $location.path(path, false);
  });

  // Change the url when the employee changes.
  $scope.$watch("employee", function (newValue, oldValue) {
    var path;
    if (newValue === oldValue) {
      return;
    }
    if (newValue) {
      path = "/employees/" + $scope.employee.id;
    } else if ($scope.group) {
      path = "/groups/" + $scope.group.id;
    } else {
      path = "";
    }
    // The second parameter we send here to `$location.path` is a non-standard
    // one that we've added. When set to false, it causes the app to NOT reload
    // the views/controllers when the route changes.
    $location.path(path, false);
  });
}]);
