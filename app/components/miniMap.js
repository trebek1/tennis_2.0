var React = require('react');

 var MiniMap = React.createClass({
    getInitialState: function(){

          return {
            
            initialZoom: 12,
            mapCenterLat: 53.5333,
            mapCenterLng: -113.4073126,
            xcoord: 37.763108,
            ycoord: -122.455799
        };

    },
    getDefaultProps: function () {
        return {
        	
            initialZoom: 12,
            mapCenterLat: 53.5333,
            mapCenterLng: -113.4073126,
            xcoord: 37.763108,
            ycoord: -122.455799
        };
    },
    compoentWillUpdate: function(){
        console.log("AAAAAAAA ", this.state); 
    },
    componentWillReceiveProps: function(){
        this.setState({
            xcoord: this.props.xcoord, 
            ycoord: this.props.ycoord
        }); 
        console.log("BBBBBBBBB ", this.props);
    },
    componentDidMount: function () {
    	console.log("RUNNER")
        var mapOptions = {
                center: this.mapCenterLatLng(),
                zoom: this.props.initialZoom
            },
            map = new google.maps.Map(this.refs.maps, mapOptions);
        var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        this.setState({map: map,
        	xcoord: this.props.xcoord,
        	ycoord: this.props.ycoord});

        console.log("This is the props ", this.props)
    },
    mapCenterLatLng: function () {
        var props = this.props;


        return new google.maps.LatLng(this.props.xcoord, this.props.ycoord);
    },
    render: function () {
        console.log("render is run!")
    	var style; 
    	
    	if(!this.props.selected && this.props.xcoord === 37.763108){
    		style = {
				height: '300px', 
				width: '50%'
				
    		};	
    	}else{
    		style = {
				height: '300px', 
				width: '50%'
				
    		};	
    	}
    	
        return (<div>
        			<div className='map-gic' ref='maps' style={style}></div>
        		</div>
            
            );
    }
});

module.exports = MiniMap;