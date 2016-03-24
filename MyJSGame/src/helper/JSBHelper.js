/**
 * Created by vivekfitkariwala on 07/08/15.
 */
helper.JSBHelper = helper.JSBHelper || {};

puremvc.define(
    //class info
    {
        name: "helper.JSBHelper"
    },

    //instance member
    {},

    //static member
    {
        NAME: "HELPER_JSB_HELPER",
        ASSET_DOWNLOADED: "HELPER_ASSET_DOWNLOADED",
        ZIP_DOWNLOADED: "HELPER_ZIP_DOWNLOADED",
        BOOK_BACK_PRESSED: "HELPER_BOOK_BACK_PRESSED",
        MUSIC_BACK_PRESSED: "HELPER_MUSIC_BACK_PRESSED",
        GAME_BACK_PRESSED: "HELPER_GAME_BACK_PRESSED",
        WEB_ACTIVITY_BACK_PRESSED: "HELPER_WEB_ACTIVITY_BACK_PRESSED",

        startAssetDownload: function (assetURL, folderName, assetName) {
            //call the jsb function for downloading image
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "downloadAsset", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", assetURL, folderName, assetName);
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("JSBHelper", "downloadAssetWithURL:folderName:assetName:", assetURL, folderName, assetName);
            }
        },

        assetDownloaded: function (message, assetURL) {
            //send callback when image is downloaded
            var object = {
                message: message,
                url: assetURL
            };
            //dispatch notification for receiving asset
            platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).sendNotification(helper.JSBHelper.ASSET_DOWNLOADED, object);
        },

        playVideo: function (stringData) {
            //starting the youtube video
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "startYouTubeVideo", "(Ljava/lang/String;)V", stringData);
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("JSBHelper", "LoadWebViewWithData:", stringData);
            }else if(!cc.sys.isNative) {
                var data = JSON.parse(stringData);
                window.open('https://www.youtube.com/embed/'+data.videoID+'?autoplay=1&controls=1&rel=0&showinfo=0&enablejsapi=1','_blank');
            }
        },

        playMusic: function (stringData) {
            //starting the music
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "startMusicPlayer", "(Ljava/lang/String;)V", stringData);
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("JSBHelper", "Log:", "playMusic");
            }
        },

        musicBackPressed: function (stringData) {
            var object = JSON.parse(stringData);

            //dispatch notification for receiving music
            platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).sendNotification(helper.JSBHelper.MUSIC_BACK_PRESSED, object);
        },

        videoBackPressed: function (stringData) {
            cc.log("Video Back Pressed");

            var object = JSON.parse(decodeURIComponent(stringData));

            //dispatch notification for receiving image
            platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).sendNotification(helper.JSBHelper.WEB_ACTIVITY_BACK_PRESSED, object);
        },

        bookBackPressed: function (stringData) {
            cc.log("Book back pressed");
            var object = JSON.parse(stringData);
            //dispatch notification for receiving image
            platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).sendNotification(helper.JSBHelper.WEB_ACTIVITY_BACK_PRESSED, object);
        },

        gameBackPressed: function (stringData) {
            cc.log("Game back pressed");
            var object = JSON.parse(stringData);
            //dispatch notification for receiving image
            platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).sendNotification(helper.JSBHelper.WEB_ACTIVITY_BACK_PRESSED, object);
        },

        startDownloadingAndExtractingZip: function (zipURL, folderName, zipName) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "downloadZipAndExtract", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", zipURL, folderName, zipName);
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("JSBHelper", "downloadZipWithURL:folderName:assetName:", zipURL, folderName, zipName);
            }
        },

        zipDownloadingAndExtractingComplete: function (message, zipURL) {
            var object = {
                message: message,
                url: zipURL
            };

            cc.log("Zip Download and Extract Complete");

            //dispatch notification for receiving image
            platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).sendNotification(helper.JSBHelper.ZIP_DOWNLOADED, object);
        },

        playWebGame: function (stringObject) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "playGame", "(Ljava/lang/String;)V", stringObject);
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("JSBHelper", "LoadWebViewWithData:", stringObject);
            }else if(!cc.sys.isNative) {
                var data = JSON.parse(stringObject);
                window.open('http://www.playpowerlabs.org/lwactivities/'+data.zipName,'_blank');
            }

        },

        playVideoOffline: function (stringData) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "videoPlayer", "(Ljava/lang/String;)V", stringData);
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("JSBHelper", "Log:", "playVideo");
            }else if(!cc.sys.isNative) {
                var data = JSON.parse(decodeURIComponent(stringData));
                if(data.videoID)
                    window.open('https://www.youtube.com/embed/'+data.videoID+'?autoplay=1&controls=1&rel=0&showinfo=0&enablejsapi=1','_blank');
            }
        },

        startBook: function (stringObject) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openBook", "(Ljava/lang/String;)V", stringObject);
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("JSBHelper", "LoadWebViewWithData:", stringObject);
            }else if(!cc.sys.isNative) {
                var data = JSON.parse(stringObject);
                window.open(data.URL,'_blank');
            }
        },

        viewSource: function (sourceUrl) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openUrl", "(Ljava/lang/String;)V", sourceUrl);
            }else if(cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("JSBHelper", "LoadSourceWithURL:", sourceUrl);
            }
        },

        TTS: function (sentence) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "TTS", "(Ljava/lang/String;)V", sentence);
            }else if(cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("JSBHelper", "TTSWithString:", sentence);
            }
        },

        analyticsSetUserDetail: function () {
            //retriving the levelVO data
            var _progressProxy = platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).retrieveProxy(platform.model.ProgressProxy.NAME);
            var _progressVO = _progressProxy.getData();

            var userVO = _progressVO.userVOObject;

            var analyticUserID = _progressVO.currentUser;
            var analyticUserDetail = {};
            analyticUserDetail.childName = userVO[analyticUserID][platform.LocalStorageConstants.CHILD_NAME];
            analyticUserDetail.childAge = userVO[analyticUserID][platform.LocalStorageConstants.CHILD_AGE];
            analyticUserDetail.childGender = userVO[analyticUserID][platform.LocalStorageConstants.CHILD_GENDER];
            analyticUserDetail.profilePic = userVO[analyticUserID][platform.LocalStorageConstants.CHILD_PROFILE_PIC];
            analyticUserDetail.parentEmail = userVO[platform.LocalStorageConstants.PARENT_EMAIL];

            //convert analyticUserDetail to string
            var analyticStringUserDetail = JSON.stringify(analyticUserDetail);


            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppAnalytics", "setUserDetail", "(Ljava/lang/String;Ljava/lang/String;)V", analyticUserID, analyticStringUserDetail);
            } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                //jsb.reflection.callStaticMethod("JSBHelper", "customUserId", "(Ljava/lang/String;)V", userId);
            }
        },

        analyticsSetScreen: function (screenCategory, screenName, properties) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppAnalytics", "trackScreen", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", screenCategory, screenName, properties);
            } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                //jsb.reflection.callStaticMethod("JSBHelper", "customUserId", "(Ljava/lang/String;)V", userId);
            }
        },

        analyticsLogEvent: function (eventName, eventProperties) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppAnalytics", "trackAction", "(Ljava/lang/String;Ljava/lang/String;)V", eventName, eventProperties);
            } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                //jsb.reflection.callStaticMethod("JSBHelper", "customUserId", "(Ljava/lang/String;)V", userId);
            }
        },

        getExternalStoragePath: function () {
            var storagePath = "";
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                storagePath = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getExternalPath", "()Ljava/lang/String;");
            } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                storagePath = jsb.reflection.callStaticMethod("JSBHelper", "getExternalPath");
            }

            return storagePath;
        },
        //For TV Version;
        getServerPath: function () {
            var serverPath = "";
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                serverPath = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getServerPath", "()Ljava/lang/String;");
            }
            return serverPath;
        },

        checkDirectoryExists: function (directoryPath) {
            if (cc.sys.isNative) {
                if (jsb.fileUtils.isDirectoryExist(directoryPath) == true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        openWebLink: function (url) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openWebLink", "(Ljava/lang/String;)V",url);
            }
        },

        shareMessage: function (message) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareMessage", "(Ljava/lang/String;)V",message);
            }
        },
        exitApp: function () {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "exitApp", "()V");
            }
        },
        saveLoaderUserData: function () {
            var currentScene = cc.director.getRunningScene();
            if(currentScene && currentScene.NAME == 'LoaderView'){
                var progressProxy = platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).retrieveProxy(platform.model.ProgressProxy.NAME);
                progressProxy.saveUserVOData();
            }
        },
        checkFileExists: function (filePath) {
            if (cc.sys.isNative) {
                if (jsb.fileUtils.isFileExist(filePath) == true) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
)