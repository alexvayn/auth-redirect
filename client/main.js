var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            access: {restricted: true}
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {restricted: true}
        })
        .when('/protected', {
            templateUrl: 'partials/protected.html',
            access: {restricted: true}
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            access: {restricted: true}
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.run(function ($rootScope, $route, AuthService, config) {

    var idiomLoginUrl = config.idiomBaseUrl + '/#/login';

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next && next.access && next.access.restricted) {

            AuthService.isLoggedIn()
                .then(function (status) {
                    if (!status) {
                        console.log('got false status... need to log in');
                        window.location.href = idiomLoginUrl;
                    } else {
                        console.log('user is logged in...');
                    }
                })
                .catch(function (status) {
                    window.location.href = idiomLoginUrl;
                });
        }
    });
});