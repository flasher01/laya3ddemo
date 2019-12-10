class FireBodyShader {
    static initShader(): void {
        var attributeMap = {
            'a_Position':/*laya.d3.graphics.VertexElementUsage.POSITION0*/0,
            'a_Color':/*laya.d3.graphics.VertexElementUsage.COLOR0*/1,
            'a_Texcoord0':/*laya.d3.graphics.VertexElementUsage.TEXTURECOORDINATE0*/2,
            'a_BoneWeights':/*laya.d3.graphics.VertexElementUsage.BLENDWEIGHT0*/7,
            'a_BoneIndices':/*laya.d3.graphics.VertexElementUsage.BLENDINDICES0*/6,
        };
        var uniformMap = {
            'u_Bones': [ /*laya.d3.core.SkinnedMeshSprite3D.BONES*/0,/*laya.d3.shader.Shader3D.PERIOD_RENDERELEMENT*/0],
            'u_MvpMatrix': [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
            'u_DiffuseTexture': [ FireBodyMaterial.DIFFUSETEXTURE,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
            'u_Albedo': [FireBodyMaterial.ALBEDO/*3*/, Laya.Shader3D.PERIOD_MATERIAL/*1*/],
            'fc0': [FireBodyMaterial.fc0/*3*/, Laya.Shader3D.PERIOD_MATERIAL/*1*/],
            'fc1': [FireBodyMaterial.fc1/*3*/, Laya.Shader3D.PERIOD_MATERIAL/*1*/],
            'fc2': [FireBodyMaterial.fc2/*3*/, Laya.Shader3D.PERIOD_MATERIAL/*1*/],
            'fc3': [FireBodyMaterial.fc3/*3*/, Laya.Shader3D.PERIOD_MATERIAL/*1*/],
            'fc4': [FireBodyMaterial.fc4/*3*/, Laya.Shader3D.PERIOD_MATERIAL/*1*/]
        };
        var vs: string = "attribute vec4 a_Position;\n" +
            "attribute vec4 a_Color;\n" +
            "uniform mat4 u_MvpMatrix;\n" +
            "attribute vec2 a_Texcoord0;\n" +
            "varying vec2 v_Texcoord0;\n" +
            "varying vec4 v_Color;\n" +
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
            "v_Color= a_Color;\n" +
            "v_Texcoord0= a_Texcoord0;\n}";
        var ps: string = "#ifdef FSHIGHPRECISION\n" +
            "precision highp float;\n" +
            "#else\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "varying vec2 v_Texcoord0;\n" +
            "uniform sampler2D u_DiffuseTexture;\n" +
            "uniform vec4 u_Albedo;\n" +
            "varying vec4 v_Color;\n" +
            "uniform vec4 fc0;\n" +
            "uniform vec4 fc1;\n" +
            "uniform vec4 fc2;\n" +
            "uniform vec4 fc3;\n" +
            "uniform vec4 fc4;\n" +

            "void main(){\n" +
            "vec4 ft6,ft1,ft0,ft2,ft3,ft4,ft5;\n" +
            "ft6=texture2D(u_DiffuseTexture, v_Texcoord0);\n" +
            "ft6=ft6*v_Color\n;" +
            "ft1.x=ft6.w-fc3.w\n;" +
            "if(ft1.x < 0.0){\n" +
            "discard;\n}" +
            "ft0.x=dot(ft6.xyz,fc4.xyz)\n;" +
            "ft0.x=ft0.x*fc4.w\n;" +
            "ft1.z=ft0.x-fc3.y\n;" +
            "ft1.x=ft0.x*fc3.z\n;" +
            "ft1.x=clamp(ft1.x,0.0,1.0)\n;" +
            "ft1.y=fc3.x-ft1.x\n;" +
            "ft4=fc2*ft1.y\n;" +
            "ft5=fc1*ft1.x\n;" +
            "ft2=ft4+ft5\n;" +
            "ft4=fc1*ft1.y\n;" +
            "ft5=fc0*ft1.x\n;" +
            "ft3=ft4+ft5\n;" +
            "ft0.y=ft0.x*ft1.y\n;" +
            "ft1.w=ft0.y\n;" +
            "ft0.y=ft1.z*ft1.x\n;" +
            "ft1.w=ft1.w+ft0.y\n;" +
            "ft1.w=ft1.w*fc3.z\n;" +
            "ft0.z=fc3.x-ft1.w\n;" +
            "ft2=ft2*ft0.z\n;" +
            "ft3=ft3*ft1.w\n;" +
            "ft3=ft3+ft2\n;" +
            "ft6.xyz=ft6.xyz+ft3.xyz\n;" +
            "gl_FragColor=ft6;}"
        var customShader = Laya.Shader3D.nameKey.add("FireBodyShader");
        Laya.ShaderCompile3D.add(customShader, vs, ps, attributeMap, uniformMap);
    }
}