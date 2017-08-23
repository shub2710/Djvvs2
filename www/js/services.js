angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])


.factory('Serviceapi', function($http,$q) {
  //var markers = [];
  return {

                      parentlogin: function(postdata) {
                      var deferred = $q.defer();
                      var promise = deferred.promise;
                      var postData = postdata;
                      var username = postData.username;
                      var password = postData.password;
                      var type = postData.type;
                      console.dir(postData);

                      $http({
                          method: 'GET',
                          url: 'http://crazycodez.com/djvvs/bothloginapi.php?type=' + type + '&username=' + username + '&password=' + password,
                      }).success(function(data) {
                          deferred.resolve(data);
                      }).error(function(data) {
                          deferred.reject("Please try again later.");
                      });
                      promise.success = function(fn) {
                          promise.then(fn);
                          return promise;
                      }
                      promise.error = function(fn) {
                          promise.then(null, fn);
                          return promise;
                      }
                      return promise;
                  },
          gettimetable : function(data){

                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        var postData = data;
                        var type = postData.type;
                        var timetableid = postData.timetableid;
                        console.dir(postData);

                        $http({
                            method: 'GET',
                            url: 'http://crazycodez.com/djvvs/gettimetable.php?type=' + type + '&timetableid=' + timetableid,
                        }).success(function(data) {
                            deferred.resolve(data);
                        }).error(function(data) {
                            deferred.reject("Please try again later.");
                        });
                        promise.success = function(fn) {
                            promise.then(fn);
                            return promise;
                        }
                        promise.error = function(fn) {
                            promise.then(null, fn);
                            return promise;
                        }
                        return promise;
          },

          teacherlogin : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var postData = data;
                          var type = postData.type;
                          var username = postData.username;
                          var password = postData.password1;
                          console.dir(postData);

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/bothloginapi.php?type=' + type + '&username=' + username + '&password=' + password ,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },

          fetchstudentlist : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var postData = data;
                          var clas = postData.class;
                          var section = postData.section;
                          var date = postData.newdate;
                          console.dir(postData);
                          console.dir(date);


                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/getstudentlist.php?type=getstudentlist'+ '&class=' + clas + '&section=' + section  + '&date=' + date ,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },
          getspecificclasstimetable : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var postData = data;
                          var clas = postData.class;
                          var section = postData.section;
                          console.dir(postData);

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/gettimetable.php?type=getspecificlasstimetable'+ '&class=' + clas + '&section=' + section ,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },
          getsubjectlist : function(teacherid){
                          var deferred = $q.defer();
                          var promise = deferred.promise;


                          console.dir("get subjects which this teacher teaches",teacherid);

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/djvvsapi.php?type=getsubjectlist'+ '&teacherid=' + teacherid ,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },
          createnewexam : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var examname = data.examname;
                          var examclass = data.examclass;
                          var examsection = data.examsection;
                           var examsubject   = data.examsubject;
                          var examdate = data.examdate;
                          var examtime = data.examtime;
                          var creationdate = data.creationdate;
                         var  createdby = data.createdby;

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/examsCRUD.php?type=createnewexam'+ '&examname=' + examname + '&examclass=' + examclass + '&examsection=' + examsection + '&examsubject=' + examsubject + '&examdate=' + examdate + '&examtime=' + examtime + '&createdby=' + createdby + '&creationdate=' + creationdate ,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },
          deleteexam : function(examid){
                          var deferred = $q.defer();
                          var promise = deferred.promise;

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/examsCRUD.php?type=deleteexam'+ '&examid=' + examid ,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },

          updateexam : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var examid = data.id2;
                          var examname = data.Ename;
                          var examclass = data.classname2;
                          var examsection = data.classsection2;
                          var examsubject= data.subjectname2;
                          var examdate = data.examdate2;
                          var examtime = data.examtime2;
                          var examcreatedby = data.createdby;
                          var examcreationdate = data.creationdate;
                            console.log(examid);
                            console.log(examname);
                            console.log(examclass);
                            console.log(examsection);
                            console.log(examsubject);
                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/examsCRUD.php?type=updateexam'+ '&examid=' + examid + '&examname=' + examname+ '&examclass=' + examclass+ '&examsection=' + examsection+ '&examsubject=' + examsubject+ '&examdate=' + examdate + '&examtime=' + examtime+ '&creationdate=' + examcreationdate + '&createdby=' + examcreatedby,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },
          fetchallexams : function(teacherid){
                          var deferred = $q.defer();
                          var promise = deferred.promise;

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/examsCRUD.php?type=fetchallexams'+ '&teacherid=' + teacherid,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },
          updatemorningattendance : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var postData = data;
                          var classname = postData.classname;
                          var section = postData.section;
                          var date = postData.date;
                          var studentid = postData.studentid;

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/attendanceCRUD.php?type=updatemorningattendance'+ '&class=' + classname + '&section=' + section +'&date=' + date +'&studentid=' + studentid,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },

          updateafternoonattendance : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var postData = data;
                          var classname = postData.classname;
                          var section = postData.section;
                          var date = postData.date;

                          var studentid = postData.studentid;

                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/attendanceCRUD.php?type=updateafternoonattendance'+ '&class=' + classname + '&section=' + section +'&date=' + date +'&studentid=' + studentid,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;


          },
          createnewnotification : function(data){
                          var deferred = $q.defer();
                          var promise = deferred.promise;
                          var postData = data;
                          var name = postData.notificationname;
                          var description = postData.notificationdescription;
                          var sendto = postData.notificationsendto;
                            var id = postData.id;
                              var createdby = postData.createdby;
                              var createddate = postData.createddate;
                              var notificationdate = postData.notificationdate;
                              var priority = postData.priority;



                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/notificationsCRUD.php?type=createnotification'+ '&name=' + name + '&description=' + description +'&sendto=' + sendto +'&id=' + id + '&createdby=' + createdby + '&createddate=' + createddate + '&notificationdate=' + notificationdate + '&priority=' + priority,
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;
          },
    fetchnotification : function(id){
                    var deferred = $q.defer();
                    var promise = deferred.promise;

                      var id2 = id;
                    console.log(id2);
                    $http({
                        method: 'GET',
                        url: 'http://crazycodez.com/djvvs/notificationsCRUD.php?type=fetchnotification'+ '&id=' + id,
                    }).success(function(data) {
                        deferred.resolve(data);
                    }).error(function(data) {
                        deferred.reject("Please try again later.");
                    });
                    promise.success = function(fn) {
                        promise.then(fn);
                        return promise;
                    }
                    promise.error = function(fn) {
                        promise.then(null, fn);
                        return promise;
                    }
                    return promise;
    },

deletenotification : function(id){
              var deferred = $q.defer();
              var promise = deferred.promise;

                var id2 = id;
              console.log(id2);
              $http({
                  method: 'GET',
                  url: 'http://crazycodez.com/djvvs/notificationsCRUD.php?type=deletenotification'+ '&id=' + id,
              }).success(function(data) {
                  deferred.resolve(data);
              }).error(function(data) {
                  deferred.reject("Please try again later.");
              });
              promise.success = function(fn) {
                  promise.then(fn);
                  return promise;
              }
              promise.error = function(fn) {
                  promise.then(null, fn);
                  return promise;
              }
              return promise;
},


updatenotification : function(data){
          var deferred = $q.defer();
          var promise = deferred.promise;

            var Nid = data.Nid;
            var Nname = data.Nname;
            var Ndescription = data.Ndescription;
            var Ncreatedon = data.Ncreatedon;
            var Nnotificationdate = data.Nnotificationdate;
            var Npriority = data.Npriority;
            console.log(Nid);
            console.log(Nname);

          $http({
              method: 'GET',
              url: 'http://crazycodez.com/djvvs/notificationsCRUD.php?type=updatenotification'+ '&id=' + Nid+ '&name=' + Nname+ '&description=' + Ndescription+ '&createdon=' + Ncreatedon+ '&notificationdate=' + Nnotificationdate + '&priority=' + Npriority,
          }).success(function(data) {
              deferred.resolve(data);
          }).error(function(data) {
              deferred.reject("Please try again later.");
          });
          promise.success = function(fn) {
              promise.then(fn);
              return promise;
          }
          promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
          }
          return promise;
},
marknotificationasread : function(id){
              var deferred = $q.defer();
              var promise = deferred.promise;

                var id2 = id;
              console.log(id2);
              $http({
                  method: 'GET',
                  url: 'http://crazycodez.com/djvvs/notificationsCRUD.php?type=marknotificationasread'+ '&id=' + id,
              }).success(function(data) {
                  deferred.resolve(data);
              }).error(function(data) {
                  deferred.reject("Please try again later.");
              });
              promise.success = function(fn) {
                  promise.then(fn);
                  return promise;
              }
              promise.error = function(fn) {
                  promise.then(null, fn);
                  return promise;
              }
              return promise;
},
fetchexamsforstudent : function(classid){
              var deferred = $q.defer();
              var promise = deferred.promise;

              var classid2 =  classid;
              $http({
                  method: 'GET',
                  url: 'http://crazycodez.com/djvvs/examsCRUD.php?type=fetchexamsforstudent'+ '&classid=' + classid2,
              }).success(function(data) {
                  deferred.resolve(data);
              }).error(function(data) {
                  deferred.reject("Please try again later.");
              });
              promise.success = function(fn) {
                  promise.then(fn);
                  return promise;
              }
              promise.error = function(fn) {
                  promise.then(null, fn);
                  return promise;
              }
              return promise;
        },
    fetchnotificationsforstu : function(studentid,classid){
                  var deferred = $q.defer();
                  var promise = deferred.promise;

                  var classid2 =  classid;
                  var studentid2 = studentid;
                  console.log(classid2);
                  console.log(studentid2);
                  $http({
                      method: 'GET',
                      url: 'http://crazycodez.com/djvvs/notificationsCRUD.php?type=fetchnotificationsforstu'+ '&classid=' + classid2 +'&studentid=' + studentid2,
                  }).success(function(data) {
                      deferred.resolve(data);
                  }).error(function(data) {
                      deferred.reject("Please try again later.");
                  });
                  promise.success = function(fn) {
                      promise.then(fn);
                      return promise;
                  }
                  promise.error = function(fn) {
                      promise.then(null, fn);
                      return promise;
                  }
                  return promise;
            },
        getstudentattendance : function(studentid,classid){
                      var deferred = $q.defer();
                      var promise = deferred.promise;

                      var classid2 =  classid;
                      var studentid2 = studentid;
                      console.log(classid2);
                      console.log(studentid2);
                      $http({
                          method: 'GET',
                          url: 'http://crazycodez.com/djvvs/attendanceCRUD.php?type=getstudentattendance'+ '&classid=' + classid2 +'&studentid=' + studentid2,
                      }).success(function(data) {
                          deferred.resolve(data);
                      }).error(function(data) {
                          deferred.reject("Please try again later.");
                      });
                      promise.success = function(fn) {
                          promise.then(fn);
                          return promise;
                      }
                      promise.error = function(fn) {
                          promise.then(null, fn);
                          return promise;
                      }
                      return promise;
                },
            fetchcurrentevents : function(){
                          var deferred = $q.defer();
                          var promise = deferred.promise;


                          $http({
                              method: 'GET',
                              url: 'http://crazycodez.com/djvvs/djvvsapi.php?type=fetchcurrentevents',
                          }).success(function(data) {
                              deferred.resolve(data);
                          }).error(function(data) {
                              deferred.reject("Please try again later.");
                          });
                          promise.success = function(fn) {
                              promise.then(fn);
                              return promise;
                          }
                          promise.error = function(fn) {
                              promise.then(null, fn);
                              return promise;
                          }
                          return promise;
                    },
                createnewevent : function(data){
                              var deferred = $q.defer();
                              var promise = deferred.promise;
                              var postData = data;
                              var name =  postData.name;
                              var description = postData.description;
                              var createdby = postData.createdby;
                              var imageuri = postData.imagesrc;
                              var eventdate  = postData.eventdate;


                              $http({
                                  method: 'GET',
                                  url: 'http://crazycodez.com/djvvs/djvvsapi.php?type=createnewevent' + '&name=' + name + '&description=' + description + '&imagesrc=' + imageuri + '&createdby=' + createdby + '&eventdate=' + eventdate,
                              }).success(function(data) {
                                  deferred.resolve(data);
                              }).error(function(data) {
                                  deferred.reject("Please try again later.");
                              });
                              promise.success = function(fn) {
                                  promise.then(fn);
                                  return promise;
                              }
                              promise.error = function(fn) {
                                  promise.then(null, fn);
                                  return promise;
                              }
                              return promise;
                        },

                    deleteevent : function(id){
                                  var deferred = $q.defer();
                                  var promise = deferred.promise;

                                  var id2  = id;


                                  $http({
                                      method: 'GET',
                                      url: 'http://crazycodez.com/djvvs/djvvsapi.php?type=deleteevent' + '&id=' + id2,
                                  }).success(function(data) {
                                      deferred.resolve(data);
                                  }).error(function(data) {
                                      deferred.reject("Please try again later.");
                                  });
                                  promise.success = function(fn) {
                                      promise.then(fn);
                                      return promise;
                                  }
                                  promise.error = function(fn) {
                                      promise.then(null, fn);
                                      return promise;
                                  }
                                  return promise;
                            },
                    checkresult : function(data){
                                  var deferred = $q.defer();
                                  var promise = deferred.promise;
                                  var postData = data;
                                  var studentid =  postData.studentid;
                                  var classid = postData.classid;
                                  var examid = postData.examid2;
                                  var subjectname = postData.subjectname2;


                                  $http({
                                      method: 'GET',
                                      url: 'http://crazycodez.com/djvvs/djvvsapi.php?type=checkresult' + '&studentid=' + studentid + '&classid=' + classid + '&examid=' + examid + '&subjectname=' + subjectname,
                                  }).success(function(data) {
                                      deferred.resolve(data);
                                  }).error(function(data) {
                                      deferred.reject("Please try again later.");
                                  });
                                  promise.success = function(fn) {
                                      promise.then(fn);
                                      return promise;
                                  }
                                  promise.error = function(fn) {
                                      promise.then(null, fn);
                                      return promise;
                                  }
                                  return promise;
                            },
                    updateaddress : function(data){
                                  var deferred = $q.defer();
                                  var promise = deferred.promise;
                                  var postData = data;
                                  var id =  postData.id;
                                  var address = postData.address;

                                  $http({
                                      method: 'GET',
                                      url: 'http://crazycodez.com/djvvs/djvvsapi.php?type=updateaddress' + '&studentid=' + id + '&address=' + address,
                                  }).success(function(data) {
                                      deferred.resolve(data);
                                  }).error(function(data) {
                                      deferred.reject("Please try again later.");
                                  });
                                  promise.success = function(fn) {
                                      promise.then(fn);
                                      return promise;
                                  }
                                  promise.error = function(fn) {
                                      promise.then(null, fn);
                                      return promise;
                                  }
                                  return promise;
                            }



  }
})


.service('BlankService', [function(){

}]);
