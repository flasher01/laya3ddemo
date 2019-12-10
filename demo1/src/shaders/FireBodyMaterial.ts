class FireBodyMaterial extends Laya.BaseMaterial {
    public static DIFFUSETEXTURE: number = 1;
    public static MARGINALCOLOR: number = 2;
    public static ALBEDO: number = 3;
    // public static cHighLightColor: String = "fc0";
    // public static cMiddleColor: String = "fc1";
    // public static cLowKeyColor: String = "fc2";
    // public static cConstVal: String = "fc3";
    // public static cRGBToGray: String = "fc4";
    public static fc0: number = 4;
    public static fc1: number = 5;
    public static fc2: number = 6;
    public static fc3: number = 7;
    public static fc4: number = 8;

    sConstVal: Laya.Vector4;
    sRGBToGray: Laya.Vector4;

    _highLightColor: Laya.Vector4;
    _middleColor: Laya.Vector4;
    _lowKeyColor: Laya.Vector4;
    constructor() {
        super();
        this.setShaderName("FireBodyShader");

        this.renderQueue = 3000;
        this.cull = 2;
        this.blend = 1;
        this.srcBlend = 0x0302;
        this.dstBlend = 0x0303;
        this.albedo = new Laya.Vector4(1, 1, 1, 1);

        this.sConstVal = new Laya.Vector4(1, 0.5, 2, 0.2);
        this.sRGBToGray = new Laya.Vector4(299, 587, 114, 0.001);

        this._highLightColor = new Laya.Vector4(1, 1, 1, 1);
        this._middleColor = new Laya.Vector4(1, 0.8, 0, 1);
        this._lowKeyColor = new Laya.Vector4(1, 0.0, 0, 1);

        this.fc0 = this._highLightColor;
        this.fc1 = this._middleColor;
        this.fc2 = this._lowKeyColor;
        this.fc3 = this.sConstVal;
        this.fc4 = this.sRGBToGray;
    }
    set albedo(vec4) {
        this._setColor(3, vec4);
    }
    set fc0(vec4) {
        this._setColor(4, vec4);
    }
    get fc0() {
        return this._getColor(4);
    }
    set fc1(vec4) {
        this._setColor(5, vec4);
    }
    get fc1() {
        return this._getColor(5);
    }
    set fc2(vec4) {
        this._setColor(6, vec4);
    }
    get fc2() {
        return this._getColor(6);
    }
    set fc3(vec4) {
        this._setColor(7, vec4);
    }
    get fc3() {
        return this._getColor(7);
    }
    set fc4(vec4) {
        this._setColor(8, vec4);
    }
    get fc4() {
        return this._getColor(8);
    }
    set renderMode(value) {

    }
    /**
     * 获取漫反射贴图。
     *  漫反射贴图。
     */
    get diffuseTexture(): Laya.BaseTexture {
        return this._getTexture(FireBodyMaterial.DIFFUSETEXTURE);
    }

    /**
     * 设置漫反射贴图。
     * 漫反射贴图。
     */
    set diffuseTexture(value: Laya.BaseTexture) {
        this._setTexture(FireBodyMaterial.DIFFUSETEXTURE, value);
    }
}