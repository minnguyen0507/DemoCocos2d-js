/**
 * Created by bachbv on 1/16/2017.
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
            case GV.SCENE_IDS.LOADING:
                ZLog.debug("-> CREATE SCENE: LOADING");
                return new SceneLoading();
            case GV.SCENE_IDS.LOADING_DATA:
            	ZLog.debug("-> CREATE SCENE: LOADING_DATA");
            	return new SceneAssetsManagerLoader();
            case GV.SCENE_IDS.LOGIN:
                ZLog.debug("-> CREATE SCENE: LOGIN");
                return new SceneLogin();

            case GV.SCENE_IDS.LIST_TABLES:
                ZLog.debug("-> CREATE SCENE: LIST_TABLES");
                return new SceneListTables();

            case GV.SCENE_IDS.LOBBY:
                ZLog.debug("-> CREATE SCENE: LOBBY");
                return new SceneLobby();

            case GV.SCENE_IDS.TABLE:
                ZLog.debug("-> CREATE SCENE: TABLE");
                return new SceneTable();

            case GV.SCENE_IDS.STORE:
                ZLog.debug("-> CREATE SCENE: STORE");
                return new SceneStore();

            case GV.SCENE_IDS.MAINTAIN:
                ZLog.debug("-> CREATE SCENE: MAINTAIN");
                return new SceneMaintain();

            case GV.SCENE_IDS.TOURNAMENT:
                ZLog.debug("-> CREATE SCENE: TOURNAMENT");
                return new SceneTournament();

            case GV.SCENE_IDS.DOITHUONG:
                ZLog.debug("-> CREATE SCENE: DOITHUONG");
                return new SceneDoiThuong();

            case GV.SCENE_IDS.NOIDUNG:
                ZLog.debug("-> CREATE SCENE: NoiDung");
                return new SceneNoiDung();

            case GV.SCENE_IDS.GUIDE_LOBBY:
                ZLog.debug("-> CREATE SCENE: GUIDE_LOBBY");
                return new SceneGuideLobby();
        }
    },
    createTransition:function(scene, oldScreenId,_currentScreenId)
    {
        //return scene;
         return new cc.TransitionFade(0.6, scene, cc.color(0,0,0,255));
    }
});