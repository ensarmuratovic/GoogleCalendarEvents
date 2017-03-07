var app = angular.module('eventsApp', ["googleApi", 'treeGrid', 'angular-loading-bar','ngAnimate']);

app.config(function(googleLoginProvider) {
    googleLoginProvider.configure({
        clientId: '271838702018-jcc58isp1cu2c9j35rpv6i57mbrtcu71.apps.googleusercontent.com',
        scopes: ["https://www.googleapis.com/auth/userinfo.email", 
        	     "https://www.googleapis.com/auth/calendar", 
        	     "https://www.googleapis.com/auth/plus.login"]
    });
});

