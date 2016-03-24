var helper = helper || {};
var res = res || {};
cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));


    var frameSize = cc.view.getFrameSize();
    AppConstants.SCREEN_WIDTH = frameSize.width;
    AppConstants.SCREEN_HEIGHT = frameSize.height;
    AppConstants.OS = cc.sys.os;

    //Debugging
    //cc.SPRITE_DEBUG_DRAW = 2;
    //cc.SPRITEBATCHNODE_DEBUG_DRAW = 2;
    //cc.LABELBMFONT_DEBUG_DRAW = 2;
    //cc.LABELATLAS_DEBUG_DRAW = 2;

    //set the content scale factor
    if (AppConstants.SCREEN_WIDTH <= 1024) {
        AppConstants.CONTENT_SCALE_FACTOR = 1;
        AppConstants.RESOURCE_FOLDER = "ldpi";
    } else if (AppConstants.SCREEN_WIDTH <= 1024 * 2) {
        AppConstants.CONTENT_SCALE_FACTOR = 2;
        AppConstants.RESOURCE_FOLDER = "mdpi";
    } else {
        AppConstants.CONTENT_SCALE_FACTOR = 3;
        AppConstants.RESOURCE_FOLDER = "hdpi";
    }

    AppConstants.DEVICE_TYPE = AppConstants.MOBILE_VERSION;
    //getting the system language
    AppConstants.APP_LANGUAGE = cc.sys.language;

    //set hardcoded content scale factor
    //AppConstants.CONTENT_SCALE_FACTOR = 1;
    //AppConstants.RESOURCE_FOLDER = "ldpi";

    //code for changing the content scale factor according to the frame width
    cc.director.setContentScaleFactor(AppConstants.CONTENT_SCALE_FACTOR);

    //ratio for setting the design resolution
    var screenRatio = AppConstants.SCREEN_WIDTH / AppConstants.SCREEN_HEIGHT;
    var originalDesignRatio = AppConstants.ORIGINAL_DEVICE_HEIGHT / AppConstants.ORIGINAL_DEVICE_HEIGHT;

    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    var resolutionPolicy;
    if(screenRatio > originalDesignRatio) {
        resolutionPolicy = cc.ResolutionPolicy.FIXED_HEIGHT;
        cc.view.setDesignResolutionSize(AppConstants.ORIGINAL_DEVICE_WIDTH, AppConstants.ORIGINAL_DEVICE_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
    }else{
        resolutionPolicy = cc.ResolutionPolicy.FIXED_WIDTH;
        cc.view.setDesignResolutionSize(AppConstants.ORIGINAL_DEVICE_WIDTH, AppConstants.ORIGINAL_DEVICE_HEIGHT, cc.ResolutionPolicy.FIXED_WIDTH);
    }
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    var windowSize = cc.director.getWinSize();

    //storing the window size
    AppConstants.DEVICE_WIDTH = windowSize.width;
    AppConstants.DEVICE_HEIGHT = windowSize.height;

    //Init Flax
    flax.init(resolutionPolicy);
    flax.registerFont("AvenirNext", "res/shared/fonts/AvenirNext.ttf");


    //Load Global Resource
    res.shared = {
        score_png: "res/shared/" + AppConstants.RESOURCE_FOLDER + "/score.png",
        score_plist: "res/shared/" + AppConstants.RESOURCE_FOLDER + "/score.plist"
    };

    res.g_sharedResource = [];

    for (var i in res.shared){
        res.g_sharedResource.push(res.shared[i]);
    }

    AppConstants.ANDROID_FONT_MULTIPLIER = 1.3;
    if(cc.sys.os === cc.sys.OS_ANDROID){
        AppConstants.FONT_LARGE *= AppConstants.ANDROID_FONT_MULTIPLIER;
        AppConstants.FONT_NORMAL *= AppConstants.ANDROID_FONT_MULTIPLIER;
        AppConstants.FONT_SMALL *= AppConstants.ANDROID_FONT_MULTIPLIER;
    }


    cc.loader.load(res.g_sharedResource, function () {
        cc.loader.loadJs(["src/MyJSGame/main.js"], function(){
            window["MyJSGame"].setPath("src/MyJSGame/");
            window["MyJSGame"].setData({
                //imageFolderPath: 'src/MyJSGame/res/temp/',
                callbackEventName: 'callbackEventName',
                tutorial: 0
            });
            window["MyJSGame"].preload();
        });
    });


    helper.EventHelper.addCustomEvent(function (event) {
        var userData = event.getUserData();
        if(userData.name === helper.PlatformBridge.LOADED_EVENT){
            window["MyJSGame"].start();
        }
        cc.log('Event Received from MyJSGame: '+ userData.name);
    },'callbackEventName');
};

cc.game.run();
