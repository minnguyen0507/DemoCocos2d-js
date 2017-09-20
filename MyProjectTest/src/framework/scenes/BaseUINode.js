/**
 * Created by minnguyen on 9/20/2017.
 */

var BaseUINode = cc.Node.extend({
    _className: "BaseUINode",

    ctor:function(uiJson){
        this._super();
        this._deepSyncChildren = 1;
        this._uiJson = uiJson;
    },

    localize: function(){
        // override me
    },

    getClassName: function(){
        return this._className;
    },

    setDeepSyncChildren: function(deep){
        this._deepSyncChildren = deep;
    },

    syncAllChildren:function() {
        var node = ccs.load(this._uiJson, "res/").node;
        this._syncChildrenInNode(node, 0);

        // re-add child
        var children = node.getChildren();

        if (cc.sys.isNative) {
            for (var i = 0; i < children.length; ++i) {
                children[i].removeFromParent(false);
                this.addChild(children[i]);
            }
        }
        else {
            var temp = [];
            var numChild = children.length;
            for (i = 0; i < numChild; i++) {
                //ZLog.debug("children length = " + children.length);
                temp.push(children[0]);
                children[0].removeFromParent(false);
                this.addChild(temp[i]);

            }

            node = null;
            temp = null;
        }
    },

    _syncChildrenInNode: function(node, deep){
        if(deep >= this._deepSyncChildren) return;

        var allChildren = node.getChildren();
        if(allChildren === null || allChildren.length == 0) return;

        var nameChild;
        for(var i = 0; i < allChildren.length; i++) {
            nameChild = allChildren[i].getName();

            //if(nameChild){
            //    ZLog.debug("- child name = %s", nameChild);
            //}

            if(nameChild in this && this[nameChild] === null)
            {
                this[nameChild] = allChildren[i];
                if(nameChild.indexOf("btn") != -1 || nameChild.indexOf("cb") != -1)
                {
                    this[nameChild].setPressedActionEnabled && this[nameChild].setPressedActionEnabled(true);
                    this[nameChild].addTouchEventListener && this[nameChild].addTouchEventListener(this._onTouchUIEvent, this);
                    this[nameChild].setSwallowTouches && this[nameChild].setSwallowTouches(false);
                }
            }
            this._syncChildrenInNode(allChildren[i], deep + 1);
        }
    },

    _onTouchUIEvent:function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                this.onTouchUIBeganEvent(sender);
                break;
            case ccui.Widget.TOUCH_MOVED:
                this.onTouchUIMovedEvent(sender);
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.onTouchUIEndEvent(sender);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.onTouchUICancelEvent(sender);
                break;
        }
    },

    onTouchUIBeganEvent:function(sender){
        // override me
    },

    onTouchUIMovedEvent:function(sender){
        // override me
    },

    onTouchUIEndEvent:function(sender){
        // override me
    },

    onTouchUICancelEvent:function(sender){
        // override me
    },
});