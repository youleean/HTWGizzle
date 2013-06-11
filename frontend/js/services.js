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
}).factory('News', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/news', {}, {
  //return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/news', {}, {
    query:{method:'GET', isArray:false, cache:true}
    });
}).factory('Room', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/rooms', {}, {
            queryAllRooms:{method:'GET', isArray:false, cache:true},
            queryOneRoom:{method:'GET', params: {roomID: "12572"}, isArray:true, cache:true}
        });
}).factory('fetchMessage', function($resource) {
       return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/message/fetch/:userNick/:hashedPW/:timestamp',
            {userNick:'jusudend', hashedPW: 'b444ac06613fc8d63795be9ad0beaf55011936ac', timestamp: "2013-01-01 12:12:12"}, {
            fetch: {method: 'POST'}});
}).factory('newMessage', function($resource) {
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/message/fetch/:userNick/:hashedPW/:timestamp',
            {userNick:'jusudend', hashedPW: 'b444ac06613fc8d63795be9ad0beaf55011936ac', timestamp: "2013-01-01 12:12:12"}, {
                fetch: {method: 'POST'}});
}).factory('deleteMessage', function($resource) {
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/message/fetch/:userNick/:hashedPW/:timestamp',
            {userNick:'jusudend', hashedPW: 'b444ac06613fc8d63795be9ad0beaf55011936ac', timestamp: "2013-01-01 12:12:12"}, {
                fetch: {method: 'POST'}});
}).factory('updateMessage', function($resource) {
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/message/fetch/:userNick/:hashedPW/:timestamp',
            {userNick:'jusudend', hashedPW: 'b444ac06613fc8d63795be9ad0beaf55011936ac', timestamp: "2013-01-01 12:12:12"}, {
                fetch: {method: 'POST'}});
})
