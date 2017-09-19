/**
 * Created by Admin on 19/9/2017.
 */

var AdminActions = AdminActions || {};

            // 1.moveTo
            // 2.Scale
            // 3.Rotate
            // 4.RotateXY
            // 5.Skew
            // 6.SkewRotateScale
            // 7.Jump

AdminActions.createMoveTo = function(object, timer, posX, posY){
    object.runAction(cc.moveTo(timer, cc.p(posX, posY)));
    return object;
};

