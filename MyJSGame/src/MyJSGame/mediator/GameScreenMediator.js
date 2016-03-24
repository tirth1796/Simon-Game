/**
 * Created by vivekfitkariwala on 06/07/15.
 */
MyJSGame.mediator.GameScreenMediator = MyJSGame.mediator.GameScreenMediator || {};

puremvc.define(
    //class info
    {
        name: "MyJSGame.mediator.GameScreenMediator",
        parent: puremvc.Mediator
    },

    //instance member
    {
        gameScreenView: null,

        onRegister: function () {

        },

        onRemove: function () {

        },

        startTheGame: function(){
            cc.log("Start the game: MyJSGame");
            this.gameScreenView = new MyJSGame.mediator.scene.MyJSGameScene();
            cc.director.pushScene(this.gameScreenView);
        }
    },

    //static member
    {
        NAME: "MyJSGame_GameScreenMediator"
    }
)