/**
 * Created by bachbv on 1/9/2017.
 */

var GV = GV || {};
GV.sms = [

];
GV.ConfirmSms = [

];
GV.enablePayment = [

];
GV.goldTotal = 0;
GV.goldReturn = 0;
GV.goldTai =0;
GV.goldXiu = 0;

GV.INFINITY = 999999999;
GV.IP = "52.221.230.66";
//GV.IP = "52.74.141.85";
GV.PORT = cc.sys.isNative ? "1101" : "8081";
GV.UTOKEN = "";
GV.UID = null;
GV.UNAME = "";
GV.GAMEMINI = null;

GV.totalJackpot = null;
GV.displayJackpot = null;
GV.goldJackpot = null;

GV.failCount = 0;
GV.maxFailCount = 1;   //最大错误重试次数

GV.isFirstVerifiled = 0;

//==============================================
// modify when build
//==============================================
BUILD_MODE = {
    DEV: "dev",
    PRIVATE: "private",
    LIVE: "live"
};
GV.MODE = BUILD_MODE.PRIVATE;
GV.VERSION_NAME = "1.0.0";
GV.VERSION = "1";

//GV.ENCODE_FILE_NAME = (GV.MODE == BUILD_MODE.LIVE);
GV.ENCODE_FILE_NAME = false;

GV.VISIBALE_SIZE = null;
GV.VISIBALE_SIZE_RECT = null;

GV.RES_JSON_LIST = "res/jsons/jsonList.json";
GV.RATIO = 1;
GV.TIME_LOOP = 0.3;
GV.FRAME_RATE = null;
GV.CONTENT_LOAD_DONE = false;
GV.playerId =null;
//==============================================
// MANAGERS
//==============================================
var moduleMgr = null;
var resourceMgr = null;
var asyncTaskMgr = null;
var languageMgr =  null;
var hotNewsMgr =  null;
var sceneMgr = null;
var effectMgr = null;
var connector = null;
var servicesMgr = null;


//==============================================
// SCENE IDS
//==============================================
GV.SCENE_IDS = {
	SCENETEST: 0,
};

//==============================================
// LAYERS
//==============================================
GV.MAX_LAYERS = 8;
GV.LAYERS = {
    BG: 0,
    GAME: 1,
    EFFECT: 2,
    MOVE: 3, // special layer, this includes : layer BG, GAME, EFFECT
    GUI: 4,
    POPUP: 5,
    LOADING: 6,
    CURSOR: 7,
};

GV.DIRECTION = {
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4,
    UP_RIGHT: 5,
    RIGHT_DOWN: 6,
    DOWN_LEFT: 7,
    LEFT_UP: 8,
};

GV.LOADING_STATUS = {
    INIT: 0,
    LOADING: 1,
    DONE: 2,
};

GV.TIME_FORMAT = {
    DD_HH: 0,               // ex: 2d12h
    DD_HH_MM: 1,            // ex: 2d12h30m
    DD_HH_MM_SS: 2,         // ex: 2d12h30m16s

    HH_MM: 3,               // ex: 12h30m
    HH_MM_SS: 4,            // ex: 12h30m16s
    MM_SS: 5,               // ex: 12m30s
};

GV.DATE_FORMAT = {
    DD_MM: "DD/MM",               // ex: 31/12
    DD_MM_YY: "DD/MM/YY",            // ex: 31/12/2015
};

CONNECTION_STATUS = {
    NO_NETWORK: 0,
    THREE_G: 1,
    WIFI: 2,
};

// invite facebook
GV.INVITE = false;

var usernameRegEx = /^(?:[A-Za-z0-9_.@]{6,32})$/;
var passwordRegEx = /^(?:[A-Za-z0-9~!@#$%^&*()_+`\-=\[\]{};':"\\|,.<>\/?]{6,35})$/;