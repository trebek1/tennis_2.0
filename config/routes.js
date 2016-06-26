var React = require('react'); 
var Home = require('../app/components/home'); 
var Router = require('react-router');
var Route = Router.Route; 
var IndexRoute = Router.IndexRoute;

	
module.exports = (
	<Route path="/" component={Home}>
		<IndexRoute component={Home} /> // show this route if none match
	</Route>
	)
	