'use strict';

angular.module('PeopleOnGitHubApp', []);
var myApp = angular.module('PeopleOnGitHubApp');

myApp.controller('homeController', ['$scope', '$http',
        function ($scope, $http) {

    $scope.status;
	$scope.isActive = false;
	$scope.isFilterActive = false;
	$scope.filter = false;
    $scope.users = [];
	$scope.usersBackup = [];
	$scope.filterUsers = [];
	$scope.toggleActive = function(){
		$scope.isActive = !$scope.isActive;
		$scope.filter = false;
		$scope.users= angular.copy($scope.usersBackup);
	}
	$scope.toggleFilter = function(){
		$scope.isActive = !$scope.isActive;
		$scope.filter = true;
		$scope.users= angular.copy($scope.filterUsers);
	}
    function loadUsers() {
         $http.get("https://api.github.com/users")
               .success(function (data) {
                  $scope.users = data;
				  $scope.usersBackup = data;
				  filterUsers();
               })
               .error(function (error) {
                  $scope.status = error.message; 
               });
    }
    loadUsers();
	function filterUsers(){
		angular.forEach($scope.users, function(user, index){
			if(parseInt(user.id) % 2 == 0)
				$scope.filterUsers.push(user);
		});
	}
}]);