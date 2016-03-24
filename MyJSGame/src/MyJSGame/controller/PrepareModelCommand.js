/**
 * Created by vivekfitkariwala on 05/07/15.
 */
//exposing the object
MyJSGame.controller.PrepareModelCommand = MyJSGame.controller.PrepareModelCommand || {};

puremvc.define(
    //class info
    {
        name: "MyJSGame.controller.PrepareModelCommand",
        parent: puremvc.SimpleCommand
    },

    //instance member
    {
        execute: function (note) {
            cc.log("Prepare Model Command:MyJSGame");
            //register level proxy
            this.facade.registerProxy(new MyJSGame.model.proxy.LevelProxy);
        }
    },

    //static member
    {
        NAME: "MyJSGame_PrepareModelCommand"
    }
)