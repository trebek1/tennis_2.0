var React = require('react');
var ReactFireMixin = require('reactfire')
var Firebase = require('firebase');
var helpers = require('../../utils/helpers');
var axios = require('axios');
var Map = require('./googleMap'); 

var courts = []; 

var Home = React.createClass({
	
	render: function(){
		var style = {
			textAlign: 'center'
		}
		return(
		<div className="row">
			<nav className="navbar navbar-default" style={style} role="navigation">
					<h1>
						Tennis Courts
					</h1>
				</nav>
	        <div className="col-md-6">
	          <Map/>
	        </div>
	        <div className="col-md-6">
	          <div> Something here </div>
	        </div>
      	</div>
		)
	}

});
module.exports = Home