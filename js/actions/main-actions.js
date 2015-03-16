var AppDispatcher = require('../core/dispatcher');

//These actions are executed for main page
var MainActions = {
    switchLogin: function() {
        AppDispatcher.dispatch({
            eventName: 'login:switch'
        });
    }
};

module.exports = MainActions;