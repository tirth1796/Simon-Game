/**
 * Created by vivekfitkariwala on 05/07/15.
 */
//exposing the object
MyJSGame.controller.PrepareViewCommand = MyJSGame.controller.PrepareViewCommand || {};

puremvc.define(
    //class info
    {
        name: "MyJSGame.controller.PrepareViewCommand",
        parent: puremvc.SimpleCommand
    },

    //instance member
    {
        execute: function(note)
        {
            cc.log("Prepare View Command:MyJSGame");
            this.facade.registerMediator( new MyJSGame.mediator.GameScreenMediator);
        }
    },

    //static member
    {
        NAME: "MyJSGame_PrepareViewCommand"
    }
)