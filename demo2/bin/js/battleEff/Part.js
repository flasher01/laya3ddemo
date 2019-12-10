var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * @Author: LiJun
 * @Date: 2018-10-09 11:05:35
 * @Last Modified by: LiJun
 * @Last Modified time: 2019-07-18 14:02:28
 */
/*
* name;
*/
var Part = /** @class */ (function (_super) {
    __extends(Part, _super);
    //cacheAs = "bitmap";
    function Part() {
        var _this = _super.call(this) || this;
        // parts: Parts | null;
        _this.totalFrames = 0;
        _this.dep = 0;
        _this.act = "";
        _this.val = "";
        //visible: boolean = true;
        _this._curFrm = -1;
        _this._perc = 0;
        //view: Laya.Sprite = new Laya.Sprite;
        _this.type = 2; //Parts.P_BODY;
        _this.aniIsLoad = false;
        //EffectMgr
        _this.aniInterv = 300;
        _this.repeat = true;
        _this.endTime = Number.MAX_VALUE;
        _this.frameRate = 30;
        return _this;
    }
    Part.create = function () {
        //对象池
        var t;
        t = Part.POOL.length ? Part.POOL.pop() : new Part;
        return t;
        // let t = Laya.Pool.getItemByClass("Part", Part);
        // return t;
        //return new Part;
    };
    Part.prototype.setVal = function (t) {
        if (t != this.val) {
            if (this.res) {
                var i = this.res.useParts.indexOf(this);
                this.res.useParts.splice(i, 1);
                RESManager.instance.reduceRes(this.val);
                this.mcdata = null;
            }
            this.val = t;
            if (t) {
                this.res = RESManager.instance.refRes(t);
                if (this.res) {
                    this.res.useParts.push(this);
                    //this.loadAnimation();
                    this.buildmc();
                }
            }
            else {
                this.res = null;
                this.texture = null;
            }
        }
    };
    Part.prototype.render = function (context, x, y) {
        this.updatePec();
        _super.prototype.render.call(this, context, x, y);
    };
    Part.prototype.setAct = function (t) {
        t && (this.act != t && (this.act = t, this.buildmc()));
    };
    Part.prototype.setPec = function (t) {
        if (!this.visible)
            return; //看不见的还渲染个啥？
        if (!this.displayedInStage) {
            return;
        }
        this._perc = t;
    };
    Part.prototype.updatePec = function () {
        var e = this;
        if (e.mcdata && this.res && this.res.factory) {
            var i = e.mcdata, o = i.numFrames, n = this._perc * o >> 0;
            if (n >= o) {
                this.event(Laya.Event.COMPLETE);
            }
            if (n >= o && (n -= 1), e._curFrm != n) {
                var a = i.frames[n];
                if (e._curFrm = n, a) {
                    if (i.spriteSheet) {
                        var r = i.spriteSheet._textureMap[a.res];
                        if (!r) {
                            var s = i.textureData[a.res];
                            r = i.spriteSheet.createTexture(a.res, s.x, s.y, s.w, s.h);
                        }
                        //e.$setBitmapData(r)
                        //e.graphics.drawTexture(r,a.x,a.y);
                        this.graphics.clear();
                        this.graphics.drawTexture(r);
                        //e.texture = r;
                    }
                    //e.x = a.x, e.y = a.y;
                    e.pivotX != -a.x && (e.pivotX = -a.x);
                    e.pivotY != -a.y && (e.pivotY = -a.y);
                    //e.$setAnchorOffsetX(-a.x), e.$setAnchorOffsetY(-a.y)
                }
                else {
                    //e.$setAnchorOffsetX(0), e.$setAnchorOffsetY(0), e.texture = null
                    //e.x = 0, e.y = 0, e.graphics.clear();
                    //e.pivotX = 0, e.pivotY = 0, e.texture = null;
                }
            }
        }
    };
    Part.prototype.destroy = function () {
        debugger; //看看那个地方要删除这个对象
        _super.prototype.destroy.call(this);
    };
    // setVisible(t: boolean) {
    //     this && (this.visible = t);
    //     this.visible = t;
    // }
    // loadAnimation() {
    //     if (this.val && this.res && this.res.ready == true) {
    //         let aniUrl = "resource/model/" + this.val + ".ani";
    //         this.loadAnimation(aniUrl, Laya.Handler.create(this, () => {
    //             this.aniIsLoad = true;
    //             this.buildmc();
    //         }));
    //     }
    // }
    Part.prototype.buildmc = function () {
        this.res && this.res.factory && (this.mcdata = this.res.factory.generateMovieClipData(this.act),
            this.mcdata && (this.frameRate = this.mcdata.frameRate),
            this._curFrm = -1,
            this.aniInterv = 100 / 3 * this.frameRate,
            (this.repeat == false) && (this.endTime = this.startTime + this.aniInterv),
            this.setPec(this._perc));
        // this.visible = this.visible) : this.visible = !1
        // this.customRenderEnable
        // if (this.val && this.act) {
        //     this.res && this.aniIsLoad == true ? (this.play(0, false, this.act), this.visible = this.visible) : this.visible = false;
        // }
    };
    Part.prototype.dispose = function () {
        if (!this.destroyed) {
            this.removeSelf();
            this.reset();
            Part.POOL.push(this);
        }
        //Laya.Pool.recover("Part", this);
    };
    Part.prototype.reset = function () {
        // this.parts = null;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        //this.touchEnabled = !1;
        this.visible = true;
        this.mcdata = null;
        this.setVal(null);
        //this.texture.destroy();
        //this.texture = null;
        this.graphics.clear();
        this._perc = 0;
        this._curFrm = -1;
        this.dep = 0;
        this.aniIsLoad = false;
        this.aniInterv = 300;
        this.repeat = true;
        this.endTime = Number.MAX_VALUE;
        this.frameRate = 30;
    };
    //[x: string]: any;
    Part.POOL = [];
    return Part;
}(Laya.Sprite));
//# sourceMappingURL=Part.js.map