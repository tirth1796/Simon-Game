/**
 * Created by vivekfitkariwala on 05/07/15.
 */
MyJSGame.ApplicationFacade = MyJSGame.ApplicationFacade || {};

puremvc.define(
    //class info
    {
        name: "MyJSGame.ApplicationFacade",
        parent: puremvc.Facade
    },

    //instance member
    {
        /**
         * A convenience method to start the PureMVC apparatus
         *
         * @return {void}
         */
        startup: function () {
            if (!this.initialized) {
                this.initialized = true;
                // associate the SetupCommand with the STARTUP notification
                this.registerCommand(AppConstants.STARTUP_COMMAND, MyJSGame.controller.StartupCommand);

                // issue the SETUP notification to execute StartupCommand

                this.sendNotification(AppConstants.STARTUP_COMMAND);
            }
        }
    },

    // STATIC MEMBERS
    {
        /**
         * Retrieve an instance of ApplicationFacade. If one has not yet been
         * instantiated, one will be created for you.
         *
         * @static
         * @param {string} multitonKey
         * @return ApplicationFacade
         */
        getInstance: function (multitonKey) {
            // all Facade instances, including Facade subclass instances, are stored
            // on Facade.instanceMap. When implementing you own #getInstance factory
            // method, ensure that follow the general pattern implemented here or else
            // puremvc.Facade#hasCore and puremvc.Facade#removeCore will not work if
            // you ever need to use them.
            var instanceMap = puremvc.Facade.instanceMap;
            var instance = instanceMap[multitonKey]; // read from the instance map

            if (instance) // if there is an instance...
                return instance; // return it

            // otherwise create a new instance and cache it on Facade.instanceMap;
            return instanceMap[multitonKey] = new MyJSGame.ApplicationFacade(multitonKey);
        },

        NAME: 'MyJSGame_GameTemplate'
    }
)

