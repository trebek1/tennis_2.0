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
    	var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#3a3a3a"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"100"},{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"34"},{"color":"#e74110"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#090909"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#1a1a1a"}]}]; 
        var mapOptions = {
                center: this.mapCenterLatLng(),
                zoom: this.props.initialZoom,
                styles: styles 
            },
            map = new google.maps.Map(this.refs.maps, mapOptions);

        //var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});

          sv.getPanoramaByLocation(_this.mapCenterLatLng(), 50, processSVData);
      
        
    },
    mapCenterLatLng: function () {
        var props = this.props;
        

        return new google.maps.LatLng(this.props.xcoord, this.props.ycoord);
    },
    render: function () {
    	
      var style = {
                height: '216px', 
                width: '50%', 
                float: 'left'    
      };  

      var componentStyle = {
          margin: '1em'

      };
    	
        return (<div style = {componentStyle}>
        			<div className='map-gic' ref='maps' style={style}></div>
                    <div id="pano" style={style}></div>
        		</div>
            
            );
    }
});

module.exports = MiniMap;