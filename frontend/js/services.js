'use strict';

/* Services */

htwgApp.value('localStorage', window.localStorage);

angular.module('htwgServices', ['ngResource']).
    factory('Course', function($resource){
  return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/courses/:courseID/:semester', {}, {
    queryAll: {method:'GET', isArray:false, cache : true},
    querySingle: {method: "GET", isArray: true, cache : true}
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
    }).factory('Lecture', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/lectures/:lectureID', {}, {
            querySingle:{method:'GET', isArray:true, cache:true}
        })
    })
