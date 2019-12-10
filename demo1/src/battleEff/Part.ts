/*
 * @Author: LiJun 
 * @Date: 2018-10-09 11:05:35 
 * @Last Modified by: LiJun
 * @Last Modified time: 2019-07-18 14:02:28
 */
/*
* name;
*/
class Part extends Laya.Sprite {
    //[x: string]: any;
    static POOL: Array<Part> = [];
    // parts: Parts | null;
    totalFrames: number = 0;
    dep: number = 0;
    act: string | null = "";
    val: string | null = "";
    //visible: boolean = true;
    _curFrm: number = -1;
    _perc: number = 0;
    //view: Laya.Sprite = new Laya.Sprite;
    type: number = 2;//Parts.P_BODY;
    res: RESObj | undefined | null;
    aniIsLoad: boolean = false;
    mcdata: MovieClipData | null;

    //EffectMgr
    aniInterv = 300;
    startTime;
    repeat = true;
    endTime = Number.MAX_VALUE;
    frameRate = 30;
    //cacheAs = "bitmap";
    constructor() {
        super();
    }
    static create(): Part {
        //对象池
        let t;
        t = Part.POOL.length ? Part.POOL.pop() : new Part;
        return t
        // let t = Laya.Pool.getItemByClass("Part", Part);
        // return t;
        //return new Part;
    }

    setVal(t: string | null): void {//设置资源
        if (t != this.val) {
            if (this.res) {
                let i = this.res.useParts.indexOf(this);
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
            } else {
                this.res = null;
                this.texture = null;
            }
        }
    }
    render(context, x, y) {
        this.updatePec();
        super.render(context, x, y);
    }
    setAct(t: string | null): void {//设置动画
        t && (this.act != t && (this.act = t, this.buildmc()));
    }
    setPec(t: number): void {
        if (!this.visible)
            return;//看不见的还渲染个啥？
        if (!this.displayedInStage) {
            return;
        }
        this._perc = t;
    }
    updatePec(): void {
        let e = this;
        if (e.mcdata && this.res && this.res.factory) {
            let i = e.mcdata,
                o = i.numFrames,
                n = this._perc * o >> 0;
            if (n >= o) {
                this.event(Laya.Event.COMPLETE);
            }
            if (n >= o && (n -= 1), e._curFrm != n) {
                let a = i.frames[n];
                if (e._curFrm = n, a) {
                    if (i.spriteSheet) {
                        let r = i.spriteSheet._textureMap[a.res];
                        if (!r) {
                            let s = i.textureData[a.res];
                            r = i.spriteSheet.createTexture(a.res, s.x, s.y, s.w, s.h)
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
                } else {
                    //e.$setAnchorOffsetX(0), e.$setAnchorOffsetY(0), e.texture = null
                    //e.x = 0, e.y = 0, e.graphics.clear();
                    //e.pivotX = 0, e.pivotY = 0, e.texture = null;
                }
            }
        }
    }

    destroy() {
        debugger//看看那个地方要删除这个对象
        super.destroy();
    }
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

    buildmc(): void {
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

    }
    dispose(): void {//销毁资源
        if (!this.destroyed) {
            this.removeSelf();
            this.reset();
            Part.POOL.push(this)
        }
        //Laya.Pool.recover("Part", this);
    }

    reset(): void {
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
    }
}