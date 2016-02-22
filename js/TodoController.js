/**
 * Created by andrea.terzani on 13/07/2015.
 */
/**
 * Created by andrea.terzani on 13/07/2015.
 */

app.controller('TodoController',  function($state,$http,$rootScope, $scope,$auth) {

    $scope.todos=[];
    $scope.newTodo={};

    $scope.init = function (){

        $http.get('http://localhost:8000/api/todo').success(function(data){
            $scope.todos=data;
            console.log('todos.data', $scope.todos);
        })
    };

    $scope.save = function(){
        // $scope.newTodo {description: "aaa"}
        console.log('$scope.newTodo', $scope.newTodo);
        // http method POST url $scope.newTodo is  {description: "aaa"} and passed as json form parameters
        $http.post('http://localhost:8000/api/todo',$scope.newTodo).success(function (data) {
            // data is and return form rest app
            console.log('Object data from REST',data);
            //Object {description: "data", owner_id: 3, updated_at: "2016-02-22 04:03:08", created_at: "2016-02-22 04:03:08", id: 10}
            $scope.todos.push(data);
            $scope.newTodo={};
        });
    };

    $scope.update = function(index){
        $http.put('http://localhost:8000/api/todo/'+ $scope.todos[index].id,$scope.todos[index]);
    };

    $scope.delete = function(index){
        // Tutaj nie czeka na poteirdzenie z restu tylko od razu wywale ze swojej listy nie zwazajac na to czy delete
        // sie wykonalo poprawnie czy nie
        $http.delete('http://localhost:8000/api/todo/'+ $scope.todos[index].id).success(function(){
            $scope.todos.splice(index,1);
        });
    };

    $scope.logout = function() {
        $auth.logout().then(function() {
            $rootScope.currentUser = null;
            $state.go('todo');
        });
    };

    $scope.init();

});