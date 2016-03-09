angular.module('myApp').factory('AuthService',
    ['$q', '$timeout', '$http', '$cookies', 'config',
        function ($q, $timeout, $http, $cookies, config) {

            var user = null;

            function isLoggedIn() {

                var deferred = $q.defer();
                var jwtToken = $cookies.get('jwtToken');
                console.log('got Jwt token... ' + jwtToken);

                if (!jwtToken) {
                    console.log('Missing JWT token, not gonna bother calling Idiom')
                    deferred.reject(false);
                    user = false;
                } else {
                    $http({
                        method: 'GET',
                        url: config.authCheckUrl,
                        headers: {
                            'Authorization': 'Bearer ' + jwtToken
                        }
                    }).success(function (data, status) {
                        if (status === 204) {
                            console.log('gonna resolve true...');
                            user = true;
                            deferred.resolve(true);
                        } else {
                            console.log('not gonna resolve true...');
                            user = false;
                            deferred.reject(false);
                        }
                    }).error(function (data) {
                        console.log('def not gonna resolve true...');
                        user = false;
                        deferred.reject(false);
                    });
                }


                return deferred.promise;
            }

            function getUserStatus() {
                return user;
            }

            function login(username, password) {

                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/login', {username: username, password: password})
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function logout() {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    // handle success
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register', {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            // return available functions for use in controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });
        }]);