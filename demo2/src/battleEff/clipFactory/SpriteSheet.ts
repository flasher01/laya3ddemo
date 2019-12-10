/*
 * @Author: LiJun 
 * @Date: 2018-10-09 11:06:26 
 * @Last Modified by: LiJun
 * @Last Modified time: 2019-06-03 10:43:45
 */
/*
* name;
*/
class SpriteSheet {
    _bitmapX;
    _bitmapY;
    _textureMap;
    $texture: Laya.Texture|null;
    /**
         * 创建一个 egret.SpriteSheet 对象
         * @param texture {Texture} 纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
    constructor(texture) {
        let _this = this;
        /**
         * @private
         * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置x。
         */
        _this._bitmapX = 0;
        /**
         * @private
         * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置y。
         */
        _this._bitmapY = 0;
        /**
         * @private
         * 纹理缓存字典
         */
        //_this._textureMap = egret.createMap();
        _this._textureMap = {}
        _this.$texture = texture;
        _this._bitmapX = texture.$bitmapX - texture.$offsetX;
        _this._bitmapY = texture.$bitmapY - texture.$offsetY;
        return _this;
    }
    /**
     * Obtain a cached Texture object according to the specified texture name
     * @param name {string} Cache the name of this Texture object
     * @returns {egret.Texture} The Texture object
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 根据指定纹理名称获取一个缓存的 Texture 对象
     * @param name {string} 缓存这个 Texture 对象所使用的名称
     * @returns {egret.Texture} Texture 对象
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    getTexture(name): Laya.Texture {
        return this._textureMap[name];
    };
    /**
     * Create a new Texture object for the specified area on SpriteSheet and cache it
     * @param name {string} Cache the name of this Texture object. If the name already exists, the previous Texture object will be overwrited.
     * @param bitmapX {number} Starting coordinate x of texture area on bitmapData
     * @param bitmapY {number} Starting coordinate y of texture area on bitmapData
     * @param bitmapWidth {number} Width of texture area on bitmapData
     * @param bitmapHeight {number} Height of texture area on bitmapData
     * @param offsetX {number} Starting point x for a non-transparent area of the original bitmap
     * @param offsetY {number} Starting point y for a non-transparent area of the original bitmap
     * @param textureWidth {number} Width of the original bitmap. If it is not passed, use the bitmapWidth  value.
     * @param textureHeight {number} Height of the original bitmap. If it is not passed, use the bitmapHeight value.
     * @returns {egret.Texture} The created Texture object
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 为 SpriteSheet 上的指定区域创建一个新的 Texture 对象并缓存它
     * @param name {string} 缓存这个 Texture 对象所使用的名称，如果名称已存在，将会覆盖之前的 Texture 对象
     * @param bitmapX {number} 纹理区域在 bitmapData 上的起始坐标x
     * @param bitmapY {number} 纹理区域在 bitmapData 上的起始坐标y
     * @param bitmapWidth {number} 纹理区域在 bitmapData 上的宽度
     * @param bitmapHeight {number} 纹理区域在 bitmapData 上的高度
     * @param offsetX {number} 原始位图的非透明区域 x 起始点
     * @param offsetY {number} 原始位图的非透明区域 y 起始点
     * @param textureWidth {number} 原始位图的高度，若不传入，则使用 bitmapWidth 的值。
     * @param textureHeight {number} 原始位图的宽度，若不传入，则使用 bitmapHeight 的值。
     * @returns {egret.Texture} 创建的 Texture 对象
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    //Texture.create=function(source,x,y,width,height,offsetX,offsetY,sourceWidth,sourceHeight){
    createTexture(name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX?, offsetY?, textureWidth?, textureHeight?): Laya.Texture {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (textureWidth === void 0) {
            textureWidth = offsetX + bitmapWidth;
        }
        if (textureHeight === void 0) {
            textureHeight = offsetY + bitmapHeight;
        }
        //let texture = new Laya.Texture();
        //texture.disposeBitmapData = false;
        //texture.$bitmapData = this.$texture.$bitmapData;
        //texture.$initData(this._bitmapX + bitmapX, this._bitmapY + bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, this.$texture.$sourceWidth, this.$texture.$sourceHeight);
        let texture: Laya.Texture = Laya.Texture.create(this.$texture, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight)
        this._textureMap[name] = texture;
        return texture;
    };
    /**
     * dispose texture
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 释放纹理
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    dispose(): void {
        if (this.$texture) {
            this.$texture = null;
        }
    }
}