var React = require('react');
var Firebase = require('firebase');
var Map = require('./googleMap'); 

var courts = []; 

var Home = React.createClass({
	
	render: function(){
		
		return(
		<div>
			<nav className="navbar navbar-default main-heading" role="navigation">
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