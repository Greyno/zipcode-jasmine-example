(function (angular) {
    "use strict";

    angular.module("todo-app.core").controller("TodoController", TodoController);

    TodoController.$inject = ["$window", "$log", "todoSaveService"];

    function TodoController($window, $log, todoSaveService) {

        var viewModel = {
            newItemName: "",
            itemList: [],
            addNewItem: addNewItem,
            hasSelectedItems: hasSelectedItems,
            toggleSelectedItems: toggleSelectedItems,
            deleteSelectedItems: deleteSelectedItems
        };

        function addNewItem() {
            viewModel.itemList.push({
                Name: viewModel.newItemName,
                IsBad: false
            });

            viewModel.newItemName = '';
        }

        function hasSelectedItems() {
            for (var i = 0; i < viewModel.itemList.length; i++) {
                if (viewModel.itemList[i].isSelected) {
                    return true;
                }
            }

            return false;
        }

        function toggleSelectedItems() {
            angular.forEach(viewModel.itemList, function (item) {
                if (item.isSelected) {
                    item.IsBad = !item.IsBad;
                }
            });
        }

        function deleteSelectedItems() {
            for (var i = viewModel.itemList.length - 1; i >= 0; i--) {
                if (viewModel.itemList[i].isSelected) {
                    viewModel.itemList.splice(i, 1);
                }
            }
        }

        function saveTodos() {
            todoSaveService.saveTodos(viewModel.itemList).then(function () {
                $window.alert("Success!");
            }, function (errorMessage) {
                $log.error(errorMessage);
            });
        }

        return viewModel;
    }
}(window.angular));
