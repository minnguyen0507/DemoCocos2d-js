/**
 * Created by bachbv on 1/10/2017.
 */

var Utility = Utility || {};

Utility.isScreenRatio = function(ratio){
    return (GV.VISIBALE_SIZE.width / GV.VISIBALE_SIZE.height) <= ratio;
},

Utility.getScreenRatio = function(){
    return GV.VISIBALE_SIZE.width / GV.VISIBALE_SIZE.height;
};

Utility.getCmdKey = function(cmd){
    for(var key in CMD){
        if(cmd === CMD[key]){
            return key;
        }
    }
};

Utility.isWeekend = function(){
    return false;
    var now = new Date();
    now.setTime(Utility.getCurrentTime() * 1000);

    // Saturday = 6, Sunday = 0
    return now.getDay() == 6 || now.getDay() == 0;
};

Utility.convertPosition = function(pos, srcParent, dstParent){
    return dstParent.convertToNodeSpace(srcParent.convertToWorldSpace(pos));
};

Utility.attachLabelInButton = function(btn){
    if(btn && btn instanceof ccui.Button){
        // re-add child
        var children = btn.getChildren();

        if (cc.sys.isNative) {
            for (var i = 0; i < children.length; ++i) {
                if(children[i] instanceof ccui.Text){
                    children[i].setPosition(Utility.convertPosition(children[i].getPosition(), btn, btn.getTitleRenderer()));
                    children[i].removeFromParent(false);
                    btn.getTitleRenderer().addChild(children[i]);
                }
            }
        }
        else {
            var temp = [];
            var numChild = children.length;
            for (i = 0; i < numChild; i++) {
                if(children[0] instanceof ccui.Text){
                    temp.push(children[0]);
                    children[0].setPosition(Utility.convertPosition(children[0].getPosition(), btn, btn.getTitleRenderer()));
                    children[0].removeFromParent(false);
                    btn.getTitleRenderer().addChild(temp[i]);
                }
            }

            temp = null;
        }
    }
};

/**
 * modified anchor point and position to center
 * @param {cc.Node} node
 */
Utility.modifiedNodeToCenter = function(node, contentSize){
    if(node == null){
        return;
    }

    if(contentSize === undefined){
        contentSize = GV.VISIBALE_SIZE;
    }

    // 1. change anchor point
    node.setAnchorPoint(0.5, 0.5);
    // 2. change content size
    node.setContentSize(contentSize.width, contentSize.height);
    // 3. change position to center scene
    node.setPosition(GV.VISIBALE_SIZE.width / 2, GV.VISIBALE_SIZE.height / 2);
};

/**
 * get current time in milliseconds
 */
Utility.getCurrentTimeInMilliseconds = function(){
    return new Date().getTime();
};

Utility.setCurrentServerTime = function(time){
    if(Utility.getCurrentTime.offsetClientVsServer === undefined){
        Utility.getCurrentTime.offsetClientVsServer = 0;
    }

    Utility.getCurrentTime.offsetClientVsServer = Math.floor((new Date()).getTime() / 1000) - time;
    // ZLog.error("offsetClientVsServer = %d", Utility.getCurrentTime.offsetClientVsServer);
},

/**
 * get current time in seconds
 */
Utility.getCurrentTime = function(){
    if(Utility.getCurrentTime.offsetClientVsServer === undefined){
        Utility.getCurrentTime.offsetClientVsServer = 0;
    }

    return Math.floor((new Date()).getTime() / 1000) - Utility.getCurrentTime.offsetClientVsServer;
};


Utility.pointInScreen = function(point){
    return (0 <= point.x && point.x <= GV.VISIBALE_SIZE.width
            && 0 <= point.y && point.y <= GV.VISIBALE_SIZE.height);
};

Utility.getDirectionId = function(directionName){
    directionName = directionName.toUpperCase();
    if(Directions[directionName]){
        return Directions[directionName];
    }else{
        ZLog.error("NOT FOUND direction name = (%s)", directionName);
        return undefined;
    }
};
Utility.getTypeObject = function(id){
    var arr = id.split("_");
    return arr[0];
};

Utility.copyObject = function(target, source){
   for(var key in source)
   {
       if(key in target)
       {
           target[key] = source[key];
       }
       else
       {
           ZLog.debug("copyObject error | " + key);
       }

   }
};

/**
 *
 * @param {int} layerId
 * @return {String} layerName
 */
Utility.getLayerName = function(layerId){
    for(var i in GV.LAYERS){
        if(GV.LAYERS[i] == layerId){
            return i;
        }
    }

    ZLog.error("----> NOT FOUND layer id (%d)", layerId);
    return "";
};

/**
 * convert time (in second) to String
 * default: format = HH_MM_SS
 * @param time
 * @param outputFormat
 * @param hideZero
 * @param useDoubleZero
 * @param maxNumOfUnits
 */
Utility.timeToString = function(time, outputFormat, hideZero, useDoubleZero, maxNumOfUnits){
    time = Math.max(time, 0);

    if(hideZero === undefined || hideZero === null){
        hideZero = true;
    }

    if(useDoubleZero === undefined || useDoubleZero === null){
        useDoubleZero = true;
    }

    if(outputFormat === undefined || outputFormat === null){
        outputFormat = "DDdHHhMMmSSs";
    }

    if(maxNumOfUnits === undefined || maxNumOfUnits === null){
        maxNumOfUnits = 4;
    }

    var numOfUnits = 0;
    var remainTime = time;
    var ddStr, hhStr, mmStr, ssStr;
    var dd = ddStr = Math.floor(remainTime / 86400);
    remainTime -= dd * 86400;
    var hh = hhStr = Math.floor(remainTime / 3600);
    remainTime -= hh * 3600;
    var mm = mmStr = Math.floor(remainTime / 60);
    remainTime -= mm * 60;
    var ss = ssStr = Math.floor(remainTime);

    if(dd > 0 && outputFormat.indexOf("DD") == -1){
        hh += 24 * dd;
        hhStr = hh;
    }

    //var timeString = "";
    if(useDoubleZero){
        if(dd < 10) ddStr = "0" + dd;
        if(hh < 10) hhStr = "0" + hh;
        if(mm < 10) mmStr = "0" + mm;
        if(ss < 10) ssStr = "0" + ss;
    }

    if(hideZero){
        if(dd == 0) {
            outputFormat = outputFormat.replace("DD", "");
            outputFormat = outputFormat.replace("d", "");
        }

        if(hh == 0) {
            outputFormat = outputFormat.replace("HH", "");
            outputFormat = outputFormat.replace("h", "");
        }

        if(mm == 0) {
            outputFormat = outputFormat.replace("MM", "");
            outputFormat = outputFormat.replace("m", "");
        }

        if(ss == 0) {
            outputFormat = outputFormat.replace("SS", "");
            outputFormat = outputFormat.replace("s", "");
        }
    }

    if(dd > 0 || !hideZero){
        outputFormat = outputFormat.replace("DD", ddStr);
        ++numOfUnits;
    }

    if((hh > 0 || !hideZero) && numOfUnits < maxNumOfUnits){
        outputFormat = outputFormat.replace("HH", hhStr);
        ++numOfUnits;
    }
    else{
        outputFormat = outputFormat.replace("HH", "");
        outputFormat = outputFormat.replace("h", "");
    }

    if((mm > 0 || !hideZero) && numOfUnits < maxNumOfUnits){
        outputFormat = outputFormat.replace("MM", mmStr);
        ++numOfUnits;
    }
    else{
        outputFormat = outputFormat.replace("MM", "");
        outputFormat = outputFormat.replace("m", "");
    }

    if((ss > 0 || !hideZero) && numOfUnits < maxNumOfUnits){
        outputFormat = outputFormat.replace("SS", ssStr);
        ++numOfUnits;
    }
    else{
        outputFormat = outputFormat.replace("SS", "");
        outputFormat = outputFormat.replace("s", "");
    }

    //if(format == GV.TIME_FORMAT.DD_HH
    //    || format == GV.TIME_FORMAT.DD_HH_MM
    //    || format == GV.TIME_FORMAT.DD_HH_MM_SS){
    //    if(dd > 0){
    //        timeString += dd +"d";
    //    }
    //
    //    outputFormat = outputFormat.replace("DD", dd);
    //}
    //
    //if(format != GV.TIME_FORMAT.MM_SS){
    //    if(hh > 0){
    //        timeString += hh + "h";
    //    }
    //
    //    outputFormat = outputFormat.replace("HH", hh);
    //}
    //
    //if(format != GV.TIME_FORMAT.DD_HH){
    //    if(mm > 0){
    //        timeString += mm + "m";
    //    }
    //
    //    outputFormat = outputFormat.replace("MM", mm);
    //}
    //
    //if(format == GV.TIME_FORMAT.DD_HH_MM_SS
    //    || format == GV.TIME_FORMAT.HH_MM_SS
    //    || format == GV.TIME_FORMAT.MM_SS){
    //    if(ss > 0){
    //        timeString += ss + "s";
    //    }
    //
    //    outputFormat = outputFormat.replace("SS", ss);
    //}

    //ZLog.debug("timeString = %s", outputFormat);
    return outputFormat;
};

/**
 * convert date (in second) to String
 *
 * default: format = DD_MM_YY (31/12/2015)
 *          separator = / (only short mode)
 * @param time
 * @param format
 * @param hideZero
 */
Utility.dateToString = function(time, format, hideZero){
    if(format === undefined){
        format = GV.DATE_FORMAT.DD_MM_YY;
    }

    if(hideZero === undefined){
        hideZero =  true;
    }

    var date = new Date();
    var timezone = date.getTimezoneOffset() * 60;
    date.setTime((time - timezone) * 1000);
    var dd = date.getUTCDate();
    var mm = date.getUTCMonth() + 1;
    var yy = date.getUTCFullYear();
    var hh = date.getUTCHours();
    var m_m = date.getUTCMinutes();
    var ss = date.getUTCSeconds();

    //ZLog.debug("date = " + date.toString());
    //ZLog.debug("date UTC = " + date.toUTCString());

    format = format.replace("YY", yy)
                    .replace("MM", (mm < 10 ? ("0" + mm) : mm))
                    .replace("DD", (dd < 10 ? ("0" + dd) : dd))
                    .replace("HH", (hh < 10 ? ("0" + hh) : hh))
                    .replace("M_M", (m_m < 10 ? ("0" + m_m) : m_m))
                    .replace("SS", (ss < 10 ? ("0" + ss) : ss));

    //ZLog.debug("dateToString = %s", format);
    return format;
};

/**
 *
 * @param number
 * @param length
 * @returns {*}
 * @private
 */
Utility.__fillNumberWithZero = function(number){
    if(number < 10){
        return "00" + number;
    }
    else if(number < 100){
        return "0" + number;
    }
    else{
        return number;
    }
};

/**
 * pathToFile/abc.json --> abc
 * @param {String} url (full path to file)
 * @returns {String} fileName
 */
Utility.getFileName = function(url){
    if(!url) return "";
    var arr = url.match(/([^\/]+)\.[^\/]+$/);
    if(arr && arr[1])
        return arr[1];
    else
        return "";
};

/**
 *
 * @param money
 * @param unit
 * @param separator
 * @returns {*}
 */
Utility.formatMoney = function(money, unit, separator){
    if(unit === undefined) unit = "$";

    return unit + Utility.formatAlignNumber(money, separator);
};

Utility.formatMoney2 = function(money,  separator){

    return Utility.formatAlignNumber(money, separator);
};

/**
 *
 * @param money
 * @param unit
 * @param separator
 * @returns {*}
 */
Utility.formatMoneyFull = function(money, unit, separator){
    if(unit === undefined) unit = "$";

    return unit + Utility.formatAlignNumber(money, separator, true);
};

/**
 *
 * @param number
 * @param separator
 * @param isFull
 * @returns {*}
 */
Utility.formatAlignNumber = function(number, separator, isFull){
    if(number === undefined) return "0";

    number += 0.1;
    if(separator === undefined){
        separator = ",";
    }

    if(isFull === undefined){
        isFull = false;
    }

    var isNegative = number < 0;
    number = Math.abs(Math.floor(number));
    var numString = number.toString();

    if(isFull){
        var curIndex = numString.length - 3;

        while(curIndex > 0){
            numString = numString.insertAt(curIndex, separator);
            curIndex -= 3;
        }
    }
    else{
        var prefix = "";
        if(numString.length > 9){
            numString = (number / 1000000000.0).toFixed(2);

            prefix = "B";
        }
        else if(numString.length > 6){
            numString = (number / 1000000.0).toFixed(2);

            prefix = "M";
        }
        else if(numString.length > 4){
            numString = (number / 1000.0).toFixed(1);

            prefix = "K";
        }
        else if(numString.length > 3){
            numString = numString.insertAt(1, separator);
        }

        if(numString.indexOf('.') > -1){
            // delete 0 and . if not need
            while(numString[numString.length - 1] == '0'){
                numString = numString.slice(0, -1);
            }

            if(numString[numString.length - 1] == '.'){
                numString = numString.slice(0, -1);
            }
        }

        numString += prefix;
    }

    if(isNegative){
        numString = "-" + numString;
    }

    //ZLog.debug("num String = %s", numString);
    return numString;
};


/**
 *
 * @param {String} name
 * @returns {cc.Color} color
 */
Utility.getColorByName = function(name){
    if(!cc.isString(name)) return cc.color.WHITE;

    name = name.toLowerCase();
    var color = cc.color.WHITE;
    switch (name){
        case 'green':
            color = cc.color.GREEN;
            break;
        case 'red':
            color = cc.color.RED;
            break;
        case 'violet':
            color = cc.color(238, 130, 238);
            break;
        case 'yellow':
            color = cc.color.YELLOW;
            break;
        case 'brown':
            color = cc.color(139, 69, 19);
            break;
        case 'black':
            color = cc.color.BLACK;
            break;
        case 'white':
            color = cc.color.WHITE;
            break;
        case 'blue':
            color = cc.color.BLUE;
            break;
        case 'orange':
            color = cc.color.ORANGE;
            break;
        case 'fire brick': // red
            color = cc.color(178, 34, 34);
            break;
        case 'salmon': // red
            color = cc.color(250, 128, 114);
            break;
        case 'orange red': // red
            color = cc.color(255, 69, 0);
            break;
        case 'olive': // green
            color = cc.color(128, 128, 0);
            break;
        case 'lawn green': // green
            color = cc.color(124, 252, 0);
            break;
        case 'dark green': // green
            color = cc.color(0, 100, 0);
            break;
        case 'pale green': // green
            color = cc.color(152, 251, 152);
            break;
        case 'teal': // blue
            color = cc.color(0, 128, 128);
            break;
        case 'cyan': // blue
            color = cc.color(152, 255, 255);
            break;
        case 'aqua marine': // blue
            color = cc.color(127, 255, 212);
            break;
        case 'sky blue': // blue
            color = cc.color(135, 206, 235);
            break;
        case 'midnight blue': // blue
            color = cc.color(25, 25, 112);
            break;
        case 'royal blue': // blue
            color = cc.color(65, 105, 225);
            break;
        case 'dark orchid': // blue
            color = cc.color(153, 50, 204);
            break;
        case 'gray': // gray
        case 'grey': // gray
            color = cc.color(128, 128, 128);
            break;
        case 'bisque': // light
            color = cc.color(255, 228, 196);
            break;
        default :
            cc.warn("COLOR = %s NOT FOUND", name);
            break;
    }

    return color;
};

Utility.inDeviceVision = function(object){
    if(object && object instanceof cc.Node){
        if(object.getParent()){
            var worldPos = object.getParent().convertToWorldSpace(object.getPosition());

            worldPos.x -= object.width * 0.5;
            worldPos.y -= object.height * 0.5;

            return cc.rectOverlapsRect(cc.rect(worldPos.x, worldPos.y, object.width, object.height), GV.VISIBALE_SIZE_RECT);
        }
        else{
            ZLog.debug("object not have a parent");
        }
    }

    return false;
};

/**
 *
 */
Utility.convertJsonToData = function(jsonData, obj){
    _.assign(obj, jsonData);
};

/**
 *
 * @param spriteOrName
 * @param size
 * @param maskSpriteOrName
 * @returns {*}
 */
Utility.makeCircleAvatar = function(spriteOrName, size, maskSpriteOrName){
    if(maskSpriteOrName === undefined) maskSpriteOrName = res.avatar_mask;

    if(maskSpriteOrName instanceof cc.Sprite){
        var nodeMask = maskSpriteOrName;
    }
    else{ // is String
        nodeMask = new cc.Sprite(maskSpriteOrName);
    }

    if(spriteOrName instanceof cc.Sprite){
        var sprite = spriteOrName;
    }
    else{ // is String
        sprite = new cc.Sprite(spriteOrName);
    }

    if(size === undefined){
        size = sprite.getContentSize();
    }
    else{
        sprite.setScaleX(size.width / sprite.getContentSize().width);
        sprite.setScaleY(size.height / sprite.getContentSize().height);
    }


 var clipNode = new cc.ClippingNode();
 sprite.setName("sprite");
 clipNode.addChild(sprite);
 clipNode.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
 clipNode.setAlphaThreshold(0.05);
 clipNode.setInverted(false);

 nodeMask.setScaleX(size.width / nodeMask.getContentSize().width);
 nodeMask.setScaleY(size.height / nodeMask.getContentSize().height);
 clipNode.setStencil(nodeMask);
 clipNode.setContentSize(size);

 return clipNode;
};

/**
 *
 */
Utility.captureScreen = function(){
    if(Utility.captureScreen.isRunnning === undefined){
        Utility.captureScreen.isRunnning = false;
    }

    if(Utility.captureScreen.isRunnning) return;
    Utility.captureScreen.isRunnning = true;

    // schedule to reset flag
    setTimeout(function(){
        Utility.captureScreen.isRunnning = false;
    }, 5000);

    var fileName = "screenshot_Poker.jpg";
    var absolutePath = jsb.fileUtils.getWritablePath() + fileName;
    //if(jsb.fileUtils.isFileExist(absolutePath)){
    //    jsb.fileUtils.removeFile(absolutePath);
    //}

    var renderTexture = new cc.RenderTexture(cc.winSize.width, cc.winSize.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
    renderTexture.begin();
    cc.director.getRunningScene().visit();
    renderTexture.end();

    renderTexture.getSprite().setFlippedY(true);

    var success = renderTexture.saveToFile(fileName, cc.IMAGE_FORMAT_JPEG);

    if(success){
        ZLog.debug("captureScreen: saved to " + absolutePath);

        return absolutePath;
    }
    else{
        return "";
    }
}

/**
 *
 * @param data1
 * @param data2
 * @returns {boolean}
 */
Utility.isSameData = function(data1, data2){
    if(data1 == null && data2 == null){
        return true;
    }
    else if(data1 == null || data2 == null){
        return false;
    }
    else{
        if(data1 instanceof Array && data2 instanceof Array){
            // is array
            if(data1.length != data2.length) return false;

            for(var i = 0; i < data1.length; ++i){
                if(!Utility.isSameData(data1[i], data2[i])) return false;
            }
        }
        else if(data1 instanceof Array || data2 instanceof Array){
            return false;
        }
        else if(data1 instanceof Object && data2 instanceof Object){
            // is object
            for(var key in data1){
                if(!Utility.isSameData(data1[key], data2[key])) return false;
            }

            for(key in data2){
                if(data1[key] == null) {
                    return false;
                }
            }
        }
        else{
            // this is anchor
            return data1 === data2;
        }
    }

    ZLog.debug("is same data: \n -%s\n -%s", JSON.stringify(data1), JSON.stringify(data2));
    return true;
}

/**
 * remove all textures by keys
 */
Utility.removeTexturesCacheByKeys = function (fileList) {
    for(var i = 0; i < fileList.length; ++i){
        cc.textureCache.removeTextureForKey(fileList[i]);
    }
};

Utility.writeToFile = function(contentString, fileName){
    var writePathAble = jsb.fileUtils.getWritablePath() + fileName;

    if(jsb.fileUtils.writeStringToFile(contentString , writePathAble)){
        PlatformUtils.makeToast("saved " + writePathAble);
    }
    else{
        PlatformUtils.makeToast("cannot save");
    }
};

Utility.displayName = function(name, maxLength){
    if(name == undefined) return "";
    if(maxLength === undefined) maxLength = 10;

    name = name.trim();

    if(name.length > maxLength){
        var newName = name.substr(0, maxLength);
        if(cc.sys.isNative) newName += "...";
    }
    else{
        newName = name;
    }

    return newName;
};

Utility.isOperator = function(operator){
    var selectedOperatorByUser = fr.UserData.getString(UserDataKey.MY_OPERATOR, "");
    if(selectedOperatorByUser === operator) return true;

    var mcc_mnc = fr.platformWrapper.getNetworkOperator();

    switch (operator){
        //-----------------------------------------------------------------------------
        // vietnam
        //-----------------------------------------------------------------------------
        case TELCO_CHANNELS.VIETTEL:
            return mcc_mnc == MCC_MNC.VIETTEL;

        case TELCO_CHANNELS.VINA_PHONE:
            return mcc_mnc == MCC_MNC.VINA_PHONE;

        case TELCO_CHANNELS.MOBI_PHONE:
            return mcc_mnc == MCC_MNC.MOBI_PHONE;

        //-----------------------------------------------------------------------------
        // thailand
        //-----------------------------------------------------------------------------
        case TELCO_CHANNELS.AIS:
            return mcc_mnc == MCC_MNC.AIS ||
                mcc_mnc == MCC_MNC.AIS_900 ||
                mcc_mnc == MCC_MNC.AIS_1800;

        case TELCO_CHANNELS.TRUE:
            return mcc_mnc == MCC_MNC.TRUE ||
                mcc_mnc == MCC_MNC.CAT ||
                mcc_mnc == MCC_MNC.CAT_800 ||
                mcc_mnc == MCC_MNC.WE_PCT ||
                mcc_mnc == MCC_MNC.TRUE_GSM;

        case TELCO_CHANNELS.DTAC_HAPPY:
            return mcc_mnc == MCC_MNC.DTAC_2 ||
                mcc_mnc == MCC_MNC.DTAC_HAPPY;

        //-----------------------------------------------------------------------------
        // indo
        //-----------------------------------------------------------------------------
        case TELCO_CHANNELS.TELKOMSEL:
            return mcc_mnc == MCC_MNC.TELKOMSEL ||
                mcc_mnc == MCC_MNC.TELKOMSEL_M;

        case TELCO_CHANNELS.INDOSAT:
            return mcc_mnc == MCC_MNC.INDOSAT ||
                mcc_mnc == MCC_MNC.INDOSAT_2 ||
                mcc_mnc == MCC_MNC.INDOSAT_IM3;

        case TELCO_CHANNELS.XL:
            return mcc_mnc == MCC_MNC.XL_AXIS ||
                mcc_mnc == MCC_MNC.XL;

        //-----------------------------------------------------------------------------
        // malaysia
        //-----------------------------------------------------------------------------
        case TELCO_CHANNELS.DIGI:
            return mcc_mnc == MCC_MNC.DIGI_1 ||
                mcc_mnc == MCC_MNC.DIGI_2;

        case TELCO_CHANNELS.MAXIS:
            return mcc_mnc == MCC_MNC.MAXIS ||
                mcc_mnc == MCC_MNC.MAXIS_2 ||
                mcc_mnc == MCC_MNC.U_MOBILE ||
                mcc_mnc == MCC_MNC.BARAKA;

        case TELCO_CHANNELS.CELCOM:
            return mcc_mnc == MCC_MNC.CELCOM ||
                mcc_mnc == MCC_MNC.CELCOM_2 ||
                mcc_mnc == MCC_MNC.ALTEL ||
                mcc_mnc == MCC_MNC.TUNE;

        //-----------------------------------------------------------------------------
        // myanmar
        //-----------------------------------------------------------------------------

        default :
            ZLog.error("not found | " + operator + " | mcc_mnc |" + mcc_mnc);
            return false;
    }
};

Utility.getCurrency = function(){
    var country = servicesMgr.getCountry();

    switch (country){
        case COUNTRY.VIETNAM:
            return CURRENCY.VND;
            break;

        case COUNTRY.INDO:
            return CURRENCY.IDR;
            break;

        case COUNTRY.MALAYSIA:
            return CURRENCY.MYR;
            break;

        case COUNTRY.THAILAND:
        case COUNTRY.GOFA:
            return CURRENCY.THB;

        default :
            return CURRENCY.USD;
    }
};

Utility.exitGame = function(){
    Audio.cleanUp();
    Pool.drainAllPools();
    Popups.cleanUp();
    Notifications.cleanUp();
    GameLoop.cleanUp();
    resourceMgr.cleanUp();
    moduleMgr.cleanUp();
};