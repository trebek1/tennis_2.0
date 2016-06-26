var axios = require('axios');
var Firebase = require('firebase');


var helpers = {

	getCourtInfo: function(){
		return axios.get('https://tenniscourtapp.firebaseio.com/').then(function(response){
			console.log("This is courts ", response);
		})
	}

};

module.exports = helpers; 