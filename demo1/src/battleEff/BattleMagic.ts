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
class BattleMagic extends BattleUnit {
    effPart: Part;
    url;
    remain;
    inverval;//间隔
    act;
    delay;
    dep;
    runTime;
    repeat;
    scene;
    static pool: Array<BattleMagic> = []
    constructor() {
        super();
        this.isPool = true;
        this.effPart = Part.create();
        this.effPart.on(Laya.Event.COMPLETE, this, this.onRemove);
        this.addChild(this.effPart)
    }
    static create(t, i, o, n, a?, r?, s?): BattleMagic {
        void 0 === a && (a = 500), void 0 === r && (r = 500), void 0 === s && (s = 0);
        //let l: BattleMagic = Laya.Pool.getItemByClass("BattleMagic", BattleMagic);
        let l = (BattleMagic.pool.length > 0 ? BattleMagic.pool.pop() : new BattleMagic) as BattleMagic;
        l.url = t;//资源
        l.remain = a;//剩余时间
        l.x = o;//坐标
        l.y = n;
        l.inverval = r;//间隔
        l.repeat = i;//循环
        l.act = "_1";//动作
        l.delay = s;//延迟
        l.onAdd();
        l.dep = 9e3;//层级
        return l;
    }
    onAdd(): void {
        this.effPart.act = this.act;
        this.effPart.setAct(this.act);
        this.effPart.setVal(this.url);
        this.effPart.visible = false;
        this.runTime = 0;
        this.isAlive = true;
    }
    play() {
        Laya.timer.frameLoop(1, this, this.update);
    }
    update(t): any {
        t = Laya.timer.delta;
        if (this.delay > 0)
            return void (this.delay -= t);
        this.effPart.visible = true;
        this.remain -= t;
        this.remain <= 0 && (this.isAlive = false);
        this.runTime += t;
        let i = (DateUtils.getTimer(), this.effPart),
            o = this.runTime / this.inverval;
        /*o > 1 && (this.repeat ? (this.runTime -= this.inverval, o = 1 - o) : o = .999), */i.setPec(o)
    }
    onRemove(): void {
        this.scaleX = this.scaleY = 1;
        this.alpha = 1;
        this.dep = 9e3;
        this.effPart.reset();
        this.effPart.visible = false;
        BattleMagic.pool.push(this);
        Laya.timer.clear(this,this.update);
        //Laya.Pool.recover("BattleMagic", this);
    }
}