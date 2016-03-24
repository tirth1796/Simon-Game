MyJSGame.mediator.scene.MyJSGameScene = cc.Scene.extend({
    layer:null,
    bgLayer:null,
    onEnter:function () {
        this._super();
        this.bgLayer = new MyJSGame.mediator.layer.BgLayer();
        this.addChild(this.bgLayer);
        
        if(MyJSGame.data.tutorial == 1){
            this.TutorialLayer = new MyJSGame.mediator.layer.TutorialLayer();
            this.addChild(this.TutorialLayer);
        }else{
            this.startGame();
        }
    },
    startGame: function () {
        this.removeAllChildren(true);
        this.addChild(this.bgLayer);
        this.layer = new MyJSGame.mediator.layer.MyJSGameLayer();
        this.addChild(this.layer);
    },
    gameOver: function () {
        this.removeChild(this.layer);
        this.scoreLayer = new MyJSGame.mediator.layer.ScoreLayer();
        this.addChild(this.scoreLayer);
    },
    onBack: function () {
        helper.PlatformBridge.back(MyJSGame.data);
    },
    onExit: function () {
        if(MyJSGame.data.name=="back" || MyJSGame.data.name=="completed"){
            cc.log("MyJSGame: Disposing Resources");
            this._super();
            puremvc.Facade.removeCore(MyJSGame.ApplicationFacade.NAME);
            //flax.assetsManager.removeAssets(MyJSGame.res.assets_plist);
            helper.AudioHelper.stopMusic(true);
            _.each(MyJSGame.g_resources, function(item) {
                cc.loader.release(item);
                cc.textureCache.removeTextureForKey(item);
            });

            if(cc.sys.isNative){
                _.each(MyJSGame.jsList, function(item) {
                    cc.sys.cleanScript(item);
                });
            }
        }
    }
});

