        const Api_key = 'AIzaSyAe8omwUt02s78nuvpyRpGIOp46PcB4Lss'
        const Channel_Name = 'UCi9wMnaig_5QRhaS3RFR86g'

        //  ************************ CHANNEL INFORMATION ************************ *

        function channelInfo(){
            fetch(`https://www.googleapis.com/youtube/v3/channels?key=${Api_key}&id=${Channel_Name}&part=snippet,statistics`)
            .then( res => {
                return res.json()
            }).then( data =>{
                    var temp = ""
                    temp += "<tr>"
                    temp+= "<td>" + data.items[0].snippet.title + "</td>"
                    temp+= "<td>" + data.items[0].statistics.subscriberCount+"</td>"
                    temp+= "<td>"+data.items[0].statistics.viewCount+"</td>"
                    temp+= "<td>"+data.items[0].snippet.country+"</td></tr>"
                document.getElementById('data').innerHTML += temp;

            }).catch(err => console.log(err))
        }

        //  *****************************UPLOADED VIDEOS AND SYSTEM GENERATED PLAYLISTS*********************** 


        function UploadedVideos(){
            fetch(`https://www.googleapis.com/youtube/v3/channels?key=${Api_key}&id=${Channel_Name}&part=snippet,statistics`)
            .then( res => {
                return res.json()
            }).then( data =>{
                    document.getElementById('Channel_Name').innerText = data.items[0].snippet.title
                    document.getElementById('Country').innerText = data.items[0].snippet.country
                    document.getElementById('Uploaded_videos').innerText = data.items[0].statistics.videoCount 
            })
            fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${Channel_Name}&key=${Api_key}`)
            .then( res => {return res.json()})
            .then(data1 => {
                document.getElementById('PlayList').innerText = data1.pageInfo.totalResults
            }) 
        }

        // ********************** CREATING A PLAYLIST AND UPDATING THE SAME *********************************

            // Google Authentincation
            function authenticate() {
                return gapi.auth2.getAuthInstance()
                    .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
                    .then(function() { alert("Sign-in successful"); },
                        function(err) { console.error("Error signing in", err); });
            }
            function loadClient() {
                gapi.client.setApiKey("AIzaSyAe8omwUt02s78nuvpyRpGIOp46PcB4Lss");
                return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(function() { console.log("GAPI client loaded for API"); },
                        function(err) { console.error("Error loading GAPI client for API", err); });
            }
            // Make sure the client is loaded and sign-in is complete before calling this method.
            function Insert() {
                gapi.client.youtube.playlists.insert({
                "part": [
                    "snippet,status"
                ],
                "resource": {
                    "snippet": {
                    "title": "QUOTES1",
                    "description": "Before Updating: TRY IT TILL YOU GET IT2"
                    },
                    "status": {
                    "privacyStatus": "private"
                    }
                }
                })
                    .then(function(response) {
                            // Handle the results here (response.result has the parsed body).
                            console.log("Response", response.result);
                            alert("PlayList Created")
                        },
                        function(err) { console.error("Execute error", err); });
            }
            function Update() {
                return gapi.client.youtube.playlists.update({
                  "part": [
                    "snippet,status"
                  ],
                  "resource": {
                    "id": "PL6TjR9yjsZREOc9zq-bt-X5YEDLp8Co-R",
                    "snippet": {
                      "title": "QUOTES",
                      "description": "After Updating: HARD THING WILL TAKE TIME TO COMPLETE"
                    },
                    "status": {
                      "privacyStatus": "Private"
                    }
                  }
                })
                    .then(function(response) {
                            // Handle the results here (response.result has the parsed body).
                            console.log("Response", response.result);
                            alert("Updated PlayList")
                            
                          },
                          function(err) { console.error("Execute error", err); });
              }
            gapi.load("client:auth2", function() {
                gapi.auth2.init({client_id:  "969668666875-3a68m0n19lah5c64bmorulkr1nuol7l5.apps.googleusercontent.com"});
            });

        // **********IMPLEMENTING SEARCH BASED RESULT *****************

        function search_channels(){
            var search = document.getElementById('basic-url').value
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=${search}&type=channel&key=${Api_key}`)
            .then(res => {return res.json()})
            .then(data => {
                var temp = ""
                    for(var i=0;i<data.pageInfo.resultsPerPage;i++){
                        
                        document.getElementById('data1').innerText = ""
                        temp+= "<tr>"
                        temp+="<td>"+data.items[i].snippet.channelTitle+"</td></tr>"
                        document.getElementById('data1').innerHTML = temp
                    }
                   
                    document.getElementById('basic-url').value = ""
            }).catch(err => console.log(err))
        }