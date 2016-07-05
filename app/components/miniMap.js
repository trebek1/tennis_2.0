var React = require('react');

 var MiniMap = React.createClass({
    
    getDefaultProps: function () {
        return {
        	
            initialZoom: 12,
            mapCenterLat: 53.5333,
            mapCenterLng: -113.4073126,
            xcoord: 37.763108,
            ycoord: -122.455799
        };
    },
    
    componentDidMount: function () {

    var _this = this; 

    var sv = new google.maps.StreetViewService();
    var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

    function processSVData(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var marker = new google.maps.Marker({
          position: data.location.latLng,
          map: map,
          title: data.location.description
        });

        panorama.setPano(data.location.pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);

        google.maps.event.addListener(marker, 'click', function() {

          var markerPanoID = data.location.pano;
          // Set the Pano to use the passed panoID
          panorama.setPano(markerPanoID);
          panorama.setPov({
            heading: 270,
            pitch: 0
          });
          panorama.setVisible(true);
        });
      } else {
        alert('Street View data not found for this location.');
      }
    }
    	
        var mapOptions = {
                center: this.mapCenterLatLng(),
                zoom: this.props.initialZoom
            },
            map = new google.maps.Map(this.refs.maps, mapOptions);

        var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});

          sv.getPanoramaByLocation(_this.mapCenterLatLng(), 50, processSVData);
      
        
    },
    mapCenterLatLng: function () {
        var props = this.props;
        

        return new google.maps.LatLng(this.props.xcoord, this.props.ycoord);
    },
    render: function () {
    	var style = {
                height: '250px', 
                width: '50%', 
                float: 'left'    
            };  
    	
    	
        return (<div>
        			<div className='map-gic' ref='maps' style={style}></div>
                    <div id="pano" style={style}></div>
        		</div>
            
            );
    }
});

module.exports = MiniMap;