 'use strict';
 app.controller('mainCtrl', ['$scope', 'googleLogin', 'googleCalendar', 'googlePlus', function ($scope, googleLogin, googleCalendar, googlePlus) {
    

 
     $scope.tree_data = new Array();
 
     var myTreeData = new Array();

  

     $scope.expanding_property = {
         field: "summary",
         displayName: "Title",
         sortable: true,
         filterable: true,
         cellTemplate: "<a ng-click = 'user_clicks_branch(row.branch)'>{{row.branch[expandingProperty.field]}}</a>",
     };
     $scope.col_defs = [
        {
            field: "creator",
            displayName: "Creator",
            sortable: true,
            sortingType: "string"
        },
       /* {
            field: "link",
            displayName: "Attachment link",
            sortable: true,
            cellTemplate: "<span ng-switch='row.branch[col.field]'><a ng-switch-when='undefined'>No Attachment</a><a ng-switch-default ng-href='{{row.branch[col.field]}}'>Download</a></span>",
            sortingType: "number",
            filterable: true
        },*/
        {
            field: "startDateTime",
            displayName: "Starts on",
            sortable: true,
            sortingType: "string"
        },
        {
            field: "endDateTime",
            displayName: "Ends on",
            sortable: true,
            sortingType: "string"
        },
        {
            field: "description",
            displayName: "Event Description",
            sortable: true,
            sortingType: "string"
        },
        {
            field: "location",
            displayName: "Location",
            sortable: true,
            sortingType: "string"
        },
        {
            field: "Actions",
            displayName: "Actions",
            cellTemplate: "<button id='viewMe{{row.branch.id}}' ng-click='cellTemplateScope.clickView(row.branch)' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewCrModal' >View</button>" + " " + "<button ng-click='cellTemplateScope.clickEdit(row.branch)' class='btn btn-warning btn-xs' data-toggle='modal' data-target='#editCrModal' >Edit</button>" + " " + "<button ng-click='cellTemplateScope.clickDel(row.branch)' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#delCrModal'  >Delete</button>",
            cellTemplateScope: {
                clickEdit: function (branch) {
                    /* $scope.editCr = branch;
                     $scope.filterString = "";
                     console.log(branch.links);
                     if (branch.links.length > 0) {
                         $scope.links = [];
                     }
                     else {
                         $scope.links = [{ DESCRIPTION: '', URL: '' }];
                     }
                     for (var i = 0; i < branch.links.length; i++) {
                         $scope.links.push({ DESCRIPTION: branch.links[i].description, URL: branch.links[i].url });
                     }
                     myCvService.GetCriteria(branch.criteria_id).then(function (response) {
                         $scope.editCriteriaFull = response.data;
                         $scope.editCriteria = $scope.editCriteriaFull.name;
                         console.log($scope.editCriteriaFull.name);
                     });

                 },
                 clickDel: function (branch) {
                     $scope.delCr = branch;
                     myCvService.GetCriteria(branch.criteria_id).then(function (response) {
                         $scope.delCriteriaFull = response.data;
                         $scope.delCriteria = $scope.editCriteriaFull.name;
                         console.log($scope.editCriteriaFull.name);
                     });
                 },
                 clickView: function (branch) {

                     $scope.viewCr = branch;
                     if (branch.links.length > 0) {
                         $scope.links = [];
                     }
                     else {
                         $scope.links = [];
                     }
                     for (var i = 0; i < branch.links.length; i++) {
                         $scope.links.push({ DESCRIPTION: branch.links[i].description, URL: branch.links[i].url });
                     }
                     myCvService.GetCriteria(branch.criteria_id).then(function (response) {
                         $scope.viewCriteriaFull = response.data;
                         $scope.viewCriteria = $scope.viewCriteriaFull.name;
                         console.log($scope.viewCriteriaFull.name);
                     });
                     */
                }
            }
        }
     ];
        $scope.login = function () {
            googleLogin.login();
        };

        $scope.$on("googlePlus:loaded", function() {
          googlePlus.getCurrentUser().then(function(user) {
            $scope.currentUser = user;
            console.log(user);

          });
        })

         $scope.$on("google:ready", function() {
         //to allow authorization after google api is loaded 
          //googleLogin.login();
          });
        
        $scope.currentUser = googleLogin.currentUser;

        $scope.loadEvents = function () {
            clearTable();
             googleCalendar.listEvents({ calendarId: this.selectedCalendar.id })
                .then(function (events) {
                 //   $scope.calendarItems = events;
                    //  console.log(events);
                    var data = events;
                    for(var i=0;i<events.length;i++)
                    {
                        var event = {
                            summary: "",
                            creator: "",
                            startDateTime: "",
                            endDateTime: "",
                            description: "",
                            location:""
                        }
                        event.summary = data[i].summary;
                        event.creator = data[i].creator.displayName;
                        event.startDateTime = moment(data[i].start.dateTime).format('MMMM Do YYYY, h:mm:ss a');
                        event.endDateTime = moment(data[i].end.dateTime).format('MMMM Do YYYY, h:mm:ss a');
                        event.description = data[i].description;
                        event.location = data[i].location;
                        console.log(event);
                        myTreeData.push(event);
                    }
                    $scope.tree_data=myTreeData;

                     }
                );
           /*var event = {
                          'summary': 'Nestoooooo',
                          'location': '800 Howard St., San Francisco, CA 94103',
                          'description': 'proba iz koda',
                          'start': {
                            'dateTime': '2017-02-28T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                          },
                          'end': {
                            'dateTime': '2017-02-28T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                          },
                          'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=2'
                          ],
                          'attendees': [
                            {'email': 'lpage@example.com'},
                            {'email': 'sbrin@example.com'}
                          ],
                          'reminders': {
                            'useDefault': false,
                            'overrides': [
                              {'method': 'email', 'minutes': 24 * 60},
                              {'method': 'popup', 'minutes': 10}
                            ]
                          }
                        };
                googleCalendar.insertEvent({calendarId: this.selectedCalendar.id, resource: event});*/
           /* console.log(this.calendarItems)
            var people= googlePlus.getPeople({'userId' : 'me' });    */
        }

        function clearTable() {         
            $scope.tree_data = [];
            myTreeData = [];
        };

        $scope.loadCalendars = function() {
          googleCalendar.listCalendars().then(function (data) {
              $scope.calendars = data;
              $scope.selectedCalendar = $scope.calendars[0];
            });
        }
       
    }]);
