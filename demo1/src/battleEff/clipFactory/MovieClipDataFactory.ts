/*
 * @Author: LiJun 
 * @Date: 2018-10-09 11:06:22 
 * @Last Modified by:   LiJun 
 * @Last Modified time: 2018-10-09 11:06:22 
 */
/*
* name;
*/
class MovieClipDataFactory {
    enableCache;
    $mcDataCache;
    $mcDataSet;
    $spriteSheet:SpriteSheet|null;
    constructor(movieClipDataSet, texture) {
        var _this = this;
        /**
         * 是否开启缓存
         * @version  2.4
         * @platform Web,Native
         */
        _this.enableCache = true;
        /**
         * @private
         */
        _this.$mcDataCache = {};
        _this.$mcDataSet = movieClipDataSet;
        _this.setTexture(texture);
    }
    /**
         * 创建一个 MovieClipDataFactory 对象
         * @param movieClipDataSet {any} MovieClip数据集，该数据集必须由官方工具生成
         * @param texture {Texture} 纹理
         * @version  2.4
         * @platform Web,Native
         */
    /**
     * 清空缓存
     * @version  2.4
     * @platform Web,Native
     */
    clearCache(): void {
        this.$mcDataCache = {};
    };
    /**
     * 根据名字生成一个MovieClipData实例。可以用于创建MovieClip。
     * @param movieClipName {string} MovieClip名字. 可选参数，默认为"", 相当于取第一个MovieClip数据
     * @returns {MovieClipData} 生成的MovieClipData对象
     * @version  2.4
     * @platform Web,Native
     */
    generateMovieClipData(movieClipName): MovieClipData|null {
        if (movieClipName === void 0) { movieClipName = ""; }
        if (movieClipName == "") {
            if (this.$mcDataSet) {
                for (movieClipName in this.$mcDataSet.mc) {
                    break;
                }
            }
        }
        if (movieClipName == "") {
            return null;
        }
        var output = this.findFromCache(movieClipName, this.$mcDataCache);
        if (!output) {
            output = new MovieClipData();
            this.fillData(movieClipName, output, this.$mcDataCache);
        }
        return output;
    };
    /**
     * @private
     *
     * @param movieClipName
     * @param cache
     * @returns
     */
    findFromCache(movieClipName, cache): any {
        if (this.enableCache && cache[movieClipName]) {
            return cache[movieClipName];
        }
        return null;
    };
    /**
     * @private
     *
     * @param movieClipName
     * @param movieClip
     * @param cache
     */
    fillData(movieClipName, movieClip, cache): void {
        if (this.$mcDataSet) {
            var mcData = this.$mcDataSet.mc[movieClipName];
            if (mcData) {
                movieClip.$init(mcData, this.$mcDataSet.res, this.$spriteSheet);
                if (this.enableCache) {
                    cache[movieClipName] = movieClip;
                }
            }
        }
    };

    getMcDataSet(): any {
        return this.$mcDataSet;
    }
    setMcDataSet(value): void {
        this.$mcDataSet = value;
    }

    get spriteSheet() {
        return this.$spriteSheet;
    }
    /**
     * @private
     *
     * @param value
     */
    setTexture(value): void {
        this.$spriteSheet = value ? new SpriteSheet(value) : null;
    }
}