/**
 * Created by vivekfitkariwala on 05/07/15.
 */
//exposing the object
MyJSGame.controller.StartupCommand = MyJSGame.controller.StartupCommand || {};

puremvc.define(
    //class info
    {
        name: "MyJSGame.controller.StartupCommand",
        parent: puremvc.MacroCommand
    },

    //instance member
    {
        initializeMacroCommand: function () {

            // add the PrepareControllerCommand- it will register Commands with the Facade
            this.addSubCommand(MyJSGame.controller.PrepareControllerCommand);

            // add the PrepareModelCommand- it will register Proxys with the Facade
            this.addSubCommand(MyJSGame.controller.PrepareModelCommand);

            // add the SetupViewsCommand- it will register Mediators with the Facade
            this.addSubCommand(MyJSGame.controller.PrepareViewCommand);

            //add router command
            //this.addSubCommand(controller.RouterCommand);

            ///////////////registering command ////////////////////////
            //ApplicationFacade.getInstance().registerCommand(controller.RouterCommand.START_GAME_SCREEN, controller.command.RouterCommand);

            //ApplicationFacade.getInstance().registerCommand(controller.RouterCommand.START_SCORE_SCREEN, controller.command.RouterCommand);
        }
    },

    //initialize static
    {
        NAME: "MyJSGame_StartupCommand"
    }
)