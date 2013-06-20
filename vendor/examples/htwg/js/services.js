'use strict';

/* Services */

angular.module('htwgServices', ['ngResource']).
    factory('Course', function($resource){
  return $resource('http://localhost/slimexperiment/courses/:courseID/:semester', {}, {
    query: {method:'GET', isArray:true, cache : true},
    testabc: {method: "GET", params: {courseID: "4510",semester: "6"}, isArray: true, cache : true}
  });
});
