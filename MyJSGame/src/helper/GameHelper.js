/**
 * Created by vivekfitkariwala on 29/09/15.
 */
helper.GameHelper = helper.GameHelper || {};

puremvc.define(
    //class info
    {
        name: "helper.GameHelper"
    },

    //instance member
    {

    },

    //static member
    {
        NAME: "GameHelper",
        pausedTimer:null,

        //making bitmap font
        makeBitmapFont: function(str, fntFile, color, width, alignment, imageOffSet){
            var label = new cc.LabelBMFont(str, fntFile, width, alignment, imageOffSet);
            if(color != null)
                label.setColor(color);
            return label;
        },

        makeTTFFont: function (str, fntFile, color, fontSize, hAlignment, vAlignment,dimensions) {
            if(arguments.length === 4){
                hAlignment = fontSize;
                fontSize = color;
                color = fntFile;
                fntFile = AppConstants.MAIN_FONT;
            }
            var label = new cc.LabelTTF(str, fntFile, fontSize, dimensions, hAlignment, vAlignment);
            //change the color
            if (color != null)
                label.setColor(color);
            return label;
        },

        //making the sprite from texture atlas
        makeSprite: function(name){
            var sprite = new cc.Sprite(name);
            return sprite;
        },

        //make spriteBatchNode from texture
        makeSpriteBatchNode: function(name, capacity){
            var spriteBatchNode = new cc.SpriteBatchNode(name, capacity);
            return spriteBatchNode;
        },

        //making animation and adding inside animation cache
        makeAnimation: function(frameName, delay, loop, animationName){
            var animFrames = [];
            var str = "";

            for(var i = 1; i > -1; i++){
                str = frameName + (i < 10 ? ("000" + i) : "00" + i) + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                if(frame != null) {
                    animFrames.push(frame);
                }else{
                    break;
                }
            }

            var animation = new cc.Animation(animFrames, delay, loop);
            cc.animationCache.addAnimation(animation, animationName);
        },

        sendRecommendation: function(userData){
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.open("POST", "https://brainbuilder.herokuapp.com/recommendation/add");
            xhrRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.setRequestHeader("Content-Type", "application/json");

            var progressProxy = platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).retrieveProxy(platform.model.ProgressProxy.NAME);
            var progressVO = progressProxy.getData();

            var currentUser = progressVO.currentUser;

            var object = {};
            object.contentId = userData.ID;
            object.userId = currentUser;
            object.userAge = userData.kidage;
            object.like = userData.like;
            object.type = userData.type;

            var args = JSON.stringify(object);
            cc.log("Log arguments " + args);
            xhrRequest.send(args);
        },
        hexToRgb: function (hex) {
            var hex = hex.replace('#', '');
            var r;
            var g;
            var b;
            var a;
            var color;
            if (hex.length == 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
                color = new cc.color(r, g, b);
            } else {
                a = parseInt(hex.substring(0, 2), 16);
                r = parseInt(hex.substring(2, 4), 16);
                g = parseInt(hex.substring(4, 6), 16);
                b = parseInt(hex.substring(6, 8), 16);
                color = new cc.color(r, g, b, a);
            }

            return color;
        },
        deleteRecommendation: function(userData){
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.open("POST", "https://brainbuilder.herokuapp.com/recommendation/delete");
            xhrRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.setRequestHeader("Content-Type", "application/json");
            var object = {};
            object.contentId = userData.ID;
            object.userAge = userData.kidage;

            var args = JSON.stringify(object);
            cc.log("Log arguments " + args);
            xhrRequest.send(args);
        },
        isScenePaused: function () {
            var currentScene = cc.director.getRunningScene();
            return currentScene.paused;
        },
        pauseScene: function () {
            var currentScene = cc.director.getRunningScene();
            currentScene.paused = true;
            currentScene.pause();
            cc.eventManager.pauseTarget(currentScene,true);
            var scheduler = currentScene.getScheduler();
            //FIXME @nilesh Enable Schedular pause for native
            //Need Modification in js-binding tools/tojs/cocos2dx.ini
            //Scheduler::[pause resume ^unschedule$ unscheduleUpdate unscheduleAllForTarget schedule isTargetPaused isScheduled pauseAllTargets],
            //scheduler.pauseAllTargets();
            helper.AudioHelper.pauseMusic();
        },
        resetCurrentScene:function (){
            var currentScene = cc.director.getRunningScene();
            currentScene.resume();
            var scheduler = currentScene.getScheduler();
            //FIXME @nilesh Enable Schedular pause for native
            //var paused = scheduler.pauseAllTargets();
            //currentScene._scheduler.resumeTargets(paused);
            cc.eventManager.resumeTarget(currentScene,true);
            delete currentScene.paused;
        },
        resumeScene: function () {
            helper.GameHelper.resetCurrentScene();
            helper.AudioHelper.resumeMusic();
        }
    }
)