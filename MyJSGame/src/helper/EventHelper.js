/**
 * Created by vivekfitkariwala on 07/07/15.
 */
helper.EventHelper = helper.EventHelper || {};

puremvc.define(
    //class info
    {
        name: "helper.EventHelper"
    },

    //instance member
    {},

    //static member
    {
        NAME: "EventHelper",
        ON_BEGAN: "onBegan",
        ON_MOVE: "onMove",
        ON_END: "onEnd",
        ON_CANCEL: "onCancel",
        ON_OUT: "onOut",
        ON_SCROLL: "onScroll",
        ON_CLICK: "onClick",
        ON_SWIPE_LEFT: "onSwipeLeft",
        ON_SWIPE_RIGHT: "onSwipeRight",
        ON_SWIPE_UP: "onSwipeUp",
        ON_SWIPE_DOWN: "onSwipeDown",
        CLICK_OFFSET: 20,
        TIME_OFFSET: 250,
        SWIPE_OFFSET: 10,

        //different events that can be called
        addMouseTouchEvent: function (callBack, target, noCheck, customRect,noSound) {
            noCheck = noCheck == null ? false : noCheck;
            if (parseInt(customRect, 10)) {
                //Custom rect is just area multiplier
                customRect = cc.rect(-customRect / 2 * target.width, -customRect / 2 * target.height, customRect * target.width, customRect * target.height);
            } else if (customRect == null) {
                customRect = false;
            }

            var listener;
            listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect;
                    if (customRect != false)
                        rect = customRect;
                    else
                        rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        target.startX = touch.getLocation().x;
                        target.startY = touch.getLocation().y;
                        target.startTime = Date.now();
                        return callBack(event, touch, helper.EventHelper.ON_BEGAN);
                    }

                    return false;
                },
                onTouchMoved: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect;
                    if (customRect != false)
                        rect = customRect;
                    else
                        rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode) || noCheck) {
                        if (target.startX == null && target.startY == null)
                            return false;

                        return callBack(event, touch, helper.EventHelper.ON_MOVE);
                    }

                    if (!cc.rectContainsPoint(rect, locationInNode)) {
                        return callBack(event, touch, helper.EventHelper.ON_OUT);
                    }

                    return false;
                },
                onTouchEnded: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect;
                    if (customRect != false)
                        rect = customRect;
                    else
                        rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode) || noCheck) {
                        //sending callback for touch end
                        var timeTaken = Date.now() - target.startTime;
                        if (Math.abs(target.startX - touch.getLocation().x) < helper.EventHelper.CLICK_OFFSET
                            && Math.abs(target.startY - touch.getLocation().y) < helper.EventHelper.CLICK_OFFSET
                            && timeTaken < helper.EventHelper.TIME_OFFSET) {
                            typeof platform !== "undefined" && !noSound && helper.AudioHelper.playEffect(platform.res.click_wav, false);
                            callBack(event, null, helper.EventHelper.ON_CLICK);
                        }

                        var currentSwipe = null;
                        ////check the
                        var leftSwipeDifference = target.startX - touch.getLocation().x;
                        var rightSwipeDifference = touch.getLocation().x - target.startX;
                        var upSwipeDifference = touch.getLocation().y - target.startY;
                        var downSwipeDifference = target.startY - touch.getLocation().y;

                        if (leftSwipeDifference > rightSwipeDifference &&
                            leftSwipeDifference > upSwipeDifference &&
                            leftSwipeDifference > downSwipeDifference &&
                            leftSwipeDifference > helper.EventHelper.SWIPE_OFFSET)
                            currentSwipe = helper.EventHelper.ON_SWIPE_LEFT;
                        else if (rightSwipeDifference > leftSwipeDifference &&
                            rightSwipeDifference > upSwipeDifference &&
                            rightSwipeDifference > downSwipeDifference &&
                            rightSwipeDifference > helper.EventHelper.SWIPE_OFFSET)
                            currentSwipe = helper.EventHelper.ON_SWIPE_RIGHT;
                        else if (upSwipeDifference > leftSwipeDifference &&
                            upSwipeDifference > rightSwipeDifference &&
                            upSwipeDifference > downSwipeDifference &&
                            upSwipeDifference > helper.EventHelper.SWIPE_OFFSET)
                            currentSwipe = helper.EventHelper.ON_SWIPE_UP;
                        else if (downSwipeDifference > leftSwipeDifference &&
                            downSwipeDifference > rightSwipeDifference &&
                            downSwipeDifference > upSwipeDifference &&
                            downSwipeDifference > helper.EventHelper.SWIPE_OFFSET)
                            currentSwipe = helper.EventHelper.ON_SWIPE_DOWN;

                        if (currentSwipe == helper.EventHelper.ON_SWIPE_LEFT)
                            callBack(event, null, helper.EventHelper.ON_SWIPE_LEFT);
                        else if (currentSwipe == helper.EventHelper.ON_SWIPE_RIGHT)
                            callBack(event, null, helper.EventHelper.ON_SWIPE_RIGHT);
                        else if (currentSwipe == helper.EventHelper.ON_SWIPE_UP)
                            callBack(event, null, helper.EventHelper.ON_SWIPE_UP);
                        else if (currentSwipe == helper.EventHelper.ON_SWIPE_DOWN)
                            callBack(event, null, helper.EventHelper.ON_SWIPE_DOWN);

                        return callBack(event, touch, helper.EventHelper.ON_END);
                    }

                    if (!cc.rectContainsPoint(rect, locationInNode)) {
                        return callBack(event, touch, helper.EventHelper.ON_OUT);
                    }

                    return false;
                },
                onTouchCancelled: function (touch, event) {
                    return callBack(event, touch, helper.EventHelper.ON_CANCEL);
                }
            });
            cc.eventManager.addListener(listener, target);
            return listener;
        },

        addAllTouchEvent: function (callBack, target, noCheck) {
            noCheck == noCheck == null ? false : noCheck;
            var listener;
            listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan: function (touches, event) {
                    var touchBounded = [];

                    var target = event.getCurrentTarget();
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        var locationInNode = target.convertToNodeSpace(touch.getLocation());
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            touchBounded.push(touch);
                        }
                    }
                    if (touchBounded.length > 0) {
                        return callBack(event, touchBounded, helper.EventHelper.ON_BEGAN);
                    } else {

                        return callBack(event, touch, helper.EventHelper.ON_OUT);
                    }
                    return false;
                },
                onTouchesMoved: function (touches, event) {
                    var touchBounded = [];

                    var target = event.getCurrentTarget();
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        var locationInNode = target.convertToNodeSpace(touch.getLocation());
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            touchBounded.push(touch);
                        }
                    }
                    if (touchBounded.length > 0 || noCheck) {
                        return callBack(event, touches, helper.EventHelper.ON_MOVE);
                    }

                    if (touchBounded.length == 0) {
                        return callBack(event, touch, helper.EventHelper.ON_OUT);
                    }

                    return false;
                },
                onTouchesEnded: function (touches, event) {
                    var touchBounded = [];

                    var target = event.getCurrentTarget();
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        var locationInNode = target.convertToNodeSpace(touch.getLocation());
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            touchBounded.push(touch);
                        }
                    }

                    if (touchBounded.length > 0 || noCheck) {
                        return callBack(event, touches, helper.EventHelper.ON_END);
                    }

                    if (touchBounded.length == 0) {
                        return callBack(event, touch, helper.EventHelper.ON_OUT);
                    }

                    return false;
                },
                onTouchesCancelled: function (touches, event) {
                    var touchBounded = [];

                    var target = event.getCurrentTarget();
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        var locationInNode = target.convertToNodeSpace(touch.getLocation());
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            touchBounded.push(touch);
                        }
                    }
                    if (touchBounded.length > 0) {
                        return callBack(event, touches, helper.EventHelper.ON_CANCEL);
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(listener, target);
            return listener;
        },

        addKeyBoardEvent: function (callBack, priority) {
            priority = priority || 1;
            var listener;
            listener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (keyCode, event) {
                    switch (keyCode){
                        case cc.KEY.dpadLeft:
                            keyCode = cc.KEY.left;
                            break;
                        case cc.KEY.dpadRight:
                            keyCode = cc.KEY.right;
                            break;
                        case cc.KEY.dpadUp:
                            keyCode = cc.KEY.up;
                            break;
                        case cc.KEY.dpadDown:
                            keyCode = cc.KEY.down;
                            break;
                        case cc.KEY.dpadCenter:
                            keyCode = cc.KEY.enter;
                            break;
                    }
                    return callBack(event, keyCode, helper.EventHelper.ON_BEGAN);
                },
                onKeyReleased: function (keyCode, event) {
                    switch (keyCode){
                        case cc.KEY.dpadLeft:
                            keyCode = cc.KEY.left;
                            break;
                        case cc.KEY.dpadRight:
                            keyCode = cc.KEY.right;
                            break;
                        case cc.KEY.dpadUp:
                            keyCode = cc.KEY.up;
                            break;
                        case cc.KEY.dpadDown:
                            keyCode = cc.KEY.down;
                            break;
                        case cc.KEY.dpadCenter:
                            keyCode = cc.KEY.enter;
                            break;
                    }
                    return callBack(event, keyCode, helper.EventHelper.ON_END);
                }
            });
            cc.eventManager.addListener(listener, priority);
            return listener;
        },

        //add custom event
        addCustomEvent: function (callBack, eventName) {
            var listener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: eventName,
                callback: function (event) {
                    callBack(event);
                }
            });
            cc.eventManager.addListener(listener, 1);
            return listener;
        },
        removeCustomListeners: function (customEventName) {
            cc.eventManager.removeCustomListeners(customEventName);
        },
        //dispatch custom event
        dispatchCustomEvent: function (eventName, eventData) {
            cc.log(eventName);
            var event = new cc.EventCustom(eventName);
            event.setUserData(eventData);
            cc.eventManager.dispatchEvent(event);
        },

        //removing a particular listener
        removeEventListener: function (listener) {
            cc.eventManager.removeListener(listener);
        },

        //removing listener by type
        removeEventListenerByType: function (listener) {
            cc.eventManager.removeListeners(listener);
        },

        //removing listener from node
        removeEventListenerFromNode: function (node, recursive) {
            recursive = recursive || false;
            cc.eventManager.removeListeners(node, recursive);
        }
    }
)