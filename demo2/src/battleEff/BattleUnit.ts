/*
 * @Author: LiJun 
 * @Date: 2018-10-09 11:05:04 
 * @Last Modified by:   LiJun 
 * @Last Modified time: 2018-10-09 11:05:04 
 */
/*
* name;
*/
abstract class BattleUnit extends DepSprite {
    isAlive: boolean;
    constructor() {
        super();
        this.isAlive = true;
    }
    abstract update(t:number);
    abstract onAdd(); 
    abstract onRemove();
}