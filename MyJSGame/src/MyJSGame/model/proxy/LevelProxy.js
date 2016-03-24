/**
 * Created by vivekfitkariwala on 06/07/15.
 */
MyJSGame.model.proxy.LevelProxy = MyJSGame.model.proxy.LevelProxy || {}

puremvc.define(
    //class info
    {
        name: "MyJSGame.model.proxy.LevelProxy",
        parent: puremvc.Proxy
    },

    //instance member
    {
        vo:null,
        callbackFunction: null,

        onRegister: function(){
            cc.log("Level Proxy Registered");
            this.setData(new MyJSGame.model.vo.LevelVO());
            this.vo = this.getData();
        },

        loadLevel: function (data, callback) {
            callback && callback();
        }
    },

    //static member
    {
        NAME: "MyJSGame_LevelProxy"
    }
);