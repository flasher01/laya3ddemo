/*
 * @Author: LiJun 
 * @Date: 2018-10-09 11:05:17 
 * @Last Modified by: LiJun
 * @Last Modified time: 2018-12-19 13:29:40
 */
/*
* name;
*/
class DepSprite extends Laya.Sprite {
    isPool:boolean;//是否放到对象池
    //childIndex: number;
    dep: number;
    // $anchorOffsetX;
    // anchorOffsetY;
    constructor() {
        super();
        this.isPool = false;
        this.dep = 0;
        //this.childIndex = -1;
    }
    set anchorOffsetX(x){
        this.pivotX = x;
    }

    set anchorOffsetY(y){
        this.pivotY = y;
    }
    depAddChild(e: DepSprite): void {

        // let i = this._childs,
        //     o = i.length - 1,
        //     n = 0,
        //     a = (n + o) / 2 >> 0;
        // for (; o > n;) {
        //     let r = i[a];
        //     if (e.dep > r.dep) n = a + 1;
        //     else {
        //         if (!(e.dep < r.dep)) break;
        //         o = a - 1
        //     }
        //     a = (n + o) / 2 >> 0
        // }
        e.parent || this.addChild(e);//e.childIndex = a
    }
    depRemoveChild(t: DepSprite): void {
        let e = this._childs,
            i = e.indexOf(t);
            if (t.isPool) {
                i >= 0 && this.removeChildAt(i)
            } else {
                i >= 0 && t.destroy();
            }
        
    }

    sortChild(): void {
        var t = this._childs;
        if (Laya.Browser.window.conch) {
            this._childs.forEach(element => {
                element.zOrder = element.dep;
            });
        } else {
            let e = t.length;
            t && t.length > 1 && t.sort(this.sortFunc);
        }
        //t.sort(this.sortFunc)
    }
    sortFunc(t: DepSprite, e: DepSprite): number {
        return t ? e ? t.dep - e.dep : -1 : 1
    }
}