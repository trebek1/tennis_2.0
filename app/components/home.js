var React = require('react');
var Firebase = require('firebase');
var Map = require('./googleMap'); 

var courts = []; 

var Home = React.createClass({
	
	render: function(){
		
		return(
		<div className="row">
			<nav className="navbar navbar-default" role="navigation">
					<h1 className="main-heading">
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