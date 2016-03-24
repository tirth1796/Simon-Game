/**
 * Created by Nil on 17/08/15.
 */

MyJSGame.mediator.layer.TutorialLayer = cc.Layer.extend({
    slides: null,
    levelProxy: null,
    levelVO: null,
    current: 0,
    keyboardListener: null,
    transitionTime: 0.2,
    fullScale: 0.8,
    smallScale: 0.5,
    pointSize: 10,
    pointSizeOffset: 50,
    playButton: null,
    playText: null,
    _margin: 20,
    _positionFactor: 0.6,

    ctor: function (nodeArray) {
        cc.log("Inside the constructor");
        this._super();

        this.slides = [];

        //initialize the variable
        this.levelProxy = MyJSGame.ApplicationFacade.getInstance(MyJSGame.ApplicationFacade.NAME).retrieveProxy(MyJSGame.model.proxy.LevelProxy.NAME);
        this.levelVO = this.levelProxy.getData();
        this.slideContainer = new cc.Node();

        var dotBackground = new cc.DrawNode();
        var dotBackgroundHeight = AppConstants.DEVICE_HEIGHT * 0.2;
        dotBackground.setContentSize(cc.size(AppConstants.DEVICE_WIDTH, dotBackgroundHeight));
        dotBackground.drawRect(cc.p(0, 0), cc.p(AppConstants.DEVICE_WIDTH, dotBackgroundHeight), MyJSGame.helper.CustomHelper.hexToRgb("#091824"), 1, MyJSGame.helper.CustomHelper.hexToRgb("#00000000"));
        this.addChild(dotBackground, 1);

        //adding play button inside the tutorial layer
        this.playButton = flax.assetsManager.createDisplay(res.shared.score_plist, "PlayButton");
        this.playButton.x = AppConstants.DEVICE_WIDTH / 2;
        this.playButton.y = dotBackgroundHeight / 2;
        this.playButton.anchorX = 0.5;
        this.playButton.anchorY = 0.5;
        helper.EventHelper.addMouseTouchEvent(this.playClicked.bind(this), this.playButton);
        this.addChild(this.playButton, 2);

        this.playText = helper.GameHelper.makeTTFFont(MyJSGame.locale.skip, MyJSGame.helper.CustomHelper.hexToRgb("#FFFFFF"), 25, cc.TEXT_ALIGNMENT_CENTER);
        this.playText.y = this.playButton.y;
        this.playText.x = this.playButton.x;
        this.playText.anchorX = 0.5;
        this.playText.anchorY = 0.5;
        this.addChild(this.playText, 3);

        var num = 1;
        while (true) {
            var tutMovieClip;
            if(AppConstants.DEVICE_TYPE == AppConstants.TV_VERSION)
                tutMovieClip = flax.assetsManager.getAssetType(MyJSGame.res.assets, 'tut' + num);
            else
                tutMovieClip = flax.assetsManager.getAssetType(MyJSGame.res.assets, 'tutMobile' + num);

            if (MyJSGame.res['tut' + num]) {
                this.slides.push(new cc.Sprite(MyJSGame.res['tut' + num]));

            } else if (tutMovieClip) {
                var tut1;
                if (AppConstants.DEVICE_TYPE == AppConstants.TV_VERSION)
                    tut1 = flax.assetsManager.createDisplay(MyJSGame.res.assets, 'tut' + num);
                else if (AppConstants.DEVICE_TYPE == AppConstants.MOBILE_VERSION)
                    tut1 = flax.assetsManager.createDisplay(MyJSGame.res.assets, 'tutMobile' + num);

                var text = helper.GameHelper.makeTTFFont("Copy the sequence of colors!", MyJSGame.helper.CustomHelper.hexToRgb("#FFFFFF"), 34, cc.TEXT_ALIGNMENT_CENTER);

                if (AppConstants.DEVICE_TYPE == AppConstants.TV_VERSION)
                    text.string = MyJSGame.locale["tut" + num];
                else if (AppConstants.DEVICE_TYPE == AppConstants.MOBILE_VERSION)
                    text.string = MyJSGame.locale["tutMobile" + num];

                text.anchorX = 0.5;
                text.anchorY = 0;
                text.x = tut1.width / 2;
                text.y = 30;
                tut1.addChild(text, 1);

                //making the container inside the tutContainer
                var maxWidth = tut1.width;
                //var maxWidth = 860;
                var maxHeight = tut1.height;
                //var maxHeight = 580;
                var tintedLayer = new cc.LayerColor(MyJSGame.helper.CustomHelper.hexToRgb("#44000000"), maxWidth, maxHeight);
                tintedLayer.x = tut1.width / 2 - maxWidth / 2;
                tintedLayer.y = tut1.height / 2 - maxHeight / 2;
                //tintedLayer.y = - text.height / 2;
                tut1.setContentSize(maxWidth, maxHeight);
                tut1.addChild(tintedLayer, 0);
                tut1.setScale(this.fullScale);

                this.slides.push(tut1);
            } else if (nodeArray && nodeArray.length && nodeArray[num - 1]) {
                this.slides.push(nodeArray[num - 1]);
            } else {
                break;
            }
            num++;
        }

        _.each(this.slides, function (slide, key) {
            slide.attr({
                x: AppConstants.DEVICE_WIDTH / 2,
                y: AppConstants.DEVICE_HEIGHT / 2 + dotBackgroundHeight / 2
            });

            slide.x += (key * AppConstants.DEVICE_WIDTH * this._positionFactor);
            slide.scale = this.smallScale;
            this.slideContainer.addChild(slide);

        }, this);

        this.addChild(this.slideContainer);
        this.slides[this.current].scale = this.fullScale;

        if (flax.assetsManager.getAssetType(MyJSGame.res.assets, 'tut' + (this.current + 1)) == flax.ASSET_MOVIE_CLIP) {
            this.slides[this.current].gotoAndPlay(0);
            this.slides[this.current].autoStopWhenOver = true;
        }

        //Adding keyboard events
        helper.EventHelper.addMouseTouchEvent(this.handleMouseEvent.bind(this), this);
        this.keyboardListener = helper.EventHelper.addKeyBoardEvent(this.handleKeyboard.bind(this), 1);
    },

    next: function () {
        if ((this.current + 1) < this.slides.length) {
            var action = cc.moveBy(this.transitionTime, cc.p(-AppConstants.DEVICE_WIDTH  * this._positionFactor, 0)).easing(cc.easeOut(this.transitionTime));
            var actionScale = cc.scaleTo(this.transitionTime, this.fullScale).easing(cc.easeOut(this.transitionTime));
            var actionSmallScale = cc.scaleTo(this.transitionTime, this.smallScale).easing(cc.easeOut(this.transitionTime));
            var prevScale = cc.targetedAction(this.slides[this.current], actionSmallScale);
            var slide = cc.targetedAction(this.slideContainer, action);

            //stop the last frame
            if (flax.assetsManager.getAssetType(MyJSGame.res.assets, 'tut' + (this.current + 1)) == flax.ASSET_MOVIE_CLIP) {
                this.slides[this.current].gotoAndStop(0);
            }

            //remove all the actions
            this.slides[this.current].stopAllActions();

            this.current += 1;

            //remove all the actions
            this.slides[this.current].stopAllActions();

            var currentScale = cc.targetedAction(this.slides[this.current], actionScale);
            this.slideContainer.runAction(cc.spawn(slide, prevScale, currentScale));

            //play the current frame
            if (flax.assetsManager.getAssetType(MyJSGame.res.assets, 'tut' + (this.current + 1)) == flax.ASSET_MOVIE_CLIP) {
                this.slides[this.current].gotoAndPlay(0);
                this.slides[this.current].autoStopWhenOver = true;
            }

            //change the play text
            if (this.current == this.slides.length - 1) {
                //removing the play button
                var playButtonX = this.playButton.x;
                var playButtonY = this.playButton.y;
                this.removeChild(this.playButton);

                //add the play button again
                this.playButton = flax.assetsManager.createDisplay(res.shared.score_plist, "PlayGreen");
                this.playButton.x = playButtonX;
                this.playButton.y = playButtonY;
                this.playButton.anchorX = 0.5;
                this.playButton.anchorY = 0.5;
                helper.EventHelper.addMouseTouchEvent(this.playClicked.bind(this), this.playButton);
                this.addChild(this.playButton, 2);

                this.playText.setString(MyJSGame.locale.play);
            }

        }
    },
    prev: function () {
        if (this.current > 0) {
            var action = cc.moveBy(this.transitionTime, cc.p(AppConstants.DEVICE_WIDTH * this._positionFactor, 0)).easing(cc.easeOut(this.transitionTime));
            var actionScale = cc.scaleTo(this.transitionTime, this.fullScale).easing(cc.easeOut(this.transitionTime));
            var actionSmallScale = cc.scaleTo(this.transitionTime, this.smallScale).easing(cc.easeOut(this.transitionTime));
            var prevScale = cc.targetedAction(this.slides[this.current], actionSmallScale);
            var slide = cc.targetedAction(this.slideContainer, action);

            //stop the last frame
            if (flax.assetsManager.getAssetType(MyJSGame.res.assets, 'tut' + (this.current + 1)) == flax.ASSET_MOVIE_CLIP) {
                this.slides[this.current].gotoAndStop(0);
            }

            //remove all the actions
            this.slides[this.current].stopAllActions();

            this.current -= 1;

            //remove all the actions
            this.slides[this.current].stopAllActions();

            var currentScale = cc.targetedAction(this.slides[this.current], actionScale);
            this.slideContainer.runAction(cc.spawn(slide, prevScale, currentScale));

            //play the current frame
            if (flax.assetsManager.getAssetType(MyJSGame.res.assets, 'tut' + (this.current + 1)) == flax.ASSET_MOVIE_CLIP) {
                this.slides[this.current].gotoAndPlay(0);
                this.slides[this.current].autoStopWhenOver = true;
            }
        }
    },

    handleMouseEvent: function (event, touch, action) {
        switch (action) {
            case helper.EventHelper.ON_CLICK:
            case helper.EventHelper.ON_SWIPE_LEFT:
                this.next();
                break;
            case helper.EventHelper.ON_SWIPE_RIGHT:
                this.prev();
                break;
        }
        return true;
    },
    handleKeyboard: function (event, keyCode, action) {
        if (action === helper.EventHelper.ON_BEGAN) {
            switch (keyCode) {
                case cc.KEY.left:
                    this.prev();
                    break;
                case cc.KEY.enter:
                    this.startTheGame();
                    break;
                case cc.KEY.right:
                    this.next();
                    break;
            }
        }
        return true;
    },

    playClicked: function (event, touch, state) {
        if (state == helper.EventHelper.ON_CLICK) {
            this.playButton.gotoAndStop(0);
            this.playText.setColor(MyJSGame.helper.CustomHelper.hexToRgb("#FFFFFF"));
            this.startTheGame();
        } else if (state == helper.EventHelper.ON_BEGAN) {
            this.playButton.gotoAndStop(1);
            this.playText.setColor(MyJSGame.helper.CustomHelper.hexToRgb("#CCCCCC"));
        } else if (state == helper.EventHelper.ON_END) {
            this.playButton.gotoAndStop(0);
            this.playText.setColor(MyJSGame.helper.CustomHelper.hexToRgb("#FFFFFF"));
        } else if (state == helper.EventHelper.ON_OUT) {
            this.playButton.gotoAndStop(0);
            this.playText.setColor(MyJSGame.helper.CustomHelper.hexToRgb("#FFFFFF"));
        }
        return true;
    },

    startTheGame: function () {
        helper.EventHelper.removeEventListener(this.keyboardListener);
        this.parent.startGame();
        this.parent.removeChild(this);
    }
});