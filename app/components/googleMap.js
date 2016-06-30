var React = require('react');
var axios = require('axios');

 var GoogleMap = React.createClass({
    
    getInitialState: function(){
    	return{

        courts: [],
        name: 'Click a Marker to See Information About the Location',
        type: '',
        address: ''

    	}
    },
    componentDidMount: function (rootNode) {
        var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#3a3a3a"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"100"},{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"34"},{"color":"#e74110"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#090909"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#1a1a1a"}]}]; 
        var courts; 
        var _this = this; 
        this.ref = new Firebase('https://sftennisapp.firebaseio.com')
        this.ref.once("value", function(snapshot) {
            //console.log("take the shot ", snapshot.val().sfcourts[0]);
            console.log("this is snapshot ", snapshot.val());
            _this.setState({
                courts: snapshot.val().sfcourts
            });

        function Legend(controlDiv, map) {
          // Set CSS styles for the DIV containing the control
          // Setting padding to 5 px will offset the control
          // from the edge of the map
          controlDiv.style.padding = '5px';

          // Set CSS for the control border
          var controlUI = document.createElement('DIV');
          controlUI.style.backgroundColor = 'black';
          controlUI.style.borderStyle = 'solid';
          controlUI.style.borderWidth = '1px';
          controlUI.title = 'Legend';
          controlDiv.appendChild(controlUI);

          // Set CSS for the control text
          var controlText = document.createElement('DIV');
          controlText.style.fontFamily = 'Arial,sans-serif';
          controlText.style.fontSize = '12px';
          controlText.style.paddingLeft = '4px';
          controlText.style.paddingRight = '4px';
          
          // Add the text
          controlText.innerHTML = '<b><center> Map Key </center></b><br />' +
            '<img src="http://maps.google.com/mapfiles/ms/micons/red-dot.png" /> Center of SF <br />' +
            '<img src="http://maps.google.com/mapfiles/ms/micons/yellow-dot.png" /> Tennis Club<br />' +
            '<img src="http://maps.google.com/mapfiles/ms/micons/green-dot.png" /> Public Tennis Court<br />' +
            '<img src="http://maps.google.com/mapfiles/ms/micons/blue-dot.png" /> Tennis Shop<br />' +
            '<img src="http://maps.google.com/mapfiles/ms/micons/orange-dot.png" /> Other Facility <br />';
          controlUI.appendChild(controlText); 
        }

			
			 var mapOptions = {
                center: _this.mapCenterLatLng(),
                zoom: 13,
                styles: styles
            },
            map = new google.maps.Map(_this.refs.gmap, mapOptions);
        
            var points = [];
    
        
        	for(var i=0; i<_this.state.courts.length; i++){
        		var temp = [_this.state.courts[i].xcoord,_this.state.courts[i].ycoord]
        		var a = new google.maps.LatLng(temp[0],temp[1]);
        		points.push(a);
        		
        	}  
            
        	var bounds = new google.maps.LatLngBounds(); 
            function getPinColor(data){
            
                if(data.type === 'shop'){
                    return "26DFE9"
                }else if(data.type === 'club'){
                    return "F8EC3B"
                }else if (data.type === 'court'){
                    return "3BF83E"
                }else if (data.type === 'other'){
                    return "DF7569"
                }else{
                    return "FE7569"
                }
            }

        	for(var j=0; j<points.length; j++){
                (function(j){

                var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + getPinColor(_this.state.courts[j]),
                  new google.maps.Size(21, 34),
                  new google.maps.Point(0,0),
                  new google.maps.Point(10, 34));
                var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                  new google.maps.Size(40, 37),
                  new google.maps.Point(0, 0),
                  new google.maps.Point(12, 35));
                
        		var marker = new google.maps.Marker({
        			position: points[j],
                    icon: pinImage,
                    shadow: pinShadow,
        			map: map
        		});
        		
        		var contentString = '<div id="content" >'+ _this.state.courts[j].name +'">' +
            
            '<font color = "orange">'+ '<b>'+'<br>' + 
            '</b>'+ '<br>' + '</a>' +
            'lat: ' + _this.state.courts[j].xcoord + ' lng: ' + _this.state.courts[j].ycoord + 
            '<br>' + '</font>'+
            '</div>';
            
          // Create new info window - Popup with street location and the title of the movie 
          var infowindow = new google.maps.InfoWindow({
          content: contentString
          });


           google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
              
              // This is where the court data is set to the state of the app for display
              
              if(_this.state.courts[j].type === 'shop'){
                _this.setState({
                  name: _this.state.courts[j].name,
                  address: _this.state.courts[j].address,
                  phone: _this.state.courts[j].phone,
                  xcoord: _this.state.courts[j].xcoord,
                  ycoord: _this.state.courts[j].ycoord,
                  type: _this.state.courts[j].type
                });   
              }else if(_this.state.courts[j].type === 'club'){
                _this.setState({
                  name: _this.state.courts[j].name,
                  address: _this.state.courts[j].address,
                  phone: _this.state.courts[j].phone,
                  xcoord: _this.state.courts[j].xcoord,
                  ycoord: _this.state.courts[j].ycoord,
                  lights: _this.state.courts[j].lights,
                  type: _this.state.courts[j].type,
                  wall: _this.state.courts[j].ClubWall,
                  grass: _this.state.courts[j].ClubGrass,
                  proShop: _this.state.courts[j].ClubProShop,
                  courts: _this.state.courts[j].ClubCourts,
                  clay: _this.state.courts[j].ClubClay,
                  indoor: _this.state.courts[j].ClubIndoor,
                  string: _this.state.courts[j].ClubStringing
                }); 
              
              }else if(_this.state.courts[j].type === "court" || _this.state.courts[j].type === 'other'){
                
                _this.setState({
                  name: _this.state.courts[j].name,
                  address: _this.state.courts[j].address,
                  xcoord: _this.state.courts[j].xcoord,
                  ycoord: _this.state.courts[j].ycoord,
                  lights: _this.state.courts[j].lights,
                  type: _this.state.courts[j].type
                });   
              }else{
                _this.setState({
                  name: "An error has occured"
                }); 
              } 
              


            });
        		
        		bounds.extend(marker.getPosition());
        		map.setCenter(bounds.getCenter());
        	

                })(j) // maintain the data from the marker 

            }
        
        	map.setZoom(map.getZoom()); 

              // Create the legend and display on the map
          var legendDiv = document.createElement('div');
          legendDiv.style.color = "orange";
          var legend = new Legend(legendDiv, map);
          legendDiv.index = 1;
          map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendDiv);
        
		});

        
       
    },
    mapCenterLatLng: function () {

        return new google.maps.LatLng(37.763108, -122.455799);
    },

    display: function(){
        return "Hello"
    },

    render: function () {
      console.log("This is state ", this.state);
      var dataShowing;
      //console.log("This type ", _this.state.type)
        //if({this.state.type} === 'court' || {this.state.type} === 'other'){
          //   console.log("here 3 ")
          // dataShowing = '<ul>' + 
          //                 '<li>' + {this.state.name} + '</li>' +
          //                 '<li>' + {this.state.lights} + '</li>' +
          //                 '<li>' + {this.state.type} +   '</li>' +
          //                 '<li>' + {this.state.xcoord} + '</li>' +
          //                 '<li>' + {this.state.ycoord} +  '</li>' +
          //               '</ul>'    
                        
        //} 
      
    	var style = {
            height: '500px', 
    				width: '75%',
            margin: '1em'
    			}
        return (
            <div>
                <div className="col-md-6">
                    <div ref="gmap" className='map-gic' style={style}></div>
                </div>
                <div className="col-md-6">
                  <div> {dataShowing}</div>

                </div>
            </div>
            );
    }
});

module.exports = GoogleMap;