var React = require('react');
var axios = require('axios');

 var GoogleMap = React.createClass({
    getDefaultProps: function () {
        return {
            initialZoom: 13,
            mapCenterLat: 37.763108,
            mapCenterLng: -122.455799
        };
    },
    getInitialState: function(){
    	return{

    	}
    },
    componentDidMount: function (rootNode) {
    	var _this = this;
		var ref = new Firebase('https://sftennisapp.firebaseio.com');
		var courts; 
		ref.once("value", function(snapshot) {
			courts = snapshot.val().sfcourts
			
			 var mapOptions = {
                center: _this.mapCenterLatLng(),
                zoom: _this.props.initialZoom
            },
            map = new google.maps.Map(_this.refs.gmap, mapOptions);
        
        var points = [];
        
        
        	for(var i=0; i<courts.length; i++){
        		var temp = [courts[i].xcoord,courts[i].ycoord]
        		var a = new google.maps.LatLng(temp[0],temp[1]);
        		points.push(a);
        		
        	}
        	
        	var bounds = new google.maps.LatLngBounds(); 
        	for(var j=0; j<points.length; j++){
        		var marker = new google.maps.Marker({
        			position: points[j],
        			map: map
        		});
        		
        		
        		
        		bounds.extend(marker.getPosition());
        		map.setCenter(bounds.getCenter());
        	}
        
        	map.setZoom(map.getZoom()); 
        
		});


       
    },
    mapCenterLatLng: function () {
        var props = this.props;

        return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
    },
    render: function () {
    	var style = {height: '300px', 
    				width: '50%'
    			}
        return (
            <div ref="gmap" className='map-gic' style={style}></div>
            );
    }
});

module.exports = GoogleMap;