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
            field: "htmlLink",
            displayName: "Event link",
            sortable: true,
            cellTemplate: "<span ng-switch='row.branch[col.field]'><a ng-switch-default ng-href='{{row.branch[col.field]}}'>URL</a></span>",
            sortingType: "number",
            filterable: true
        },
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
            field: "location",
            displayName: "Location",
            sortable: true,
            sortingType: "string"
        },
        {
            field: "Actions",
            displayName: "Actions",
            cellTemplate: "<button id='viewMe{{row.branch.id}}' ng-click='cellTemplateScope.clickView(row.branch)' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewEventModal' >View</button>" + " " + "<button ng-click='cellTemplateScope.clickEdit(row.branch)' class='btn btn-warning btn-xs' data-toggle='modal' data-target='#editEventModal' >Edit</button>" + " " + "<button ng-click='cellTemplateScope.clickDel(row.branch)' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#delEventModal'  >Delete</button>",
            cellTemplateScope: {
                 clickEdit: function (data) {
                     $scope.event = data;
                 },
                 /*clickDel: function (branch) {
                     $scope.delCr = branch;
                     myCvService.GetCriteria(branch.criteria_id).then(function (response) {
                         $scope.delCriteriaFull = response.data;
                         $scope.delCriteria = $scope.editCriteriaFull.name;
                         console.log($scope.editCriteriaFull.name);
                     });
                 },*/
                 clickView: function (data) {

                     $scope.event = data;
                     console.log(data); 
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
              $scope.currentUser.image.url
            console.log(user);
            $scope.loadCalendars();
          });
        })

         $scope.$on("google:ready", function() {
         //authorization after google api is loaded 
             googleLogin.login().then(function (data) {
                 
             });
          });
        
         $scope.currentUser = googleLogin.currentUser;

        $scope.loadCalendars = function () {
            googleCalendar.listCalendars().then(function (data) {
                $scope.calendars = data;
                $scope.selectedCalendar = $scope.calendars[0];
                $scope.loadEvents();
            });
        }
        $scope.loadEvents = function () {
            clearTable();
             googleCalendar.listEvents({ calendarId: this.selectedCalendar.id })
                .then(function (events) {
                 //   $scope.calendarItems = events;
                    //  console.log(events);
                    //var data = events;
                    for(var i=0;i<events.length;i++)
                    {
                        console.log(events[i]);
                        var event = {
                            id:"",
                            summary: "",
                            creator: "",
                            startDateTime: "",
                            endDateTime: "",
                            created: "",
                            updated:"",
                            description: "",
                            location: "",
                            attachments: [],
                            htmlLink:""
                        }
                        event.id = events[i].id;
                        event.summary = events[i].summary;
                        event.creator = events[i].creator.displayName;
                        //for all-day events
                        if (events[i].end.dateTime)
                            event.startDateTime = moment(events[i].start.dateTime).format('MM/DD/YYYY h:mm A');
                        else
                            event.startDateTime = moment(events[i].start.date).format('MM/DD/YYYY');
                        if(events[i].end.dateTime)
                            event.endDateTime = moment(events[i].end.dateTime).format('MM/DD/YYYY h:mm A');
                        else
                            event.endDateTime = moment(events[i].end.date).format('MM/DD/YYYY');
                        event.created = moment(events[i].created).format('MM/DD/YYYY h:mm A');
                        event.updated = moment(events[i].updated).format('MM/DD/YYYY h:mm A');

                       // console.log(moment(event.created).format());
                       // console.log(events[i].created);
                        event.description = events[i].description;
                        event.location = events[i].location;
                        event.htmlLink = events[i].htmlLink;
                        
                        if (events[i].attachments) {
                            for (var j = 0; j < events[i].attachments.length; j++)
                                event.attachments.push({
                                    title: events[i].attachments[j].title,
                                    fileUrl: events[i].attachments[j].fileUrl,
                                    iconLink: events[i].attachments[j].iconLink
                                });
                           
                        }
                        //console.log(events[i]);
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
        $scope.editEvent = function(data)
        {
            var event = {
                summary: '',
                description: '',
                start: {
                    dateTime: '',
                },
                end: {
                    dateTime: '',
                   
                },
            };
            event.summary = data.summary;
            event.description = data.description;
            //two-way binding didin't work with datetimepicker values, so I fixed it manually :(
            event.start.dateTime = new Date(angular.element('#startDateTimePicker').val());
            $scope.event.startDateTime = moment(event.start.dateTime).format('MM/DD/YYYY h:mm A');
            event.end.dateTime = new Date(angular.element('#endDateTimePicker').val());
            $scope.event.endDateTime = moment(event.end.dateTime).format('MM/DD/YYYY h:mm A');
            googleCalendar.updateEvent({ calendarId: this.selectedCalendar.id, eventId: data.id, resource: event });

        }
        function clearTable() {         
            $scope.tree_data = [];
            myTreeData = [];
        };

     
       
    }]);
