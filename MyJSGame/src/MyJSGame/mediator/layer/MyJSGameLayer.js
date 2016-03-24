/**
 * Created by Tirth Shah on 17/08/15.
 * tirthcshah@gmail.com
 */

MyJSGame.mediator.layer.MyJSGameLayer = cc.Layer.extend({
    orientationBar:null,
    scaleH:1522,
    scaleFunc:null,
    square:null,
    diamond:null,
    level: 0,
    size: 0,
    lifeBar: null,
    scoreBar: null,
    multiplierBar: null,
    multiplierLabel: null,
    scoreLabel: null,
    lifeLabel:null,
    heart1: null,
    heart2: null,
    dead1: null,
    dead2: null,
    speed: 1,
    multiplier: 1,
    levelProxy: null,
    difficulty: null,
    fiveInARow: 0,
    score1: 0,
    score2: 0,
    lives: null,
    levelVO: null,
    simonBG: null,
    sequence: null,
    clicked: null,
    currentNumber: null,
    arrayButton: null,
    replayBackground: null,
    levelLabel: null,
    replayButton: null,
    greenButton: null,
    yellowButton: null,
    blueButton: null,
    redButton: null,
    displaySeq: null,
    listenerArray: null,
    currentSequence: null,
    count: 0,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        //initialize the variable
        this.levelProxy = MyJSGame.ApplicationFacade.getInstance(MyJSGame.ApplicationFacade.NAME).retrieveProxy(MyJSGame.model.proxy.LevelProxy.NAME);
        this.levelVO = this.levelProxy.getData();

        this.init();
    },
    init: function () {
        cc.log("in game");
        this.levelVO.score=0;
        this.score1=0;
        this.size = cc.winSize;
        this.scaleFunc=this.size.width/this.scaleH;
        this.scaleFunc=this.scaleFunc;

        cc.log(this.scaleFunc);
        this.difficulty=0;
        this.speed=0;

        var temp=flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        temp.setAnchorPoint(.5, .5);
        temp.setPosition(this.size.width /2, this.size.height*2/3);
        temp.setScaleX(5*this.scaleFunc);
        temp.setScaleY(2.3*this.scaleFunc);

        this.multiplierLabel = helper.GameHelper.makeTTFFont("Select Difficulty", helper.GameHelper.hexToRgb("#FFFFFFFF"), 1, cc.TEXT_ALIGNMENT_CENTER);
        this.multiplierLabel.setFontSize(38);
        this.multiplierLabel.setPosition(temp.getContentSize().width / 2, temp.getContentSize().height / 2);
        this.multiplierLabel.setScaleX(1 / 5);
        this.multiplierLabel.setScaleY(1 / 2.3);
        this.multiplierLabel.setAnchorPoint(.5, .5);
        temp.addChild(this.multiplierLabel);
        this.addChild(temp);

        this.multiplierBar = flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        this.multiplierBar.setAnchorPoint(.5, .5);
        this.multiplierBar.setPosition(this.size.width /4, this.size.height /2);
        this.multiplierBar.setScaleX(3*this.scaleFunc);
        this.multiplierBar.setScaleY(2*this.scaleFunc);
        this.multiplierBar.tag=1;

        this.multiplierLabel = helper.GameHelper.makeTTFFont("Easy", helper.GameHelper.hexToRgb("#FFFFFFFF"), 1, cc.TEXT_ALIGNMENT_CENTER);
        this.multiplierLabel.setFontSize(38);
        this.multiplierLabel.setPosition(this.multiplierBar.getContentSize().width / 2, this.multiplierBar.getContentSize().height / 2);
        this.multiplierLabel.setScaleX(1 / 3);
        this.multiplierLabel.setScaleY(1 / 2);
        this.multiplierLabel.setAnchorPoint(.5, .5);
        this.multiplierBar.addChild(this.multiplierLabel);


        this.lifeBar = flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        this.lifeBar.setAnchorPoint(.5, .5);
        this.lifeBar.setPosition(this.size.width *2/4, this.size.height /2);
        this.lifeBar.setScaleX(3*this.scaleFunc);
        this.lifeBar.setScaleY(2*this.scaleFunc);
        this.lifeBar.tag=2;

        this.lifeLabel= helper.GameHelper.makeTTFFont("Difficult", helper.GameHelper.hexToRgb("#FFFFFFFF"), 1, cc.TEXT_ALIGNMENT_CENTER);
        this.lifeLabel.setFontSize(38);
        this.lifeLabel.setPosition(this.multiplierBar.getContentSize().width / 2, this.multiplierBar.getContentSize().height / 2);
        this.lifeLabel.setScaleX(1 / 3);
        this.lifeLabel.setScaleY(1 / 2);
        this.lifeLabel.setAnchorPoint(.5, .5);
        this.lifeBar.addChild(this.lifeLabel);


        this.scoreBar = flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        this.scoreBar.setAnchorPoint(.5, .5);
        this.scoreBar.setPosition(this.size.width*3/4, this.size.height /2);
        this.scoreBar.setScaleX(3*this.scaleFunc);
        this.scoreBar.setScaleY(2*this.scaleFunc);
        this.scoreBar.tag=3;


        this.scoreLabel= helper.GameHelper.makeTTFFont("Insane", helper.GameHelper.hexToRgb("#FFFFFFFF"), 1, cc.TEXT_ALIGNMENT_CENTER);
        this.scoreLabel.setFontSize(38);
        this.scoreLabel.setPosition(this.multiplierBar.getContentSize().width / 2, this.multiplierBar.getContentSize().height / 2);
        this.scoreLabel.setScaleX(1 / 3);
        this.scoreLabel.setScaleY(1 / 2);
        this.scoreLabel.setAnchorPoint(.5, .5);
        this.scoreBar.addChild(this.scoreLabel);

        this.addChild(this.scoreBar);
        this.addChild(this.multiplierBar);
        this.addChild(this.lifeBar);

        this.listenerArray = [];
        this.listenerArray.push(helper.EventHelper.addMouseTouchEvent(this.chooseDifficulty.bind(this), this.scoreBar));
        this.listenerArray.push(helper.EventHelper.addMouseTouchEvent(this.chooseDifficulty.bind(this), this.multiplierBar));
        this.listenerArray.push(helper.EventHelper.addMouseTouchEvent(this.chooseDifficulty.bind(this), this.lifeBar));

        //this.initialize();

        //this.removeAllChildren(true);
        //this.levelVO.star = 3;
        //this.levelVO.score = 50;
        //this.levelVO.scoreBoardLine1 = "Final ScoreCard Line 1";
        //this.levelVO.scoreBoardLine2 = "Final ScoreCard Line 2";
        //runningScene.gameOver();

        /* var HelloWorld = helper.GameHelper.makeTTFFont(MyJSGame.locale.helloWorld, helper.GameHelper.hexToRgb("#FFFFFF"), 35, cc.TEXT_ALIGNMENT_CENTER);
         HelloWorld.setScale(4);
         HelloWorld.setColor(helper.GameHelper.hexToRgb('#ffffff'));
         HelloWorld.attr({
         x:AppConstants.DEVICE_WIDTH/2,
         y:AppConstants.DEVICE_HEIGHT/2
         });
         helper.EventHelper.addMouseTouchEvent(this.helloWorldClicked.bind(this),HelloWorld);
         this.addChild(HelloWorld);
         },
         helloWorldClicked: function (event, touch, state){
         if(state === helper.EventHelper.ON_CLICK){
         cc.log("Clicked");
         this.count++;
         if(this.count >= 5){
         this.levelVO.star = 3;
         this.levelVO.score = 50;
         this.levelVO.scoreBoardLine1 = "Final ScoreCard Line 1";
         this.levelVO.scoreBoardLine2 = "Final ScoreCard Line 2";
         this.levelVO.scoreBoardLine3 = "Final ScoreCard Line 3";
         var runningScene = cc.director.getRunningScene();
         runningScene.gameOver();
         }
         }
         return true;*/
    }, initialize: function () {
        //set background for central game buttons
        this.simonBG = flax.assetsManager.createDisplay(MyJSGame.res.Final, "simonBG");
        this.simonBG.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this.simonBG.setAnchorPoint(.5, .5);
        this.simonBG.setScale(this.scaleFunc)
        //make the four colour buttons
        this.greenButton = flax.assetsManager.createDisplay(MyJSGame.res.Final, "GreenBox");
        this.redButton = flax.assetsManager.createDisplay(MyJSGame.res.Final, "RedBox");
        this.blueButton = flax.assetsManager.createDisplay(MyJSGame.res.Final, "BlueBox");
        this.yellowButton = flax.assetsManager.createDisplay(MyJSGame.res.Final, "YellowBox");
        //add the four buttons in an array
        this.arrayButton = [this.greenButton, this.blueButton, this.redButton, this.yellowButton];
        //give tags to the button according to their position in array
        /*
         this.greenButton.tag = 0;
         this.blueButton.tag = 1;
         this.redButton.tag = 2;
         this.yellowButton.tag = 3;*/
        //set their positional display
        var i;
        var myAngle = 45;
        for (i = 0; i < this.arrayButton.length; i++) {
            this.arrayButton[i].tag = i;
            this.arrayButton[i].setAnchorPoint(-0.05, 1.05);
            this.arrayButton[i].setScale(.85);
            this.arrayButton[i].setPosition(this.simonBG.getContentSize().width / 2, this.simonBG.getContentSize().height / 2);
            this.arrayButton[i].rotation = myAngle;
            //change their auto play option
            this.arrayButton[i].autoStopWhenOver = true;
            myAngle += 90;
            this.simonBG.addChild(this.arrayButton[i]);
        }
        //unnatural aligment of blue button needs to be changed
        this.blueButton.setAnchorPoint(1.05, 1.05);
        this.blueButton.rotation = 45;
        //set the center replay background
        this.replayBackground = flax.assetsManager.createDisplay(MyJSGame.res.Final, "backContainer");
        this.replayBackground.setAnchorPoint(.5, .5);
        this.replayBackground.setPosition(this.simonBG.getContentSize().width / 2, this.simonBG.getContentSize().height / 2);
        //set the center replay button
        this.replayButton = flax.assetsManager.createDisplay(MyJSGame.res.Final, "asset5");
        this.replayButton.setPosition(this.replayBackground.getContentSize().width / 2, this.replayBackground.getContentSize().height / 2);
        this.replayButton.setAnchorPoint(.5, .5);


        //set the level display in center
        this.levelLabel = helper.GameHelper.makeTTFFont("1", helper.GameHelper.hexToRgb("#FFFFFFFF"), 1, cc.TEXT_ALIGNMENT_CENTER);
        this.levelLabel.setFontSize(38);
        this.levelLabel.x = this.replayBackground.getContentSize().width / 2;
        this.levelLabel.y = this.replayBackground.getContentSize().height / 2;
        this.setAnchorPoint(.5, .5);


        //this.replayBackground.addChild(this.replayButton);

        this.simonBG.addChild(this.replayBackground);


        //Lives
        this.lifeBar = flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        this.heart1 = flax.assetsManager.createDisplay(MyJSGame.res.Final, "asset3");
        this.heart2 = flax.assetsManager.createDisplay(MyJSGame.res.Final, "asset3");
        this.dead1 = flax.assetsManager.createDisplay(MyJSGame.res.Final, "greyHeart");
        this.dead2 = flax.assetsManager.createDisplay(MyJSGame.res.Final, "greyHeart");
        this.lifeBar.setPosition(this.size.width * 3.5 / 4 + 70, this.size.height - 60);
        this.lifeBar.setAnchorPoint(.5, .5);
        this.lifeBar.setScaleX(1.5*this.scaleFunc);
        this.lifeBar.setScaleY(2*this.scaleFunc);
        this.heart1.setPosition(this.lifeBar.getContentSize().width / 2 - 20, this.lifeBar.getContentSize().height / 2 - 2);
        this.heart1.setAnchorPoint(.5, .5);
        this.heart2.setPosition(this.lifeBar.getContentSize().width / 2 + 20, this.lifeBar.getContentSize().height / 2 - 2);
        this.heart2.setAnchorPoint(.5, .5);
        this.dead1.setPosition(this.lifeBar.getContentSize().width / 2 - 20, this.lifeBar.getContentSize().height / 2 - 2);
        this.dead1.setAnchorPoint(.5, .5);
        this.dead2.setPosition(this.lifeBar.getContentSize().width / 2 + 20, this.lifeBar.getContentSize().height / 2 - 2);
        this.dead2.setAnchorPoint(.5, .5);
        this.heart1.setScaleX(1.2);
        this.heart2.setScaleX(1.2);
        this.dead1.setScaleY(.85);
        this.dead2.setScaleY(.85);
        this.lifeBar.addChild(this.heart1);
        this.lifeBar.addChild(this.heart2);
        this.addChild(this.lifeBar);


        this.scoreBar = flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        this.scoreBar.setAnchorPoint(.5, .5);
        this.scoreBar.setPosition(this.size.width * .5 / 4 - 70, this.size.height - 60);
        this.scoreBar.setScaleX(2*this.scaleFunc);
        this.scoreBar.setScaleY(2*this.scaleFunc);


        this.scoreLabel = helper.GameHelper.makeTTFFont("Score " + this.levelVO.score, helper.GameHelper.hexToRgb("#FFFFFFFF"), 1, cc.TEXT_ALIGNMENT_CENTER);
        this.scoreLabel.setFontSize(38);
        this.scoreLabel.setPosition(this.scoreBar.getContentSize().width / 2, this.scoreBar.getContentSize().height / 2);
        this.scoreLabel.setScale(.5);
        this.scoreLabel.setAnchorPoint(.5, .5);
        this.scoreBar.addChild(this.scoreLabel);


        this.addChild(this.scoreBar);


        this.multiplierBar = flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        this.multiplierBar.setAnchorPoint(.5, .5);
        this.multiplierBar.setPosition(this.size.width / 2, this.size.height - 60);
        this.multiplierBar.setScaleX(3*this.scaleFunc);
        this.multiplierBar.setScaleY(2*this.scaleFunc);


        this.multiplierLabel = helper.GameHelper.makeTTFFont("Multiplier " + this.multiplier + "X", helper.GameHelper.hexToRgb("#FFFFFFFF"), 1, cc.TEXT_ALIGNMENT_CENTER);
        this.multiplierLabel.setFontSize(38);
        this.multiplierLabel.setPosition(this.multiplierBar.getContentSize().width / 2, this.multiplierBar.getContentSize().height / 2);
        this.multiplierLabel.setScaleX(1 / 3);
        this.multiplierLabel.setScaleY(1 / 2);
        this.multiplierLabel.setAnchorPoint(.5, .5);
        this.multiplierBar.addChild(this.multiplierLabel);







        //this.orientationBar = flax.assetsManager.createDisplay(MyJSGame.res.Final, "scoreContainer");
        //this.orientationBar.setAnchorPoint(.5, .5);
        //this.orientationBar.setPosition(this.size.width / 2,60);
        //this.orientationBar.setScaleX(3);
        //this.orientationBar.setScaleY(3);

        this.square = flax.assetsManager.createDisplay(MyJSGame.res.Final, "simonBG");
        this.diamond = flax.assetsManager.createDisplay(MyJSGame.res.Final, "simonBG");


        this.square.setPosition(this.size.width*4/9,60);
        this.square.setAnchorPoint(.5,.5);
        this.square.setScale(this.scaleFunc/3);
        this.square.rotation=45;
        this.diamond.setPosition(this.size.width*5/9,60);
        this.diamond.setAnchorPoint(.5,.5);
        this.diamond.setScale(this.scaleFunc/3);

        helper.EventHelper.addMouseTouchEvent(this.squareSwitch.bind(this), this.square);
        helper.EventHelper.addMouseTouchEvent(this.diamondSwitch.bind(this), this.diamond);
        this.addChild(this.square);
        this.addChild(this.diamond);








        this.lives = 2;
        if (this.difficulty == 1) {
            this.speed = 1;
        } else if (this.difficulty == 2) {
            this.speed = 2;
        } else if (this.difficulty == 3) {
            this.speed = 4;
        }
        cc.log(this.speed+" speed");
        if (this.square) {
            this.simonBG.rotation = 45;
            this.replayBackground.rotation = -45;
        }
        this.addChild(this.simonBG);
        this.addChild(this.multiplierBar);
        this.createSequence();


    }, createSequence: function () {
        this.currentNumber = 0;
        this.level++;
        if (this.level == 1) {
            cc.log(this.level);
            this.sequence = [];
        }
        this.levelLabel.setString(this.level);
        this.sequence.push(Math.floor((Math.random() * 4)));
        cc.log(this.sequence);
        //this.sequence=[1,2,3,0,1,2]
        this.displaySequence();

    },


    displaySequence: function () {
        cc.log("In Display");
        this.currentNumber=0;
        this.onDisplayLevelLabel();
        this.removeButtonOnCLicks();
        var i;
        var delayNormal;
        if ((this.fiveInARow + 1) % 5 == 0) {
            delayNormal = cc.delayTime(1.2);
        } else
            delayNormal = cc.delayTime(.9);
        var delay = cc.delayTime(.9 / this.speed);
        var delaySmall = cc.delayTime(.5 / this.speed);
        var delayVSmall = cc.delayTime(.39 / this.speed);
        var seq = [delayNormal, delayNormal, delayNormal, delayNormal];

        for (i = 0; i < this.sequence.length; i++) {
            var j;
            for (j = 0; j < seq.length; j++) {
                if (this.sequence[i] == this.arrayButton[j].tag) {
                    var animButton = cc.callFunc(this.startButtonShowAnim, this, this.arrayButton[j]);
                    var animEnd = cc.callFunc(this.endButtonShowAnim, this, this.arrayButton[j]);
                    this.currentSequence = cc.sequence(animButton, delaySmall, animEnd, delayVSmall);
                    seq[j] = cc.sequence(seq[j], this.currentSequence);
                    //seq[j]=
                } else {
                    seq[j] = cc.sequence(seq[j], delay);
                }
            }
        }
        seq[0] = cc.sequence(seq[0], cc.callFunc(this.setButtonOnClicks, this));
        seq[0] = cc.sequence(seq[0], cc.callFunc(this.onPlayReplayButton, this));

        for (j = 0; j < seq.length; j++) {
            this.arrayButton[j].runAction(seq[j]);
        }


    },

    onButtonsClick: function (event, touch, state) {
        var target = event.getCurrentTarget();
        cc.log("working".concat(target.tag));
        var animButtonClick = cc.callFunc(this.startButtonClickAnim, this, target);
        this.arrayButton[target.tag].runAction(animButtonClick);
        this.checkSequence(target);
        /*
         var animButton = cc.callFunc(this.startButtonShowAnim, this,this.arrayButton[target.tag]);
         var animEnd=cc.callFunc(this.endButtonShowAnim,this,this.arrayButton[target.tag])
         this.arrayButton[target.tag].runAction(cc.sequence(animButton,cc.delayTime(1),animEnd));*/


    },


    //Check the sequence
    checkSequence: function (target) {
        cc.log("checking sequence " + this.currentNumber + " the tag is " + target.tag + " " + this.sequence[this.currentNumber]);
        if (target.tag == this.sequence[this.currentNumber]) {
            //right answer
            cc.log("right answer " + this.currentNumber);

        } else {
            //wrong answer
            cc.log("wrong answer " + target.tag + "  right answer " + this.sequence[this.currentNumber]);
            this.wrongAnswer();
            return;

        }
        this.currentNumber++;
        if (this.currentNumber == this.sequence.length) {
            //next level and give score
            this.giveScore();
            cc.log(this.levelVO.score + " is the score");
            this.createSequence();
        } else {
            //continue level
        }

    },


    startButtonClickAnim: function (target) {
        this.arrayButton[target.tag].gotoAndPlay(0);
    }
    , startButtonShowAnim: function (target) {
        cc.log(target.tag);
        target.gotoAndStop(2);
    }, endButtonShowAnim: function (target) {
        this.arrayButton[target.tag].play();
    }
    , giveScore: function () {
        this.fiveInARow++;
        if ((this.fiveInARow + 1) % 5 == 0 && this.fiveInARow != 0) {
            this.multiplier++;
            this.multiplierLabel.setString("Multiplier " + this.multiplier + "X");
            this.multiplierIncrease();
        }
        this.levelVO.score += this.sequence.length * this.multiplier;
        this.scoreLabel.setString("Score " + this.levelVO.score)

    },


    setButtonOnClicks: function () {
        this.listenerArray = [];
        for (var i = 0; i < this.arrayButton.length; i++) {
            this.listenerArray.push(helper.EventHelper.addMouseTouchEvent(this.onButtonsClick.bind(this), this.arrayButton[i]));
        }
        this.listenerArray.push(helper.EventHelper.addMouseTouchEvent(this.displaySequence.bind(this), this.replayBackground));

    },


    removeButtonOnCLicks: function () {
        if (this.listenerArray !== null)
            for (var i = 0; i < this.listenerArray.length; i++) {
                helper.EventHelper.removeEventListener(this.listenerArray[i]);
            }

    },


    wrongAnswer: function () {
        this.lives--;
        this.multiplier = 1;
        this.multiplierLabel.setString("Multiplier " + this.multiplier + "X");
        this.fiveInARow = 0;
        //for ()
        if (this.lives == 0) {
            var runningScene = cc.director.getRunningScene();
            this.removeAllChildren(true);
            if (this.levelVO.score < 20) {
                this.levelVO.star = 0;
            } else if (this.levelVO.score < 40) {
                this.levelVO.star = 1;
            } else if (this.levelVO.score < 60) {
                this.levelVO.star = 2;
            } else {
                this.levelVO.star = 3;
            }
            this.levelVO.scoreBoardLine1 = "First Round : " + this.score1;
            this.levelVO.scoreBoardLine2 = "Second Round : "+(this.levelVO.score-this.score1);
            this.levelVO.scoreBoardLine3 = "Second Round : "+(this.levelVO.score-this.score1);
            runningScene.gameOver();
        } else {
            this.lifeBar.removeChild(this.heart1);
            this.lifeBar.addChild(this.dead1);
            this.score1=this.levelVO.score;
            this.displaySequence();
        }
    },


    onPlayReplayButton: function () {
        this.replayBackground.removeChild(this.levelLabel);
        this.replayBackground.addChild(this.replayButton);
    },
    onDisplayLevelLabel: function () {
        this.replayBackground.removeChild(this.replayButton);
        this.replayBackground.addChild(this.levelLabel);

    }, multiplierIncrease: function () {
        this.multiplierBar.setPosition(this.size.width / 2, this.size.height / 2);
        this.multiplierBar.setScaleX(6);
        this.multiplierBar.setScaleY(4);
        var fadeIn = cc.fadeIn(.31);
        var moveTo = cc.moveTo(.31,this.size.width / 2, this.size.height - 60 );
        var scaleTo = cc.scaleTo(.31, 3, 2);
        var spawnAnim = cc.spawn(moveTo, scaleTo, fadeIn);
        this.multiplierBar.runAction(spawnAnim);
    },chooseDifficulty:function(event, touch, state){
        var target=event.getCurrentTarget();
        this.difficulty=target.tag;
        cc.log(this.difficulty+" difficulty");
        this.removeButtonOnCLicks();
        this.removeAllChildren(true);
        this.initialize();

    },diamondSwitch:function(){
        var rotateTo=cc.rotateTo(.3,0);
        var rotateto=cc.rotateTo(.3,0);
        this.simonBG.runAction(rotateTo);
        this.replayBackground.runAction(rotateto);
    },squareSwitch:function(){
        cc.log("in switch")
        var rotateTo=cc.rotateTo(.3,45,0);
        var rotateto=cc.rotateTo(.3,-45,0);
        this.simonBG.runAction(rotateTo);
        this.replayBackground.runAction(rotateto);
    }
});