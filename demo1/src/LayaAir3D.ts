// 程序入口
class LayaAir3D {
    constructor() {
        //初始化引擎
        Laya3D.init(640, 1136, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.frameRate = Laya.Browser.onPC ? Laya.Stage.FRAME_FAST : Laya.Stage.FRAME_SLOW;
        //开启统计信息
        Laya.Stat.show();
        CustomSimple.initShader();
        GhostShader.initShader();
        FireBodyShader.initShader();
        let copy: Copy = new Copy();
        copy.enterCopy(CopyType.hangUp);
    }
}
new LayaAir3D();