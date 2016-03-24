/**
 * Created by Nil on 18/08/15.
 */
helper.PlatformBridge = helper.PlatformBridge || {};

puremvc.define(
    //class info
    {
        name: "helper.PlatformBridge"
    },

    //instance member
    {},

    //static member
    {
        NAME: "PlatformBridge",
        LOADED_EVENT: 'loaded',
        BACK_EVENT: 'back',
        COMPLETED_EVENT: 'completed',
        CALLBACK_DISPATCHER_NAME:'callbackEventName',

        checkBrigde: function (data) {
            if(data === undefined){
                cc.log('ERROR: data is not assigned');
                return false;
            }
            if(data[helper.PlatformBridge.CALLBACK_DISPATCHER_NAME] === undefined){
                cc.log('ERROR: custom callback dispatcher is undefined');
                return false;
            }
            return true;
        },
        back: function (data) {
            if(helper.PlatformBridge.checkBrigde(data)){
                data.name = helper.PlatformBridge.BACK_EVENT;
                helper.EventHelper.dispatchCustomEvent(data[helper.PlatformBridge.CALLBACK_DISPATCHER_NAME], data);
            }
        },
        loaded: function (data) {
            if(helper.PlatformBridge.checkBrigde(data)){
                data.name = helper.PlatformBridge.LOADED_EVENT;
                helper.EventHelper.dispatchCustomEvent(data[helper.PlatformBridge.CALLBACK_DISPATCHER_NAME], data);
            }
        },
        completed: function (data) {
            if(helper.PlatformBridge.checkBrigde(data)){
                data.name = helper.PlatformBridge.COMPLETED_EVENT;
                if(data['star'] === undefined){
                    cc.log('ERROR: set star before sending completed');
                    return;
                }
                if(data['type'] === 'Games' && data['score'] === undefined){
                    cc.log('ERROR: set score for games before sending completed');
                    return;
                }
                helper.EventHelper.dispatchCustomEvent(data[helper.PlatformBridge.CALLBACK_DISPATCHER_NAME], data);
            }
        }
    }
)