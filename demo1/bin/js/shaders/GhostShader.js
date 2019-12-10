var GhostShader = /** @class */ (function () {
    function GhostShader() {
    }
    GhostShader.initShader = function () {
        var attributeMap = {
            'a_Position': /*laya.d3.graphics.VertexElementUsage.POSITION0*/ 0,
            'a_Normal': /*Laya.VertexElementUsage.NORMAL0*/ 3,
            'a_Texcoord0': /*laya.d3.graphics.VertexElementUsage.TEXTURECOORDINATE0*/ 2,
            'a_BoneWeights': /*laya.d3.graphics.VertexElementUsage.BLENDWEIGHT0*/ 7,
            'a_BoneIndices': /*laya.d3.graphics.VertexElementUsage.BLENDINDICES0*/ 6,
        };
        var uniformMap = {
            'u_Bones': [/*laya.d3.core.SkinnedMeshSprite3D.BONES*/ 0, /*laya.d3.shader.Shader3D.PERIOD_RENDERELEMENT*/ 0],
            'u_MvpMatrix': [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
            // 'u_DiffuseTexture': [ /*laya.d3.core.material.PBRStandardMaterial.DIFFUSETEXTURE*/1,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
            'u_Albedo': [CustomMaterialSimple.ALBEDO /*3*/, Laya.Shader3D.PERIOD_MATERIAL /*1*/],
            'u_WorldMat': [/*laya.d3.core.Sprite3D.WORLDMATRIX*/ 0, /*laya.d3.shader.Shader3D.PERIOD_SPRITE*/ 2],
            'u_CameraPos': [/*laya.d3.core.BaseCamera.CAMERAPOS*/ 0, /*laya.d3.shader.Shader3D.PERIOD_CAMERA*/ 3]
        };
        var vs = "attribute vec4 a_Position;\n" +
            "uniform mat4 u_MvpMatrix;\n" +
            "uniform mat4 u_WorldMat;\n" +
            "attribute vec2 a_Texcoord0;\n" +
            "attribute vec3 a_Normal;\n" +
            "varying vec2 v_Texcoord0;\n" +
            "varying vec4 v_Position;\n" +
            "varying vec3 v_Normal;\n" +
            "attribute vec4 a_BoneIndices;\n" +
            "attribute vec4 a_BoneWeights;\n" +
            "const int c_MaxBoneCount = 24;\n" +
            "uniform mat4 u_Bones[c_MaxBoneCount];\n" +
            "void main(){\n" +
            "mat4 skinTransform= mat4(0.0);\n" +
            "skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n" +
            "skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n" +
            "skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n" +
            "skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n" +
            "vec4 position= skinTransform * a_Position;\n" +
            "gl_Position = u_MvpMatrix * position;\n" +
            "mat3 worldMat=mat3(u_WorldMat * skinTransform);\n" +
            "v_Position=a_Position;\n" +
            "v_Normal=worldMat*a_Normal;\n" +
            "v_Texcoord0= a_Texcoord0;\n}";
        var ps = "#ifdef FSHIGHPRECISION\n" +
            "precision highp float;\n" +
            "#else\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "varying vec2 v_Texcoord0;\n" +
            "varying vec4 v_Position;\n" +
            "varying vec3 v_Normal;\n" +
            "uniform sampler2D u_DiffuseTexture;\n" +
            "uniform vec4 u_Albedo;\n" +
            "uniform vec3 u_CameraPos;\n" +
            "void main(){\n" +
            "vec3 viewDir = normalize(u_CameraPos - vec3(v_Position.x,v_Position.y,v_Position.z));\n" +
            "float val=1.0-clamp(dot(v_Normal,viewDir),0.0,1.0);\n" +
            "gl_FragColor = u_Albedo*val;}";
        var customShader = Laya.Shader3D.nameKey.add("GhostShader");
        Laya.ShaderCompile3D.add(customShader, vs, ps, attributeMap, uniformMap);
    };
    return GhostShader;
}());
//# sourceMappingURL=GhostShader.js.map