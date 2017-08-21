/**
 * Created by Admin on 21/8/2017.
 */

var SoundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao Scene Sound");

        this.audioEngine = cc.audioEngine;
        var playerSoundMenu = new cc.MenuItemFont.create("Player Sound effect", this.playerSound, this);
        playerSoundMenu.setPosition(new cc.Point(0, 350));

        var playerBgMusicMenu = new cc.MenuItemFont.create("Play BG Music", this.playBGMusic, this);
        playerBgMusicMenu.setPosition(new cc.Point(0, 300));

        var stopBGMusicMenu = new cc.MenuItemFont.create("Stop BG Music", this.stopBGMusic, this);
        stopBGMusicMenu.setPosition(new cc.Point(0, 250));

        var musicUpMenu = new cc.MenuItemFont.create("Music volume Up",this.musicUp,this);
        musicUpMenu.setPosition(new cc.Point(0,200));

        var musicDownMenu = new cc.MenuItemFont.create("Music volume Down",this.musicDown,this);
        musicDownMenu.setPosition(new cc.Point(0,150));

        var effectsUpMenu = new cc.MenuItemFont.create("Effects volume Up",this.effectsUp,this);
        effectsUpMenu.setPosition(new cc.Point(0,100));

        var effectsDownMenu = new cc.MenuItemFont.create("Effects volume Down",this.effectsDown,this);
        effectsDownMenu.setPosition(new cc.Point(0,50));

        var menu = cc.Menu.create(playerSoundMenu, playerBgMusicMenu, stopBGMusicMenu, musicUpMenu, musicDownMenu, effectsUpMenu, effectsDownMenu);
        menu.setPosition(new cc.Point(400, 140));
        this.addChild(menu);
        return true;
    },
    playerSound : function () {
        this.audioEngine.playEffect(res.sound_bang);
    },

    playBGMusic : function () {
        if (!this.audioEngine.isMusicPlaying()){
            this.audioEngine.playMusic(res.sound_loop, true);
        }
        //this.audioEngine.playMusic(res.sound_loop, true);
    },

    stopBGMusic : function () {
        if(this.audioEngine.isMusicPlaying()){
            this.audioEngine.stopMusic();
        }
    },

    musicUp : function () {
        this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume()+0.1)
    },

    musicDown : function () {
        this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume()-0.1);
    },

    effectsUp : function () {
        this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume()+0.1);
    },

    effectsDown :function () {
        this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume()-0.1);
    }

});

var SoundScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SoundLayer();
        this.addChild(layer);
    }
});

