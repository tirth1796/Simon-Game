//define the scope of the MyJSGame
var MyJSGame = MyJSGame || {};

MyJSGame.init = function(){
    MyJSGame.controller = MyJSGame.controller || {};
    MyJSGame.helper = MyJSGame.helper || {};
    MyJSGame.mediator = MyJSGame.mediator || {};
    MyJSGame.mediator.view = MyJSGame.mediator.view || {};
    MyJSGame.mediator.scene = MyJSGame.mediator.scene || {};
    MyJSGame.mediator.layer = MyJSGame.mediator.layer || {};
    MyJSGame.model = MyJSGame.model || {};
    MyJSGame.model.vo = MyJSGame.model.vo || {};
    MyJSGame.model.proxy = MyJSGame.model.proxy || {};
    MyJSGame.ApplicationFacade = MyJSGame.ApplicationFacade || {};
    MyJSGame.path = MyJSGame.path || '';
    MyJSGame.data = MyJSGame.data || {};

    MyJSGame.jsList = [
        "controller/PrepareControllerCommand.js",
        "controller/PrepareModelCommand.js",
        "controller/PrepareViewCommand.js",
        "controller/StartupCommand.js",
        "ApplicationFacade.js",
        "helper/CustomHelper.js",
        "mediator/layer/MyJSGameLayer.js",
        "mediator/layer/TutorialLayer.js",
        "mediator/layer/ScoreLayer.js",
        "mediator/layer/BgLayer.js",
        "mediator/scene/MyJSGameScene.js",
        "mediator/GameScreenMediator.js",
        "model/proxy/LevelProxy.js",
        "model/vo/LevelVO.js",
        "resource.js"
    ];
}

MyJSGame.init();
MyJSGame.setPath = function (path) {
    MyJSGame.path = path;
};

MyJSGame.getPath = function (asset) {
    if(typeof asset === "undefined")
        return MyJSGame.path;
    else
        return MyJSGame.path + asset;
};

MyJSGame.setData = function (data) {
    DEFAULT_SOUNDS_FOLDER = MyJSGame.path + "/res/sound/";
    MyJSGame.data = data;
};


MyJSGame.preload = function(){
    cc.log("inside MyJSGame start");
    MyJSGame.init();

    for(var i = 0; i< MyJSGame.jsList.length;i++){
        MyJSGame.jsList[i] = MyJSGame.path + MyJSGame.jsList[i];
    }

    //loading the scripts and resources
    cc.loader.loadJs(MyJSGame.jsList, function(){
        MyJSGame.loadEnglishLanguage();
    }.bind(this));
};

MyJSGame.loadEnglishLanguage = function(){
    cc.loader.loadJson(MyJSGame.res_locale.en, function (error,data) {
        cc.log('Loaded english');
        MyJSGame.locale = data;
        var systemLanguage = AppConstants.APP_LANGUAGE;
        if(systemLanguage !== 'en' && MyJSGame.res_locale[systemLanguage]){
            cc.loader.loadJson(MyJSGame.res_locale[systemLanguage], MyJSGame.loadedSystemLanguage.bind(this));
        }else{
            //adding the shared resource
            MyJSGame.loadAssets();
        }
    }.bind(this));
};

MyJSGame.loadedSystemLanguage = function(error,data){
    //merging local language
    MyJSGame.locale = _.assign(MyJSGame.locale,data);
    MyJSGame.loadAssets();
};

MyJSGame.loadAssets = function(){
    //loading the scripts and resources
    cc.loader.load(MyJSGame.g_resources, function(){
        cc.log(MyJSGame.ApplicationFacade.NAME);
        MyJSGame.ApplicationFacade.getInstance(MyJSGame.ApplicationFacade.NAME).startup();
        var levelProxy = MyJSGame.ApplicationFacade.getInstance(MyJSGame.ApplicationFacade.NAME).retrieveProxy(MyJSGame.model.proxy.LevelProxy.NAME);
        levelProxy.loadLevel(MyJSGame.data, MyJSGame.loaded.bind(this));
    });
};

MyJSGame.loaded = function() {
    helper.PlatformBridge.loaded(MyJSGame.data);
};

MyJSGame.start = function() {
    var gameScreenMediator = MyJSGame.ApplicationFacade.getInstance(MyJSGame.ApplicationFacade.NAME).retrieveMediator(MyJSGame.mediator.GameScreenMediator.NAME);
    gameScreenMediator.startTheGame();
};

