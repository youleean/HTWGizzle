'use strict';

/* Services */

htwgApp.value('localStorage', window.localStorage);

angular.module('htwgServices', ['ngResource']).
    factory('Course', function($resource){
  return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/lectures/:courseID/:semester', {}, {
    queryAll: {method:'GET', isArray:false, cache : true},
    querySingle: {method: "GET", isArray: false, cache : true}
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
            updateCourseID: undefined,
            updateCourseName: undefined
        };

        $rootScope.$watch(function() { return user; }, function() {
            localStorage[LOCAL_STORAGE_ID] = JSON.stringify(user);
        }, true);

        return user;
    }).factory('Schedule', function($rootScope, localStorage) {

        var LOCAL_STORAGE_ID = 'schedule',
            schedulestring = localStorage[LOCAL_STORAGE_ID];

        var schedule = schedulestring ? JSON.parse(schedulestring) : {
            schedule: undefined
        };

        $rootScope.$watch(function() { return schedule; }, function() {
            localStorage[LOCAL_STORAGE_ID] = JSON.stringify(schedule);
        }, true);

        return schedule;
    }).factory('Mensa', function($rootScope, localStorage) {

        var LOCAL_STORAGE_ID = 'mensa',
            mu = localStorage[LOCAL_STORAGE_ID];

        var mensa = mu ? JSON.parse(mu) : {
            schedule: undefined
        };

        $rootScope.$watch(function() { return mensa; }, function() {
            localStorage[LOCAL_STORAGE_ID] = JSON.stringify(mensa);
        }, true);

        return mensa;
    }).factory('CoreData', function($rootScope, localStorage) {

        var LOCAL_STORAGE_ID = 'coredata',
            corestring = localStorage[LOCAL_STORAGE_ID];

        var CoreData = corestring ? JSON.parse(corestring) : {
            courses: undefined,
            persons: undefined,
            rooms: undefined,
            age: undefined
        };

        $rootScope.$watch(function() { return CoreData; }, function() {
            localStorage[LOCAL_STORAGE_ID] = JSON.stringify(CoreData);
        }, true);

        return CoreData;
    }).factory('News', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/news', {}, {
            query: {method:'GET', isArray:false, cache : true}
        });
}).factory('Room', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/rooms/:roomID', {}, {
            queryAllRooms: {method:'GET', isArray:false, cache: true},
            queryOneRoom:{method:'GET', isArray:true, cache:true}
        })
    }).factory('Person', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/persons/:personID', {}, {
            queryOne: {method:'GET', isArray:false, cache: true}
        })
    }).factory('MensaCall', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/mensa/:date', {}, {
            query: {method:'GET', isArray:false, cache: true}
        })
    }).factory('Lecture', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/lecture/:lectureID', {}, {
            querySingle:{method:'GET', isArray:false, cache:true}
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
    }).factory('Lectures', function($rootScope, localStorage) {

        var LOCAL_STORAGE_ID = 'lectures',
            lectureString = localStorage[LOCAL_STORAGE_ID];

        var lectures = lectureString ? JSON.parse(lectureString) : {
            lectures: undefined
        };

        $rootScope.$watch(function() { return lectures; }, function() {
            localStorage[LOCAL_STORAGE_ID] = JSON.stringify(lectures);
        }, true);

        return lectures;
        //http://uc-projects.in.htwg-konstanz.de/htwgapp/fetchmessage/jusudend/b444ac06613fc8d63795be9ad0beaf55011936ac/2013-01-01%2012:12:12
    }).factory('FetchMessage', function($resource){
        return $resource('http://uc-projects.in.htwg-konstanz.de/htwgapp/fetchmessage/:nick/:hashedpw/:timestamp', {}, {
            fetchAllMessages: {method:'GET', isArray:false, cache: true}
        })
    }).factory('Date', function($rootScope, localStorage) {

        var MyDate = new Date();
        var MyDateString = MyDate.getFullYear() + '-'
            + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
            + ('0' + MyDate.getDate()).slice(-2);

        return MyDateString;
        //http://uc-projects.in.htwg-konstanz.de/htwgapp/fetchmessage/jusudend/b444ac06613fc8d63795be9ad0beaf55011936ac/2013-01-01%2012:12:12
    })
