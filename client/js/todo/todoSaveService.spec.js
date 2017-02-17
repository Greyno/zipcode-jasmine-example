/*globals angular,inject*/
describe("Todo Save Service", function () {
    var $httpBackend, todoSaveService;

    beforeEach(function () {
        module("todo-app.core");

        inject(["$injector", function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            todoSaveService = $injector.get("todoSaveService");
        }]);
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe("saveTodos", function () {

        it("should return the successful response when the todos are saved", function () {
            // Arrange
            var todos = [{
                field: "Value"
            }];
            var expectedTodosResponse = "Success!";
            var actualTodosResponse;

            $httpBackend.expectPOST("/todos/save", todos).respond(expectedTodosResponse);

            // Act
            todoSaveService.saveTodos(todos).then(function (saveTodosResponse) {
                actualTodosResponse = saveTodosResponse;
            });
            $httpBackend.flush(1);

            // Assert
            expect(actualTodosResponse).toEqual(expectedTodosResponse);
        });

        it("should return the error message when the todos are not saved", function () {
            // Arrange
            var todos = [{
                field: "Value"
            }];
            var errorResponse = "Oh no :(";
            var expectedTodosResponse = "Error: " + errorResponse;
            var actualTodosResponse;

            $httpBackend.expectPOST("/todos/save", todos)
                .respond(404, errorResponse);

            // Act
            todoSaveService.saveTodos(todos).then(function (errorMessage) {
                actualTodosResponse = errorMessage;
            });
            $httpBackend.flush(1);

            // Assert
            expect(actualTodosResponse).toEqual(expectedTodosResponse);
        });
    });
});
