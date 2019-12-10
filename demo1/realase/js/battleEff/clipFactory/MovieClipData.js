var MovieClipData=function(){function t(){this.$mcData=null,this.numFrames=1,this.frames=[],this.labels=null,this.events=[],this.frameRate=0,this.textureData=null,this.spriteSheet=null}return t.prototype.$init=function(t,e,a){this.textureData=e,this.spriteSheet=a,this.setMCData(t)},t.prototype.getKeyFrameData=function(t){var e=this.frames[t-1];return e.frame&&(e=this.frames[e.frame-1]),e},t.prototype.getTextureByFrame=function(t){var e=this.getKeyFrameData(t);if(e.res){return this.getTextureByResName(e.res)}return null},t.prototype.$getOffsetByFrame=function(t,e){var a=this.getKeyFrameData(t);a.res&&e.setTo(0|a.x,0|a.y)},t.prototype.getTextureByResName=function(t){if(null==this.spriteSheet)return null;var e=this.spriteSheet.getTexture(t);if(!e){var a=this.textureData[t];e=this.spriteSheet.createTexture(t,a.x,a.y,a.w,a.h)}return e},t.prototype.$isDataValid=function(){return this.frames.length>0},t.prototype.$isTextureValid=function(){return null!=this.textureData&&null!=this.spriteSheet},t.prototype.$fillMCData=function(t){this.frameRate=t.frameRate||24,this.fillFramesData(t.frames),this.fillFrameLabelsData(t.labels),this.fillFrameEventsData(t.events)},t.prototype.fillFramesData=function(t){for(var e,a=this.frames,r=t?t.length:0,i=0;i<r;i++){var s=t[i];if(a.push(s),s.duration){var n=parseInt(s.duration);if(n>1){e=a.length;for(var l=1;l<n;l++)a.push({frame:e})}}}this.numFrames=a.length},t.prototype.fillFrameLabelsData=function(t){if(t){var e=t.length;if(e>0){this.labels=[];for(var a=0;a<e;a++){var r=t[a];this.labels.push(new FrameLabel(r.name,r.frame,r.end))}}}},t.prototype.fillFrameEventsData=function(t){if(t){var e=t.length;if(e>0){this.events=[];for(var a=0;a<e;a++){var r=t[a];this.events[r.frame]=r.name}}}},t.prototype.setMCData=function(t){this.$mcData!=t&&(this.$mcData=t,t&&this.$fillMCData(t))},t.prototype.getMCData=function(){return this.$mcData},t}();