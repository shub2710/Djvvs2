angular.module('app.controllers', [])

    .controller('profileCtrl', function($scope, $stateParams, $rootScope, Serviceapi, $ionicLoading) {

        $scope.editaddress = 0;
        $scope.newaddress = {};

        $scope.editaddressofstudent = function() {
            $scope.editaddress = 1;
        }

        $scope.updateaddress = function(newaddress) {
            if ((newaddress != null) && (newaddress != undefined) && (newaddress != "")) {

                console.log("new adress", newaddress);
                console.log("Updating the addres of student");

                var editaddressdata = {
                    id: $rootScope.parentstudentdetail.student_id,
                    address: newaddress
                }
                Serviceapi.updateaddress(editaddressdata).then(function(result) {
                    if (result.status == 'success') {
                        console.log(result);
                        $scope.editaddress = 0;
                        $rootScope.parentstudentdetail.student_address = newaddress;
                    } else {
                        $ionicLoading.show({
                            template: 'Could not update address,Try Later',
                            duration: 3000
                        });
                    }

                })
            } else {
                $ionicLoading.show({
                    template: 'Cannot be Empty',
                    duration: 3000
                });
            }

        }

        $scope.canceladdress = function() {
            $scope.editaddress = 0;
            $scope.newaddress = {};

        }
    }) // Controller for parent profile page

    .controller('timeTableCtrl', function($scope, $stateParams, Serviceapi, $rootScope, $ionicLoading) {


        $scope.gettimetableforthisuser = function() { // this function will be called as soon as the timetable.html loads for parent

            var timetabledata = {
                type: "currentusertimetable",
                timetableid: $rootScope.parentstudentclassdetail.timetable_id // giving timetable id, stored in rootscope variable in login ctrl for parent
            }

            console.log("sending this data to fetch current user timetable", timetabledata);

            Serviceapi.gettimetable(timetabledata).then(function(result) { // call service to fetch current parents student timetable

                if (result.status == "success") {

                    $scope.data1 = result.response; // this variable is used in timeTable.html file to display the timen table
                    console.log("found time table for this student ", result);
                } else {
                    console.log(" No time table found for this student class");
                    $ionicLoading.show({
                        template: 'No Timetable Found,contact admin',
                        duration: 3000
                    });
                }


            })
        }();

    })

    .controller('attendanceCtrl', function($scope, $stateParams, Serviceapi, $rootScope, $filter) {


        $scope.events2 = [];
        $scope.showdivattendance = 0;
        $scope.getstudentattendance = function() {


            //calling service to get current logined in parent student attendance from db by passing student id , and his class id
            Serviceapi.getstudentattendance($rootScope.parentstudentdetail.student_id, $rootScope.parentstudentdetail.class_id).then(function(result) {
                console.log(result);
                if (result.status == 'success') {


                    $scope.attendance = result.response; // store the response the in another variable

                    // for loop to check if the student is present/absent by checking the 0 and 1 values
                    for (var i = 0; i < $scope.attendance.length; i++) {

                        if ($scope.attendance[i].attendancemorning == 1) {
                            if ($scope.attendance[i].attendanceafternoon == 1) {
                                $scope.attendanceforstudent = "Full day present";

                            } else {
                                $scope.attendanceforstudent = "Present in Morning";


                            }
                        } else {
                            if ($scope.attendance[i].attendanceafternoon == 1) {
                                $scope.attendanceforstudent = "Present in afternoon";


                            } else {
                                $scope.attendanceforstudent = "Full day absent";


                            }
                        }
                        $scope.events2.push({ // pushing into the events array to display it on the calender as soon as it loads
                            title: $scope.attendanceforstudent,
                            startTime: $scope.attendance[i].dateofattendance,
                            endTime: $scope.attendance[i].dateofattendance,
                            allDay: false
                        })
                    }
                    $scope.showcalender = 1;
                }

            })
        };


        $scope.showcalender = 0;
        $scope.calendar = {};

        $scope.changeMode = function(mode) {
            $scope.calendar.mode = mode;
        };

        $scope.loadEvents = function() { //events will be loaded here and calling getstudentattendance function to fetch the student attendance
            $scope.getstudentattendance();
            console.log($scope.events2);
            $scope.calendar.eventSource = $scope.events2;
        };

        $scope.onEventSelected = function(events2) {


            console.log('Event selected:' + event4.startTime + '-' + event4.endTime + ',' + event4.title);
        };

        $scope.onViewTitleChanged = function(title) {
            $scope.viewTitle = title;
        };

        $scope.today = function() {
            $scope.calendar.currentDate = ["2017-08-10"];
        };

        $scope.isToday = function() {
            var today = new Date(),
                currentCalendarDate = new Date($scope.calendar.currentDate);

            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return today.getTime() === currentCalendarDate.getTime();
        };

        $scope.onTimeSelected = function(selectedTime, events, disabled) {
            console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0) + ', disabled: ' + events.title);
        };
        var date = new Date();



        $scope.loadEvents();


        $scope.onEventSelected = function(event) {
            console.log(event.title);
        };

        $scope.selectedDate;
        $scope.show1 = function(date1) {
            console.log(date1);
        }
        $scope.onViewTitleChanged = function(title) {
            $scope.viewTitle = title;
        };

    })

    .controller('menuCtrl', function($scope, $stateParams, $state, $timeout, $ionicLoading, $ionicHistory, $rootScope) {

        //Clear the Ionic history and cahe for the Parents menu and go to the login page .
        $scope.logout = function() { // make all the variables to null for fresh login again
            $rootScope.parentstudentdetail = {};
            $rootScope.parentstudentclassdetail = {};


            $state.go('login');

            $timeout(function() {
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go('login');
            }, 30);

        }


        $scope.changetocalender = function() { // function called in menu.html in parent view
            $state.go('menu.calenderGallery');

        }
        $scope.changetohome = function() { // function called in menu.html in parent view
            $state.go('menu.circlemenu');

        }
        $scope.changetoprofile = function() { // function called in menu.html in parent view
            $state.go('menu.profile');

        }
        $scope.changetoattendance = function() { // function called in menu.html in parent view
            $state.go('menu.attendance');

        }
        $scope.changetonotificatinos = function() { // function called in menu.html in parent view
            $state.go('menu.notifications');

        }
        $scope.changetotimetable = function() { // function called in menu.html in parent view
            $state.go('menu.timeTable');

        }
        $scope.changetoexams = function() { // function called in menu.html in parent view
            $state.go('menu.exams');

        }

    })

    .controller('examsCtrl', function($scope, $stateParams, $rootScope, Serviceapi, $filter) { // controller for parent exams view

        $scope.showresult = 0;
        $scope.checkresultforstu = function(examid, subjectname) { // function called in exams.html file on clicking check result button
            var resultdata = {
                studentid: $rootScope.parentstudentdetail.student_id,
                classid: $rootScope.parentstudentdetail.class_id,
                examid2: examid,
                subjectname2: subjectname
            }

            console.log("checking result for these values", resultdata);
            Serviceapi.checkresult(resultdata).then(function(data) { // service called for checking result for the particular student, exam, class id  and subject name
                console.log(data);
                if (data.status == 'success') {
                    $scope.showresult = 1; // show result DIV in html file by using using ng-if in html file
                    $scope.resultarray = data.response;
                } else {
                    $scope.showresult = 0;

                }
            })
        }

        $scope.hideresult = function() { // function called when clicked on hide me for result
            $scope.showresult = 0;
        }

        $scope.noexamsyet = false;



        $scope.fetchexams = function() { // function calls service to get all the exams for the particular student with the particular class id
            Serviceapi.fetchexamsforstudent($rootScope.parentstudentdetail.class_id, $rootScope.parentstudentdetail.student_id).then(function(result) {
                console.log(result);
                if (result.status == 'success') {
                    $scope.studentexams = result.response;
                    $scope.noexamsyet = false;
                } else {
                    $scope.noexamsyet = true;
                }

            })
        }(); // loads as soon as the controller loads

        $scope.currentdate = $filter('date')(new Date(), "yyyy-MM-dd"); // get current date and store in this variable


    })

    .controller('notificationsCtrl', function($scope, $stateParams, Serviceapi, $rootScope, $ionicPopup) {

        $scope.nonotificationsyet = false; // boolean variable using in html fle
        $scope.fetchnotificationsforstudent = function() { // fetch notifications for the particular student with particular class id
            Serviceapi.fetchnotificationsforstu($rootScope.parentstudentdetail.student_id, $rootScope.parentstudentdetail.class_id).then(function(result) {
                console.log(result);
                if (result.status == 'success') {
                    $scope.nonotificationsyet = false;
                    $scope.studentnotifications = result.response;
                } else {
                    $scope.nonotificationsyet = true;
                }


            })
        }; // loads as soon as the controller loads

        $scope.fetchnotificationsforstudent();

        $scope.marknotificationasread = function(id) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Marking Notification as read?',
                template: 'Are you sure you want to mark this as read?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    console.log("marking notification as read ");
                    Serviceapi.marknotificationasread(id).then(function(result) {
                        if (result.status == 'Success') {
                            $scope.studentnotifications = [];
                            $scope.fetchnotificationsforstudent();
                        } else {
                            console.log("Not Marked Properly");
                        }
                        console.log(result);
                    })

                } else {
                    console.log('You are not sure');
                }
            });




        }

    })
    .controller('circlemenuCtrl', function($scope, $stateParams, $state, $location) { //parent dashboard(with circles ) controller
        // fucntion will be called when clicked on the image in the dashboard
        $scope.studentprofile = function() {
            $state.go('menu.profile');
        }
        $scope.studentschedule = function() {
            $state.go('menu.timeTable');
        }
        $scope.studentattendance = function() {
            $state.go('menu.attendance');
        }
        $scope.studentexams = function() {
            $state.go('menu.exams');
        }
        $scope.studentnotifications = function() {
            $state.go('menu.notifications');
        }
        $scope.eventcalender = function() {
            $state.go('menu.calenderGallery');
        }

    })

    .controller('calenderGalleryCtrl', function($scope, Serviceapi, $rootScope) {

        $scope.noeventsyet = 0;
        $scope.fetchcurrentevents = function() { // fetch all events/gallery from the db

            Serviceapi.fetchcurrentevents().then(function(response1) {
                console.log(response1);
                if (response1.status == 'success') {
                    $scope.noeventsyet = 0;
                    $scope.eventsarray = response1.response;
                } else {
                    $scope.noeventsyet = 1;
                }

            })
        }(); // loads as soon as the controller loads




    })

    .controller('loginCtrl', function($scope, $state, $cordovaToast, Serviceapi, $rootScope, $ionicPopup) {

        $scope.user = {};


        $scope.teacheruser = {};



        $scope.parentlogin = 0;

        $scope.teacherlogin = 0;

        $scope.logintype = 1;

        $scope.loginasparent = function() {
            $scope.logintype = 0;
            $scope.teacherlogin = 0;
            $scope.parentlogin = 1;
        }

        $scope.loginasteacher = function() {
            $scope.parentlogin = 0;
            $scope.logintype = 0;
            $scope.teacherlogin = 1;
        }
        $scope.changelogin = function() {
            $scope.logintype = 1;
            $scope.teacherlogin = 0;
            $scope.parentlogin = 0;
        }
        // login for parent ---------------------------------------------------------------------------------------------------------
        $scope.Parentlogin = function(name, password) {


            if (($scope.user.username1 == null) && ($scope.user.password == null) || ($scope.user.username1 == undefined) && ($scope.user.password == undefined)) {
                console.log("Enter Proper fields")
                var alertPopup = $ionicPopup.alert({
                    title: 'Login Failed',
                    template: 'Email and Password cannot be Empty.'
                });
                alertPopup.then(function(res) {
                    console.log('Clicked on Popup "OK" ');
                });
            } else {
                //Verify the details from the database
                var senddata = {
                    type: "parentlogin",
                    username: $scope.user.username1,
                    password: $scope.user.password
                };

                Serviceapi.parentlogin(senddata).then(function(data) {
                        var result = data;
                        console.log(result);
                        if (result.status == "success") {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Login success',
                                template: 'Success'
                            });
                            alertPopup.then(function(res) {
                                console.log('Clicked on Popup "OK" ');
                            });
                            $rootScope.parentstudentdetail = result.response[0];
                            $rootScope.parentstudentclassdetail = result.response[1];
                            console.log($rootScope.parentstudentdetail);
                            console.log($rootScope.parentstudentclassdetail);
                            $state.go('menu.circlemenu'); //go to the dashboard page
                        } else {


                            var alertPopup = $ionicPopup.alert({
                                title: 'Problem!!',
                                template: result.message
                            });
                            alertPopup.then(function(res) {
                                console.log('Clicked on Popup "OK" ');
                            });
                        }

                    },
                    function(data) {
                        console.log("failed");
                    }
                ); //Closing tag of .then function


            }
            console.log(senddata);
        }
        //---------------------------------------------------------------------------------------------------------------------------------------

        $scope.Teacherlogin = function(email, password) {




            if (($scope.teacheruser.email == null) && ($scope.teacheruser.password == null) || ($scope.teacheruser.email == undefined) && ($scope.teacheruser.password == undefined)) {
                console.log("Enter Proper fields")
                var alertPopup = $ionicPopup.alert({
                    title: 'Login Failed',
                    template: 'Email and Password cannot be Empty.'
                });
                alertPopup.then(function(res) {
                    console.log('Clicked on Popup "OK" ');
                });
            } else {
                //Verify the details from the database
                var teacherdata = {
                    type: 'teacherlogin',
                    username: email,
                    password1: password
                }

                Serviceapi.teacherlogin(teacherdata).then(function(data) {
                        var result = data;
                        console.log(result);
                        if (result.status == "success") {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Login success',
                                template: 'Success'
                            });
                            alertPopup.then(function(res) {
                                console.log('Clicked on Popup "OK" ');
                            });
                            $rootScope.teacherdetail = result.response[0];
                            $rootScope.teacherteachestheseclass = result.response[0].class_id;
                            console.log($rootScope.teacherdetail);
                            console.log($rootScope.teacherteachestheseclass);

                            $state.go('Tmenu.home'); //go to the dashboard page
                        } else {


                            var alertPopup = $ionicPopup.alert({
                                title: 'Problem!!',
                                template: result.message
                            });
                            alertPopup.then(function(res) {
                                console.log('Clicked on Popup "OK" ');
                            });
                        }

                    },
                    function(data) {
                        console.log("failed");
                    }
                ); //Closing tag of .then function


            }

        }

        //---------------------------------------------------------------------------------------------------

        $rootScope.Authenticateuserdata = {
            'student_ID': '',
            'student_name': '',
            'student_gender': '',
            'student_dob': '',
            'student_address': '',
            'student_fathername': '',
            'student_mothername': '',
            'student_bloodgrp': '',
            'student_profilepic': '',
            'student_class': '',
            'student_section': '',
            'student_timetable_id': ''
        }

        $scope.showerror = false;
        //Login for Parents
        $scope.Plogin = function(nameofuser, password1) {
            $state.go('menu.circlemenu');

            if (typeof nameofuser == 'undefined' && typeof password == 'undefined') {
                console.log("both are undefined");
                $scope.showerror = true;
            } else {
                $scope.showerror = false;
                var data = {
                    type: 'authenticateuser',
                    username: nameofuser,
                    password: password1,
                }

                //Call service authenticatedata and function Authenticateuser to authenticate the entered user details and route to home page if success
                authenticatedata.Authenticateuser(data).success(function(Succresponse) {
                    console.log(Succresponse);
                    if (Succresponse.status == "success") {

                        $rootScope.Authenticateuserdata.student_ID = Succresponse.response[0].student_id;
                        $rootScope.Authenticateuserdata.student_name = Succresponse.response[0].student_name;
                        $rootScope.Authenticateuserdata.student_gender = Succresponse.response[0].student_gender;
                        $rootScope.Authenticateuserdata.student_dob = Succresponse.response[0].student_dob;
                        $rootScope.Authenticateuserdata.student_address = Succresponse.response[0].student_address;
                        $rootScope.Authenticateuserdata.student_fathername = Succresponse.response[0].student_father_name;
                        $rootScope.Authenticateuserdata.student_mothername = Succresponse.response[0].student_mother_name;
                        $rootScope.Authenticateuserdata.student_bloodgrp = Succresponse.response[0].student_blood_group;
                        $rootScope.Authenticateuserdata.student_class = Succresponse.response[1].class;
                        $rootScope.Authenticateuserdata.student_profilepic = Succresponse.response[0].student_profile_picture;
                        $rootScope.Authenticateuserdata.student_section = Succresponse.response[1].class_section;
                        $rootScope.Authenticateuserdata.student_timetable_id = Succresponse.response[1].timetable_id;
                        console.log("Success,User data saved", $rootScope.Authenticateuserdata);
                        //  $state.go('menu.circlemenu');
                    }
                });


                $cordovaToast.show('Login Success', 'long', 'bottom').then(function(success) {
                    console.log("The toast was shown");
                }, function(error) {
                    console.log("The toast was not shown due to " + error);
                });

            }

        };

        //login for Teachers
        $scope.Tlogin = function() {

            $state.go('Tmenu.home');

            $cordovaToast.show('Login Success', 'long', 'bottom').then(function(success) {
                console.log("The toast was shown");
            }, function(error) {
                console.log("The toast was not shown due to " + error);
            });

        };


        $scope.submit = function(user1, password) {

            var data = {
                username: user1,
                pass: password,
                phone: "8827822"
            }

            console.log("This data is being send to php api", data);
            authenticatedata.getdata(data);
        }

    })


    //---------------------------------------------Teachers Controller-------------------------------------------------------------------

    .controller('homeCtrl', function($scope, $stateParams, $state) {


        $scope.changetoTclassstudentlist = function() {

            $state.go('Tmenu.classStudentList');
        }
        $scope.changetoTclassschedule = function() {
            $state.go('Tmenu.classSchedule')
        }
        $scope.changetoTclassattendance = function() {
            $state.go('Tmenu.classAttendance')
        }

        $scope.changetoTstudentexams = function() {
            $state.go('Tmenu.studentExams2');
        }

        $scope.changetoTnotifications = function() {
            $state.go('Tmenu.notifications');
        }

        $scope.changetoTeventcalender = function() {
            $state.go('Tmenu.eventCalendar');
        }

        $scope.changetoTsettings = function() {
            $state.go('Tmenu.settings');
        }

    })

    .controller('classStudentListCtrl', function($scope, $stateParams, $rootScope, Serviceapi) {


        $scope.classes = $rootScope.teacherteachestheseclass;
        console.log($rootScope.teacherteachestheseclass);

        $scope.classselected = {};

        $scope.classname = [];

        $scope.fetchstudentlist = function() {

            console.log("we need these class student list", $scope.classselected);

            var classdetail = $scope.classselected;

            Serviceapi.fetchstudentlist(classdetail).then(function(data) {
                console.log(data);
                $scope.studentdetails = data.response;
            })

        }

    })

    .controller('classScheduleCtrl', function($scope, $stateParams, $rootScope, Serviceapi, $ionicLoading) {



        $scope.classes2 = $rootScope.teacherteachestheseclass; // show classes in dropdown menu in html page fot showing attendance
        console.log($rootScope.teacherteachestheseclass);

        //---------------------fetch current teacher timetable db as soon the db loads--------------------------------------

        var timetableidofteacher = $rootScope.teacherdetail.teachertimetableid;

        console.log("Timetable id of current teacher", timetableidofteacher);

        var timetabledata = {
            type: "currentusertimetable",
            timetableid: timetableidofteacher
        }

        console.log("sending this data to fetch current user timetable", timetabledata);

        Serviceapi.gettimetable(timetabledata).then(function(result) {

            if (result.status == "success") {
                $scope.tableresponse = result.response; // this variable is used html file to display the time table
                console.log("found time table for this student ", result);
            } else {
                console.log(" No time table found for this teacher ");
                $ionicLoading.show({
                    template: 'Your Timetable not found,contact admin',
                    duration: 3000
                });
            }


        })

        $scope.showtimetable = false;
        //-------------------------------------closing the code-----------------------------------------------------------------------------

        $scope.classselected2 = {};

        $scope.specificclasstimetable = function() {

            var classdata = $scope.classselected2;
            console.log("Selected this class and section to get specific timetable ", $scope.classselected2);

            Serviceapi.getspecificclasstimetable(classdata).then(function(response1) {
                console.log(response1);
                if (response1.status == "success") {
                    $scope.classtimetable = response1.response;
                    $scope.showtimetable = true;

                } else {
                    $scope.showtimetable = false;
                    $ionicLoading.show({
                        template: 'Your Timetable not found,contact admin',
                        duration: 3000
                    });

                }
            })
        }

    })



    .controller('classAttendanceCtrl', function($scope, $stateParams, $rootScope, Serviceapi, $filter, $ionicLoading) {

        $scope.classes3 = $rootScope.teacherteachestheseclass; // show classes in dropdown menu in html page fot showing attendance
        console.log($rootScope.teacherteachestheseclass);
        $scope.classselected3 = {};

$scope.selectedstudents = [];
        $scope.getstudentlistA = function(date2) {

$scope.selectedstudents.length = 0;
            console.log("we need these class student list", $scope.classselected);
              $scope.classselected3.newdate =   $filter('date')(date2, "yyyy-MM-dd");

            var classdetail = $scope.classselected3;

            Serviceapi.fetchstudentlist(classdetail).then(function(data) {
                console.log(data);
                $scope.studentdetailsforattendance = data.response;
                $scope.attendance2 = data.response1;
            })
        }



        $scope.sessionselection = function(session){

            if($scope.attendance2.length > 0){
              if(session == 'Morning'){
                console.log("morning session");

                $scope.selectedstudents.length = 0;

                for(var i=0;i<$scope.attendance2.length;i++){
                if(  $scope.attendance2[i].morning == '1'){
                  $scope.selectedstudents.push($scope.studentdetailsforattendance[i].studentid);
                }
                }
            }else{
              console.log("afternoon session");
                $scope.selectedstudents.length = 0;
              for(var j=0;j<$scope.attendance2.length;j++){
              if( $scope.attendance2[j].afternoon == '1'){
                $scope.selectedstudents.push($scope.studentdetailsforattendance[j].studentid);
              }
              }
            }
          }
        }






        $scope.check = function() {
            console.log($scope.selectedstudents);
        }
        //------------------------------funciton for updated the attendance , who are stored in $scope.selectedstudens variable , databse of students  should already exists.
        $scope.submitattendance = function() {

            $scope.date = $filter('date')($scope.classselected3.date, "yyyy-MM-dd");

            if (($scope.classselected3.class) && ($scope.classselected3.section) && ($scope.date) && ($scope.classselected3.session)) {
                if ($scope.selectedstudents.length != 0) {


                    if ($scope.classselected3.session == 'Morning') {
                        console.log("updating for morning session");
                        for (var i = 0; i < $scope.selectedstudents.length; i++) {
                            var attendancedata = {
                                classname: $scope.classselected3.class,
                                section: $scope.classselected3.section,
                                date: $scope.date,
                                studentid: $scope.selectedstudents[i]
                            }
                            console.log("dis data is going for attendance update", attendancedata);
                            Serviceapi.updatemorningattendance(attendancedata).then(function(result) {
                                console.log(result);
                            })
                        }
                        $ionicLoading.show({
                            template: 'Updated Morning attendance',
                            duration: 3000
                        });

                    } else {
                        for (var i = 0; i < $scope.selectedstudents.length; i++) {
                            var attendancedata = {
                                classname: $scope.classselected3.class,
                                section: $scope.classselected3.section,
                                date: $scope.date,
                                studentid: $scope.selectedstudents[i]
                            }
                            console.log("dis data is going for attendance update", attendancedata);
                            Serviceapi.updateafternoonattendance(attendancedata).then(function(result) {
                                console.log(result);
                            })
                        }
                        $ionicLoading.show({
                            template: 'Updated afternoon attendance',
                            duration: 3000
                        });
                    }
                } else {
                    $ionicLoading.show({ //no members selected , so just sso updated
                        template: 'Updated',
                        duration: 3000
                    });
                }


            } else {

                $ionicLoading.show({
                    template: 'Please select all fields',
                    duration: 3000
                });

            }
        }

    })

    .controller('studentExams2Ctrl', function($scope, $stateParams, $ionicModal, $rootScope, $filter, Serviceapi, $ionicLoading, $ionicPopup) {

        //-------------------------------------------------get subjects list that this teacher teacher -------------------------------------
        $scope.getsubjectlist = function() { // call as soon as the controller loads

            Serviceapi.getsubjectlist($rootScope.teacherdetail.teacherid).then(function(data) {
                $scope.subjectlistarray = data.response;
                console.log("array list of subjects logged in teacher teaches", $scope.subjectlistarray);
            })
        }();
        //---------------------------------------------------------------------------------------------------------------------------------
        $scope.classes3 = $rootScope.teacherteachestheseclass; // show classes in dropdown menu in html page fot showing attendance
        console.log("these classes this teacher teaches ", $scope.classes3);
        //-------------------------------------------------------------------------------
        $scope.newexamdetails = {};
        $scope.examsarray = 0;
        //----------------------------------------------------
        $scope.currentdate = $filter('date')(new Date(), "yyyy-MM-dd");

        $scope.noexamsfound = false;
        $scope.fetchallexams = function() {
            Serviceapi.fetchallexams($rootScope.teacherdetail.teacherid).then(function(data2) {
                console.log(data2);
                if (data2.status == "success") {

                    $scope.examsarray = data2.response;
                    $scope.noexamsfound = false;

                    console.log($scope.currentdate);
                    console.log(data2.response[0].examdate);

                    for (var i = 0; i < data2.response.length; i++) {
                        if ($scope.currentdate > data2.response[i].examdate) {

                            console.log("exam date got over ");
                        } else {
                            console.log("exam yet to come ");
                        }
                    }


                } else {
                    $scope.examsarray.length = 0;
                    $scope.noexamsfound = true;
                }
            })
        };

        $scope.fetchallexams(); // fetch exams list as soon as the controller

        //-------------------------------------------------------------------------------------------------------------------------
        // function called when clicked on submit to  create a new exam---------------------------------------
        $scope.createnewexam = function(date, time) {

            if ($scope.newexamdetails.name != null || $scope.newexamdetails.classname != null || $scope.newexamdetails.classsection != null || $scope.newexamdetails.subject != null ||
                date != null || time != null || $scope.newexamdetails.name != undefined || $scope.newexamdetails.classname != undefined || $scope.newexamdetails.classsection != undefined ||
                $scope.newexamdetails.subject != undefined || date != undefined || time != undefined) {



                date = $filter('date')(date, "yyyy-MM-dd");

                time = $filter('date')(time, "HH:mm");

                var newexam = { // variable will be send to create a  new exam to the services
                    examname: $scope.newexamdetails.name,
                    examclass: $scope.newexamdetails.classname,
                    examsection: $scope.newexamdetails.classsection,
                    examsubject: $scope.newexamdetails.subject,
                    examdate: date,
                    examtime: time,
                    creationdate: $filter('date')(new Date(), "yyyy-MM-dd"),
                    createdby: $rootScope.teacherdetail.teacherid

                }
                console.log("newexamdetails", newexam);

                Serviceapi.createnewexam(newexam).then(function(result) { // Calls the service to create a new exam

                    console.log(result);
                })
                $scope.fetchallexams();
            } else {
                $ionicLoading.show({
                    template: 'Enter all fields',
                    duration: 3000
                });
            }

        }

        //----------------------------------------------------------------------------------------------------------

        $scope.showingcheck = function() {
            console.log("i am here");
        }

        $scope.deletingexam = function(examid) {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Deleting Exam',
                template: 'Are you sure you want to cancel this exam?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    console.log("Deleteing the exam Now with this id ", examid);
                    Serviceapi.deleteexam(examid).then(function(result3) {
                        console.log(result3);
                        if (result3.status == "success") {
                            $ionicLoading.show({
                                template: 'Exam deleted',
                                duration: 3000
                            });
                            $scope.fetchallexams();
                        } else {
                            $ionicLoading.show({
                                template: result3.message,
                                duration: 3000
                            });
                        }
                    })


                } else {
                    console.log('Not deleted any exam ');
                }
            });

        }

        $ionicModal.fromTemplateUrl('templates/modals/newexam.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.Tnewexammodal = modal;
        });

        $scope.openTnewexamModal = function() {
            $scope.Tnewexammodal.show();
        };
        $scope.closeTnewexamModal = function() {
            $scope.Tnewexammodal.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modals/editexam.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.Teditexammodal = modal;
        });

        $scope.openTeditexamModal = function() {
            $scope.Teditexammodal.show();
        };
        $scope.closeTeditexamModal = function() {
            $scope.Teditexammodal.hide();
        };


        $scope.editexam = function(id,examname,classname,classsection,subjectname,examdate,examtime){
          $scope.currentselectedexam = {
            id2 : id,
            Ename : examname,
            classname2 : classname,
            classsection2 : classsection,
            subjectname2 : subjectname,
            examdate2 : examdate,
            examtime2 : examtime,
          }
          $scope.openTeditexamModal();

          console.log("selected exam details",$scope.currentselectedexam);
        }

        $scope.updateexam = function(time1,date1){
            console.log(date1);
              console.log(time1);
          if(date1 != undefined || date1 != null || time1 != undefined ||  time1 !=null){
            $ionicLoading.show({
                template: 'Updating with new details',
                duration: 3000
            });
             date1 = $filter('date')(date1, "yyyy-MM-dd");

             time1 = $filter('date')(time1, "HH:mm");
             $scope.currentselectedexam.examdate2 = date1;
             $scope.currentselectedexam.examtime2 = time1;
             $scope.currentselectedexam.creationdate =  $filter('date')(new Date(), "yyyy-MM-dd");
             $scope.currentselectedexam.createdby = $rootScope.teacherdetail.teacherid;
             console.log("updating with new values",$scope.currentselectedexam);
                var data = $scope.currentselectedexam;
             Serviceapi.updateexam(data).then(function(result){
                console.log(result);
                if(result.status == 'success'){
                  $scope.fetchallexams();
                }else{
                  $ionicLoading.show({
                      template: 'Could not update,contact admin',
                      duration: 3000
                  });
                }
             })


          }else{
            $ionicLoading.show({
                template: 'Updating with old values',
                duration: 3000
            });
            $scope.currentselectedexam.creationdate =  $filter('date')(new Date(), "yyyy-MM-dd");
            $scope.currentselectedexam.createdby = $rootScope.teacherdetail.teacherid;
            console.log("updating with Old values",$scope.currentselectedexam);
            var data = $scope.currentselectedexam;
            Serviceapi.updateexam(data).then(function(result){
               console.log(result);
               if(result.status == 'success'){
                 $scope.fetchallexams();
               }else{
                 $ionicLoading.show({
                     template: 'Could not update,contact admin',
                     duration: 3000
                 });
               }
            })

          }
        }

    })

    .controller('TnotificationsCtrl', function($scope, $stateParams, $ionicModal, $rootScope, Serviceapi, $filter, $ionicLoading, $ionicPopup) {

        $ionicModal.fromTemplateUrl('templates/modals/Tnewnotification.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.Tcreatenotificationmodal = modal;
        });

        $scope.openTcreatenotificationModal = function() {
            $scope.Tcreatenotificationmodal.show();
        };
        $scope.closeTcreatenotificationModal = function() {
            $scope.Tcreatenotificationmodal.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modals/editnotification.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.Teditnotificationmodal = modal;
        });

        $scope.openTeditnotificationModal = function() {
            $scope.Teditnotificationmodal.show();
        };
        $scope.closeTeditnotificationModal = function() {
            $scope.Teditnotificationmodal.hide();
        };

        $scope.classes4 = $rootScope.teacherteachestheseclass;

        $scope.newnotification = {};
        $scope.classforlist = {};
        $scope.selectedclass = [];
        $scope.selectedstudents = [];
        $scope.showclasses = 0;
        $scope.showclassselection = 0;
        $scope.showstudents = 0;


        $scope.getlist = function() {
            if ($scope.newnotification.sendto == "Class") {
                $scope.classes4 = $rootScope.teacherteachestheseclass;
                $scope.showclasses = 1;
                $scope.showclassselection = 0;
                $scope.showstudents = 0
                console.log($scope.classes4);
            }
            if ($scope.newnotification.sendto == "Student" ) {

                $scope.showclassselection = 1;
                $scope.showclasses = 0;



            }
        }

        $scope.fetchstudentlist = function() {

            console.log("we need these class student list", $scope.classforlist);

            var classdetail2 = $scope.classforlist;

            Serviceapi.fetchstudentlist(classdetail2).then(function(data) {
                console.log(data);
                $scope.studentdetails = data.response;
                $scope.showstudents = 1;
            })

        }

        $scope.editnotification = function(id,name,description,createdon,notificationdate,for1,priority){
          $scope.currrentselectednotification = {
            Nid : id,
            Nname : name,
            Ndescription : description,
            Ncreatedon : createdon,
            Nnotificationdate : notificationdate,
            Nfor : for1,
            Npriority : priority
          }

          $scope.openTeditnotificationModal();

          console.log($scope.currrentselectednotification);
        }

        $scope.updatenotification = function(notificationdate){
          if(notificationdate != undefined || notificationdate != null){
            $scope.currrentselectednotification.Nnotificationdate = $filter('date')(notificationdate, "yyyy-MM-dd");
            $scope.currrentselectednotification.Ncreatedon = $filter('date')(new Date(), "yyyy-MM-dd")

            console.log("updating with new date ",$scope.currrentselectednotification);
            var data2 = $scope.currrentselectednotification;
              Serviceapi.updatenotification(data2).then(function(result){
                console.log(result);
                if(result.status == 'Success'){
                  $scope.fetchcurrentnotification();
                  $ionicLoading.show({
                      template: 'Notification Updated',
                      duration: 3000
                  });
                }else{
                  $ionicLoading.show({
                      template: 'Not updated,Contact admin',
                      duration: 3000
                  });
                }
              })

          }else{
            console.log("updating with old date ",$scope.currrentselectednotification);
            $scope.currrentselectednotification.Ncreatedon = $filter('date')(new Date(), "yyyy-MM-dd")

            console.log("updating with new date ",$scope.currrentselectednotification);
            var data2 = $scope.currrentselectednotification;
              Serviceapi.updatenotification(data2).then(function(result){
                console.log(result);
                if(result.status == 'Success'){
                  $scope.fetchcurrentnotification();
                  $ionicLoading.show({
                      template: 'Notification Updated',
                      duration: 3000
                  });
                }else{
                  $ionicLoading.show({
                      template: 'Not updated,Contact admin',
                      duration: 3000
                  });
                }
              })

          }
        }

        $scope.mySelect;

        $scope.createnotification = function() {

            if ($scope.newnotification.name != null || $scope.newnotification.description != null || $scope.newnotification.notificationdate != null ||
                $scope.newnotification.name != undefined || $scope.newnotification.description != undefined || $scope.newnotification.notificationdate != undefined ||
                $scope.newnotification.priority != undefined || $scope.newnotification.priority != null) {
                if ($scope.newnotification.sendto == "Class") {


                    console.log("notification to be created with this data ", $scope.newnotification);
                    for (var i = 0; i < $scope.selectedclass.length; i++) {
                        var notificationdata = {
                            notificationname: $scope.newnotification.name,
                            notificationdescription: $scope.newnotification.description,
                            notificationsendto: $scope.newnotification.sendto,
                            id: $scope.selectedclass[i],
                            createdby: $rootScope.teacherdetail.teacherid,
                            notificationdate: $filter('date')($scope.newnotification.notificationdate, "yyyy-MM-dd"),
                            createddate: $filter('date')(new Date(), "yyyy-MM-dd"),
                            priority: $scope.newnotification.priority
                        }
                        console.log(notificationdata);
                        Serviceapi.createnewnotification(notificationdata).then(function(response) {
                            console.log(response);
                            $scope.fetchcurrentnotification();
                        })
                    }


                } else {
                    console.log("notification to be created with this data ", $scope.newnotification);
                    for (var i = 0; i < $scope.selectedstudents.length; i++) {
                        var notificationdata = {
                            notificationname: $scope.newnotification.name,
                            notificationdescription: $scope.newnotification.description,
                            notificationsendto: $scope.newnotification.sendto,
                            id: $scope.selectedstudents[i],
                            createdby: $rootScope.teacherdetail.teacherid,
                            createddate: $filter('date')(new Date(), "yyyy-MM-dd"),
                            notificationdate: $filter('date')($scope.newnotification.notificationdate, "yyyy-MM-dd"),
                            priority: $scope.newnotification.priority

                        }
                        console.log(notificationdata);
                        Serviceapi.createnewnotification(notificationdata).then(function(response) {
                            $scope.fetchcurrentnotification();
                            console.log(response);
                        })
                    }
                }
            } else {
                $ionicLoading.show({
                    template: 'Enter all details',
                    duration: 3000
                });
            }
        }


        //-------------------------------------------------------------------------------------------------

        $scope.fetchcurrentnotification = function() {

            Serviceapi.fetchnotification($rootScope.teacherdetail.teacherid).then(function(result) {
                console.log(result);
                if (result.status == "success") {
                    $scope.allnotifications = result.response;
                    $scope.shownoresult = false;
                    $scope.shownotifications = true;
                } else {
                    $scope.shownoresult = true;
                    $scope.shownotifications = false;

                }

            })
        };

        $scope.fetchcurrentnotification(); //fetch notifications as soon as the controller loads

        $scope.deletenotification = function(id) {
            var confirmPopup2 = $ionicPopup.confirm({
                title: 'Deleting Notification',
                template: 'Want to delete Notification,No one will see this?'
            });

            confirmPopup2.then(function(res) {
                if (res) {

                    Serviceapi.deletenotification(id).then(function(result) {
                        console.log(result);
                        if (result.status == 'Success') {
                            $ionicLoading.show({
                                template: 'Deleted Successfully',
                                duration: 3000
                            });
                            $scope.allnotifications = [];
                            $scope.fetchcurrentnotification();

                        } else {
                            $ionicLoading.show({
                                template: 'Error in deleting, Try Later',
                                duration: 3000
                            });
                        }
                    })
                    console.log("deleting Notification");
                } else {

                }
            })
        }
    })

    .controller('eventCalendarCtrl', function($scope, $stateParams, $filter, Serviceapi, $rootScope, $ionicModal, $ionicPopup, $cordovaCamera, $ionicLoading) {

        $scope.noevents = 0;
        $scope.fetchcurrentevents = function() {
            Serviceapi.fetchcurrentevents().then(function(response1) {
                if (response1.status == 'success') {
                    console.log(response1);
                    $scope.noevents = 0;
                    $scope.eventsarray = [];
                    $scope.eventsarray = response1.response;
                    $scope.length = $scope.eventsarray.length;
                } else {
                    $scope.noevents = 1;
                }

            })
        };

        $scope.fetchcurrentevents();
        $scope.newevent = {};

        $ionicModal.fromTemplateUrl('templates/modals/Tnewevent.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.Tneweventmodal = modal;
        });

        $scope.openTneweventModal = function() {
            $scope.Tneweventmodal.show();
        };
        $scope.closeTneweventModal = function() {
            $scope.Tneweventmodal.hide();
        };


        $scope.uploadeventimage = function() { // upload the event image
            $scope.changePopup = $ionicPopup.show({
                title: 'Change profile picture',
                scope: $scope,
                template: '<div id="picture-button-bar4" class="button-bar"><button id="picture-button14" class=" button button-dark button-block button-outline icon-left ion-camera " ng-click="takePicture()">Click</button><button id="picture-button15" class=" button button-dark button-block button-outline icon-left ion-folder " ng-click="selectPicture()">Upload</button></div>'
            });
            $scope.changePopup.then(function(res) {

            });
        };

        $scope.takePicture = function() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                popoverOptions: CameraPopoverOptions,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(
                function(imageURI) {
                    $ionicLoading.show({
                        template: 'Uploading photo',
                        duration: 3000
                    });
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpeg";
                    options.chunkedMode = true;
                    var params = {};
                    params.user_id = $rootScope.teacherdetail.teacherid;
                    params.keyword = "uploadeventimage";
                    options.params = params;

                    var ft = new FileTransfer();
                    ft.upload(imageURI, encodeURI("http://crazycodez.com/djvvs/uploadevent.php"), function(data) {
                        $ionicLoading.show({
                            template: 'Photo uploaded,Click below to submit',
                            duration: 1000
                        });

                        $scope.imagesrc = (JSON.parse(data.response)).data.photo;
                        console.dir(data);
                    }, function(error) {
                        $ionicLoading.show({
                            template: 'Photo upload failed. Please check your network and try again.',
                            duration: 1000
                        });
                    }, options);
                    $scope.changePopup.close();
                },
                function(err) {
                    $ionicLoading.show({
                        template: 'Photo upload cancelled.',
                        duration: 2000
                    });
                    $scope.changePopup.close();
                }
            );
        };

        $scope.selectPicture = function() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                popoverOptions: CameraPopoverOptions,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(
                function(imageURI) {
                    $ionicLoading.show({
                        template: 'Uploading photo',
                        duration: 3000
                    });
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpeg";
                    options.chunkedMode = true;
                    var params = {};
                    params.user_id = $rootScope.teacherdetail.teacherid;
                    params.keyword = "uploadeventimage";
                    options.params = params;
                    var ft = new FileTransfer();
                    ft.upload(imageURI, encodeURI("http://crazycodez.com/djvvs/uploadevent.php"), function(data) {
                        $ionicLoading.show({
                            template: 'Photo Uploaded,Click below to submit',
                            duration: 1000
                        });

                        $scope.imagesrc = (JSON.parse(data.response)).data.photo;
                        console.dir(data);
                    }, function(error) {
                        $ionicLoading.show({
                            template: 'Photo upload failed. Please check your network and try again.',
                            duration: 1000
                        });
                    }, options);
                    $scope.changePopup.close();
                },
                function(err) {
                    $ionicLoading.show({
                        template: 'Photo upload cancelled.',
                        duration: 2000
                    });
                    $scope.changePopup.close();
                }
            );
        };

        $scope.createnewevent = function() {
            if ($scope.newevent.name != null || $scope.newevent.description != null || $scope.newevent.eventdate != null ||
                $scope.newevent.name != undefined || $scope.newevent.description != undefined || $scope.newevent.eventdate != undefined) {
                console.log("now we are going to create new event with dis values", $scope.newevent);

                if ($scope.imagesrc == null || $scope.imagesrc == undefined) {
                    $ionicLoading.show({
                        template: 'No Image Uploaded, Creating a event without Image',
                        duration: 3000
                    });
                }
                var eventdata = {
                    name: $scope.newevent.name,
                    description: $scope.newevent.description,
                    createdby: $rootScope.teacherdetail.teacherid,
                    eventdate: $filter('date')($scope.newevent.eventdate, "yyyy-MM-dd"),
                    imagesrc: $scope.imagesrc
                }

                Serviceapi.createnewevent(eventdata).then(function(result) {
                    console.log(result);
                    $scope.eventsarray.length = 0;
                    $scope.fetchcurrentevents();
                })
            } else {
                $ionicLoading.show({
                    template: 'Enter all details,Select event photo',
                    duration: 3000
                });

            }
        }
        $scope.deletingevent = function(id) {
            var confirmPopup1 = $ionicPopup.confirm({
                title: 'Deleting Event',
                template: 'Are you sure you want to delete event?'
            });

            confirmPopup1.then(function(res) {
                if (res) {
                    console.log("deleting event");

                    Serviceapi.deleteevent(id).then(function(result) {
                        console.log(result);
                        if (result.status == 'success') {
                            console.log("deleted");
                            $scope.fetchcurrentevents();
                        } else {

                        }
                    })

                } else {

                }
            })
        }
    })

    .controller('TmenuCtrl', function($scope, $stateParams, $state, $timeout, $ionicLoading, $ionicHistory, $rootScope) {

        //Clear the Ionic history and cahe for the Teachers menu and go to the login page .
        $scope.logoutT = function() {

            $rootScope.teacherdetail = {};

            $state.go('login');

            $timeout(function() {
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go('login');
            }, 30);

        }

        $scope.changetoThome = function() {

            $state.go('Tmenu.home')

        }

        $scope.changetoTclassstudentlist = function() {

            $state.go('Tmenu.classStudentList');
        }
        $scope.changetoTclassschedule = function() {
            $state.go('Tmenu.classSchedule')
        }
        $scope.changetoTclassattendance = function() {
            $state.go('Tmenu.classAttendance')
        }

        $scope.changetoTstudentexams = function() {
            $state.go('Tmenu.studentExams2');
        }

        $scope.changetoTnotifications = function() {
            $state.go('Tmenu.notifications');
        }

        $scope.changetoTeventcalender = function() {
            $state.go('Tmenu.eventCalendar');
        }

        $scope.changetoTsettings = function() {
            $state.go('Tmenu.settings');
        }


    })



    .controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {


        }
    ])
