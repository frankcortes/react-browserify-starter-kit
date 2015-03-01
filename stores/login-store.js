var MicroEvent = require('microevent-github');
var AppDispatcher = require('../core/dispatcher');


//Singleton to store login actions
var LoginStore = {
	//Initial status
	isLoginOpened: false,
	//Accessor of status
	getStatus: function () {
		return this.isLoginOpened;
	}
};

//Add event emitter for store
//We are using microeventjs because it's tiny and cool
MicroEvent.mixin(LoginStore);

//Possible events for this store
AppDispatcher.register(function(payload) {
	switch(payload.eventName) {

		case 'login:switch':
			LoginStore.isLoginOpened = !LoginStore.isLoginOpened;
			LoginStore.trigger('change');
			break;

	}

	return true; // Needed for Flux promise resolution

});

module.exports = LoginStore;
