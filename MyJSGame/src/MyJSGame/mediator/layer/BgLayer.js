/**
 * Created by Nil on 17/08/15.
 */

MyJSGame.mediator.layer.BgLayer = cc.Layer.extend({
    bgLayer: null,
    bgColor: null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {

        this.bgColor = new cc.LayerColor(new cc.color(20, 124, 119, 255));
        this.addChild(this.bgColor);
        this.bgLayer = flax.assetsManager.createDisplay(MyJSGame.res.Final, "background");
        this.bgLayer.setAnchorPoint(0, 0);
        if(AppConstants.DEVICE_WIDTH/AppConstants.DEVICE_HEIGHT > AppConstants.ORIGINAL_DEVICE_WIDTH/AppConstants.ORIGINAL_DEVICE_HEIGHT){
            this.bgLayer.scale = AppConstants.DEVICE_WIDTH/this.bgLayer.width;
        }else{
            this.bgLayer.scale = AppConstants.DEVICE_HEIGHT/this.bgLayer.height;
        }
        this.addChild(this.bgLayer);
    }
});