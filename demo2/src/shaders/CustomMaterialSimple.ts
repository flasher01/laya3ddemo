class CustomMaterialSimple extends Laya.BaseMaterial {
    public static DIFFUSETEXTURE: number = 1;
    public static MARGINALCOLOR: number = 2;
    public static ALBEDO: number = 3;
    constructor() {
        super();
        this.setShaderName("CustomSimple");

        this.renderQueue = 3000;
        this.cull = 2;
        this.blend = 1;
        this.srcBlend = 0x0302;
        this.dstBlend = 0x0303;
        this.albedo = new Laya.Vector4(1, 1, 1, 1);
    }
    set albedo(vec4) {
        this._setColor(3, vec4);
    }
    get albedo() {
        return this._getColor(3);
    }
    set renderMode(value) {

    }
    /**
     * 获取漫反射贴图。
     *  漫反射贴图。
     */
    public get diffuseTexture(): Laya.BaseTexture {
        return this._getTexture(CustomMaterialSimple.DIFFUSETEXTURE);
    }

    /**
     * 设置漫反射贴图。
     * 漫反射贴图。
     */
    public set diffuseTexture(value: Laya.BaseTexture) {
        this._setTexture(CustomMaterialSimple.DIFFUSETEXTURE, value);
    }

    /**
     * 设置边缘光照颜色。
     * 边缘光照颜色。
     */
    public set marginalColor(value: Laya.Vector3) {
        this._setColor(CustomMaterialSimple.MARGINALCOLOR, value);
    }
}