/*
 * @Author: LiJun
 * @Date: 2018-10-23 15:39:51
 * @Last Modified by: LiJun
 * @Last Modified time: 2019-06-03 10:44:34
 */
/*
* name;
*/
var RESObj = /** @class */ (function () {
    function RESObj() {
        this.proprity = 1;
        this.refCount = 0;
        this.useParts = [];
        this.disposeTimes = 0;
        this.ref0Time = 0;
        this.inDList = false;
        this.isLoading = false;
        this.ready = false;
        this.mctexture = null;
    }
    RESObj.create = function () {
        var e = (RESObj.pool.length ? RESObj.pool.pop() : new RESObj);
        //let e: RESObj = Laya.pool.getItemByClass("RESObj", RESObj);
        return e;
    };
    RESObj.prototype.startLoad = function () {
        this.isLoading = true;
        this.jsonUrl = this.val + ".json";
        this.textureUrl = this.val + ".png";
        var arrRes = [this.jsonUrl, this.textureUrl];
        Laya.loader.load(arrRes, Laya.Handler.create(this, this.complete));
        // ResourceUtils.loadResource(arrRes, this.atlasComplete, undefined, this);
    };
    RESObj.prototype.atlasComplete = function (t) {
        this.isLoading = false;
        return false == t ? void RESManager.instance.onLoaded() : (void this.complete());
    };
    RESObj.prototype.complete = function () {
        this.mcdata = Laya.loader.getRes(this.jsonUrl);
        this.mctexture = Laya.loader.getRes(this.textureUrl);
        // if (Laya.Render.isWebGL && this.mctexture && this.mctexture.bitmap) {
        //     this.mctexture.bitmap.enableMerageInAtlas = false;
        // }
        this.factory = new MovieClipDataFactory(this.mcdata, this.mctexture);
        var t = this.useParts;
        // this.ready = true;
        // for (let e = t.length - 1; e >= 0; e--) {
        //     let i = t[e];
        //     i.loadAnimation();
        // }
        //let t = this.useParts;
        this.ready = !0;
        for (var e = t.length - 1; e >= 0; e--) {
            var i = t[e];
            i.buildmc();
        }
        t.length = 0,
            RESManager.instance.onLoaded();
    };
    RESObj.prototype.dispose = function () {
        if (this.mcdata && (Laya.Loader.clearRes(this.jsonUrl), this.mcdata = null), this.mctexture) {
            (this.mctexture.width >= 512 || this.mctexture.height >= 512) && Laya.Loader.clearRes(this.textureUrl);
            var t = this.factory && this.factory.spriteSheet;
            t && (t.dispose());
            if (t) {
                for (var e in t._textureMap) {
                    var value = t._textureMap[e];
                    value.destroy();
                    delete t._textureMap[e];
                }
            }
            this.mctexture = null;
        }
        this.jsonUrl = this.textureUrl = null,
            //this.state = -1,
            this.ready = !1,
            this.disposeTimes++;
        this.factory = null;
        //Laya.pool.recover("RESObj", this);
        RESObj.pool.push(this);
        //Laya.Loader.clearTextureRes(this.jsonUrl);
    };
    RESObj.pool = [];
    return RESObj;
}());
//# sourceMappingURL=RESObj.js.map