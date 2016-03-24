/**
 * Created by vivekfitkariwala on 06/07/15.
 */

MyJSGame.model.vo.LevelVO = MyJSGame.model.vo.LevelVO || {};

puremvc.define(
    //class info
    {
        name: "MyJSGame.model.vo.LevelVO"
    },

    //instance member
    {
        data:null,
        imageFolderPath:'',
        score:0,
        star:0,
        platformCallback:null
    },

    //static member
    {
        NAME: "MyJSGame_LevelVO"
    }
);