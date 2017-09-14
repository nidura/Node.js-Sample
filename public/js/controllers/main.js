angular.module('todoController', [])
	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				console.log(data)
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			console.log($scope.formData)
            var jsonData = JSON.stringify($scope.formData);
			if ($scope.formData.task != undefined) {
				$scope.loading = true;
				Todos.create(jsonData)
					.success(function(data) {
                        Todos.get()
                        	.success(function(data) {
                        		$scope.todos = data;
                        		$scope.loading = false;
								$scope.formData = {};
                        	});
					});
			}
		};

		//UPDATE ============================================================
		$scope.updateTodo  = function () {
            Todos.update(JSON.stringify($scope.formData))
                .success(function(data) {
                    Todos.get()
                        .success(function(data) {
                            $scope.mode= 'save';
                            $scope.todos = data;
                            $scope.loading = false;
                            $scope.formData = {};
                        });
                });
        };


		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
                    Todos.get()
                        .success(function(data) {
                            console.log(data)
                            $scope.todos = data;
                            $scope.loading = false
                        });
				});
		};

		$scope.edit = function (todo,index) {
            $scope.mode= 'update';
			$scope.formData = todo;
            $scope.todos.splice(index,1);
        };


		$scope.init = function(){
		 	$scope.mode= 'save';
		};

		$scope.init();
	}]);