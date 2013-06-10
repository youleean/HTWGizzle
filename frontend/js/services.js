'use strict';

/* Services */

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
})
