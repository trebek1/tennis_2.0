var React = require('react');

 var GoogleMap = React.createClass({
    getDefaultProps: function () {
        return {
            initialZoom: 6,
            mapCenterLat: 53.5333,
            mapCenterLng: -113.4073126
        };
    },
    componentDidMount: function (rootNode) {
        var mapOptions = {
                center: this.mapCenterLatLng(),
                zoom: this.props.initialZoom
            },
            map = new google.maps.Map(this.getDOMNode(), mapOptions);
        var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        this.setState({map: map});
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
            <div className='map-gic' style={style}></div>
            );
    }
});

module.exports = GoogleMap;