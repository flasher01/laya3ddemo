var FrameLabel=function(){function e(e,t,n){this._name=e,this._frame=0|t,n&&(this._end=0|n)}return Object.defineProperty(e.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"frame",{get:function(){return this._frame},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"end",{get:function(){return this._end},enumerable:!0,configurable:!0}),e.prototype.clone=function(){return new e(this._name,this._frame,this._end)},e}();