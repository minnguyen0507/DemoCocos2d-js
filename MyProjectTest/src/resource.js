
var new_card_dir = "newcardschips/";
var res = {
	//----game lat bai----
	cover : "res/gamelatbai/cover.png",
	tile_0 : "res/gamelatbai/tile_0.png",
	tile_1 : "res/gamelatbai/tile_1.png",
	tile_2 : "res/gamelatbai/tile_2.png",
	tile_3 : "res/gamelatbai/tile_3.png",
	tile_4 : "res/gamelatbai/tile_4.png",
	tile_5 : "res/gamelatbai/tile_5.png",
	tile_6 : "res/gamelatbai/tile_6.png",
	tile_7 : "res/gamelatbai/tile_7.png",
    //----game may bay----
	helicopter_store : "res/gamemaybay/asteroid.png",
    helicopter_background : "res/gamemaybay/background.png",
    helicopter_particle : "res/gamemaybay/particle.png",
    helicopter_ship : "res/gamemaybay/ship.png",
	//----------Sprite Sheet-------
    cocoban_plist : "res/animation/spritesheet.plist",
    cocoban_png : "res/animation/spritesheet.png",
    tx_animations_plist : "res/animation/tx_animations.plist",
    tx_animations_png : "res/animation/tx_animations.png",
    actionmobat_plist : "res/animation/tx_mobat/actionmobat.plist",
    actionmobat_png : "res/animation/tx_mobat/actionmobat.png",
    actionsocdia_plist : "res/animation/tx_socdia/actionsocdia.plist",
    actionsocdia_png : "res/animation/tx_socdia/actionsocdia.png",

	//----------Sound -------------
	sound_bang : "res/sound/bang.mp3",
	sound_loop : "res/sound/loop.mp3",
	//--------- Game Hứng Bia ---------
	hungbia_bomb : "res/gamehungbia/bomb.png",
    hungbia_cart : "res/gamehungbia/cart.png",
    hungbia_leftbutton : "res/gamehungbia/leftbutton.png",
    hungbia_rightbutton : "res/gamehungbia/rightbutton.png",
    hungbia_strawberry : "res/gamehungbia/strawberry.png",
    hungbia_touchend : "res/gamehungbia/touchend.png",
    hungbia_touchorigin : "res/gamehungbia/touchorigin.png",
    //----------Game Totem --------------
    totem_brick1x1 : "res/gametotem/brick1x1.png",
    totem_brick2x1 : "res/gametotem/brick2x1.png",
    totem_brick3x1 : "res/gametotem/brick3x1.png",
    totem_brick4x1 : "res/gametotem/brick4x1.png",
    totem_brick4x2 : "res/gametotem/brick4x2.png",
    totem_ground : "res/gametotem/ground.png",
    totem_totem : "res/gametotem/totem.png",
    //----------Game Bacay--------------
    bg_bacay: "res/texture/bacay/bg_bacay.png",
    icon_coin: "res/texture/bacay/icon_coin.png",
    btn_ke_cua: "res/texture/bacay/btn_ke_cua.png",
    box_my_avatar: "res/texture/bacay/box_myAvatar.png",

    //-----------cards-----------------
    card_0: "res/cards/at_0.png",
    card_1: "res/cards/at_1.png",
    card_2: "res/cards/at_2.png",
    card_3: "res/cards/at_3.png",
    card_black : "res/cards/card_black.png",
    cards_chips_plist : "res/cards/cards_chips.plist",
    cards_chips_png : "res/cards/cards_chips.png",
    new_cards_chips_plist : "res/" + new_card_dir + "new_cards_chips.plist",
    new_cards_chips_png : "res/" + new_card_dir + "new_cards_chips.png",

    //---------Cocostudio ----------------
        //-------- File JSOn-------------
    scene_cocostudio : "res/ui/scene_cocostudio.json",
    node_mini_game_taixiu : "res/ui/node_mini_game.json",
    node_slot_table : "res/ui/node_slot_table.json",
    scene_bacay : "res/ui/scene_bacay.json",
    node_betting_bacay : "res/ui/node_betting_bacay.json",
        //--------File PNG---------------

        //--------Font Name--------------
    //FONT_ROBOTO_BOLD : "res/ui/texture/font/Roboto-Bold.ttf",

    HelloWorld_png : "res/HelloWorld.png",
    btn_next : "res/button/btn_next.png",
    //------------COMMON-----------------
    bg_test : "res/common/bg_test.png",
    slider_thumb : "res/common/btn_slider.png",
    slider_progress : "res/common/slider_main.png",
    slider_track : "res/common/slider_bg.png",
    popup_mini : "res/common/popup_mini.png",
    img_progress_vongtron : "res/common/img_progress.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
