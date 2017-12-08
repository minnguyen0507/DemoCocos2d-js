/**
 * Created by TuanND on 10/24/2017.
 */
TableMaxPlayer = 9;
TurnTime = 15;
OffsetTurnTime = 5;
DelayResendMyLastAction = 4.5;
MaxNumOfResendAction = 1;
MaxActionsToReconnect = 10;
MaxNumofReconnectFail = 2;
DelayInvitingGame = 10;


/**
 * edit action type, so have to modifier isValidAction function in SceneTable
 */
ActionType = {
    PLAYER: 0,
    NEW_HAND: 1,
    NEXT_PHASE: 2,
    FORCE_SHOW_DOWN: 3,
    JOIN_GAME: 4,
    LEAVE_GAME: 5,
    FORCE_LEAVE_GAME: 6,
    SWITCH_AS_SPECTATOR: 7,
    TIP_DEALER: 8,
    BUY_IN: 9
};

TableLeaveGameReason = {
    LONG_IDLE: 0,
    NOT_ENOUGH_GOLD: 1,
    DESTROY_GAME: 2
};

MyLastActionStatus = {
    NOT_MINE: 0,
    ACTED: 1,
    DONE: 2
};

ChatType = {
    TEXT: 0,
    EMO: 1
};

FoldOpacity = 66;
LIMIT_HAND_AFK = 2;
