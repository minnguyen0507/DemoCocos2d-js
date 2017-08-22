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

    HelloWorld_png : "res/HelloWorld.png",
    btn_next : "res/button/btn_next.png",
    bg_test : "res/common/bg_test.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
