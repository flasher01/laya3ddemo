class MatrixUtil {
    constructor() {

    }
    static transformPosition(worldMatrix: Float32Array, vec3Pos: Float32Array, out: Laya.Vector3 = null): Laya.Vector3 {
        let m = worldMatrix;
        if (!out) {
            out = new Laya.Vector3();
        }
        var x: number = vec3Pos[0];
        var y: number = vec3Pos[1];
        var z: number = vec3Pos[2];
        out.x = x * m[0] + y * m[4] + z * m[8] + m[12];
        out.y = x * m[1] + y * m[5] + z * m[9] + m[13];
        out.z = x * m[2] + y * m[6] + z * m[10] + m[14];
        return out;
    }
    
}