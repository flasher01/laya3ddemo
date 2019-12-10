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
 * @Date: 2018-10-09 11:03:53
 * @Last Modified by:   LiJun
 * @Last Modified time: 2018-10-09 11:03:53
 */
/*
* name;
var c = BattleMagic.create(p, !1, u.x, u.y, h.time, h.time, h.delay);
c.scene = r, c.scaleX = h.scaleX, c.scaleY = h.scaleY, r.view.depAddChild(c), r.renders.push(c)
*/
var BattleMagic = /** @class */ (function (_super) {
    __extends(BattleMagic, _super);
    function BattleMagic() {
        var _this = _super.call(this) || this;
        _this.isPool = true;
        _this.effPart = Part.create();
        _this.effPart.on(Laya.Event.COMPLETE, _this, _this.onRemove);
        _this.addChild(_this.effPart);
        return _this;
    }
    BattleMagic.create = function (t, i, o, n, a, r, s) {
        void 0 === a && (a = 500), void 0 === r && (r = 500), void 0 === s && (s = 0);
        //let l: BattleMagic = Laya.Pool.getItemByClass("BattleMagic", BattleMagic);
        var l = (BattleMagic.pool.length > 0 ? BattleMagic.pool.pop() : new BattleMagic);
        l.url = t; //资源
        l.remain = a; //剩余时间
        l.x = o; //坐标
        l.y = n;
        l.inverval = r; //间隔
        l.repeat = i; //循环
        l.act = "_1"; //动作
        l.delay = s; //延迟
        l.onAdd();
        l.dep = 9e3; //层级
        return l;
    };
    BattleMagic.prototype.onAdd = function () {
        this.effPart.act = this.act;
        this.effPart.setAct(this.act);
        this.effPart.setVal(this.url);
        this.effPart.visible = false;
        this.runTime = 0;
        this.isAlive = true;
    };
    BattleMagic.prototype.play = function () {
        Laya.timer.frameLoop(1, this, this.update);
    };
    BattleMagic.prototype.update = function (t) {
        t = Laya.timer.delta;
        if (this.delay > 0)
            return void (this.delay -= t);
        this.effPart.visible = true;
        this.remain -= t;
        this.remain <= 0 && (this.isAlive = false);
        this.runTime += t;
        var i = (DateUtils.getTimer(), this.effPart), o = this.runTime / this.inverval;
        /*o > 1 && (this.repeat ? (this.runTime -= this.inverval, o = 1 - o) : o = .999), */ i.setPec(o);
    };
    BattleMagic.prototype.onRemove = function () {
        this.scaleX = this.scaleY = 1;
        this.alpha = 1;
        this.dep = 9e3;
        this.effPart.reset();
        this.effPart.visible = false;
        BattleMagic.pool.push(this);
        Laya.timer.clear(this, this.update);
        //Laya.Pool.recover("BattleMagic", this);
    };
    BattleMagic.pool = [];
    return BattleMagic;
}(BattleUnit));
//# sourceMappingURL=BattleMagic.js.map