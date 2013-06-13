'use strict';

/* Services */

htwgApp.value('localStorage', window.localStorage);

angular.module('htwgServices', ['ngResource']).
    factory('Course', function($resource){
  return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/courses/:courseID/:semester', {}, {
    query: {method:'GET', isArray:false, cache : true},
    testabc: {method: "GET", params: {courseID: "4510",semester: "6"}, isArray: true, cache : true}
  });
}).factory('Weather', function($resource){
  return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/weather', {}, {
    query: {method:'GET', isArray:false, cache : true}
  });
}).factory('User', function($rootScope, localStorage) {

  var LOCAL_STORAGE_ID = 'user',
      userString = localStorage[LOCAL_STORAGE_ID];

  var user = userString ? JSON.parse(userString) : {
    userID: undefined,
    courseID: undefined,
    roleID: undefined,
    nick: undefined,
    fullName: undefined,
    hashPw: undefined,
    semester: undefined,
    updateSemester: undefined,
    updateCourse: undefined
  };

  $rootScope.$watch(function() { return user; }, function() {
    localStorage[LOCAL_STORAGE_ID] = JSON.stringify(user);
  }, true);

  return user;
}).factory('News', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/news', {}, {
            query: {method:'GET', isArray:false, cache : true}
        });
}).factory('Room', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/rooms/:roomID', {}, {
            queryAllRooms: {method:'GET', isArray:false, cache: true},
            queryOneRoom:{method:'GET', isArray:true, cache:true}
        })
    }).factory('Room', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/rooms/:roomID', {}, {
            queryAllRooms: {method:'GET', isArray:false, cache: true},
            queryOneRoom:{method:'GET', isArray:true, cache:true}
        })
}).factory('Message', function($rootScope, localStorage) {

        var LOCAL_STORAGE_ID = 'message',
            messageString = localStorage[LOCAL_STORAGE_ID];

        var message = messageString ? JSON.parse(messageString) : {
            messages: undefined
        };

        $rootScope.$watch(function() { return message; }, function() {
            localStorage[LOCAL_STORAGE_ID] = JSON.stringify(message);
        }, true);

        return message;
        //http://uc-projects.in.htwg-konstanz.de/htwgapp/fetchmessage/jusudend/b444ac06613fc8d63795be9ad0beaf55011936ac/2013-01-01%2012:12:12
}).factory('FetchMessage', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/fetchmessage/:nick/:hashedpw/:timestamp', {}, {
            fetchAllMessages: {method:'GET', isArray:false, cache: true}
        })
    })
