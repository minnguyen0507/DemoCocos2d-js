
POS ={
    ISME: 0,
    PLAYER1: 1,
    PLAYER2: 2,
    PLAYER3: 3,
    PLAYER4: 4,
    PLAYER5: 5,
    PLAYER6: 6,
    PLAYER7: 7,
    PLAYER8: 8,
};

BACAY_GAME_STATUS = {
    PRE_START : 1,
    START : 2,
    RESULT : 3,
    END_GAME : 4
};
BACAY_TIMER_START = 10;
BACAY_TIMER_VAOGA = 5;

BACAY_SERVER_TEST = {
    TIMERSTART : 2,
    TIMERCHICKEN : 2,
    CHECKBETGOLD : 1,
};

BACAY_SERVER_INFO = [   {slotIdx:0,uName:"IsMe",gold:"99999",chicken:0,avatar:"",vip:1},
                        {slotIdx:1,uName:"Player1",gold:"9999",chicken:0,avatar:"",vip:1},
                        {slotIdx:2,uName:"Player2",gold:"4333",chicken:0,avatar:"",vip:1},
                        {slotIdx:3,uName:"Player3",gold:"433234",chicken:0,avatar:"",vip:1},
                        {slotIdx:4,uName:"Player4",gold:"324323",chicken:0,avatar:"",vip:1},
                        {slotIdx:5,uName:"Player5",gold:"434234",chicken:0,avatar:"",vip:1},
                        {slotIdx:6,uName:"Player6",gold:"8888",chicken:0,avatar:"",vip:1},
                        {slotIdx:7,uName:"Player7",gold:"54888",chicken:0,avatar:"",vip:1},
                        {slotIdx:8,uName:"Player8",gold:"343432",chicken:0,avatar:"",vip:1}
                    ];
BACAY_SERVER_BOBAI = [
                        {}
                    ];

BACAY_GET_GAME_INFO = {"id":7,"structureId":"BC_8","blindLevel":5000,"timer":52,"gameStatus":2,"listPlayerSize":2,
    "playerList":[{"uId":1083,"uName":"D_MMKKLLL","displayName":null,"avatarURL":null,"defaultAvatar":"avatar_9","gold":1000000,"level":1,"exp":null,"vipLevel":0,"vipPoint":null,"vipExpireTime":null,"gamePosition":0,"statusInGame":11},
    {"uId":1081,"uName":"D_sdsdsd","displayName":null,"avatarURL":null,"defaultAvatar":"avatar_7","gold":1000000,"level":1,"exp":null,"vipLevel":0,"vipPoint":null,"vipExpireTime":null,"gamePosition":1,"statusInGame":11}],"listKeCuaSize":0,"listKeCua":[],"listDanhBienSize":0,"listDanhBien":[]}

// JS: ERROR :  receive--------------------END GAME{"time":6}
// JS: <=============== receive a cmd = 10003
// JS: BC_PRE_START | {"time":6}
// JS: ERROR :  receive--------------------PRESTART{"time":6}
// JS: ERROR :  do some thing...PreStart6
// JS: <=============== receive a cmd = 10004
// JS: BC_BETTING | {"time":6}
// JS: ERROR :  receive--------------------DAT CUOC{"time":6}
// JS: ERROR :  do some thing...betting
// JS: ERROR :  an node start - hien node vao ga
// JS: <=============== receive a cmd = 10005
// JS: BC_BET_CHICKEN | {"time":11}
// JS: ERROR :  receive--------------------DAT GA{"time":11}
// JS: ERROR :  do some thing...betting
// JS: <=============== receive a cmd = 10006
// JS: BC_DEAL_GAME | {"time":16,"card1":1,"card2":2,"card3":15}
// JS: ERROR :  receive--------------------DEAL GAME{"time":16,"card1":1,"card2":2,"card3":15}
// JS: <=============== receive a cmd = 10006
// JS: BC_DEAL_GAME | {"time":16,"card1":5,"card2":18,"card3":25}
// JS: ERROR :  receive--------------------DEAL GAME{"time":16,"card1":5,"card2":18,"card3":25}
// JS: <=============== receive a cmd = 10007
// JS: BC_END_GAME | {"time":6}
// JS: ERROR :  receive--------------------END GAME{"time":6}
// JS: <=============== receive a cmd = 10003
// JS: BC_PRE_START | {"time":6}

