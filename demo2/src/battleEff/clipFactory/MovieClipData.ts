/*
 * @Author: LiJun 
 * @Date: 2018-10-09 11:06:18 
 * @Last Modified by: LiJun
 * @Last Modified time: 2018-10-09 11:08:17
 */
/*
* name;
*/
class MovieClipData {
    $mcData;
    numFrames;
    frames;
    labels;
    events;
    frameRate;
    textureData;
    spriteSheet:SpriteSheet|null;
    /**
             * 创建一个 egret.MovieClipData 对象
             * @version Egret 2.4
             * @platform Web,Native
             */
    constructor() {
        /**
         * @private
         * MovieClip数据
         */
        this.$mcData = null;
        /**
         * 总帧数
         * @version Egret 2.4
         * @platform Web,Native
         */
        this.numFrames = 1;
        /**
         * 帧数据列表
         * @version Egret 2.4
         * @platform Web,Native
         */
        this.frames = [];
        /**
         * 帧标签列表
         * @version Egret 2.4
         * @platform Web,Native
         */
        this.labels = null;
        /**
         * 帧事件列表
         * @version Egret 2.4
         * @platform Web,Native
         */
        this.events = [];
        /**
         * 帧率
         * @version Egret 2.4
         * @platform Web,Native
         */
        this.frameRate = 0;
        /**
         * 纹理数据
         * @version Egret 2.4
         * @platform Web,Native
         */
        this.textureData = null;
        /**
         * 纹理集
         * @version Egret 2.4
         * @platform Web,Native
         */
        this.spriteSheet = null;
    }
    /**
     * @private
     *
     * @param mcData
     * @param textureData
     * @param spriteSheet
     */
    $init(mcData, textureData, spriteSheet): void {
        this.textureData = textureData;
        this.spriteSheet = spriteSheet;
        this.setMCData(mcData);
    };
    /**
     * 根据指定帧序号获取该帧对应的关键帧数据
     * @param frame {number} 帧序号
     * @returns {any} 帧数据对象
     * @version Egret 2.4
     * @platform Web,Native
     */
    getKeyFrameData(frame): any {
        let outputFrameData = this.frames[frame - 1];
        if (outputFrameData.frame) {
            outputFrameData = this.frames[outputFrameData.frame - 1];
        }
        return outputFrameData;
    };
    /**
     * 根据指定帧序号获取该帧对应的Texture对象
     * @param frame {number} 帧序号
     * @returns {egret.Texture} Texture对象
     * @version Egret 2.4
     * @platform Web,Native
     */
    getTextureByFrame(frame): any {
        let frameData = this.getKeyFrameData(frame);
        if (frameData.res) {
            let outputTexture = this.getTextureByResName(frameData.res);
            return outputTexture;
        }
        return null;
    };
    $getOffsetByFrame(frame, point): void {
        let frameData = this.getKeyFrameData(frame);
        if (frameData.res) {
            point.setTo(frameData.x | 0, frameData.y | 0);
        }
    };
    /**
     * @private
     *
     * @param resName
     * @returns
     */
    getTextureByResName(resName): any {
        if (this.spriteSheet == null) {
            return null;
        }
        let texture = this.spriteSheet.getTexture(resName);
        if (!texture) {
            let textureData = this.textureData[resName];
            texture = this.spriteSheet.createTexture(resName, textureData.x, textureData.y, textureData.w, textureData.h);
        }
        return texture;
    };
    /**
     * @private
     *
     * @returns
     */
    $isDataValid(): boolean {
        return this.frames.length > 0;
    };
    /**
     * @private
     *
     * @returns
     */
    $isTextureValid(): boolean {
        return this.textureData != null && this.spriteSheet != null;
    };
    /**
     * @private
     *
     * @param mcData
     */
    $fillMCData(mcData): void {
        this.frameRate = mcData["frameRate"] || 24;
        this.fillFramesData(mcData.frames);
        this.fillFrameLabelsData(mcData.labels);
        this.fillFrameEventsData(mcData.events);
    };
    /**
     * @private
     *
     * @param framesData
     */
    fillFramesData(framesData): void {
        let frames = this.frames;
        let length = framesData ? framesData.length : 0;
        let keyFramePosition;
        for (let i = 0; i < length; i++) {
            let frameData = framesData[i];
            frames.push(frameData);
            if (frameData.duration) {
                let duration = parseInt(frameData.duration);
                if (duration > 1) {
                    keyFramePosition = frames.length;
                    for (let j = 1; j < duration; j++) {
                        frames.push({ "frame": keyFramePosition });
                    }
                }
            }
        }
        this.numFrames = frames.length;
    };
    /**
     * @private
     *
     * @param frameLabelsData
     */
    fillFrameLabelsData(frameLabelsData): void {
        if (frameLabelsData) {
            let length_1 = frameLabelsData.length;
            if (length_1 > 0) {
                this.labels = [];
                for (let i = 0; i < length_1; i++) {
                    let label = frameLabelsData[i];
                    this.labels.push(new FrameLabel(label.name, label.frame, label.end));
                }
            }
        }
    };
    /**
     * @private
     *
     * @param frameEventsData
     */
    fillFrameEventsData(frameEventsData): void {
        if (frameEventsData) {
            let length_2 = frameEventsData.length;
            if (length_2 > 0) {
                this.events = [];
                for (let i = 0; i < length_2; i++) {
                    let events = frameEventsData[i];
                    this.events[events.frame] = events.name;
                }
            }
        }
    };
    /**
     * @private
     *
     * @param value
     */
    setMCData(value): void {
        if (this.$mcData == value) {
            return;
        }
        this.$mcData = value;
        if (value) {
            this.$fillMCData(value);
        }
    }
    getMCData(): any {
        return this.$mcData;
    }
}