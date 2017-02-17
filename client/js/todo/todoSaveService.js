(function (angular) {
    "use strict";

    angular.module("todo-app.core").factory("todoSaveService", todoSaveService);

    todoSaveService.$inject = ["$http"];

    function todoSaveService($http) {
        var todoSaveServiceApi = {
            saveTodos: saveTodos
        };

        function saveTodos(todos) {
            return $http.post("/todos/save", todos)
                .then(saveTodosSuccess, saveTodosFailure);
        }

        function saveTodosSuccess(saveTodosResponse) {
            return saveTodosResponse.data;
        }

        function saveTodosFailure(errorResponse) {
            var errorMessage = "Error: " + errorResponse.data;

            return errorMessage;
        }

        return todoSaveServiceApi;
    }
}(window.angular));
