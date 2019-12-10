	__class(BaseMaterial,'laya.d3.core.material.BaseMaterial',_super);
	var __proto=BaseMaterial.prototype;
	Laya.imps(__proto,{"laya.d3.core.IClone":true})
	/**
	*增加Shader宏定义。
	*@param value 宏定义。
	*/
	__proto._addShaderDefine=function(value){
		this._shaderDefineValue |=value;
	}

	/**
	*移除Shader宏定义。
	*@param value 宏定义。
	*/
	__proto._removeShaderDefine=function(value){
		this._shaderDefineValue &=~value;
	}

	/**
	*增加禁用宏定义。
	*@param value 宏定义。
	*/
	__proto._addDisablePublicShaderDefine=function(value){
		this._disablePublicShaderDefine |=value;
	}

	/**
	*移除禁用宏定义。
	*@param value 宏定义。
	*/
	__proto._removeDisablePublicShaderDefine=function(value){
		this._disablePublicShaderDefine &=~value;
	}

	/**
	*设置Buffer。
	*@param shaderIndex shader索引。
	*@param buffer buffer数据。
	*/
	__proto._setBuffer=function(shaderIndex,buffer){
		var shaderValue=this._shaderValues;
		shaderValue.setValue(shaderIndex,buffer);
		this._values[shaderIndex]=buffer;
	}

	/**
	*获取Buffer。
	*@param shaderIndex shader索引。
	*@return
	*/
	__proto._getBuffer=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*设置矩阵。
	*@param shaderIndex shader索引。
	*@param matrix4x4 矩阵。
	*/
	__proto._setMatrix4x4=function(shaderIndex,matrix4x4){
		this._shaderValues.setValue(shaderIndex,matrix4x4 ? matrix4x4.elements :null);
		this._values[shaderIndex]=matrix4x4;
	}

	/**
	*获取矩阵。
	*@param shaderIndex shader索引。
	*@return 矩阵。
	*/
	__proto._getMatrix4x4=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*设置整型。
	*@param shaderIndex shader索引。
	*@param i 整形。
	*/
	__proto._setInt=function(shaderIndex,i){
		var shaderValue=this._shaderValues;
		shaderValue.setValue(shaderIndex,i);
		this._values[shaderIndex]=i;
	}

	/**
	*获取整形。
	*@param shaderIndex shader索引。
	*@return 整形。
	*/
	__proto._getInt=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*设置浮点。
	*@param shaderIndex shader索引。
	*@param i 浮点。
	*/
	__proto._setNumber=function(shaderIndex,number){
		var shaderValue=this._shaderValues;
		shaderValue.setValue(shaderIndex,number);
		this._values[shaderIndex]=number;
	}

	/**
	*获取浮点。
	*@param shaderIndex shader索引。
	*@return 浮点。
	*/
	__proto._getNumber=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*设置布尔。
	*@param shaderIndex shader索引。
	*@param b 布尔。
	*/
	__proto._setBool=function(shaderIndex,b){
		var shaderValue=this._shaderValues;
		shaderValue.setValue(shaderIndex,b);
		this._values[shaderIndex]=b;
	}

	/**
	*获取布尔。
	*@param shaderIndex shader索引。
	*@return 布尔。
	*/
	__proto._getBool=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*设置二维向量。
	*@param shaderIndex shader索引。
	*@param vector2 二维向量。
	*/
	__proto._setVector2=function(shaderIndex,vector2){
		var shaderValue=this._shaderValues;
		shaderValue.setValue(shaderIndex,vector2 ? vector2.elements :null);
		this._values[shaderIndex]=vector2;
	}

	/**
	*获取二维向量。
	*@param shaderIndex shader索引。
	*@return 二维向量。
	*/
	__proto._getVector2=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*设置颜色。
	*@param shaderIndex shader索引。
	*@param color 颜色向量。
	*/
	__proto._setColor=function(shaderIndex,color){
		var shaderValue=this._shaderValues;
		shaderValue.setValue(shaderIndex,color ? color.elements :null);
		this._values[shaderIndex]=color;
	}

	/**
	*获取颜色。
	*@param shaderIndex shader索引。
	*@return 颜色向量。
	*/
	__proto._getColor=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*设置纹理。
	*@param shaderIndex shader索引。
	*@param texture 纹理。
	*/
	__proto._setTexture=function(shaderIndex,texture){
		var lastValue=this._values[shaderIndex];
		this._values[shaderIndex]=texture;
		this._shaderValues.setValue(shaderIndex,texture);
		if (this.referenceCount > 0){
			(lastValue)&& (lastValue._removeReference());
			(texture)&& (texture._addReference());
		}
	}

	/**
	*获取纹理。
	*@param shaderIndex shader索引。
	*@return 纹理。
	*/
	__proto._getTexture=function(shaderIndex){
		return this._values[shaderIndex];
	}

	/**
	*上传材质。
	*@param state 相关渲染状态。
	*@param bufferUsageShader Buffer相关绑定。
	*@param shader 着色器。
	*@return 是否成功。
	*/
	__proto._upload=function(){
		this._shader.uploadMaterialUniforms(this._shaderValues.data);
	}

	/**
	*@private
	*/
	__proto._getShader=function(sceneDefineValue,vertexDefineValue,spriteDefineValue){
		var publicDefineValue=(sceneDefineValue | vertexDefineValue)& (~this._disablePublicShaderDefine);
		this._shader=this._shaderCompile.withCompile(publicDefineValue,spriteDefineValue,this._shaderDefineValue);
		return this._shader;
	}

	/**
	*设置渲染相关状态。
	*/
	__proto._setRenderStateBlendDepth=function(){
		var gl=WebGL.mainContext;
		WebGLContext.setDepthMask(gl,this.depthWrite);
		if (this.depthTest===0)
			WebGLContext.setDepthTest(gl,false);
		else {
			WebGLContext.setDepthTest(gl,true);
			WebGLContext.setDepthFunc(gl,this.depthTest);
		}
		switch (this.blend){
			case 0:
				WebGLContext.setBlend(gl,false);
				break ;
			case 1:
				WebGLContext.setBlend(gl,true);
				WebGLContext.setBlendFunc(gl,this.srcBlend,this.dstBlend);
				break ;
			case 2:
				WebGLContext.setBlend(gl,true);
				break ;
			}
	}

	/**
	*设置渲染相关状态。
	*/
	__proto._setRenderStateFrontFace=function(isTarget,transform){
		var gl=WebGL.mainContext;
		var forntFace=0;
		switch (this.cull){
			case 0:
				WebGLContext.setCullFace(gl,false);
				break ;
			case 1:
				WebGLContext.setCullFace(gl,true);
				if (isTarget){
					if (transform && transform._isFrontFaceInvert)
						forntFace=/*laya.webgl.WebGLContext.CCW*/0x0901;
					else
					forntFace=/*laya.webgl.WebGLContext.CW*/0x0900;
					}else {
					if (transform && transform._isFrontFaceInvert)
						forntFace=/*laya.webgl.WebGLContext.CW*/0x0900;
					else
					forntFace=/*laya.webgl.WebGLContext.CCW*/0x0901;
				}
				WebGLContext.setFrontFace(gl,forntFace);
				break ;
			case 2:
				WebGLContext.setCullFace(gl,true);
				if (isTarget){
					if (transform && transform._isFrontFaceInvert)
						forntFace=/*laya.webgl.WebGLContext.CW*/0x0900;
					else
					forntFace=/*laya.webgl.WebGLContext.CCW*/0x0901;
					}else {
					if (transform && transform._isFrontFaceInvert)
						forntFace=/*laya.webgl.WebGLContext.CCW*/0x0901;
					else
					forntFace=/*laya.webgl.WebGLContext.CW*/0x0900;
				}
				WebGLContext.setFrontFace(gl,forntFace);
				break ;
			}
	}

	/**
	*@inheritDoc
	*/
	__proto.onAsynLoaded=function(url,data,params){
		var jsonData=data[0];
		var textureMap=data[1];
		switch (jsonData.version){
			case "LAYAMATERIAL:01":;
				var i=0,n=0;
				var props=jsonData.props;
				for (var key in props){
				switch (key){
					case "vectors":;
						var vectors=props[key];
						for (i=0,n=vectors.length;i < n;i++){
							var vector=vectors[i];
							var vectorValue=vector.value;
						switch (vectorValue.length){
							case 2:
								this[vector.name]=new Vector2(vectorValue[0],vectorValue[1]);
								break ;
							case 3:
								this[vector.name]=new Vector3(vectorValue[0],vectorValue[1],vectorValue[2]);
								break ;
							case 4:
								this[vector.name]=new Vector4(vectorValue[0],vectorValue[1],vectorValue[2],vectorValue[3]);
								break ;
							default :
								throw new Error("BaseMaterial:unkonwn color length.");
							}
					}
					break ;
					case "textures":;
					var textures=props[key];
					for (i=0,n=textures.length;i < n;i++){
						var texture=textures[i];
						var path=texture.path;
						(path)&& (this[texture.name]=Loader.getRes(textureMap[path]));
					}
					break ;
					case "defines":;
					var defineNames=props[key];
					for (i=0,n=defineNames.length;i < n;i++){
						var define=this._shaderCompile.getMaterialDefineByName(defineNames[i]);
						this._addShaderDefine(define);
					}
					break ;
					case "cull":
					case "blend":
					case "srcBlend":
					case "dstBlend":
					case "depthWrite":
					this[key]=props[key];
					break ;
					case "renderQueue":;
					var queue=props[key];
					switch (queue){
						case 1:
							this.renderQueue=2000;
							break ;
						case 2:
							this.renderQueue=3000;
							break ;
						default :
						}
					break ;
					default :
					this[key]=props[key];
				}
			}
			break ;
			case "LAYAMATERIAL:02":
			props=jsonData.props;
			for (key in props){
				switch (key){
					case "vectors":
						vectors=props[key];
						for (i=0,n=vectors.length;i < n;i++){
							vector=vectors[i];
							vectorValue=vector.value;
						switch (vectorValue.length){
							case 2:
								this[vector.name]=new Vector2(vectorValue[0],vectorValue[1]);
								break ;
							case 3:
								this[vector.name]=new Vector3(vectorValue[0],vectorValue[1],vectorValue[2]);
								break ;
							case 4:
								this[vector.name]=new Vector4(vectorValue[0],vectorValue[1],vectorValue[2],vectorValue[3]);
								break ;
							default :
								throw new Error("BaseMaterial:unkonwn color length.");
							}
					}
					break ;
					case "textures":
					textures=props[key];
					for (i=0,n=textures.length;i < n;i++){
						texture=textures[i];
						path=texture.path;
						(path)&& (this[texture.name]=Loader.getRes(textureMap[path]));
					}
					break ;
					case "defines":
					defineNames=props[key];
					for (i=0,n=defineNames.length;i < n;i++){
						define=this._shaderCompile.getMaterialDefineByName(defineNames[i]);
						this._addShaderDefine(define);
					}
					break ;
					default :
					this[key]=props[key];
				}
			}
			break ;
			default :
			throw new Error("BaseMaterial:unkonwn version.");
		}
		this._endLoaded();
	}

	/**
	*@inheritDoc
	*/
	__proto._addReference=function(){
		_super.prototype._addReference.call(this);
		var valueCount=this._values.length;
		for (var i=0,n=valueCount;i < n;i++){
			var value=this._values[i];
			if (value && (value instanceof laya.d3.resource.BaseTexture ))
				(value)._addReference();
		}
	}

	/**
	*@inheritDoc
	*/
	__proto._removeReference=function(){
		_super.prototype._removeReference.call(this);
		var valueCount=this._values.length;
		for (var i=0,n=valueCount;i < n;i++){
			var value=this._values[i];
			if (value && (value instanceof laya.d3.resource.BaseTexture ))
				(value)._removeReference();
		}
	}

	/**
	*@inheritDoc
	*/
	__proto.disposeResource=function(){
		this.blendConstColor=null;
		this._shader=null;
		this._shaderValues=null;
		var valueCount=this._values.length;
		for (var i=0,n=valueCount;i < n;i++){
			var value=this._values[i];
			if (value && (value instanceof laya.d3.resource.BaseTexture ))
				(value)._removeReference();
		}
		this._values=null;
	}

	/**
	*设置使用Shader名字。
	*@param name 名称。
	*/
	__proto.setShaderName=function(name){
		var nameID=Shader3D.nameKey.getID(name);
		if (nameID===-1)
			throw new Error("BaseMaterial: unknown shader name.");
		this._shaderCompile=ShaderCompile3D._preCompileShader[nameID];
	}

	/**
	*克隆。
	*@param destObject 克隆源。
	*/
	__proto.cloneTo=function(destObject){
		var destBaseMaterial=destObject;
		destBaseMaterial.name=this.name;
		destBaseMaterial.cull=this.cull;
		destBaseMaterial.blend=this.blend;
		destBaseMaterial.srcBlend=this.srcBlend;
		destBaseMaterial.dstBlend=this.dstBlend;
		destBaseMaterial.srcBlendRGB=this.srcBlendRGB;
		destBaseMaterial.dstBlendRGB=this.dstBlendRGB;
		destBaseMaterial.srcBlendAlpha=this.srcBlendAlpha;
		destBaseMaterial.dstBlendAlpha=this.dstBlendAlpha;
		this.blendConstColor.cloneTo(destBaseMaterial.blendConstColor);
		destBaseMaterial.blendEquation=this.blendEquation;
		destBaseMaterial.blendEquationRGB=this.blendEquationRGB;
		destBaseMaterial.blendEquationAlpha=this.blendEquationAlpha;
		destBaseMaterial.depthTest=this.depthTest;
		destBaseMaterial.depthWrite=this.depthWrite;
		destBaseMaterial.renderQueue=this.renderQueue;
		destBaseMaterial._shader=this._shader;
		destBaseMaterial._disablePublicShaderDefine=this._disablePublicShaderDefine;
		destBaseMaterial._shaderDefineValue=this._shaderDefineValue;
		var i=0,n=0;
		var destShaderValues=destBaseMaterial._shaderValues;
		destBaseMaterial._shaderValues.data.length=this._shaderValues.data.length;
		var valueCount=this._values.length;
		var destValues=destBaseMaterial._values;
		destValues.length=valueCount;
		for (i=0,n=valueCount;i < n;i++){
			var value=this._values[i];
			if (value){
				if ((typeof value=='number')){
					destValues[i]=value;
					destShaderValues.data[i]=value;
					}else if (((typeof value=='number')&& Math.floor(value)==value)){
					destValues[i]=value;
					destShaderValues.data[i]=value;
					}else if ((typeof value=='boolean')){
					destValues[i]=value;
					destShaderValues.data[i]=value;
					}else if ((value instanceof laya.d3.math.Vector2 )){
					var v2=(destValues[i])|| (destValues[i]=new Vector2());
					(value).cloneTo(v2);
					destShaderValues.data[i]=v2.elements;
					}else if ((value instanceof laya.d3.math.Vector3 )){
					var v3=(destValues[i])|| (destValues[i]=new Vector3());
					(value).cloneTo(v3);
					destShaderValues.data[i]=v3.elements;
					}else if ((value instanceof laya.d3.math.Vector4 )){
					var v4=(destValues[i])|| (destValues[i]=new Vector4());
					(value).cloneTo(v4);
					destShaderValues.data[i]=v4.elements;
					}else if ((value instanceof laya.d3.math.Matrix4x4 )){
					var mat=(destValues[i])|| (destValues[i]=new Matrix4x4());
					(value).cloneTo(mat);
					destShaderValues.data[i]=mat.elements;
					}else if ((value instanceof laya.d3.resource.BaseTexture )){
					destValues[i]=value;
					destShaderValues.data[i]=value;
				}
			}
		}
	}

	/**
	*克隆。
	*@return 克隆副本。
	*/
	__proto.clone=function(){
		var destBaseMaterial=/*__JS__ */new this.constructor();
		this.cloneTo(destBaseMaterial);
		return destBaseMaterial;
	}

	/**
	*设置透明测试模式裁剪值。
	*@param value 透明测试模式裁剪值。
	*/
	/**
	*获取透明测试模式裁剪值。
	*@return 透明测试模式裁剪值。
	*/
	__getset(0,__proto,'alphaTestValue',function(){
		return this._getNumber(0);
		},function(value){
		this._setNumber(0,value);
	});

	/**
	*设置是否透明裁剪。
	*@param value 是否透明裁剪。
	*/
	/**
	*获取是否透明裁剪。
	*@return 是否透明裁剪。
	*/
	__getset(0,__proto,'alphaTest',function(){
		return this._alphaTest;
		},function(value){
		this._alphaTest=value;
		if (value)
			this._addShaderDefine(laya.d3.core.material.BaseMaterial.SHADERDEFINE_ALPHATEST);
		else
		this._removeShaderDefine(laya.d3.core.material.BaseMaterial.SHADERDEFINE_ALPHATEST);
	});

	BaseMaterial.__init__=function(){
		BaseMaterial.SHADERDEFINE_ALPHATEST=BaseMaterial.shaderDefines.registerDefine("ALPHATEST");
	}

	BaseMaterial.RENDERQUEUE_OPAQUE=2000;
	BaseMaterial.RENDERQUEUE_ALPHATEST=2450;
	BaseMaterial.RENDERQUEUE_TRANSPARENT=3000;
	BaseMaterial.CULL_NONE=0;
	BaseMaterial.CULL_FRONT=1;
	BaseMaterial.CULL_BACK=2;
	BaseMaterial.BLEND_DISABLE=0;
	BaseMaterial.BLEND_ENABLE_ALL=1;
	BaseMaterial.BLEND_ENABLE_SEPERATE=2;
	BaseMaterial.BLENDPARAM_ZERO=0;
	BaseMaterial.BLENDPARAM_ONE=1;
	BaseMaterial.BLENDPARAM_SRC_COLOR=0x0300;
	BaseMaterial.BLENDPARAM_ONE_MINUS_SRC_COLOR=0x0301;
	BaseMaterial.BLENDPARAM_DST_COLOR=0x0306;
	BaseMaterial.BLENDPARAM_ONE_MINUS_DST_COLOR=0x0307;
	BaseMaterial.BLENDPARAM_SRC_ALPHA=0x0302;
	BaseMaterial.BLENDPARAM_ONE_MINUS_SRC_ALPHA=0x0303;
	BaseMaterial.BLENDPARAM_DST_ALPHA=0x0304;
	BaseMaterial.BLENDPARAM_ONE_MINUS_DST_ALPHA=0x0305;
	BaseMaterial.BLENDPARAM_SRC_ALPHA_SATURATE=0x0308;
	BaseMaterial.BLENDEQUATION_ADD=0;
	BaseMaterial.BLENDEQUATION_SUBTRACT=1;
	BaseMaterial.BLENDEQUATION_REVERSE_SUBTRACT=2;
	BaseMaterial.DEPTHTEST_OFF=0;
	BaseMaterial.DEPTHTEST_NEVER=0x0200;
	BaseMaterial.DEPTHTEST_LESS=0x0201;
	BaseMaterial.DEPTHTEST_EQUAL=0x0202;
	BaseMaterial.DEPTHTEST_LEQUAL=0x0203;
	BaseMaterial.DEPTHTEST_GREATER=0x0204;
	BaseMaterial.DEPTHTEST_NOTEQUAL=0x0205;
	BaseMaterial.DEPTHTEST_GEQUAL=0x0206;
	BaseMaterial.DEPTHTEST_ALWAYS=0x0207;
	BaseMaterial.SHADERDEFINE_ALPHATEST=0x1;
	BaseMaterial.ALPHATESTVALUE=0;
	__static(BaseMaterial,
	['shaderDefines',function(){return this.shaderDefines=new ShaderDefines$1();}
	]);
	return BaseMaterial;
})(Resource)