angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


      .state('menu.profile', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('menu.timeTable', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/timeTable.html',
        controller: 'timeTableCtrl'
      }
    }
  })

  .state('menu.attendance', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/attendance.html',
        controller: 'attendanceCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.exams', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/exams.html',
        controller: 'examsCtrl'
      }
    }
  })

  .state('menu.notifications', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/notifications.html',
        controller: 'notificationsCtrl'
      }
    }
  })
  .state('menu.circlemenu', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/circlemenu.html',
        controller: 'circlemenuCtrl'
      }
    }
  })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
      })

  .state('menu.calenderGallery', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/calenderGallery.html',
        controller: 'calenderGalleryCtrl'
      }
    }
  })
//--------------------------------------------------------------------------Teachers Routes-----------------------------------------------------------------------------
.state('Tmenu.home', {
url: '/page11',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/home.html',
  controller: 'homeCtrl'
}
}
})

.state('Tmenu.classStudentList', {
url: '/page12',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/classStudentList.html',
  controller: 'classStudentListCtrl'
}
}
})

.state('Tmenu.classSchedule', {
url: '/page13',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/classSchedule.html',
  controller: 'classScheduleCtrl'
}
}
})

.state('Tmenu.studentExams', {
url: '/page14',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/studentExams2.html',
  controller: 'studentExamsCtrl'
}
}
})

.state('Tmenu.classAttendance', {
url: '/page15',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/classAttendance.html',
  controller: 'classAttendanceCtrl'
}
}
})

.state('Tmenu.studentExams2', {
url: '/page16',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/studentExams2.html',
  controller: 'studentExams2Ctrl'
}
}
})

.state('Tmenu.notifications', {
url: '/page17',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/notifications.html',
  controller: 'TnotificationsCtrl'
}
}
})

.state('Tmenu.eventCalendar', {
url: '/page17',
views: {
'side-menu2': {
  templateUrl: 'templates/teacherfiles/eventCalendar.html',
  controller: 'eventCalendarCtrl'
}
}
})

.state('Tmenu', {
url: '/side-menu2',
templateUrl: 'templates/teacherfiles/teachersmenu.html',
controller: 'TmenuCtrl'
})

$urlRouterProvider.otherwise('/login')


});
