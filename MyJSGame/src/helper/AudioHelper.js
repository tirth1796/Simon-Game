/**
 * Created by vivekfitkariwala on 07/08/15.
 */
helper.AudioHelper = helper.AudioHelper || {};

puremvc.define(
    //class info
    {
        name: "helper.AudioHelper"
    },

    //instance member
    {
    },

    //static member
    {
        NAME: "HELPER_AUDIO_HELPER",
        //Refer cc.audioEngine for more
        effectVolume:1,
        musicVolume:1,
        playMusic: cc.audioEngine.playMusic.bind(cc.audioEngine),
        resumeMusic: cc.audioEngine.resumeMusic.bind(cc.audioEngine),
        pauseMusic: cc.audioEngine.pauseMusic.bind(cc.audioEngine),
        stopMusic: cc.audioEngine.stopMusic.bind(cc.audioEngine), //Pass true to release music

        playEffect: cc.audioEngine.playEffect.bind(cc.audioEngine),
        resumeEffect: cc.audioEngine.resumeEffect.bind(cc.audioEngine),
        pauseEffect: cc.audioEngine.pauseEffect.bind(cc.audioEngine),
        pauseAllEffects: cc.audioEngine.pauseAllEffects.bind(cc.audioEngine),
        unloadEffect: cc.audioEngine.unloadEffect.bind(cc.audioEngine),

        changeMusicVolume: function (val) {
            //if val is true increase volume
            //if val is false decrease volume
            //if val is num between 0 to 1 set that as volume
            if(val == true){
                helper.AudioHelper.musicVolume += 0.1;
                if(helper.AudioHelper.musicVolume > 1.0){
                    helper.AudioHelper.musicVolume = 1.0;
                }
            }else if(val == false){
                helper.AudioHelper.musicVolume -= 0.1;
                if(helper.AudioHelper.musicVolume < 0){
                    helper.AudioHelper.musicVolume = 0;
                }
            }else if(val >= 0 && val <= 1){
                helper.AudioHelper.musicVolume = val;
                    //helper.AudioHelper.musicVolume = 0;
            }
            cc.audioEngine.setMusicVolume(helper.AudioHelper.musicVolume);
        },
        changeEffectVolume: function (val) {
            if(val == true){
                helper.AudioHelper.effectVolume += 0.1;
                if(helper.AudioHelper.effectVolume > 1.0){
                    helper.AudioHelper.effectVolume = 1.0;
                }
            }else if(val == false){
                helper.AudioHelper.effectVolume -= 0.1;
                if(helper.AudioHelper.effectVolume < 0){
                    helper.AudioHelper.effectVolume = 0;
                }
            }else if(val >= 0 && val <= 1){
                helper.AudioHelper.effectVolume = val;
                //helper.AudioHelper.effectVolume = 0;
            }
            cc.audioEngine.setEffectsVolume(helper.AudioHelper.effectVolume);
        },

        mute: function () {
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        },
        unmute: function () {
            cc.audioEngine.setEffectsVolume(helper.AudioHelper.effectVolume);
            cc.audioEngine.setMusicVolume(helper.AudioHelper.musicVolume);
        }
    }
)