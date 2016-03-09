angular.module('myApp')
    .constant("config", {
        "unauthenticatedBaseUrl": "http://localhost:3001",
        "authCheckUrl": "http://localhost:3001/identity/internal/v1/heartbeat"
    });
