/**
 * Created by vivekfitkariwala on 05/07/15.
 */
//exposing the object
MyJSGame.controller.PrepareControllerCommand = MyJSGame.controller.PrepareControllerCommand || {};

puremvc.define(
    //class info
    {
        name: "MyJSGame.controller.PrepareControllerCommand",
        parent: puremvc.SimpleCommand
    },

    //instance member
    {
        execute: function(note)
        {
            cc.log("Prepare Controller Command:MyJSGame");
            //this.facade.registerMediator( new MyJSGame.mediator.SplashScreenMediator);
        }
    },

    //static member
    {
        NAME: "MyJSGame_PrepareControllerCommand"
    }
)