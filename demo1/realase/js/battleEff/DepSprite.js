var __extends=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),DepSprite=function(t){function e(){var e=t.call(this)||this;return e.isPool=!1,e.dep=0,e}return __extends(e,t),Object.defineProperty(e.prototype,"anchorOffsetX",{set:function(t){this.pivotX=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"anchorOffsetY",{set:function(t){this.pivotY=t},enumerable:!0,configurable:!0}),e.prototype.depAddChild=function(t){t.parent||this.addChild(t)},e.prototype.depRemoveChild=function(t){var e=this._childs.indexOf(t);t.isPool?e>=0&&this.removeChildAt(e):e>=0&&t.destroy()},e.prototype.sortChild=function(){var t=this._childs;if(Laya.Browser.window.conch)this._childs.forEach(function(t){t.zOrder=t.dep});else{t.length;t&&t.length>1&&t.sort(this.sortFunc)}},e.prototype.sortFunc=function(t,e){return t?e?t.dep-e.dep:-1:1},e}(Laya.Sprite);