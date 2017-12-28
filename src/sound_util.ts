var SoundUtil = (function(){

    function loadRes(sound_key_, name_, sound_type_, call_back_, target_){
        AssetMgr.registerRes({
            "resources":
                [
                    {"name": sound_key_,"type":"sound", "soundType": sound_type_,"url":"assets/sound/" + name_},
                ],

            "groups":
                [
                    {"name": sound_key_,"keys": sound_key_}
                ]
        })
        AssetMgr.loadGroup(sound_key_, call_back_, target_, null)
    }

    var api = {
        /**
         * 获取音效对象
         * @param name_
         */
        getSound : function(name_, sub_type_: string = egret.Sound.EFFECT){
            var sound_key = sub_type_ + "_" + name_
            var sound: egret.Sound = null
            var play_after_load = false
            var play_after_load_loop = false

            loadRes(sound_key, name_, sub_type_, function(){
                sound = RES.getRes(sound_key);

                // 判断是否播放
                if(play_after_load) {
                    sound.play(play_after_load_loop)

                    play_after_load = false
                }
            }, this)

            return {
                /**
                 * 播放
                 * @param loop_
                 */
                play : function(loop_: boolean = false){
                    //// H5版本，不能播放音效
                    //if(egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
                    //    if(sub_type_ == egret.Sound.EFFECT) {
                    //        return
                    //    }
                    //}

                    if(sound) {
                        sound.play(loop_)
                    }
                    else{
                        play_after_load = true
                        play_after_load_loop = loop_
                    }
                },

                /**
                 * 暂停
                 */
                pause : function(){
                    if(sound) {
                        sound.pause()
                    }

                    play_after_load = false
                    play_after_load_loop = false
                }
            }
        }
    }

    return api
})()

var BGMusic = (function(){
    var bgm = null
    return {
        init : function(){
            bgm = SoundUtil.getSound("bgm_main.mp3", egret.Sound.MUSIC)
        },

        start : function(){
            if(bgm) {
                bgm.play(true)
            }
        },

        pause : function(){
            if(bgm) {
                bgm.pause()
            }
        }
    }
})()