'use strict';

function BaseCtrl($scope, $http, $location, User, CoreData, Mensa, MensaCall, Date) {
   if(CoreData.courses == undefined){
       $http({
           method : 'GET',
           url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/coredata'
       }).success(function(data, status, headers, config) {
            CoreData.courses = data.courses;
            CoreData.rooms = data.rooms;
            CoreData.persons = data.persons;
            CoreData.departments = data.departments;
           })
   }

   Mensa.food = MensaCall.query({date: Date});
   if(User.userID==undefined){
		$location.path("/login");
	}else{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user.courseID == "0" && user.role != "2"){
			$location.path("/updateCourse");
		}else{
			$location.path("/dashboard");
		}
	}
}

function LoginCtrl($scope, $http, $location, User, Lectures){

		$scope.user = {};
		$scope.error = {};

	    $scope.submitLogin = function() {
            var pw = $scope.user.pw;
	        $http({
	            method : 'POST',
	            url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/user',
	            data : $scope.user
	        }).success(function(data, status, headers, config) {
		    	$scope.dbResponse = data;
		    	console.log(JSON.stringify(data));
		    	if(data.error != undefined){
		    		$scope.error = data.error;
		    	}
		    	if(data.user != null){
		    		User.userID = data.user.userID;
				    User.courseID = data.user.courseID;
				    User.roleID = data.user.roleID;
				    User.nick = data.user.nick;
				    User.fullName = data.user.fullName;
				    User.hashPw = data.user.hashPw;
				    User.semester = data.user.semester;
                    User.pw = pw;

		    	}
                    if(data.lectures != null){
                        Lectures.lectures = data.lectures;

                    }

                if(User.courseID != undefined){
                    $location.path("/dashboard");
                }else{
                    $location.path("/updateCourse");
                }
	  		})
	    }
}

function DashboardCtrl($scope, Course, Weather, News, Mensa, Schedule, User, Date) {
   //$scope.courses = Course.queryAll();
    if(Schedule.schedule == undefined){
        Schedule.schedule = Course.querySingle({courseID: User.courseID, semester: User.semester});
    }
   //$scope.date = Date;
   $scope.mensa = Mensa.food.mensa[Date];
   $scope.weatherInfo = Weather.query();
   $scope.news = News.query();
}

function updateCourseCtrl($scope, CoreData, $location, User) {
    console.log(CoreData.courses);
    console.log(User);
   $scope.courses = CoreData.courses;
   $scope.user = User;

   $scope.selectCourse = function(courseID, courseName) {
   	User.updateCourseID=courseID;
    User.updateCourseName=courseName;
   	$location.path("/updateSemester");
   }

}

function updateSemesterCtrl($scope, Course, $location, User) {

   $scope.selectSemester = function(semester) {
   	User.updateSemester=semester;
   	$location.path("/updateProfile");
   }
}

function updateProfileCtrl($scope, Course, $location, User, $http, Schedule) {
	$scope.user = User;

   $scope.updateProfile = function() {
   	var updateData = {
   		user: User.nick,
   		pw: User.hashPw,
   		courseID: User.updateCourseID,
   		semester: User.updateSemester
   	}

   	//console.log(JSON.stringify(updateData));
   	$http({
	            method : 'POST',
	            url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/user/update',
	            data : JSON.stringify(updateData)
	        }).success(function(data, status, headers, config) {
                    User.userID = data.user.userID;
                    User.courseID = data.user.courseID;
                    User.roleID = data.user.roleID;
                    User.nick = data.user.nick;
                    User.fullName = data.user.fullName;
                    User.hashPw = data.user.hashPw;
                    User.semester = data.user.semester;
                    //var test = Course.querySingle({courseID: User.updateCourseID, semester: User.updateSemester});


		    		$location.path("/dashboard");
		    	
	  		})
	    }
}

function RoomListCtrl($scope, CoreData, $location) {
    $scope.roomList = CoreData.rooms;
    //console.log($scope.roomList);

    $scope.showRoom = function(roomID) {
        $location.path("/room/detail/" + roomID);
    }
}

function RoomDetailCtrl($scope, Room, $routeParams) {
       $scope.schedule = Room.queryOneRoom({roomID: $routeParams.id});
}


function ScheduleCtrl($scope, Course, $routeParams, Schedule, $location) {
    $scope.schedule = Course.querySingle({courseID: $routeParams.courseID, semester: $routeParams.semester});
    $scope.myschedule = Schedule.schedule;

    var KWDatum = new Date();
    var DonnerstagDat = new Date(KWDatum.getTime() + (3-((KWDatum.getDay()+6) % 7)) * 86400000);
    var KWJahr = DonnerstagDat.getFullYear();
    var DonnerstagKW = new Date(new Date(KWJahr,0,4).getTime() + (3-((new Date(KWJahr,0,4).getDay()+6) % 7)) * 86400000);
    var KW = Math.floor(1.5 + (DonnerstagDat.getTime() - DonnerstagKW.getTime()) / 86400000/7);

    $scope.kalenderwoche = KW;

    $scope.displayDay = function(daynum) {
            switch (daynum) {
                case "1":
                    return "Montag";
                    break;
                case "2":
                    return "Dienstag";
                    break;
                case "3":
                    return "Mittwoch";
                    break;
                case "4":
                    return "Donnerstag";
                    break;
                case "5":
                    return "Freitag";
                    break;
                case "6":
                    return "Samstag";
                    break;
                default:
                    return "Fehler...oh, oh...";
                    break;
            }
    }

    $scope.showLecture = function(lectureID) {
        $location.path("/lectures/detail/" + lectureID);
    }
}

function LectureCtrl($scope, Course, $routeParams, Lecture) {
    $scope.lecture = Lecture.querySingle({lectureID: $routeParams.lectureID});
}


function MessageCtrl($scope, $http, FetchMessage, Message, $routeParams, User, $location) {

    //User.nick = "jusudend";
    //User.hashPw = "b444ac06613fc8d63795be9ad0beaf55011936ac";
    var timestamp = "2013-01-01 12:12:12";
/*
    $scope.showMessages = FetchMessage.fetchAllMessages({nick:User.nick, hashedpw: User.hashPw, timestamp: timestamp});
    Message.n = $scope.showMessages;
    localStorage.setItem('hallo', 'key');
    console.log(Message.message);


*/

    $scope.showMessage = function(lectureID){
        $location.path("/lmessages/detail/" + lectureID);
    }

    $scope.newMsg = function(){
        $location.path("/message/new");
    }

        var data = {userNick: User.nick,hashedPW: User.hashPw ,timestamp:"2013-01-01 12:12:12"};
            $http({
                url: 'http://uc-projects.in.htwg-konstanz.de/htwgapp/message/fetch',
                method: "POST",
                data: data

            }).success(function(data) {
                    //$scope.showMessages = data;
                    //console.log(data);
                    var typeMapKlausur = {};
                    var typeMapSchein = {};
                    var typeMapTutorium = {};
                    var typeMapLabor = {};
                    var typeMapVorlesung = {};
                    var i = null;
                    for (i = 0; data.message.length > i; i += 1) {
                        if(data.message[i].type === "Schein")
                            typeMapSchein[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Klausur")
                            typeMapKlausur[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Tutorium")
                            typeMapTutorium[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Labor")
                            typeMapLabor[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Vorlesung")
                            typeMapVorlesung[data.message[i].type] = data.message[i];
                        Message.message = data.message[0];
                        /*localStorage.setItem('message ' + i, ['{"msgID": ' + data.message[i].msgID, ',"publisher": ' + data.message[i].fullName,
                            ',"type": ' + data.message[i].type,  ',"eventDate": ' + data.message[i].eventDate,
                            ',"content": ' + data.message[i].content,  ',"lectureID": ' + data.message[i].lectureID, ',"timestamp": ' + data.message[i].timestamp + '}']);*/

                    }
                    $scope.showKlausur = typeMapKlausur;
                    $scope.showSchein = typeMapSchein;
                    $scope.showTutorium = typeMapTutorium;
                    $scope.showLabor = typeMapLabor;
                    $scope.showVorlesung = typeMapVorlesung;
                    console.log($scope.showKlausur);
                    if(data.error != undefined){
                        $scope.error = data.error;
                    }

                });

      // $scope.showMessages = $scope.fetchMessages();
      // console.log($scope.showMessages);

}

function MessageDetailCtrl($scope, $routeParams) {
    console.log(JSON.parse(localStorage.getItem("message "+$routeParams.id)));
    //$scope.message = JSON.parse(localStorage.getItem("message "+$routeParams.id));
}

function NewMessageCtrl($scope, User, $http, Lectures) {

    $scope.lectures = Lectures.lectures;
    $scope.sendMessage = function(){
        var data = {
            courseID: User.courseID,
            userNick: User.nick,
            userID: User.userID,
            hashedPW: User.hashPw,
            lectureID: $scope.input.lectureID,
            msgTypeID: $scope.input.art,
            eventDate: $scope.input.date + " " +  $scope.input.time + ":00",
            content: $scope.input.content,
            roleID: User.roleID,
            lsf: false

        }
        $http({
            method : 'POST',
            url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/message/new',
            data : data
        }).success(function(data, status, headers, config) {
               $scope.success = '<li>Nachricht verschickt!</li>';
                $location.path("/dashboard");

            })
        //console.log(data);
    }
}


function SearchCtrl($scope,CoreData, $location) {
    $scope.rooms = CoreData.rooms;
    $scope.courses = CoreData.courses;
    $scope.persons = CoreData.persons;


    $scope.showRoom = function(roomID) {

        $location.path("/room/detail/" + roomID);
    }

    $scope.selectCourse = function(courseID, courseName) {
        $location.path("/lectures/detail/" + courseID);
    }
}

function PersonListCtrl($scope, CoreData, $location) {
    $scope.persons = CoreData.persons;
    $scope.departments = CoreData.departments;
    $scope.showPerson = function(personID){
        $location.path("/person/detail/" + personID)
    }
}

function PersonDetailCtrl($scope, Person, $routeParams) {
    $scope.person = Person.queryOne({personID: $routeParams.id});
}

function MensaCtrl($scope, Date, Mensa) {
    $scope.date = Date;
    console.log(Mensa['food']['mensa'][Date]);
    $scope.mensa = Mensa.food.mensa;
}


function QuotaCtrl($scope, User, $http) {
    var POSTdata = {
        user: User.nick,
        pw: User.pw
    }



    $http({
        method : 'POST',
        url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/quota',
        data : JSON.stringify(POSTdata)
    }).success(function(data, status, headers, config) {
           console.log(data);
            $scope.data = data;
        })

}

   /* var nachricht = {
        titel: "bla",
        content: "affenkacke",
        absender: "julian Sudendorf",
        ID: "25"
    }
    Message.messageKey = nachricht;
*/



/*
 function CoursesCtrl($scope, Course) {
 $scope.coursesList = Course.query();
 }




function RoomCtrl($scope, Room) {
    $scope.room = Room.queryOneRoom();
}



function LibraryCtrl($scope) {
  
}



function MoodleCtrl($scope) {
  
}



function SettingsCtrl($scope) {
  
}

function MessageCtrl($scope, $fetchMessage) {
    $scope.messageList = $fetchMessage.fetch();
}

*/