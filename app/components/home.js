var React = require('react');
var ReactFireMixin = require('reactfire')
var Firebase = require('firebase');
var helpers = require('../../utils/helpers');
var axios = require('axios');
var Map = require('./googleMap'); 

var courts = []; 

var Home = React.createClass({
	
	getInitialState: function(){
		 return {
		 	
		 }
	},

	componentDidMount: function(){
	
	var _this = this;
	var ref = new Firebase('https://sftennisapp.firebaseio.com')
	ref.once("value", function(snapshot) {
		//console.log("take the shot ", snapshot.val().sfcourts[0]);
		
		_this.setState({
			courts: snapshot.val().sfcourts
		});

	});
    	
  },
	
	render: function(){
		console.log("this is courts! ", courts);
		var _this = this; 
		return(
			<div>
				<h2 className="text-center"> Tennis Courts </h2>
				<div>
				{JSON.stringify(_this.state.courts)}
				 </div>
				 <br/>
				<div>
				<Map mlat="55.0000" mlong="-113.0000"/>
				</div>
				<br/>		
				
			</div>
		)
	}

});
module.exports = Home