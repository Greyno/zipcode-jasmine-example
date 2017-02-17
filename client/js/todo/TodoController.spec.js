describe("Todo Controller", function () {
    var $controller, $scope, $window, $log, todoSaveService;

    beforeEach(function () {
        module("todo-app.core");

        inject(function ($injector) {
            $controller = $injector.get("$controller");
            $scope = $injector.get("$rootScope").$new();
            $window = $injector.get("$window");
            $log = $injector.get("$log");
        });

        todoSaveService = {};

        $controller("TodoController as ctrl", {
            $scope: $scope,
            $window: $window,
            $log: $log,
            todoSaveService: todoSaveService
        });
    });

    describe("addNewItem", function () {

        it("should add a new good item to the item list and clear the item name field", function () {
            // Arrange
            var expectedNewItemName = "Zip code";
            var expectedIsBad = false;

            $scope.ctrl.newItemName = expectedNewItemName;

            // Act
            $scope.ctrl.addNewItem();

            // Assert
            expect($scope.ctrl.itemList.length).toBe(1);
            expect($scope.ctrl.itemList[0].Name).toBe(expectedNewItemName);
            expect($scope.ctrl.itemList[0].IsBad).toBe(false);
            expect($scope.ctrl.newItemName).toBe("");
        });
    });
});
