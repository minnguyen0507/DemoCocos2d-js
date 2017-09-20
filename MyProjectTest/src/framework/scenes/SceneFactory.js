/**
 * Created by minnguyen on 9/20/2017.
 */

var SceneFactory = cc.Class.extend({

    ctor:function()
    {
        GV.SCENE_FACTORY = this;

        return true;
    },

    /**
     *
     * @param sceneId
     */
    createScreen:function(sceneId) {
        switch(sceneId)
        {
            case GV.SCENE_IDS.SCENETEST:
                ZLog.debug("-> CREATE SCENE: TESTTTTTT");
                return new SceneTest();
        }
    },
    createTransition:function(scene, oldScreenId,_currentScreenId)
    {
        //return scene;
         return new cc.TransitionFade(0.6, scene, cc.color(0,0,0,255));
    }
});