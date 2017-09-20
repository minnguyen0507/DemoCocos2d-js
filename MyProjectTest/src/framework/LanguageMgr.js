/**
 * Created by minnguyen on 9/20/2017.
 */

var LanguageMgr = cc.Class.extend({

    ctor: function () {
        this.langData = null;
        this.langName = null;
    },

    updateLang:function(fromIp){
        if(fromIp === undefined)  fromIp = COUNTRY.VIETNAM;

        var defaultLang = fr.UserData.getString(UserDataKey.LANGUAGE);
        //ZLog.debug("defaultLang = " + defaultLang);
        if(!defaultLang) {
            switch (fromIp){
                case COUNTRY.VIETNAM:
                    defaultLang = LANGUAGE.VIETNAMESE;
                    break;
                case COUNTRY.INDO:
                    defaultLang = LANGUAGE.INDO;
                    break;
                case COUNTRY.THAILAND:
                case COUNTRY.GOFA:
                    defaultLang = LANGUAGE.THAI;
                    break;
                default:
                    defaultLang = LANGUAGE.ENGLISH;
            }
            //fr.UserData.setString(UserDataKey.LANGUAGE, defaultLang);
        }
        this.langName = defaultLang;
        //this.langName = LANGUAGE.INDO;
        this.prevLanguage = null;

        this.loadLanguage();
    },

    loadLanguage: function () {
        // load text file
        if (!cc.sys.isNative) {
            var data = cc.loader.getRes(this._getLangPack());
            if (data) {
                this.langData = JSON.parse(data);
            }else{
                ZLog.error("load language pack failed!");
            }
        } else {
            data = jsb.fileUtils.getStringFromFile(this._getLangPack());
            if (data) {
                this.langData = JSON.parse(data);
            }else{
                ZLog.error("load language pack failed!");
            }
        }

        if (this.langData) {
            if(this.prevLanguage){
                cc.spriteFrameCache.removeSpriteFramesFromFile(this._getImgPack(this.prevLanguage));
                cc.spriteFrameCache.removeSpriteFramesFromFile(this._getImgPack2(this.prevLanguage));
            }
            cc.spriteFrameCache.addSpriteFrames(this._getImgPack(this.langName));
            cc.spriteFrameCache.addSpriteFrames(this._getImgPack2(this.langName));

            var event = new cc.EventCustom(LanguageMgr.langEventName);
            event.setUserData(this.langName);
            cc.eventManager.dispatchEvent(event);
            cc.sys.localStorage.setItem(UserDataKey.LANGUAGE,this.langName);
        }
    },

    _getImgPack: function () {
        return "res/localize/" + this.langName + "/img/pack_" + this.langName + ".plist";
    },
    _getImgPack2: function () {
        return "res/localize/" + this.langName + "/img/pack_" + this.langName + "_new"+".plist";
    },


    _getLangPack: function () {
        return "res/localize/" + this.langName + "/lang_" + this.langName + ".txt";
    },

    unLoadLanguage: function () {
        cc.spriteFrameCache.removeSpriteFramesFromFile(this._getImgPack());
        cc.spriteFrameCache.removeSpriteFramesFromFile(this._getImgPack2());
    },

    getSpriteFrame: function (key) {
        return cc.spriteFrameCache.getSpriteFrame(this.langData["img"][key]);
    },

    getString: function (key) {
        if(!cc.sys.isNative)
            return this.getStringWithoutTag(this.langData["text"][key] || key);

        return this.langData["text"][key] || key;
    },

    getSpriteFrameName: function (key) {
        return this.langData["img"][key];
    },

    getSound: function (key) {
        return this.langData["sound"][key];
    },

    getCurrentLanguage: function(){
        return this.langName;
    },

    changeLanguage:function(name){
        if(this.langName == name) return;

        this.prevLanguage = this.langName;
        this.langName = name;
        this.loadLanguage();

        // change localization for current scene
        var currentScene = sceneMgr.getCurrentScene();
        if(currentScene){
            currentScene.updateLocalization();
        }
    },

    getStringWithoutTag: function(inputString) {
        if(inputString.indexOf("<") == -1) return inputString;

        var arr_split_first = inputString.split("<");
        var arr = [];

        for(var i = 0; i < arr_split_first.length; i++) {
            if(arr_split_first[i].indexOf(">") == -1){
                arr.push(arr_split_first[i]);
            }
            else
            {
                var temp = arr_split_first[i].split(">");
                for(var j = 0; j < temp.length; j++)
                    if(temp[j].indexOf("font") == -1
                        && temp[j].indexOf("size") == -1
                        && temp[j].indexOf("color") ==-1){

                        arr.push((temp[j]));
                    }
            }
        }

        return arr.join("");
    }

});

var LANGUAGE = {
    VIETNAMESE:     'vie',
    THAI:           'tha',
    INDO:           'ind',
    ENGLISH:        'eng'
};

var COUNTRY = {
    VIETNAM:        'vi',
    THAILAND:       'th',
    ENGLAND:        'en',
    INDO:           'id',
    MALAYSIA:       'my',
    MYANMAR:        'mm',
    GOFA:           'gofa',
    INTERNATIONAL:  'international'
};

LanguageMgr.langEventName = "lang_changed";