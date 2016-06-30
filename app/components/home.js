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
						Tennis Courts in San Francisco
					</h1>
				</nav>
	        <div>
	          <Map/>
	        </div>
      	</div>
		)
	}

});
module.exports = Home