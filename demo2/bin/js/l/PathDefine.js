var PathDefine = /** @class */ (function () {
    function PathDefine() {
        if ( /*Laya.isPc*/true) {
            PathDefine.ATS = PathDefine.RES + "noatlas/view/";
            PathDefine.MOV = PathDefine.RES + "nomovie/";
            PathDefine.IMG = PathDefine.RES + "noimage/";
            PathDefine.MAP = PathDefine.RES + "nomap/";
            PathDefine.GOD = PathDefine.RES + "noimage/goods/";
            PathDefine.VIW = PathDefine.RES + "noimage/module/";
            PathDefine.ROLE = PathDefine.RES + "no3d/role/";
            PathDefine.SKILL = PathDefine.RES + "no3d/skill/";
            PathDefine.MONSTER = PathDefine.RES + "no3d/monster/";
            PathDefine.STATIC = PathDefine.RES + "no3d/static/";
            PathDefine.DROP = PathDefine.RES + "no3d/drop/";
        }
        else {
            PathDefine.ATS = PathDefine.RES + "atlas/view/";
            PathDefine.MOV = PathDefine.RES + "movie/";
            PathDefine.MAP = PathDefine.RES + "map/";
            PathDefine.IMG = PathDefine.RES + "image/";
            PathDefine.GOD = PathDefine.RES + "image/goods/";
            PathDefine.VIW = PathDefine.RES + "image/module/";
            PathDefine.ROLE = PathDefine.RES + "3d/role/";
            PathDefine.SKILL = PathDefine.RES + "3d/skill/";
            PathDefine.MONSTER = PathDefine.RES + "3d/monster/";
            PathDefine.STATIC = PathDefine.RES + "3d/static/";
            PathDefine.DROP = PathDefine.RES + "3d/drop/";
        }
    }
    PathDefine.init = function () {
    };
    PathDefine.RES = PathDefine.resPrefix + "res/";
    PathDefine.CFG = PathDefine.RES + "config/";
    PathDefine.AST = "view/module/";
    PathDefine.COM = "view/common/";
    PathDefine.SOUND = PathDefine.RES + "sound/";
    return PathDefine;
}());
//# sourceMappingURL=PathDefine.js.map