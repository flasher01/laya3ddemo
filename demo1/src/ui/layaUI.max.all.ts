
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class ControlUI extends View {
		public id:Laya.TextInput;
		public xt:Laya.Label;
		public yt:Laya.Label;
		public zt:Laya.Label;
		public xx:Laya.Label;
		public yy:Laya.Label;
		public nu:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Label","props":{"y":61,"x":67,"width":29,"text":"x:","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"TextInput","props":{"y":16,"x":62,"var":"id","text":"1","fontSize":22,"color":"#f3ecec"}},{"type":"Label","props":{"y":61,"x":91,"width":96,"var":"xt","text":"1","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":61,"x":183,"width":29,"text":"y:","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":61,"x":207,"width":96,"var":"yt","text":"1","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":61,"x":289,"width":29,"text":"z:","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":61,"x":313,"width":96,"var":"zt","text":"1","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":116,"x":68,"width":29,"text":"x:","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":116,"x":92,"width":96,"var":"xx","text":"1","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":116,"x":205,"width":29,"text":"y:","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"Label","props":{"y":116,"x":229,"width":96,"var":"yy","text":"1","height":22,"fontSize":22,"color":"#f9f3f3"}},{"type":"TextInput","props":{"y":18,"x":201,"var":"nu","text":"0.1","fontSize":22,"color":"#f3ecec"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ControlUI.uiView);

        }

    }
}
