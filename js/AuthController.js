/**
 * Created by andrea.terzani on 13/07/2015.
 */

app.controller('AuthController',  function($auth, $state,$http,$rootScope, $scope) {

    $scope.email='';
    $scope.password='';
    $scope.newUser={};
    $scope.loginError=false;
    $scope.loginErrorText='';

    $scope.login = function() {

        var credentials = {
            email: $scope.email,
            password: $scope.password
        };
        console.log('credentials', credentials);

        $auth.login(credentials).then(function() {

            return $http.get('http://localhost:8000/api/authenticate/user');

        }, function(error) {
            $scope.loginError = true;
            $scope.loginErrorText = error.data.error;
            console.log('loginErrorText', error.data.error);

        }).then(function(response) {
            $rootScope.currentUser = response.data.user;
            $scope.loginError = false;
            $scope.loginErrorText = '';
            $state.go('todo');

        });
    };

    $scope.register = function () {

        // returns token here
        $http.post('http://localhost:8000/api/register',$scope.newUser)
            .success(function(data){
                $scope.email=$scope.newUser.email;
                $scope.password=$scope.newUser.password;
                console.log($scope.newUser.email);
                $scope.login();
            })

    };


});