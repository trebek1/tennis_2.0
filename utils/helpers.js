var axios = require('axios');
var Firebase = require('firebase');


var helpers = {

	getCourtInfo: function(){
		return axios.get('https://tenniscourtapp.firebaseio.com/');
	}

};

module.exports = helpers; 