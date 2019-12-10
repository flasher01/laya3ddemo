/*
 * @Author: LiJun 
 * @Date: 2018-10-23 15:41:47 
 * @Last Modified by: LiJun
 * @Last Modified time: 2019-06-03 12:09:32
 */
/*
* name;
*/
class RESManager {
    private static _instance;
    map = {};
    loadQueue: Array<RESObj> = [];
    ref0List: Array<RESObj | null> = [];
    loadingRes;
    constructor() {

    }
    static get instance(): RESManager {
        return RESManager._instance || (RESManager._instance = new RESManager), RESManager._instance;
    }
    refRes(t): any {
        let e: RESObj | undefined = this.map[t];
        if (e) {
            if (e.inDList) {
                let i = this.ref0List.indexOf(e);
                e.inDList = !1, this.ref0List.splice(i, 1)
            }
        } else e = RESObj.create(), e && (e.val = t, this.map[t] = e, this.loadQueue.push(e), this.loadNext());
        e && e.refCount++;
        return e
    }
    reduceRes(t): any {
        let e: RESObj = this.map[t];
        return e && (e.refCount-- ,
            e.refCount <= 0 && (e.inDList || (e.ref0Time = DateUtils.getTimer(),
                e.inDList = !0,
                this.ref0List.push(e)))), e
    }
    onLoaded(): void {
        this.loadingRes = null, this.loadNext()
    }
    loadNext(): void {
        if (!this.loadingRes && this.loadQueue.length)
            for (; this.loadQueue.length;) {
                let t = this.loadQueue.shift();
                if (t) {
                    this.loadingRes = t,
                        t.startLoad();
                    break
                }
            }
    }
    checkDestory(): void {
        let t = this,
            e = t.ref0List.length, o = !1;
        if (e > 0) {
            let i = e//Math.ceil(e / 4);
            i > 25 && (i = 25);
            for (let n = 0; i > n; n++) {
                let a: RESObj | null = t.ref0List[n];
                if (a) {
                    let r = DateUtils.getTimer() - a.ref0Time;
                    r > 1e4 &&
                        (a.inDList = !1, 0 == a.refCount && (t.destoryRes(a), t.ref0List[n] = null, o = !0))
                }

            }
            // o && ArrayUtils.cleannull(t.ref0List)
        }
    }
    checkDestory1(): void {
        let t = this,
            e = t.ref0List.length, o = !1;
        if (e > 0) {
            let i = e;//Math.ceil(e / 4);
            i > 25 && (i = 25);
            for (let n = 0; i > n; n++) {
                let a: RESObj | null = t.ref0List[n];
                if (a) {
                    let r = DateUtils.getTimer() - a.ref0Time;
                    r > 3e4 && (a.inDList = !1, 0 == a.refCount && (t.destoryRes(a), t.ref0List[n] = null, o = !0))
                }

            }
            // o && ArrayUtils.cleannull(t.ref0List)
        }
    }
    destoryRes(t: RESObj): void {
        if (t !== this.loadingRes) {
            if (delete this.map[t.val], false == t.isLoading) {
                let e = this.loadQueue.indexOf(t);
                e >= 0 && this.loadQueue.splice(e, 1)
            }
            t.dispose()
        }
    }
    // getVersionUrl(t) {
    //     return t = LoaderManager.HEADURL + t
    // }
}